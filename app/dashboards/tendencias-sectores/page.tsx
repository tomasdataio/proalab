// app/dashboards/tendencias-sectores/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardContainer } from "@/components/ui/dashboard-container"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertTriangle } from "lucide-react"

// Importaciones de componentes de visualización shadcn
import { GraficoLineaShadcn } from "@/components/visualizaciones/grafico-linea-shadcn"
import { MapaCalorShadcn } from "@/components/visualizaciones/mapa-calor-shadcn"
import { MapaChileShadcn } from "@/components/visualizaciones/mapa-chile-shadcn"

// Definir interfaces para los datos
interface DatoSectorial {
  sector: string
  region: string
  tmp_fecha: string
  valor: number
  crecimiento?: number
  tendencia?: number
  demanda?: number
  [key: string]: any
}

interface DatoRegion {
  region: string
  valor: number
}

export default function TendenciasSectores() {
  const [datos, setDatos] = useState<DatoSectorial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("")
  const [fechasUnicas, setFechasUnicas] = useState<string[]>([])

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
        
        // Verificar que los datos sean del tipo esperado
        if (Array.isArray(result.data)) {
          // Tipando los datos explícitamente
          const resultData = result.data as DatoSectorial[];
          setDatos(resultData);
          
          // Extraer fechas únicas asegurando que son strings
          const allDates = resultData
            .map(d => d.tmp_fecha)
            .filter((date): date is string => typeof date === 'string');
          
          // Crear un Set para eliminar duplicados y convertirlo de nuevo a array
          const uniqueDatesSet = new Set(allDates);
          const uniqueDates = Array.from(uniqueDatesSet).sort();
          
          setFechasUnicas(uniqueDates);
          
          // Establecer la fecha seleccionada por defecto a la más reciente si no hay ninguna seleccionada
          if (uniqueDates.length > 0 && !fechaSeleccionada) {
            setFechaSeleccionada(uniqueDates[uniqueDates.length - 1]);
          }
        } else {
          setDatos([]);
          setFechasUnicas([]);
          console.error("Los datos recibidos no son un array:", result.data);
        }
      } catch (err: any) {
        console.error("Error:", err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [filtros, fechaSeleccionada])

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
    { value: "Maule", label: "Maule" },
    { value: "Araucanía", label: "Araucanía" },
    { value: "Los Lagos", label: "Los Lagos" },
    { value: "O'Higgins", label: "O'Higgins" },
    { value: "Coquimbo", label: "Coquimbo" },
    { value: "Los Ríos", label: "Los Ríos" },
    { value: "Antofagasta", label: "Antofagasta" },
    { value: "Tarapacá", label: "Tarapacá" },
    { value: "Atacama", label: "Atacama" },
    { value: "Magallanes", label: "Magallanes" },
    { value: "Aysén", label: "Aysén" },
    { value: "Arica y Parinacota", label: "Arica y Parinacota" },
    { value: "Ñuble", label: "Ñuble" },
  ]

  // Filtrar datos por fecha seleccionada
  const datosPorFecha = datos.filter((d) => d.tmp_fecha === fechaSeleccionada)

  // Datos por región para el mapa
  const datosPorRegion: DatoRegion[] = datosPorFecha.reduce<DatoRegion[]>((acc, curr) => {
    if (acc.some((item) => item.region === curr.region)) {
      return acc
    }
    return [...acc, { region: curr.region, valor: curr.valor }]
  }, [])

  // Handler para cambios en filtros
  const handleFilterChange = (key: string, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }))
  }

  // Handler para cambio de fecha
  const handleFechaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFechaSeleccionada(e.target.value);
  };

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
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Cargando datos...</p>
          </div>
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : datos.length === 0 ? (
        <Alert>
          <AlertTitle>No hay datos</AlertTitle>
          <AlertDescription>No se encontraron datos con los filtros seleccionados.</AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Tendencias por Sector Económico</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <GraficoLineaShadcn
                datos={datos}
                campoX="tmp_fecha"
                campoY="valor"
                series="sector"
                formatoFecha="MMM yyyy"
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
                <div className="relative">
                  <select
                    className="w-[180px] rounded-md border border-input bg-background p-2 text-sm"
                    value={fechaSeleccionada}
                    onChange={handleFechaChange}
                  >
                    <option value="">Seleccionar fecha</option>
                    {fechasUnicas.map((fecha) => (
                      <option key={fecha} value={fecha}>
                        {fecha}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-96">
              <MapaCalorShadcn 
                datos={datos} 
                filas="sector" 
                columnas="tmp_fecha" 
                valores="valor" 
                colorEscala="viridis" 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rendimiento Regional - {fechaSeleccionada}</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <MapaChileShadcn 
                datos={datosPorRegion} 
                valorCampo="valor" 
                colorEscala="blues" 
              />
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardContainer>
  )
}

