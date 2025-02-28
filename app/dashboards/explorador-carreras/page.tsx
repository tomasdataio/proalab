// app/dashboards/explorador-carreras/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardContainer } from "@/components/ui/dashboard-container"

// Importaciones de componentes de visualización
import { TablaResumen } from "@/components/visualizaciones/tabla-resumen"

export default function ExploradorCarreras() {
  const [datos, setDatos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const tiposInstituciones = [
    { value: "", label: "Todos" },
    { value: "Universidad", label: "Universidad" },
    { value: "Instituto Profesional", label: "Instituto Profesional" },
    { value: "Centro de Formación Técnica", label: "Centro de Formación Técnica" },
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

  // Calcular indicadores de género
  const totalMatricula = datos.reduce((sum, d) => sum + d.mat_total, 0)
  const totalMujeres = datos.reduce((sum, d) => sum + d.mat_mujeres, 0)
  const totalHombres = datos.reduce((sum, d) => sum + d.mat_hombres, 0)
  const porcentajeMujeres = totalMatricula > 0 ? ((totalMujeres / totalMatricula) * 100).toFixed(1) : "N/A"
  const porcentajeHombres = totalMatricula > 0 ? ((totalHombres / totalMatricula) * 100).toFixed(1) : "N/A"
  const edadPromedio =
    datos.length > 0 ? (datos.reduce((sum, d) => sum + d.edad_prom, 0) / datos.length).toFixed(1) : "N/A"

  return (
    <DashboardContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Explorador de Carreras</h1>
        <p className="text-muted-foreground">
          Busca y explora programas educativos específicos por institución, área y región.
        </p>
      </div>

      {/* Buscador principal */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Buscar carrera (ej. Ingeniería, Medicina, Derecho...)"
                className="w-full px-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Buscar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Filtros adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
              {regiones.map((region) => (
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
              setFiltros({ carrera: "", area: "", institucion: "", tipo_inst: "", region: "" })
              setSearchTerm("")
            }}
            className="w-full"
          >
            Limpiar filtros
          </Button>
        </div>
      </div>

      {/* Resumen de resultados */}
      {!isLoading && !error && datos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total de programas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{datos.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Matrícula total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalMatricula.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Distribución de género</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-4 bg-blue-500" style={{ width: `${porcentajeHombres}%` }}></div>
                <div className="h-4 bg-pink-500" style={{ width: `${porcentajeMujeres}%` }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs">Hombres: {porcentajeHombres}%</span>
                <span className="text-xs">Mujeres: {porcentajeMujeres}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Edad promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{edadPromedio} años</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Resultados */}
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <p>Cargando datos...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 p-4 rounded-md text-red-800">{error}</div>
      ) : datos.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No se encontraron programas</h3>
          <p className="text-muted-foreground">
            Intenta modificar los criterios de búsqueda para encontrar resultados.
          </p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Resultados de la búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <TablaResumen
              datos={datos}
              columnas={[
                { field: "carrera", header: "Carrera" },
                { field: "area", header: "Área" },
                { field: "institucion", header: "Institución" },
                { field: "tipo_inst", header: "Tipo" },
                { field: "region", header: "Región" },
                { field: "mat_total", header: "Matrícula" },
              ]}
              ordenablePor={["carrera", "area", "institucion", "mat_total"]}
            />
          </CardContent>
        </Card>
      )}
    </DashboardContainer>
  )
}

