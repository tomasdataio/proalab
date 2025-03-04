"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart } from "@/components/charts/AreaChart"
import { BarChart } from "@/components/charts/BarChart"
import { LineChart } from "@/components/charts/LineChart"
import { PieChart } from "@/components/charts/PieChart"
import Link from "next/link"
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react"

// Definir colores para los gráficos
const colors = ["#FF7B7B", "#FF9B9B", "#FFA07A", "#FFB347", "#FFD700"]

// Funciones de formato
const formatPercent = (value: number) => `${value.toFixed(1)}%`
const formatNumber = (value: number) => value.toLocaleString()

interface MainDashboardProps {
  informalidadData: any[]
  matriculaData: any[]
  sectorData: any[]
  demandaData: any[]
}

export default function MainDashboard({ 
  informalidadData = [], 
  matriculaData = [], 
  sectorData = [], 
  demandaData = [] 
}: MainDashboardProps) {
  const [selectedTab, setSelectedTab] = useState("resumen")

  // Procesar datos de informalidad para gráficos
  const informalidadChartData = informalidadData.map(item => ({
    anio: item.anio.toString(),
    total: item.valor_total,
    hombres: item.valor_hombres,
    mujeres: item.valor_mujeres
  })).reverse()

  // Procesar datos de matrícula para gráficos
  const matriculaChartData = matriculaData.map(item => ({
    anio: item.anio.toString(),
    total: item.mat_total
  })).reverse()

  // Procesar datos de sectores para gráficos
  const sectoresData = sectorData.length > 0 && sectorData[0].sectores_principales 
    ? sectorData[0].sectores_principales.map((sector: string, index: number) => ({
        sector,
        valor: 100 - index * 10 // Valor simulado decreciente
      })).slice(0, 5)
    : []

  // Procesar datos de demanda para gráficos
  const demandaChartData = demandaData.map(item => ({
    carrera: item.carr_generica || "Sin nombre",
    indice: item.indice_fortaleza_demanda || 0,
    empleabilidad: item.empleabilidad_primer_ano || 0
  })).slice(0, 5)

  // Calcular indicadores generales
  const ultimaInformalidad = informalidadData.length > 0 ? informalidadData[0].valor_total : 0
  const ultimaMatricula = matriculaData.length > 0 ? matriculaData[0].mat_total : 0
  const carrerasConAlta = demandaData.filter(item => item.clasificacion_fortaleza === "Alta").length
  
  // Calcular tendencias
  const informalidadAnterior = informalidadData.length > 1 ? informalidadData[1].valor_total : ultimaInformalidad
  const tendenciaInformalidad = ultimaInformalidad - informalidadAnterior
  
  const matriculaAnterior = matriculaData.length > 1 ? matriculaData[1].mat_total : ultimaMatricula
  const tendenciaMatricula = ultimaMatricula - matriculaAnterior

  return (
    <div className="space-y-4">
      <Tabs defaultValue="resumen" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="brechas">Brechas Salariales</TabsTrigger>
          <TabsTrigger value="sectorial">Distribución Sectorial</TabsTrigger>
          <TabsTrigger value="demanda">Fortaleza de Demanda</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resumen" className="space-y-4">
          {/* Indicadores generales */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasa de Informalidad</CardTitle>
                {tendenciaInformalidad < 0 ? (
                  <TrendingDown className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-red-500" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPercent(ultimaInformalidad)}</div>
                <p className="text-xs text-muted-foreground">
                  {tendenciaInformalidad < 0 
                    ? `${formatPercent(Math.abs(tendenciaInformalidad))} menos que el período anterior` 
                    : `${formatPercent(tendenciaInformalidad)} más que el período anterior`}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Matriculados</CardTitle>
                {tendenciaMatricula > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(ultimaMatricula)}</div>
                <p className="text-xs text-muted-foreground">
                  {tendenciaMatricula > 0 
                    ? `${formatNumber(tendenciaMatricula)} más que el año anterior` 
                    : `${formatNumber(Math.abs(tendenciaMatricula))} menos que el año anterior`}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carreras con Alta Demanda</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{carrerasConAlta}</div>
                <p className="text-xs text-muted-foreground">
                  De un total de {demandaData.length} carreras analizadas
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sectores Principales</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sectoresData.length}</div>
                <p className="text-xs text-muted-foreground">
                  Sectores con mayor demanda laboral
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Gráficos de tendencias */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tendencia de Informalidad</CardTitle>
                <CardDescription>
                  Evolución de la tasa de informalidad laboral
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  title="Informalidad Laboral"
                  data={informalidadChartData}
                  index="anio"
                  categories={["total", "hombres", "mujeres"]}
                  colors={colors}
                  valueFormatter={formatPercent}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Matrículas</CardTitle>
                <CardDescription>
                  Tendencia de matriculados por año
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  title="Matrículas por Año"
                  data={matriculaChartData}
                  index="anio"
                  categories={["total"]}
                  colors={[colors[0]]}
                  valueFormatter={formatNumber}
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Distribución sectorial y fortaleza de demanda */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribución Sectorial</CardTitle>
                <CardDescription>
                  Principales sectores económicos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sectoresData.length > 0 ? (
                  <PieChart
                    title="Sectores Económicos"
                    data={sectoresData}
                    index="sector"
                    categories={["valor"]}
                    colors={colors}
                    valueFormatter={(value) => `${value}%`}
                  />
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">No hay datos disponibles</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Fortaleza de Demanda</CardTitle>
                <CardDescription>
                  Carreras con mayor índice de demanda
                </CardDescription>
              </CardHeader>
              <CardContent>
                {demandaChartData.length > 0 ? (
                  <BarChart
                    title="Índice de Demanda por Carrera"
                    data={demandaChartData}
                    index="carrera"
                    categories={["indice"]}
                    colors={[colors[0]]}
                    valueFormatter={(value) => value.toFixed(2)}
                    layout="vertical"
                  />
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">No hay datos disponibles</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Enlaces a dashboards específicos */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle>Brechas Salariales</CardTitle>
                <CardDescription>
                  Análisis detallado de brechas salariales por carrera
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Link 
                  href="/brechas-salariales"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  onClick={() => setSelectedTab("brechas")}
                >
                  Ver dashboard completo
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle>Distribución Sectorial</CardTitle>
                <CardDescription>
                  Análisis de la distribución del empleo por sector
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Link 
                  href="/distribucion-sectorial"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  onClick={() => setSelectedTab("sectorial")}
                >
                  Ver dashboard completo
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle>Fortaleza de Demanda</CardTitle>
                <CardDescription>
                  Análisis de la fortaleza de demanda laboral
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Link 
                  href="/fortaleza-demanda"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  onClick={() => setSelectedTab("demanda")}
                >
                  Ver dashboard completo
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="brechas">
          <Card>
            <CardHeader>
              <CardTitle>Brechas Salariales</CardTitle>
              <CardDescription>
                Redirigiendo al dashboard completo...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Este panel muestra un resumen de las brechas salariales. Para un análisis más detallado, visite el dashboard completo.</p>
              <Link 
                href="/brechas-salariales" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              >
                Ir al Dashboard de Brechas Salariales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sectorial">
          <Card>
            <CardHeader>
              <CardTitle>Distribución Sectorial</CardTitle>
              <CardDescription>
                Redirigiendo al dashboard completo...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Este panel muestra un resumen de la distribución sectorial. Para un análisis más detallado, visite el dashboard completo.</p>
              <Link 
                href="/distribucion-sectorial" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              >
                Ir al Dashboard de Distribución Sectorial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="demanda">
          <Card>
            <CardHeader>
              <CardTitle>Fortaleza de Demanda</CardTitle>
              <CardDescription>
                Redirigiendo al dashboard completo...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Este panel muestra un resumen de la fortaleza de demanda. Para un análisis más detallado, visite el dashboard completo.</p>
              <Link 
                href="/fortaleza-demanda" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              >
                Ir al Dashboard de Fortaleza de Demanda
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 