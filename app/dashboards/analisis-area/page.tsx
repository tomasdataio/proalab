// app/dashboards/analisis-area/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardContainer } from "@/components/ui/dashboard-container"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertTriangle } from "lucide-react"

// Importaciones de componentes de visualización shadcn
import { GraficoBarraShadcn } from "@/components/visualizaciones/grafico-barra-shadcn"
import { GraficoDispersionShadcn } from "@/components/visualizaciones/grafico-dispersion-shadcn"
import { TablaResumenShadcn } from "@/components/visualizaciones/tabla-resumen-shadcn"

// Definir interfaces para los datos
interface DatoArea {
  area_conocimiento: string
  num_carreras: number
  num_instituciones: number
  matricula_total: number
  promedio_primer_ano: number
  [key: string]: any
}

export default function AnalisisPorArea() {
  const [datos, setDatos] = useState<DatoArea[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filtros, setFiltros] = useState({
    area: "",
  })

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      setError(null)

      try {
        // Construir URL con parámetros de filtro
        const params = new URLSearchParams()
        if (filtros.area) params.append("area", filtros.area)

        const response = await fetch(`/api/dashboard/analisis-area?${params}`)

        if (!response.ok) {
          throw new Error("Error al cargar datos")
        }

        const result = await response.json()
        
        // Verificar y tipar los datos recibidos
        if (Array.isArray(result.data)) {
          setDatos(result.data as DatoArea[])
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

  // Lista de áreas de conocimiento
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

  // Handler para cambios en filtros
  const handleFilterChange = (key: string, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <DashboardContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Análisis por Área de Conocimiento</h1>
        <p className="text-muted-foreground">
          Análisis comparativo de áreas de conocimiento por instituciones, matrícula y programas académicos.
        </p>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

        <div className="flex items-end">
          <Button variant="outline" onClick={() => setFiltros({ area: "" })} className="ml-auto">
            Limpiar filtros
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Matrícula por Área de Conocimiento</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <GraficoBarraShadcn datos={datos} campoX="area_conocimiento" campoY="matricula_total" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución de Carreras por Área</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <GraficoBarraShadcn datos={datos} campoX="area_conocimiento" campoY="num_carreras" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Relación entre Instituciones y Carreras</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <GraficoDispersionShadcn
                datos={datos}
                campoX="num_instituciones"
                campoY="num_carreras"
                tamano="matricula_total"
                etiqueta="area_conocimiento"
                formatoX={(d) => d.toString()}
                formatoY={(d) => d.toString()}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Matrícula de Primer Año vs Total</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <GraficoDispersionShadcn
                datos={datos}
                campoX="promedio_primer_ano"
                campoY="matricula_total"
                tamano="num_carreras"
                etiqueta="area_conocimiento"
                formatoX={(d) => d.toString()}
                formatoY={(d) => d.toString()}
              />
            </CardContent>
          </Card>

          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Tabla de Áreas de Conocimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <TablaResumenShadcn
                datos={datos}
                columnas={[
                  { field: "area_conocimiento", header: "Área de Conocimiento" },
                  { field: "num_carreras", header: "Carreras" },
                  { field: "num_instituciones", header: "Instituciones" },
                  { field: "matricula_total", header: "Matrícula Total" },
                  { field: "promedio_primer_ano", header: "Prom. Primer Año" },
                ]}
                ordenablePor={["num_carreras", "num_instituciones", "matricula_total", "promedio_primer_ano"]}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardContainer>
  )
}

