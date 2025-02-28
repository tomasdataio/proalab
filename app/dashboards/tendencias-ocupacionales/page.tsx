// app/dashboards/tendencias-ocupacionales/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardContainer } from "@/components/ui/dashboard-container"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertTriangle } from "lucide-react"

// Importaciones de componentes de visualización
import { GraficoLineaShadcn } from "@/components/visualizaciones/grafico-linea-shadcn"
import { MapaCalorShadcn } from "@/components/visualizaciones/mapa-calor-shadcn"
import { TablaResumenShadcn } from "@/components/visualizaciones/tabla-resumen-shadcn"

// Definir interfaces para los datos
interface DatoOcupacional {
  fecha: string
  ocupacion: string
  region: string
  nuevos_avisos: number
  salario_promedio: number
  experiencia_requerida: number
  oportunidades_remotas: number
  [key: string]: any
}

// Interfaces para los datos procesados
interface DatoLinea {
  fecha: string
  valor: number
}

interface DatoRegional {
  region: string
  valor: number
  salario: number
}

export default function TendenciasOcupacionales() {
  const [datos, setDatos] = useState<DatoOcupacional[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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
        
        // Verificar y tipar los datos recibidos
        if (Array.isArray(result.data)) {
          setDatos(result.data as DatoOcupacional[])
        } else {
          setDatos([])
          console.error("Los datos recibidos no son un array:", result.data)
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

  // Listas para los filtros
  const [listaOcupaciones, setListaOcupaciones] = useState<{ value: string; label: string }[]>([
    { value: "", label: "Todas" }
  ])
  const [listaRegiones, setListaRegiones] = useState<{ value: string; label: string }[]>([
    { value: "", label: "Todas" }
  ])

  // Cargar datos para los filtros
  useEffect(() => {
    async function fetchFilterData() {
      try {
        const [ocupacionesResponse, regionesResponse] = await Promise.all([
          fetch("/api/filtros/ocupaciones"),
          fetch("/api/filtros/regiones")
        ])

        if (ocupacionesResponse.ok && regionesResponse.ok) {
          const ocupacionesData = await ocupacionesResponse.json()
          const regionesData = await regionesResponse.json()

          setListaOcupaciones([
            { value: "", label: "Todas" },
            ...ocupacionesData.map((ocup: string) => ({ value: ocup, label: ocup }))
          ])

          setListaRegiones([
            { value: "", label: "Todas" },
            ...regionesData.map((region: string) => ({ value: region, label: region }))
          ])
        }
      } catch (err) {
        console.error("Error al cargar datos para filtros:", err)
      }
    }

    fetchFilterData()
  }, [])

  // Preparar datos para gráficos de tendencia
  const datosAvisos = datos.reduce<Record<string, DatoLinea>>((result, item) => {
    const fecha = new Date(item.fecha).toLocaleDateString("es-CL")
    
    if (!result[fecha]) {
      result[fecha] = {
        fecha,
        valor: 0
      }
    }
    
    result[fecha].valor += item.nuevos_avisos
    
    return result
  }, {})

  const datosSalarios = datos.reduce<Record<string, {fecha: string, valor: number, count: number}>>((result, item) => {
    const fecha = new Date(item.fecha).toLocaleDateString("es-CL")
    
    if (!result[fecha]) {
      result[fecha] = {
        fecha,
        valor: 0,
        count: 0
      }
    }
    
    result[fecha].valor += item.salario_promedio
    result[fecha].count += 1
    
    return result
  }, {})

  const datosAvisosLinea = Object.values(datosAvisos)
  
  const datosSalariosLinea = Object.values(datosSalarios).map(item => ({
    fecha: item.fecha,
    valor: Math.round(item.valor / item.count)
  }))

  // Preparar datos para mapa de calor regional
  const datosRegionales = datos.reduce<Record<string, DatoRegional>>((result, item) => {
    if (!item.region) return result
    
    if (!result[item.region]) {
      result[item.region] = {
        region: item.region,
        valor: 0,
        salario: 0
      }
    }
    
    result[item.region].valor += item.nuevos_avisos
    result[item.region].salario += item.salario_promedio
    
    return result
  }, {})

  // Handler para cambios en filtros
  const handleFilterChange = (key: string, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <DashboardContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Tendencias Ocupacionales</h1>
        <p className="text-muted-foreground">
          Análisis de tendencias del mercado laboral por ocupación y región a lo largo del tiempo.
        </p>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
          <input
            type="date"
            value={filtros.fechaInicio}
            onChange={(e) => handleFilterChange("fechaInicio", e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fecha Fin</label>
          <input
            type="date"
            value={filtros.fechaFin}
            onChange={(e) => handleFilterChange("fechaFin", e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ocupación</label>
          <Select value={filtros.ocupacion} onValueChange={(value) => handleFilterChange("ocupacion", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar ocupación" />
            </SelectTrigger>
            <SelectContent>
              {listaOcupaciones.map((ocup) => (
                <SelectItem key={ocup.value} value={ocup.value}>
                  {ocup.label}
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
              {listaRegiones.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end md:col-span-4">
          <Button
            variant="outline"
            onClick={() => {
              setFiltros({
                fechaInicio: "2020-01-01",
                fechaFin: new Date().toISOString().split("T")[0],
                ocupacion: "",
                region: "",
              })
            }}
            className="ml-auto"
          >
            Restablecer filtros
          </Button>
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
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendencia de Nuevos Avisos</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <GraficoLineaShadcn 
                  datos={datosAvisosLinea}
                  campoX="fecha"
                  campoY="valor"
                  titulo="Avisos de empleos"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendencia de Salarios</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <GraficoLineaShadcn 
                  datos={datosSalariosLinea}
                  campoX="fecha"
                  campoY="valor"
                  titulo="Salarios promedio"
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Distribución Regional de Avisos</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <MapaCalorShadcn 
                datos={datos}
                filas="region"
                columnas="ocupacion" 
                valores="nuevos_avisos"
                colorEscala="blues"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalle de Datos</CardTitle>
            </CardHeader>
            <CardContent>
              <TablaResumenShadcn
                datos={datos}
                columnas={[
                  { field: "fecha", header: "Fecha" },
                  { field: "ocupacion", header: "Ocupación" },
                  { field: "region", header: "Región" },
                  { field: "nuevos_avisos", header: "Nuevos Avisos" },
                  { field: "salario_promedio", header: "Salario Promedio" },
                  { field: "experiencia_requerida", header: "Exp. Requerida (años)" },
                  { field: "oportunidades_remotas", header: "Oportunidades Remotas" },
                ]}
                ordenablePor={["fecha", "nuevos_avisos", "salario_promedio", "experiencia_requerida", "oportunidades_remotas"]}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardContainer>
  )
}

