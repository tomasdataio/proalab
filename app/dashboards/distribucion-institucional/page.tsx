// app/dashboards/distribucion-institucional/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardContainer } from "@/components/ui/dashboard-container"

// Importaciones de componentes de visualización
import { MapaChile } from "@/components/visualizaciones/mapa-chile"
import { GraficoBarra } from "@/components/visualizaciones/grafico-barra"
import { TablaResumen } from "@/components/visualizaciones/tabla-resumen"

export default function DistribucionInstitucional() {
  const [datos, setDatos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [filtros, setFiltros] = useState({
    tipo: "",
    acreditacion: "",
    region: "",
  })

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      setError(null)

      try {
        // Construir URL con parámetros de filtro
        const params = new URLSearchParams()
        if (filtros.tipo) params.append("tipo", filtros.tipo)
        if (filtros.acreditacion) params.append("acreditacion", filtros.acreditacion)
        if (filtros.region) params.append("region", filtros.region)

        const response = await fetch(`/api/dashboard/distribucion-institucional?${params}`)

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
  const tiposInstituciones = [
    { value: "", label: "Todas" },
    { value: "Universidades", label: "Universidades" },
    { value: "Centros de Formación Técnica", label: "Centros de Formación Técnica" },
    { value: "Institutos Profesionales", label: "Institutos Profesionales" },
  ]

  const nivelesAcreditacion = [
    { value: "", label: "Todos" },
    { value: "3 años", label: "3 años" },
    { value: "4 años", label: "4 años" },
    { value: "5 años", label: "5 años" },
    { value: "6 años", label: "6 años" },
    { value: "7 años", label: "7 años" },
    { value: "NO ACREDITADA", label: "No Acreditada" },
  ]

  const regiones = [
    { value: "", label: "Todas" },
    { value: "Metropolitana", label: "Metropolitana" },
    { value: "Valparaíso", label: "Valparaíso" },
    { value: "Biobío", label: "Biobío" },
    // Añadir el resto de regiones...
  ]

  // Handler para cambios en filtros
  const handleFilterChange = (key: string, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <DashboardContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Distribución Institucional</h1>
        <p className="text-muted-foreground">
          Análisis de la distribución de instituciones educativas por tipo, acreditación y región geográfica.
        </p>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Tipo de Institución</label>
          <Select value={filtros.tipo} onValueChange={(value) => handleFilterChange("tipo", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              {tiposInstituciones.map((tipo) => (
                <SelectItem key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Acreditación</label>
          <Select value={filtros.acreditacion} onValueChange={(value) => handleFilterChange("acreditacion", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar acreditación" />
            </SelectTrigger>
            <SelectContent>
              {nivelesAcreditacion.map((nivel) => (
                <SelectItem key={nivel.value} value={nivel.value}>
                  {nivel.label}
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
          <Card className="col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle>Distribución Geográfica de Instituciones</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <MapaChile datos={datos} valorCampo="num_instituciones" colorEscala="blues" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tipos de Institución por Región</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <GraficoBarra datos={datos} campoX="tipo" campoY="num_instituciones" agruparPor="region" apilado={true} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acreditación por Tipo de Institución</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <GraficoBarra
                datos={datos}
                campoX="acreditacion"
                campoY="num_instituciones"
                agruparPor="tipo"
                apilado={false}
              />
            </CardContent>
          </Card>

          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Resumen de Instituciones</CardTitle>
            </CardHeader>
            <CardContent>
              <TablaResumen
                datos={datos}
                columnas={[
                  { field: "tipo", header: "Tipo" },
                  { field: "acreditacion", header: "Acreditación" },
                  { field: "region", header: "Región" },
                  { field: "num_instituciones", header: "Instituciones" },
                  { field: "num_carreras", header: "Carreras" },
                  { field: "matricula_total", header: "Matrícula Total" },
                ]}
                ordenablePor={["num_instituciones", "num_carreras", "matricula_total"]}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardContainer>
  )
}

