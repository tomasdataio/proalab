// app/dashboards/brechas-genero/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardContainer } from "@/components/ui/dashboard-container"

// Importaciones de componentes de visualización
import { GraficoBarra } from "@/components/visualizaciones/grafico-barra"
import { GraficoDispersion } from "@/components/visualizaciones/grafico-dispersion"
import { TablaResumen } from "@/components/visualizaciones/tabla-resumen"
import { MapaChile } from "@/components/visualizaciones/mapa-chile"

export default function BrechasGenero() {
  const [datos, setDatos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [filtros, setFiltros] = useState({
    area: "",
    region: "",
  })

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      setError(null)

      try {
        // Construir URL con parámetros de filtro
        const params = new URLSearchParams()
        if (filtros.area) params.append("area", filtros.area)
        if (filtros.region) params.append("region", filtros.region)

        const response = await fetch(`/api/dashboard/brechas-genero?${params}`)

        if (!response.ok) {
          throw new Error("Error al cargar datos")
        }

        const result = await response.json()
        setDatos(result.data || [])
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
  const areasConocimiento = [
    { value: "", label: "Todas" },
    { value: "Administración y Comercio", label: "Administración y Comercio" },
    { value: "Agropecuaria", label: "Agropecuaria" },
    { value: "Arte y Arquitectura", label: "Arte y Arquitectura" },
    { value: "Ciencias Básicas", label: "Ciencias Básicas" },
    { value: "Ciencias Sociales", label: "Ciencias Sociales" },
    { value: "Derecho", label: "Derecho" },
    { value: "Educación", label: "Educación" },
    { value: "Humanidades", label: "Humanidades" },
    { value: "Salud", label: "Salud" },
    { value: "Tecnología", label: "Tecnología" },
  ]

  const regiones = [
    { value: "", label: "Todas" },
    { value: "Nacional", label: "Nacional" },
    { value: "Metropolitana", label: "Metropolitana" },
    { value: "Valparaíso", label: "Valparaíso" },
    { value: "Biobío", label: "Biobío" },
    // Añadir el resto de regiones...
  ]

  // Crear datos para gráficos de barra divergente
  const datosDistribucion = datos.map((d) => ({
    area: d.area,
    Mujeres: d.pct_mujeres,
    Hombres: -d.pct_hombres, // Valor negativo para barra divergente
  }))

  // Datos para el mapa
  const datosPorRegion = datos.reduce((acc, curr) => {
    if (acc.some((item) => item.region === curr.region)) {
      return acc
    }
    return [
      ...acc,
      {
        region: curr.region,
        valor: curr.brecha_desocupacion, // Usamos la brecha de desocupación como valor
      },
    ]
  }, [])

  // Handler para cambios en filtros
  const handleFilterChange = (key: string, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <DashboardContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Brechas de Género</h1>
        <p className="text-muted-foreground">
          Análisis de disparidades de género en educación y empleo por áreas de conocimiento y regiones.
        </p>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Área de Conocimiento</label>
          <Select value={filtros.area} onValueChange={(value) => handleFilterChange("area", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar área" />
            </SelectTrigger>
            <SelectContent>
              {areasConocimiento.map((area) => (
                <SelectItem key={area.value} value={area.value}>
                  {area.label}
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

        <div className="flex items-end">
          <Button variant="outline" onClick={() => setFiltros({ area: "", region: "" })} className="w-full">
            Limpiar filtros
          </Button>
        </div>
      </div>

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
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Distribución de Género por Área de Conocimiento</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <GraficoBarra datos={datosDistribucion} campoX="area" campoY="valor" agruparPor="genero" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brechas de Género en Desocupación</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <GraficoDispersion
                datos={datos}
                campoX="pct_mujeres"
                campoY="brecha_desocupacion"
                etiqueta="area"
                formatoX={(d) => `${d}%`}
                formatoY={(d) => `${d}%`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mapa de Brechas por Región</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <MapaChile datos={datosPorRegion} valorCampo="valor" colorEscala="reds" />
            </CardContent>
          </Card>

          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Tabla de Brechas de Género</CardTitle>
            </CardHeader>
            <CardContent>
              <TablaResumen
                datos={datos}
                columnas={[
                  { field: "area", header: "Área" },
                  { field: "region", header: "Región" },
                  { field: "pct_mujeres", header: "Mujeres (%)" },
                  { field: "pct_hombres", header: "Hombres (%)" },
                  { field: "brecha_desocupacion", header: "Brecha Desocupación (%)" },
                  { field: "brecha_informalidad", header: "Brecha Informalidad (%)" },
                ]}
                ordenablePor={["pct_mujeres", "pct_hombres", "brecha_desocupacion", "brecha_informalidad"]}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardContainer>
  )
}

