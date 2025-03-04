"use client"

import { useState, useEffect, useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Area, AreaChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Colores para el tema rubi
const colors = {
  primary: "hsl(0, 78%, 42%)",
  secondary: "hsl(0, 65%, 55%)",
  tertiary: "hsl(0, 50%, 68%)",
  quaternary: "hsl(0, 35%, 80%)",
  background: "hsl(0, 20%, 95%)",
}

// Paleta de colores extendida para sectores
const sectorColors = [
  colors.primary,
  colors.secondary,
  colors.tertiary,
  colors.quaternary,
  "hsl(0, 85%, 35%)",
  "hsl(0, 70%, 60%)",
  "hsl(0, 55%, 65%)",
  "hsl(0, 40%, 70%)",
  "hsl(0, 25%, 75%)",
  "hsl(0, 15%, 85%)",
]

// Funciones para formateo de datos
const formatPercent = (value: number | string) => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value
  return `${numValue.toFixed(1)}%`
}
const formatNumber = (value: number | string) => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value
  return numValue.toLocaleString()
}

// Tipos de datos
interface SectorData {
  anio: number
  region_codigo: string
  region_id: number
  sec_codigo: string
  lab_indicador_codigo: string
  trimestre_movil: string
  valor_total: number
  valor_hombres: number
  valor_mujeres: number
}

interface InformalidadData {
  anio: number
  region_codigo: string
  region_id: number
  lab_indicador_codigo: string
  valor_total: number
  valor_hombres: number
  valor_mujeres: number
}

interface RegionData {
  codigo: string
  nombre: string
}

// Definir las interfaces para los props del componente
interface DistribucionSectorialDashboardProps {
  panelRegionSectorData: SectorData[]
  informalidadData: InformalidadData[]
  tasaDesocupacionData: any[]
  fuerzaTrabajoData: any[]
  tendenciasRegionalesData: any[]
  tendenciasOcupacionalesData: any[]
  distribucionSectorialData: any[]
}

