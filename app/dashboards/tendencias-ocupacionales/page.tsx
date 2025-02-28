// app/dashboards/tendencias-ocupacionales/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardContainer } from "@/components/ui/dashboard-container"

// Importaciones de componentes de visualización
import { GraficoLinea } from "@/components/visualizaciones/grafico-linea"
import { MapaCalor } from "@/components/visualizaciones/mapa-calor"
import { TablaResumen } from "@/components/visualizaciones/tabla-resumen"

export default function TendenciasOcupacionales() {
  const [datos, setDatos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fechaSeleccionada, setFechaSeleccionada] = useState("")

  const [filtros, setFiltros] = useState({
    fechaInicio: "2020-01-01",
    fechaFin: new Date().toISOString().split("T")[0],
    ocupacion: "",
    region: "",
  })

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      setError(null)

      try {
        // Construir URL con parámetros de filtro
        const params = new URLSearchParams()
        if (filtros.fechaInicio) params.append("fechaInicio", filtros.fechaInicio)
        if (filtros.fechaFin) params.append("fechaFin", filtros.fechaFin)
        if (filtros.ocupacion) params.append("ocupacion", filtros.ocupacion)
        if (filtros.region) params.append("region", filtros.region)

        const response = await fetch(`/api/dashboard/tendencias-ocupacionales?${params}`)

        if (!response.ok) {
          throw new Error("Error al cargar datos")
        }

        const result = await response.json()
        const resultData = result.data || []

        setDatos(resultData)

        // Establecer la fecha seleccionada por defecto a la más reciente
        if (resultData.length > 0 && !fechaSeleccionada) {
          const fechas = [...new Set(resultData.map((d) => d.tmp_fecha))].sort()
          setFechaSeleccionada(fechas[fechas.length - 1])
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
  const categoriasOcupacionales = [
    { value: "", label: "Todas" },
    { value: "Directores", label: "Directores" },
    { value: "Profesionales", label: "Profesionales" },
    { value: "Técnicos", label: "Técnicos" },
    { value: "Personal administrativo", label: "Personal administrativo" },
    { value: "Trabajadores de servicios", label: "Trabajadores de servicios" },
    { value: "Agricultores", label: "Agricultores" },
    { value: "Oficiales y operarios", label: "Oficiales y operarios" },
    { value: "Operadores de máquinas", label: "Operadores de máquinas" },
    { value: "Ocupaciones elementales", label: "Ocupaciones elementales" },
  ]

  const regiones = [
    { value: "", label: "Todas" },
    { value: "Nacional", label: "Nacional" },
    { value: "Metropolitana", label: "Metropolitana" },
    { value: "Valparaíso", label: "Valparaíso" },
    { value: "Biobío", label: "Biobío" },
    // Añadir el resto de regiones...
  ]

  // Obtener fechas únicas para el selector
  const fechasUnicas = [...new Set(datos.map((d) => d.tmp_fecha))].sort()

  // Filtrar datos por fecha seleccionada
  const datosPorFecha = datos.filter((d) => d.tmp_fecha === fechaSeleccionada)

  // Handler para cambios en filtros
  const handleFilterChange = (key: string, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }))
  }

  // Función para avanzar a la siguiente fecha
  const avanzarFecha = () => {
    const index = fechasUnicas.indexOf(fechaSeleccionada)
    if (index < fechasUnicas.length - 1) {
      setFechaSeleccionada(fechasUnicas[index + 1])
    } else {
      setFechaSeleccionada(fechasUnicas[0]) // Volver al inicio
    }
  }

  return (
    <DashboardContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Tendencias Ocupacionales</h1>
        <p className="text-muted-foreground">
          Análisis de tendencias en categorías ocupacionales a lo largo del tiempo.
        </p>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Fecha de inicio</label>
          <input
            type="date"
            className="w-full rounded-md border border-input px-3 py-2"
            value={filtros.fechaInicio}
            onChange={(e) => handleFilterChange("fechaInicio", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fecha de fin</label>
          <input
            type="date"
            className="w-full rounded-md border border-input px-3 py-2"
            value={filtros.fechaFin}
            onChange={(e) => handleFilterChange("fechaFin", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Categoría Ocupacional</label>
          <Select value={filtros.ocupacion} onValueChange={(value) => handleFilterChange("ocupacion", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              {categoriasOcupacionales.map((categoria) => (
                <SelectItem key={categoria.value} value={categoria.value}>
                  {categoria.label}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Tendencias Temporales por Ocupación</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <GraficoLinea
                datos={datos}
                campoX="tmp_fecha"
                campoY="valor"
                series="ocupacion"
                formatoFecha="MMM YYYY"
                colorPor="ocupacion"
                conPuntos={true}
                leyendaInteractiva={true}
              />
            </CardContent>
          </Card>

          <Card className="col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle>Intensidad Ocupacional por Período</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <MapaCalor datos={datos} filas="ocupacion" columnas="tmp_fecha" valores="valor" colorEscala="viridis" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Datos para {fechaSeleccionada}</CardTitle>
              <Button variant="outline" size="sm" onClick={avanzarFecha}>
                Siguiente período
              </Button>
            </CardHeader>
            <CardContent>
              <TablaResumen
                datos={datosPorFecha}
                columnas={[
                  { field: "ocupacion", header: "Ocupación" },
                  { field: "region", header: "Región" },
                  { field: "valor", header: "Valor" },
                ]}
                ordenablePor={["valor"]}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardContainer>
  )
}

