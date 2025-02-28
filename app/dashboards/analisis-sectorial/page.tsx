// app/dashboards/analisis-sectorial/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardContainer } from "@/components/ui/dashboard-container"

// Importaciones de componentes de visualización
import { GraficoRadar } from "@/components/visualizaciones/grafico-radar"
import { GraficoDispersion } from "@/components/visualizaciones/grafico-dispersion"
import { TablaResumen } from "@/components/visualizaciones/tabla-resumen"

export default function AnalisisSectorial() {
  const [datos, setDatos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [sectoresSeleccionados, setSectoresSeleccionados] = useState<string[]>([])

  const [filtros, setFiltros] = useState({
    sector: "",
    region: "",
  })

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      setError(null)

      try {
        // Construir URL con parámetros de filtro
        const params = new URLSearchParams()
        if (filtros.sector) params.append("sector", filtros.sector)
        if (filtros.region) params.append("region", filtros.region)

        const response = await fetch(`/api/dashboard/analisis-sectorial?${params}`)

        if (!response.ok) {
          throw new Error("Error al cargar datos")
        }

        const result = await response.json()
        setDatos(result.data || [])

        // Preseleccionar algunos sectores para la visualización
        if (result.data && result.data.length > 0 && sectoresSeleccionados.length === 0) {
          const sectores = [...new Set(result.data.map((d) => d.sector))]
          setSectoresSeleccionados(sectores.slice(0, 3)) // Tomar los primeros 3 sectores
        }
      } catch (err: any) {
        console.error("Error:", err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [filtros])

  // Opciones para filtros
  const sectoresEconomicos = [
    { value: "", label: "Todos" },
    { value: "Agricultura", label: "Agricultura" },
    { value: "Minería", label: "Minería" },
    { value: "Industria Manufacturera", label: "Industria Manufacturera" },
    { value: "Electricidad, Gas y Agua", label: "Electricidad, Gas y Agua" },
    { value: "Construcción", label: "Construcción" },
    { value: "Comercio", label: "Comercio" },
    { value: "Transporte y Comunicaciones", label: "Transporte y Comunicaciones" },
    { value: "Servicios Financieros", label: "Servicios Financieros" },
    { value: "Servicios Sociales", label: "Servicios Sociales" },
  ]

  const regiones = [
    { value: "", label: "Todas" },
    { value: "Nacional", label: "Nacional" },
    { value: "Metropolitana", label: "Metropolitana" },
    { value: "Valparaíso", label: "Valparaíso" },
    { value: "Biobío", label: "Biobío" },
    // Añadir el resto de regiones...
  ]

  // Filtrar datos solo para los sectores seleccionados para el radar
  const datosRadar = datos.filter((d) => sectoresSeleccionados.includes(d.sector))

  // Handler para cambios en filtros
  const handleFilterChange = (key: string, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }))
  }

  // Métricas para el gráfico radar
  const metricasRadar = [
    { nombre: "Desocupación", campo: "tasa_desocupacion", min: 0, max: 15 },
    { nombre: "Variabilidad", campo: "variabilidad", min: 0, max: 100 },
    { nombre: "Fuerza Laboral", campo: "fuerza_trabajo", min: 0 },
    { nombre: "Informalidad", campo: "informalidad", min: 0, max: 50 },
  ]

  return (
    <DashboardContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Análisis Sectorial</h1>
        <p className="text-muted-foreground">
          Análisis estadístico de empleo por sectores económicos con indicadores de calidad laboral.
        </p>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Sector Económico</label>
          <Select value={filtros.sector} onValueChange={(value) => handleFilterChange("sector", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar sector" />
            </SelectTrigger>
            <SelectContent>
              {sectoresEconomicos.map((sector) => (
                <SelectItem key={sector.value} value={sector.value}>
                  {sector.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Región</label>
          <Select value={filtros.region} onValueChange={(value) => handleFilterChange("region", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar región" />
            </SelectTrigger>
            <SelectContent>
              {regiones.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Selector de sectores para comparar en radar */}
      {!isLoading && !error && datos.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Seleccionar sectores para comparar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[...new Set(datos.map((d) => d.sector))].map((sector) => (
                <Button
                  key={sector}
                  variant={sectoresSeleccionados.includes(sector) ? "default" : "outline"}
                  onClick={() => {
                    if (sectoresSeleccionados.includes(sector)) {
                      setSectoresSeleccionados((prev) => prev.filter((s) => s !== sector))
                    } else {
                      setSectoresSeleccionados((prev) => [...prev, sector])
                    }
                  }}
                  className="mb-2"
                >
                  {sector}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Visualizaciones */}
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <p>Cargando datos...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 p-4 rounded-md text-red-800">{error}</div>
      ) : datos.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <p>No se encontraron datos con los filtros seleccionados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Perfil Multidimensional de Sectores</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <GraficoRadar datos={datosRadar} metricas={metricasRadar} etiqueta="sector" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Desempleo vs Informalidad</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <GraficoDispersion
                datos={datos}
                campoX="tasa_desocupacion"
                campoY="informalidad"
                tamano="fuerza_trabajo"
                etiqueta="sector"
                formatoX={(d) => `${d}%`}
                formatoY={(d) => `${d}%`}
              />
            </CardContent>
          </Card>

          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Indicadores por Sector</CardTitle>
            </CardHeader>
            <CardContent>
              <TablaResumen
                datos={datos}
                columnas={[
                  { field: "sector", header: "Sector" },
                  { field: "region", header: "Región" },
                  { field: "tasa_desocupacion", header: "Desempleo (%)" },
                  { field: "variabilidad", header: "Variabilidad" },
                  { field: "fuerza_trabajo", header: "Fuerza Laboral" },
                  { field: "informalidad", header: "Informalidad (%)" },
                ]}
                ordenablePor={["tasa_desocupacion", "variabilidad", "fuerza_trabajo", "informalidad"]}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardContainer>
  )
}

