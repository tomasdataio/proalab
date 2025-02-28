// app/dashboards/tendencias-sectores/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardContainer } from "@/components/ui/dashboard-container"

// Importaciones de componentes de visualización
import { GraficoLinea } from "@/components/visualizaciones/grafico-linea"
import { MapaCalor } from "@/components/visualizaciones/mapa-calor"
import { MapaChile } from "@/components/visualizaciones/mapa-chile"

export default function TendenciasSectores() {
  const [datos, setDatos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fechaSeleccionada, setFechaSeleccionada] = useState("")

  const [filtros, setFiltros] = useState({
    sector: "",
    fechaInicio: "2020-01-01",
    fechaFin: new Date().toISOString().split("T")[0],
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
        if (filtros.fechaInicio) params.append("fechaInicio", filtros.fechaInicio)
        if (filtros.fechaFin) params.append("fechaFin", filtros.fechaFin)
        if (filtros.region) params.append("region", filtros.region)

        const response = await fetch(`/api/dashboard/sectores-tendencias?${params}`)

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

  // Obtener fechas únicas para el selector
  const fechasUnicas = [...new Set(datos.map((d) => d.tmp_fecha))].sort()

  // Filtrar datos por fecha seleccionada
  const datosPorFecha = datos.filter((d) => d.tmp_fecha === fechaSeleccionada)

  // Datos por región para el mapa
  const datosPorRegion = datosPorFecha.reduce((acc, curr) => {
    if (acc.some((item) => item.region === curr.region)) {
      return acc
    }
    return [...acc, { region: curr.region, valor: curr.valor }]
  }, [])

  // Handler para cambios en filtros
  const handleFilterChange = (key: string, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <DashboardContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Tendencias por Sectores Económicos</h1>
        <p className="text-muted-foreground">
          Análisis de tendencias de diferentes sectores económicos a lo largo del tiempo.
        </p>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Tendencias por Sector Económico</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <GraficoLinea
                datos={datos}
                campoX="tmp_fecha"
                campoY="valor"
                series="sector"
                formatoFecha="MMM YYYY"
                colorPor="sector"
                conPuntos={true}
                leyendaInteractiva={true}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Intensidad por Sector y Período</CardTitle>
                <Select value={fechaSeleccionada} onValueChange={setFechaSeleccionada}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar fecha" />
                  </SelectTrigger>
                  <SelectContent>
                    {fechasUnicas.map((fecha) => (
                      <SelectItem key={fecha} value={fecha}>
                        {fecha}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="h-96">
              <MapaCalor datos={datos} filas="sector" columnas="tmp_fecha" valores="valor" colorEscala="viridis" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rendimiento Regional - {fechaSeleccionada}</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <MapaChile datos={datosPorRegion} valorCampo="valor" colorEscala="blues" />
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardContainer>
  )
}

