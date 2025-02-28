"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardContainer } from "@/components/ui/dashboard-container"

// Importaciones de componentes de visualización con shadcn/ui
import { MapaChileShadcn } from "@/components/visualizaciones/mapa-chile-shadcn"
import { GraficoBarraShadcn } from "@/components/visualizaciones/grafico-barra-shadcn"
import { TablaResumenShadcn } from "@/components/visualizaciones/tabla-resumen-shadcn"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Loader2 } from "lucide-react"

export default function DistribucionInstitucionalShadcn() {
  const [datos, setDatos] = useState<Record<string, any>[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full lg:col-span-2">
            <MapaChileShadcn 
              datos={datos} 
              valorCampo="num_instituciones" 
              colorEscala="blue" 
              titulo="Distribución Geográfica de Instituciones"
            />
          </div>

          <div className="col-span-1">
            <GraficoBarraShadcn 
              datos={datos} 
              campoX="tipo" 
              campoY="num_instituciones" 
              agruparPor="region" 
              apilado={true}
              titulo="Tipos de Institución por Región"
            />
          </div>

          <div className="col-span-1 lg:col-span-2">
            <GraficoBarraShadcn
              datos={datos}
              campoX="acreditacion"
              campoY="num_instituciones"
              agruparPor="tipo"
              apilado={false}
              titulo="Acreditación por Tipo de Institución"
            />
          </div>

          <div className="col-span-full">
            <TablaResumenShadcn
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
              titulo="Resumen de Instituciones"
            />
          </div>
        </div>
      )}
    </DashboardContainer>
  )
} 