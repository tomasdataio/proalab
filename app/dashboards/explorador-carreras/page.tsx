// app/dashboards/explorador-carreras/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardContainer } from "@/components/ui/dashboard-container"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertTriangle } from "lucide-react"

// Importaciones de componentes de visualización
import { TablaResumenShadcn } from "@/components/visualizaciones/tabla-resumen-shadcn"

// Definir interfaces para los datos
interface DatoCarrera {
  nombre_carrera: string
  nombre_institucion: string
  tipo_institucion: string
  area_conocimiento: string
  region: string
  acreditacion: number
  matricula_total: number
  arancel: number
  duracion: number
  [key: string]: any
}

export default function ExploradorCarreras() {
  const [datos, setDatos] = useState<DatoCarrera[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filtros, setFiltros] = useState({
    carrera: "",
    area: "",
    institucion: "",
    tipo_inst: "",
    region: "",
  })

  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("")

  // Función para actualizar filtro de carrera al buscar
  const handleSearch = () => {
    handleFilterChange("carrera", searchTerm)
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      setError(null)

      try {
        // Construir URL con parámetros de filtro
        const params = new URLSearchParams()
        if (filtros.carrera) params.append("carrera", filtros.carrera)
        if (filtros.area) params.append("area", filtros.area)
        if (filtros.institucion) params.append("institucion", filtros.institucion)
        if (filtros.tipo_inst) params.append("tipo_inst", filtros.tipo_inst)
        if (filtros.region) params.append("region", filtros.region)

        const response = await fetch(`/api/dashboard/explorador-carreras?${params}`)

        if (!response.ok) {
          throw new Error("Error al cargar datos")
        }

        const result = await response.json()
        
        // Verificar y tipar los datos recibidos
        if (Array.isArray(result.data)) {
          setDatos(result.data as DatoCarrera[])
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
  const [listaAreas, setListaAreas] = useState<{ value: string; label: string }[]>([
    { value: "", label: "Todas" }
  ])
  const [listaInstituciones, setListaInstituciones] = useState<{ value: string; label: string }[]>([
    { value: "", label: "Todas" }
  ])
  const [listaRegiones, setListaRegiones] = useState<{ value: string; label: string }[]>([
    { value: "", label: "Todas" }
  ])

  // Cargar datos para los filtros
  useEffect(() => {
    async function fetchFilterData() {
      try {
        const [areasResponse, institucionesResponse, regionesResponse] = await Promise.all([
          fetch("/api/filtros/areas"),
          fetch("/api/filtros/instituciones"),
          fetch("/api/filtros/regiones")
        ])

        if (areasResponse.ok && institucionesResponse.ok && regionesResponse.ok) {
          const areasData = await areasResponse.json()
          const institucionesData = await institucionesResponse.json()
          const regionesData = await regionesResponse.json()

          setListaAreas([
            { value: "", label: "Todas" },
            ...areasData.map((area: string) => ({ value: area, label: area }))
          ])

          setListaInstituciones([
            { value: "", label: "Todas" },
            ...institucionesData.map((inst: string) => ({ value: inst, label: inst }))
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

  // Lista de tipos de institución
  const tiposInstituciones = [
    { value: "", label: "Todos" },
    { value: "Universidad", label: "Universidad" },
    { value: "Instituto Profesional", label: "Instituto Profesional" },
    { value: "Centro de Formación Técnica", label: "Centro de Formación Técnica" }
  ]

  // Handler para cambios en filtros
  const handleFilterChange = (key: string, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }))
  }

  // Handler para input de búsqueda con tecla Enter
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <DashboardContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Explorador de Carreras</h1>
        <p className="text-muted-foreground">
          Busca y compara carreras por institución, área de conocimiento y región.
        </p>
      </div>

      {/* Buscador de carreras */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Buscar por nombre de carrera"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
            <Button onClick={handleSearch}>Buscar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Área de Conocimiento</label>
          <Select value={filtros.area} onValueChange={(value) => handleFilterChange("area", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar área" />
            </SelectTrigger>
            <SelectContent>
              {listaAreas.map((area) => (
                <SelectItem key={area.value} value={area.value}>
                  {area.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Institución</label>
          <Select value={filtros.institucion} onValueChange={(value) => handleFilterChange("institucion", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar institución" />
            </SelectTrigger>
            <SelectContent>
              {listaInstituciones.map((inst) => (
                <SelectItem key={inst.value} value={inst.value}>
                  {inst.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tipo de Institución</label>
          <Select value={filtros.tipo_inst} onValueChange={(value) => handleFilterChange("tipo_inst", value)}>
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

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={() => {
              setFiltros({
                carrera: "",
                area: "",
                institucion: "",
                tipo_inst: "",
                region: "",
              })
              setSearchTerm("")
            }}
            className="ml-auto"
          >
            Limpiar filtros
          </Button>
        </div>
      </div>

      {/* Resultados */}
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
          <AlertDescription>No se encontraron carreras con los filtros seleccionados.</AlertDescription>
        </Alert>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Resultados ({datos.length} carreras encontradas)</CardTitle>
          </CardHeader>
          <CardContent>
            <TablaResumenShadcn
              datos={datos}
              columnas={[
                { field: "nombre_carrera", header: "Carrera" },
                { field: "nombre_institucion", header: "Institución" },
                { field: "tipo_institucion", header: "Tipo" },
                { field: "area_conocimiento", header: "Área" },
                { field: "region", header: "Región" },
                { field: "acreditacion", header: "Acreditación (años)" },
                { field: "matricula_total", header: "Matrícula" },
                { field: "arancel", header: "Arancel Anual" },
                { field: "duracion", header: "Duración (semestres)" },
              ]}
              ordenablePor={["acreditacion", "matricula_total", "arancel", "duracion"]}
            />
          </CardContent>
        </Card>
      )}
    </DashboardContainer>
  )
}

