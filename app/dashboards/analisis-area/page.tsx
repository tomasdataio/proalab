// app/dashboards/analisis-area/page.tsx
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

export default function AnalisisPorArea() {
  const [datos, setDatos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

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
          <p>Cargando datos...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 p-4 rounded-md text-red-800">{error}</div>
      ) : datos.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <p>No se encontraron datos con los filtros seleccionados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Matrícula por Área de Conocimiento</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <GraficoBarra datos={datos} campoX="area_conocimiento" campoY="matricula_total" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución de Carreras por Área</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <GraficoBarra datos={datos} campoX="area_conocimiento" campoY="num_carreras" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Relación entre Instituciones y Carreras</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <GraficoDispersion
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
              <GraficoDispersion
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
              <TablaResumen
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