export default function DistribucionSectorialDashboard({
  panelRegionSectorData = [],
  informalidadData = [],
  tasaDesocupacionData = [],
  fuerzaTrabajoData = [],
  tendenciasRegionalesData = [],
  tendenciasOcupacionalesData = [],
  distribucionSectorialData = []
}: DistribucionSectorialDashboardProps) {
  // Estado para datos
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Datos principales
  const [sectorData, setSectorData] = useState<SectorData[]>(panelRegionSectorData)
  const [informalidadLocalData, setInformalidadData] = useState<InformalidadData[]>(informalidadData)
  
  // Listas para filtros
  const [regiones, setRegiones] = useState<RegionData[]>([])
  const [sectores, setSectores] = useState<string[]>([])
  const [anios, setAnios] = useState<number[]>([])
  const [trimestres, setTrimestres] = useState<string[]>([])
  
  // Selecciones de filtros
  const [selectedRegion, setSelectedRegion] = useState<string>("NACIONAL")
  const [selectedSector, setSelectedSector] = useState<string>("TODOS")
  const [selectedAnio, setSelectedAnio] = useState<number>(2023)
  const [selectedTrimestre, setSelectedTrimestre] = useState<string>("TODOS")

  // Función para cargar datos
  useEffect(() => {
    async function cargarDatos() {
      setLoading(true)
      setError(null)
      
      try {
        // Usar datos proporcionados por los props
        setSectorData(panelRegionSectorData)
        setInformalidadData(informalidadData)
        
        // Extraer listas para filtros desde panel_region_sector
        const regionesUnicas = [...new Set(panelRegionSectorData.map(item => item.region_codigo) || [])]
        const regionesData = regionesUnicas.map(codigo => ({
          codigo,
          nombre: obtenerNombreRegion(codigo)
        }))
        
        const sectoresUnicos = [...new Set(panelRegionSectorData.map(item => item.sec_codigo) || [])]
        const aniosUnicos = [...new Set(panelRegionSectorData.map(item => item.anio) || [])]
        const trimestresUnicos = [...new Set(panelRegionSectorData.map(item => item.trimestre_movil) || [])]
        
        setRegiones(regionesData)
        setSectores(sectoresUnicos)
        setAnios(aniosUnicos.sort((a, b) => b - a)) // Ordenar años descendentemente
        setTrimestres(trimestresUnicos)
        
        // Seleccionar valores por defecto
        if (aniosUnicos.length > 0) setSelectedAnio(aniosUnicos.sort((a, b) => b - a)[0])
        if (trimestresUnicos.length > 0) setSelectedTrimestre(trimestresUnicos[0])
        
        console.log("Datos cargados correctamente")
      } catch (err: any) {
        console.error("Error al procesar datos:", err)
        setError(err.message || "Error al procesar datos")
      } finally {
        setLoading(false)
      }
    }
    
    cargarDatos()
  }, [panelRegionSectorData, informalidadData])
  
  // Función para obtener nombre de región desde su código
  const obtenerNombreRegion = (codigo: string): string => {
    const regionesMap: {[key: string]: string} = {
      "NACIONAL": "Nacional",
      "ARICA": "Arica y Parinacota",
      "TARAPACA": "Tarapacá",
      "ANTOF": "Antofagasta",
      "ATCMA": "Atacama",
      "COQ": "Coquimbo",
      "VALPO": "Valparaíso",
      "RM": "Metropolitana",
      "OHIG": "O'Higgins",
      "MAULE": "Maule",
      "NUBLE": "Ñuble",
      "BBIO": "Biobío",
      "ARAUC": "La Araucanía",
      "RIOS": "Los Ríos",
      "LAGOS": "Los Lagos",
      "AYSEN": "Aysén",
      "MAG": "Magallanes"
    }
    
    return regionesMap[codigo] || codigo
  }
  
  // Función para obtener nombre del sector desde su código
  const obtenerNombreSector = (codigo: string): string => {
    // Mapeo de códigos a nombres de sectores
    const sectoresMap: {[key: string]: string} = {
      "AGRIC": "Agricultura",
      "MINER": "Minería",
      "INDUS": "Industria Manufacturera",
      "EGA": "Electricidad, Gas y Agua",
      "CONST": "Construcción",
      "COMER": "Comercio",
      "TRANS": "Transporte",
      "HOTEL": "Hoteles y Restaurantes",
      "FINAN": "Servicios Financieros",
      "INMOB": "Actividades Inmobiliarias",
      "ADMPUB": "Administración Pública",
      "ENSENR": "Enseñanza",
      "SALUD": "Salud",
      "OTROSERV": "Otros Servicios",
      "HOGAR": "Hogares con Servicio Doméstico",
    }
    
    return sectoresMap[codigo] || codigo
  }
  
  // Filtrar datos según selecciones
  const datosFiltrados = useMemo(() => {
    return sectorData.filter(item => {
      const matchRegion = selectedRegion === "TODOS" || item.region_codigo === selectedRegion
      const matchSector = selectedSector === "TODOS" || item.sec_codigo === selectedSector
      const matchAnio = item.anio === selectedAnio
      const matchTrimestre = selectedTrimestre === "TODOS" || item.trimestre_movil === selectedTrimestre
      
      return matchRegion && matchSector && matchAnio && matchTrimestre
    })
  }, [sectorData, selectedRegion, selectedSector, selectedAnio, selectedTrimestre])
  
  // Datos procesados para gráficos
  const distribucionSectorial = useMemo(() => {
    if (selectedRegion === "TODOS" || datosFiltrados.length === 0) return []
    
    // Agrupar datos por sector
    const sectoresPorRegion = sectores.map(secCodigo => {
      const datosSector = datosFiltrados.filter(item => item.sec_codigo === secCodigo)
      
      // Si no hay datos para este sector, retornar null
      if (datosSector.length === 0) return null
      
      // Calcular valor promedio para este sector
      const valorTotal = datosSector.reduce((acc, item) => acc + item.valor_total, 0) / datosSector.length
      const valorHombres = datosSector.reduce((acc, item) => acc + item.valor_hombres, 0) / datosSector.length
      const valorMujeres = datosSector.reduce((acc, item) => acc + item.valor_mujeres, 0) / datosSector.length
      
      return {
        sector: obtenerNombreSector(secCodigo),
        codigo: secCodigo,
        valor_total: valorTotal,
        valor_hombres: valorHombres,
        valor_mujeres: valorMujeres,
        brecha_genero: valorHombres - valorMujeres
      }
    }).filter(Boolean).sort((a, b) => b!.valor_total - a!.valor_total)
    
    return sectoresPorRegion
  }, [datosFiltrados, selectedRegion, sectores])
  
  // Datos de informalidad
  const informalidadRegional = useMemo(() => {
    // Filtrar por región y año
    return informalidadLocalData.filter(item => 
      (selectedRegion === "TODOS" || item.region_codigo === selectedRegion) &&
      item.anio === selectedAnio
    )
  }, [informalidadLocalData, selectedRegion, selectedAnio])
  
  // Datos para evolución temporal
  const evolucionTemporal = useMemo(() => {
    if (selectedRegion === "TODOS" || selectedSector === "TODOS") return []
    
    // Filtrar por región y sector
    const datosPorAnio = sectorData.filter(item => 
      item.region_codigo === selectedRegion &&
      (selectedSector === "TODOS" || item.sec_codigo === selectedSector)
    )
    
    // Agrupar por año y trimestre
    const dataAgrupada = datosPorAnio.reduce((acc: any, item) => {
      const key = `${item.anio}-${item.trimestre_movil}`
      if (!acc[key]) {
        acc[key] = {
          anio: item.anio,
          trimestre: item.trimestre_movil,
          periodo: `${item.anio} ${item.trimestre_movil}`,
          valor_total: 0,
          valor_hombres: 0,
          valor_mujeres: 0,
          count: 0
        }
      }
      
      acc[key].valor_total += item.valor_total
      acc[key].valor_hombres += item.valor_hombres
      acc[key].valor_mujeres += item.valor_mujeres
      acc[key].count += 1
      
      return acc
    }, {})
    
    // Calcular promedios y ordenar por fecha
    return Object.values(dataAgrupada)
      .map((item: any) => ({
        ...item,
        valor_total: item.valor_total / item.count,
        valor_hombres: item.valor_hombres / item.count,
        valor_mujeres: item.valor_mujeres / item.count
      }))
      .sort((a: any, b: any) => {
        // Ordenar por año y trimestre
        if (a.anio !== b.anio) return a.anio - b.anio
        return a.trimestre.localeCompare(b.trimestre)
      })
  }, [sectorData, selectedRegion, selectedSector])
  
  // Datos procesados de tasa de desocupación
  const desocupacionData = useMemo(() => {
    // Filtrar por región si está seleccionada
    const datosFiltrados = tasaDesocupacionData.filter(item => 
      selectedRegion === "TODOS" || item.region_codigo === selectedRegion
    )
    
    // Agrupar por año y trimestre para obtener evolución
    const datosAgrupados = datosFiltrados.reduce((acc: any, item) => {
      const key = `${item.anio}-${item.trimestre || 'T1'}`
      if (!acc[key]) {
        acc[key] = {
          anio: item.anio,
          trimestre: item.trimestre || 'T1',
          periodo: `${item.anio} ${item.trimestre || 'T1'}`,
          valor_total: 0,
          valor_hombres: 0,
          valor_mujeres: 0,
          count: 0
        }
      }
      
      // Suponiendo que los datos tienen la misma estructura que otros indicadores
      acc[key].valor_total += item.valor_total || item.tasa || 0
      acc[key].valor_hombres += item.valor_hombres || item.tasa_hombres || 0
      acc[key].valor_mujeres += item.valor_mujeres || item.tasa_mujeres || 0
      acc[key].count += 1
      
      return acc
    }, {})
    
    // Calcular promedios y ordenar por fecha
    return Object.values(datosAgrupados)
      .map((item: any) => ({
        ...item,
        valor_total: item.valor_total / item.count,
        valor_hombres: item.valor_hombres / item.count,
        valor_mujeres: item.valor_mujeres / item.count
      }))
      .sort((a: any, b: any) => {
        // Ordenar por año y trimestre
        if (a.anio !== b.anio) return a.anio - b.anio
        return a.trimestre.localeCompare(b.trimestre)
      })
  }, [tasaDesocupacionData, selectedRegion])
  
  // Datos procesados de fuerza de trabajo
  const fuerzaTrabajoProcessedData = useMemo(() => {
    // Filtrar por región si está seleccionada
    const datosFiltrados = fuerzaTrabajoData.filter(item => 
      selectedRegion === "TODOS" || item.region_codigo === selectedRegion
    )
    
    // Agrupar por año y trimestre para obtener evolución
    const datosAgrupados = datosFiltrados.reduce((acc: any, item) => {
      const key = `${item.anio}-${item.trimestre || 'T1'}`
      if (!acc[key]) {
        acc[key] = {
          anio: item.anio,
          trimestre: item.trimestre || 'T1',
          periodo: `${item.anio} ${item.trimestre || 'T1'}`,
          valor_total: 0,
          valor_hombres: 0,
          valor_mujeres: 0,
          count: 0
        }
      }
      
      // Suponiendo que los datos tienen la misma estructura que otros indicadores
      acc[key].valor_total += item.valor_total || item.participacion || 0
      acc[key].valor_hombres += item.valor_hombres || item.participacion_hombres || 0
      acc[key].valor_mujeres += item.valor_mujeres || item.participacion_mujeres || 0
      acc[key].count += 1
      
      return acc
    }, {})
    
    // Calcular promedios y ordenar por fecha
    return Object.values(datosAgrupados)
      .map((item: any) => ({
        ...item,
        valor_total: item.valor_total / item.count,
        valor_hombres: item.valor_hombres / item.count,
        valor_mujeres: item.valor_mujeres / item.count
      }))
      .sort((a: any, b: any) => {
        // Ordenar por año y trimestre
        if (a.anio !== b.anio) return a.anio - b.anio
        return a.trimestre.localeCompare(b.trimestre)
      })
  }, [fuerzaTrabajoData, selectedRegion])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Distribución Sectorial</h2>
        <div className="flex items-center space-x-2">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Región" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todas las regiones</SelectItem>
              {regiones.map(region => (
                <SelectItem key={region.codigo} value={region.codigo}>{region.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos los sectores</SelectItem>
              {sectores.map(sector => (
                <SelectItem key={sector} value={sector}>{obtenerNombreSector(sector)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedAnio.toString()} onValueChange={(value) => setSelectedAnio(parseInt(value))}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              {anios.map(anio => (
                <SelectItem key={anio} value={anio.toString()}>{anio}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      )}
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {!loading && !error && (
        <Tabs defaultValue="distribucion" className="space-y-4">
          <TabsList>
            <TabsTrigger value="distribucion">Distribución Sectorial</TabsTrigger>
            <TabsTrigger value="genero">Brechas por Género</TabsTrigger>
            <TabsTrigger value="evolucion">Evolución Temporal</TabsTrigger>
            <TabsTrigger value="informalidad">Informalidad</TabsTrigger>
            <TabsTrigger value="mercado-laboral">Mercado Laboral</TabsTrigger>
            <TabsTrigger value="tendencias">Tendencias</TabsTrigger>
          </TabsList>
          
          <TabsContent value="distribucion" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución Sectorial {selectedRegion !== "TODOS" ? `- ${obtenerNombreRegion(selectedRegion)}` : ""}</CardTitle>
                  <CardDescription>Participación por sector económico - {selectedAnio}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={
                      Object.fromEntries(
                        distribucionSectorial.slice(0, 10).map((item, index) => [
                          `sector${index}`,
                          { color: sectorColors[index % sectorColors.length], label: item?.sector || "" }
                        ])
                      )
                    }
                  >
                    <div className="h-[350px]">
                      {distribucionSectorial.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={distribucionSectorial.slice(0, 10)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={120}
                              innerRadius={60}
                              dataKey="valor_total"
                              nameKey="sector"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                            >
                              {distribucionSectorial.slice(0, 10).map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={sectorColors[index % sectorColors.length]} 
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value: any) => [`${parseFloat(value).toFixed(1)}%`, "Participación"]}
                              labelFormatter={(label) => ""}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-muted-foreground">No hay datos disponibles para los filtros seleccionados</p>
                        </div>
                      )}
                    </div>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Sectores por Participación</CardTitle>
                  <CardDescription>{selectedRegion !== "TODOS" ? obtenerNombreRegion(selectedRegion) : "Todas las regiones"} - {selectedAnio}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={
                      Object.fromEntries(
                        distribucionSectorial.slice(0, 10).map((item, index) => [
                          `sector${index}`,
                          { color: sectorColors[index % sectorColors.length], label: item?.sector || "" }
                        ])
                      )
                    }
                  >
                    <div className="h-[350px]">
                      {distribucionSectorial.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={distribucionSectorial.slice(0, 10)}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                            <XAxis type="number" tickFormatter={(value: any) => `${parseFloat(value).toFixed(1)}%`} />
                            <YAxis 
                              type="category" 
                              dataKey="sector" 
                              tick={{ fontSize: 12 }}
                              width={140}
                            />
                            <Tooltip
                              formatter={(value: any) => [`${parseFloat(value).toFixed(1)}%`, "Participación"]}
                            />
                            <Bar 
                              dataKey="valor_total" 
                              radius={[0, 4, 4, 0]}
                            >
                              {distribucionSectorial.slice(0, 10).map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={sectorColors[index % sectorColors.length]} 
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-muted-foreground">No hay datos disponibles para los filtros seleccionados</p>
                        </div>
                      )}
                    </div>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="genero" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Brechas de Género por Sector</CardTitle>
                <CardDescription>{selectedRegion !== "TODOS" ? obtenerNombreRegion(selectedRegion) : "Todas las regiones"} - {selectedAnio}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {distribucionSectorial.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={distribucionSectorial.slice(0, 10)}
                        margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tickFormatter={(value: any) => `${parseFloat(value).toFixed(1)}%`} />
                        <YAxis dataKey="sector" type="category" width={140} />
                        <Tooltip
                          formatter={(value: any) => [`${parseFloat(value).toFixed(1)}%`, ""]}
                        />
                        <Legend />
                        <Bar dataKey="valor_hombres" name="Hombres" fill={colors.tertiary} />
                        <Bar dataKey="valor_mujeres" name="Mujeres" fill={colors.primary} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">No hay datos disponibles para los filtros seleccionados</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Magnitud de la Brecha</CardTitle>
                <CardDescription>Diferencia entre participación de hombres y mujeres por sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {distribucionSectorial.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={distribucionSectorial
                          .slice(0, 10)
                          .sort((a, b) => Math.abs(b!.brecha_genero) - Math.abs(a!.brecha_genero))}
                        margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tickFormatter={(value: any) => `${parseFloat(value).toFixed(1)}%`} />
                        <YAxis dataKey="sector" type="category" width={140} />
                        <Tooltip
                          formatter={(value: any) => [`${parseFloat(value).toFixed(1)}%`, ""]}
                        />
                        <Bar 
                          dataKey="brecha_genero" 
                          name="Brecha H-M"
                          fill={colors.primary}
                          radius={[0, 4, 4, 0]}
                        >
                          {distribucionSectorial.slice(0, 10).map((entry) => (
                            <Cell 
                              key={`cell-${entry?.codigo}`}
                              fill={entry!.brecha_genero > 0 ? colors.tertiary : colors.primary}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">No hay datos disponibles para los filtros seleccionados</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="evolucion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolución Temporal</CardTitle>
                <CardDescription>
                  {selectedRegion !== "TODOS" ? obtenerNombreRegion(selectedRegion) : "Todas las regiones"}
                  {selectedSector !== "TODOS" ? ` - ${obtenerNombreSector(selectedSector)}` : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {evolucionTemporal.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={evolucionTemporal}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="periodo" />
                        <YAxis tickFormatter={(value: any) => `${parseFloat(value).toFixed(0)}%`} />
                        <Tooltip
                          formatter={(value: any) => [`${parseFloat(value).toFixed(1)}%`, ""]}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="valor_total" 
                          stroke={colors.primary} 
                          name="Total"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="valor_hombres" 
                          stroke={colors.tertiary} 
                          name="Hombres"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="valor_mujeres" 
                          stroke={colors.secondary} 
                          name="Mujeres"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">Seleccione una región y un sector específicos para ver la evolución temporal</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tendencia Acumulada</CardTitle>
                <CardDescription>Evolución del indicador a lo largo del tiempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {evolucionTemporal.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={evolucionTemporal}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="periodo" />
                        <YAxis tickFormatter={(value: any) => `${parseFloat(value).toFixed(0)}%`} />
                        <Tooltip
                          formatter={(value: any) => [`${parseFloat(value).toFixed(1)}%`, ""]}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="valor_total" 
                          stackId="1"
                          stroke={colors.primary}
                          fill={colors.primary}
                          fillOpacity={0.5}
                          name="Total"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">Seleccione una región y un sector específicos para ver la tendencia acumulada</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="informalidad" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tasa de Informalidad</CardTitle>
                <CardDescription>
                  {selectedRegion !== "TODOS" ? obtenerNombreRegion(selectedRegion) : "Todas las regiones"} - {selectedAnio}
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px] flex flex-col">
                {informalidadRegional.length > 0 ? (
                  <div className="flex-grow">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        data={informalidadRegional}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="region_codigo" tickFormatter={(value) => obtenerNombreRegion(value)} />
                        <YAxis tickFormatter={(value: any) => `${parseFloat(value).toFixed(0)}%`} />
                        <Tooltip
                          formatter={(value: any) => [`${parseFloat(value).toFixed(1)}%`, ""]}
                        />
                        <Legend />
                        <Bar dataKey="valor_total" name="Total" fill={colors.primary} />
                        <Bar dataKey="valor_hombres" name="Hombres" fill={colors.tertiary} />
                        <Bar dataKey="valor_mujeres" name="Mujeres" fill={colors.secondary} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[400px]">
                    <p className="text-muted-foreground">No hay datos de informalidad disponibles para los filtros seleccionados</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Nueva pestaña: Mercado Laboral */}
          <TabsContent value="mercado-laboral" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tasa de Desocupación</CardTitle>
                  <CardDescription>
                    Evolución por trimestre 
                    {selectedRegion !== "TODOS" ? ` - ${obtenerNombreRegion(selectedRegion)}` : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-[400px] flex flex-col">
                  {desocupacionData.length > 0 ? (
                    <div className="flex-grow">
                      <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                          data={desocupacionData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="periodo" />
                          <YAxis tickFormatter={(value: any) => `${parseFloat(value).toFixed(1)}%`} />
                          <Tooltip 
                            formatter={(value: any) => [`${parseFloat(value).toFixed(1)}%`, ""]}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="valor_total" 
                            name="Total" 
                            stroke={colors.primary}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="valor_hombres" 
                            name="Hombres" 
                            stroke={colors.tertiary}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="valor_mujeres" 
                            name="Mujeres" 
                            stroke={colors.secondary}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[400px]">
                      <p className="text-muted-foreground">No hay datos de tasa de desocupación disponibles</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Participación en Fuerza de Trabajo</CardTitle>
                  <CardDescription>
                    Evolución por trimestre
                    {selectedRegion !== "TODOS" ? ` - ${obtenerNombreRegion(selectedRegion)}` : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-[400px] flex flex-col">
                  {fuerzaTrabajoProcessedData.length > 0 ? (
                    <div className="flex-grow">
                      <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                          data={fuerzaTrabajoProcessedData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="periodo" />
                          <YAxis tickFormatter={(value: any) => `${parseFloat(value).toFixed(1)}%`} />
                          <Tooltip 
                            formatter={(value: any) => [`${parseFloat(value).toFixed(1)}%`, ""]}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="valor_total" 
                            name="Total" 
                            stroke={colors.primary}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="valor_hombres" 
                            name="Hombres" 
                            stroke={colors.tertiary}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="valor_mujeres" 
                            name="Mujeres" 
                            stroke={colors.secondary}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[400px]">
                      <p className="text-muted-foreground">No hay datos de participación en fuerza de trabajo disponibles</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Nueva pestaña: Tendencias */}
          <TabsContent value="tendencias" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tendencias Ocupacionales</CardTitle>
                  <CardDescription>
                    Evolución de ocupaciones por trimestre
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-[400px] flex flex-col">
                  {tendenciasOcupacionalesData.length > 0 ? (
                    <div className="flex-grow">
                      <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                          data={tendenciasOcupacionalesData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="fecha" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="valor" 
                            name="Índice" 
                            stroke={colors.primary}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[400px]">
                      <p className="text-muted-foreground">No hay datos de tendencias ocupacionales disponibles</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tendencias Regionales</CardTitle>
                  <CardDescription>
                    Evolución de indicadores por región
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-[400px] flex flex-col">
                  {tendenciasRegionalesData.length > 0 ? (
                    <div className="flex-grow">
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                          data={tendenciasRegionalesData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="region" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="valor" name="Índice" fill={colors.primary} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[400px]">
                      <p className="text-muted-foreground">No hay datos de tendencias regionales disponibles</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Proyecciones Futuras</CardTitle>
                <CardDescription>
                  Tendencias y proyecciones basadas en datos históricos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tendencias Principales por Sector</h3>
                    <p className="mb-3 text-muted-foreground">
                      A partir de los datos históricos, se pueden identificar las siguientes tendencias sectoriales:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium text-primary mb-2">Sector Servicios</h4>
                        <p className="text-sm">Crecimiento sostenido con proyección de aumento del 8-12% para 2025</p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium text-primary mb-2">Sector Tecnológico</h4>
                        <p className="text-sm">Expansión acelerada con estimación de 15-20% para 2025</p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium text-primary mb-2">Sector Manufacturero</h4>
                        <p className="text-sm">Estabilización con variación de ±2% para 2025</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Perspectivas Regionales</h3>
                    <p className="mb-3 text-muted-foreground">
                      Las diferentes regiones muestran patrones distintivos de evolución laboral:
                    </p>
                    
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Regiones Metropolitanas:</strong> Mayor concentración de empleo en servicios y tecnología
                      </li>
                      <li>
                        <strong>Regiones Norte:</strong> Estabilidad en sectores minero e industrial con crecimiento moderado
                      </li>
                      <li>
                        <strong>Regiones Sur:</strong> Crecimiento en sectores agrícola y turístico con potencial de expansión
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Análisis de Demanda Laboral</h3>
                    <p className="mb-2">
                      Basado en las tendencias actuales, se proyectan los siguientes cambios en la demanda laboral para 2025:
                    </p>
                    
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-3">
                      <div className="flex justify-between">
                        <span>Profesionales TI</span>
                        <span className="font-medium text-green-600">+18%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Salud</span>
                        <span className="font-medium text-green-600">+12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Educación</span>
                        <span className="font-medium text-green-600">+7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Manufactura</span>
                        <span className="font-medium text-red-600">-3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Comercio</span>
                        <span className="font-medium text-green-600">+5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Construcción</span>
                        <span className="font-medium text-amber-600">+2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
} 