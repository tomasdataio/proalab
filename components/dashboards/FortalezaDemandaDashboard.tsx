"use client"

import { useState } from "react"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
  LineChart, Line
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer } from "@/components/ui/chart"

// Colores para el tema rubi
const colors = {
  primary: "hsl(0, 78%, 42%)",
  secondary: "hsl(0, 65%, 55%)",
  tertiary: "hsl(0, 50%, 68%)",
  quaternary: "hsl(0, 35%, 80%)",
  background: "hsl(0, 20%, 95%)",
}

// Datos de ejemplo (reemplazar con datos reales de la API)
const mockData = [
  {
    carr_generica: "Ingeniería Civil",
    inst_tipo: "Universidades",
    area_conocimiento: "Ingeniería y Tecnología",
    brecha_75_25_primer_ano: 65.8,
    brecha_75_25_quinto_ano: 90.5,
    tendencia_brecha: 1.2,
    cagr_ingresos: 15.3,
    est_empleabilidad_primer_ano: 85.2,
    est_empleabilidad_segundo_ano: 92.5,
    tendencia_emp_primer_ano: 0.8,
    tendencia_emp_segundo_ano: 0.5,
    ind_brecha_primer_ano: 0.7,
    ind_brecha_quinto_ano: 0.8,
    ind_tendencia_brecha: 0.6,
    ind_cagr_ingresos: 0.9,
    ind_empleabilidad_primer_ano: 0.85,
    ind_empleabilidad_segundo_ano: 0.9,
    ind_tendencia_emp_primer_ano: 0.7,
    ind_tendencia_emp_segundo_ano: 0.65,
    indice_fortaleza: 0.85,
    categoria_fortaleza: "Alta",
    tendencia_matricula: 5.2,
    est_matricula_primer_ano_total: 1250,
    est_titulados_total: 980
  },
  {
    carr_generica: "Medicina",
    inst_tipo: "Universidades",
    area_conocimiento: "Salud",
    brecha_75_25_primer_ano: 45.2,
    brecha_75_25_quinto_ano: 80.1,
    tendencia_brecha: 0.9,
    cagr_ingresos: 18.7,
    est_empleabilidad_primer_ano: 92.3,
    est_empleabilidad_segundo_ano: 95.8,
    tendencia_emp_primer_ano: 0.3,
    tendencia_emp_segundo_ano: 0.2,
    ind_brecha_primer_ano: 0.6,
    ind_brecha_quinto_ano: 0.75,
    ind_tendencia_brecha: 0.5,
    ind_cagr_ingresos: 0.95,
    ind_empleabilidad_primer_ano: 0.95,
    ind_empleabilidad_segundo_ano: 0.98,
    ind_tendencia_emp_primer_ano: 0.6,
    ind_tendencia_emp_segundo_ano: 0.55,
    indice_fortaleza: 0.92,
    categoria_fortaleza: "Muy Alta",
    tendencia_matricula: 3.5,
    est_matricula_primer_ano_total: 980,
    est_titulados_total: 850
  },
  {
    carr_generica: "Derecho",
    inst_tipo: "Universidades",
    area_conocimiento: "Ciencias Sociales",
    brecha_75_25_primer_ano: 60.3,
    brecha_75_25_quinto_ano: 100.4,
    tendencia_brecha: 1.5,
    cagr_ingresos: 12.8,
    est_empleabilidad_primer_ano: 78.5,
    est_empleabilidad_segundo_ano: 85.2,
    tendencia_emp_primer_ano: -0.2,
    tendencia_emp_segundo_ano: 0.1,
    ind_brecha_primer_ano: 0.65,
    ind_brecha_quinto_ano: 0.85,
    ind_tendencia_brecha: 0.7,
    ind_cagr_ingresos: 0.8,
    ind_empleabilidad_primer_ano: 0.75,
    ind_empleabilidad_segundo_ano: 0.8,
    ind_tendencia_emp_primer_ano: 0.4,
    ind_tendencia_emp_segundo_ano: 0.5,
    indice_fortaleza: 0.7,
    categoria_fortaleza: "Media-Alta",
    tendencia_matricula: -1.2,
    est_matricula_primer_ano_total: 1850,
    est_titulados_total: 1450
  },
  {
    carr_generica: "Psicología",
    inst_tipo: "Universidades",
    area_conocimiento: "Ciencias Sociales",
    brecha_75_25_primer_ano: 40.8,
    brecha_75_25_quinto_ano: 70.3,
    tendencia_brecha: 0.8,
    cagr_ingresos: 10.2,
    est_empleabilidad_primer_ano: 72.5,
    est_empleabilidad_segundo_ano: 80.1,
    tendencia_emp_primer_ano: -0.5,
    tendencia_emp_segundo_ano: -0.2,
    ind_brecha_primer_ano: 0.55,
    ind_brecha_quinto_ano: 0.7,
    ind_tendencia_brecha: 0.45,
    ind_cagr_ingresos: 0.7,
    ind_empleabilidad_primer_ano: 0.65,
    ind_empleabilidad_segundo_ano: 0.75,
    ind_tendencia_emp_primer_ano: 0.3,
    ind_tendencia_emp_segundo_ano: 0.4,
    indice_fortaleza: 0.6,
    categoria_fortaleza: "Media",
    tendencia_matricula: -2.5,
    est_matricula_primer_ano_total: 2100,
    est_titulados_total: 1750
  },
  {
    carr_generica: "Administración de Empresas",
    inst_tipo: "Universidades",
    area_conocimiento: "Economía y Negocios",
    brecha_75_25_primer_ano: 55.7,
    brecha_75_25_quinto_ano: 95.2,
    tendencia_brecha: 1.1,
    cagr_ingresos: 14.2,
    est_empleabilidad_primer_ano: 80.3,
    est_empleabilidad_segundo_ano: 88.7,
    tendencia_emp_primer_ano: 0.4,
    tendencia_emp_segundo_ano: 0.3,
    ind_brecha_primer_ano: 0.6,
    ind_brecha_quinto_ano: 0.8,
    ind_tendencia_brecha: 0.55,
    ind_cagr_ingresos: 0.85,
    ind_empleabilidad_primer_ano: 0.8,
    ind_empleabilidad_segundo_ano: 0.85,
    ind_tendencia_emp_primer_ano: 0.6,
    ind_tendencia_emp_segundo_ano: 0.55,
    indice_fortaleza: 0.75,
    categoria_fortaleza: "Alta",
    tendencia_matricula: 2.8,
    est_matricula_primer_ano_total: 2350,
    est_titulados_total: 1950
  },
  {
    carr_generica: "Arquitectura",
    inst_tipo: "Universidades",
    area_conocimiento: "Arquitectura y Construcción",
    brecha_75_25_primer_ano: 50.2,
    brecha_75_25_quinto_ano: 85.6,
    tendencia_brecha: 1.0,
    cagr_ingresos: 11.5,
    est_empleabilidad_primer_ano: 75.8,
    est_empleabilidad_segundo_ano: 83.4,
    tendencia_emp_primer_ano: -0.1,
    tendencia_emp_segundo_ano: 0.2,
    ind_brecha_primer_ano: 0.58,
    ind_brecha_quinto_ano: 0.78,
    ind_tendencia_brecha: 0.52,
    ind_cagr_ingresos: 0.75,
    ind_empleabilidad_primer_ano: 0.72,
    ind_empleabilidad_segundo_ano: 0.78,
    ind_tendencia_emp_primer_ano: 0.45,
    ind_tendencia_emp_segundo_ano: 0.52,
    indice_fortaleza: 0.65,
    categoria_fortaleza: "Media-Alta",
    tendencia_matricula: -0.8,
    est_matricula_primer_ano_total: 1150,
    est_titulados_total: 920
  },
  {
    carr_generica: "Enfermería",
    inst_tipo: "Universidades",
    area_conocimiento: "Salud",
    brecha_75_25_primer_ano: 35.4,
    brecha_75_25_quinto_ano: 65.8,
    tendencia_brecha: 0.7,
    cagr_ingresos: 13.2,
    est_empleabilidad_primer_ano: 88.5,
    est_empleabilidad_segundo_ano: 92.1,
    tendencia_emp_primer_ano: 0.6,
    tendencia_emp_segundo_ano: 0.4,
    ind_brecha_primer_ano: 0.5,
    ind_brecha_quinto_ano: 0.65,
    ind_tendencia_brecha: 0.42,
    ind_cagr_ingresos: 0.82,
    ind_empleabilidad_primer_ano: 0.88,
    ind_empleabilidad_segundo_ano: 0.92,
    ind_tendencia_emp_primer_ano: 0.65,
    ind_tendencia_emp_segundo_ano: 0.6,
    indice_fortaleza: 0.8,
    categoria_fortaleza: "Alta",
    tendencia_matricula: 4.5,
    est_matricula_primer_ano_total: 1650,
    est_titulados_total: 1380
  },
  {
    carr_generica: "Pedagogía",
    inst_tipo: "Universidades",
    area_conocimiento: "Educación",
    brecha_75_25_primer_ano: 30.2,
    brecha_75_25_quinto_ano: 55.4,
    tendencia_brecha: 0.6,
    cagr_ingresos: 8.5,
    est_empleabilidad_primer_ano: 82.3,
    est_empleabilidad_segundo_ano: 85.7,
    tendencia_emp_primer_ano: 0.2,
    tendencia_emp_segundo_ano: 0.1,
    ind_brecha_primer_ano: 0.45,
    ind_brecha_quinto_ano: 0.6,
    ind_tendencia_brecha: 0.4,
    ind_cagr_ingresos: 0.65,
    ind_empleabilidad_primer_ano: 0.82,
    ind_empleabilidad_segundo_ano: 0.85,
    ind_tendencia_emp_primer_ano: 0.55,
    ind_tendencia_emp_segundo_ano: 0.5,
    indice_fortaleza: 0.62,
    categoria_fortaleza: "Media",
    tendencia_matricula: -1.5,
    est_matricula_primer_ano_total: 1950,
    est_titulados_total: 1680
  }
]

// Función para formatear valores como porcentaje
const formatPercent = (value: number) => `${value.toFixed(1)}%`

// Función para formatear valores como índice
const formatIndex = (value: number) => value.toFixed(2)

export default function FortalezaDemandaDashboard() {
  const [selectedCarrera, setSelectedCarrera] = useState<string>(mockData[0].carr_generica)
  
  // Filtrar datos por carrera seleccionada
  const carreraData = mockData.find(item => item.carr_generica === selectedCarrera)
  
  // Datos para el gráfico de radar
  const radarData = carreraData ? [
    { 
      factor: "Brecha Salarial", 
      valor: carreraData.ind_brecha_quinto_ano * 100,
      fullMark: 100 
    },
    { 
      factor: "Tendencia Brecha", 
      valor: carreraData.ind_tendencia_brecha * 100,
      fullMark: 100 
    },
    { 
      factor: "Crecimiento Ingresos", 
      valor: carreraData.ind_cagr_ingresos * 100,
      fullMark: 100 
    },
    { 
      factor: "Empleabilidad 1er Año", 
      valor: carreraData.ind_empleabilidad_primer_ano * 100,
      fullMark: 100 
    },
    { 
      factor: "Empleabilidad 2do Año", 
      valor: carreraData.ind_empleabilidad_segundo_ano * 100,
      fullMark: 100 
    },
    { 
      factor: "Tendencia Empleabilidad", 
      valor: carreraData.ind_tendencia_emp_primer_ano * 100,
      fullMark: 100 
    }
  ] : []
  
  // Datos para el gráfico de comparación
  const comparacionData = mockData.map(item => ({
    carrera: item.carr_generica,
    indice: item.indice_fortaleza,
    categoria: item.categoria_fortaleza
  })).sort((a, b) => b.indice - a.indice)
  
  // Datos para el gráfico de componentes
  const componentesData = carreraData ? [
    { 
      componente: "Brecha Salarial", 
      valor: carreraData.ind_brecha_quinto_ano 
    },
    { 
      componente: "Tendencia Brecha", 
      valor: carreraData.ind_tendencia_brecha 
    },
    { 
      componente: "Crecimiento Ingresos", 
      valor: carreraData.ind_cagr_ingresos 
    },
    { 
      componente: "Empleabilidad 1er Año", 
      valor: carreraData.ind_empleabilidad_primer_ano 
    },
    { 
      componente: "Empleabilidad 2do Año", 
      valor: carreraData.ind_empleabilidad_segundo_ano 
    },
    { 
      componente: "Tendencia Empleabilidad", 
      valor: carreraData.ind_tendencia_emp_primer_ano 
    }
  ].sort((a, b) => b.valor - a.valor) : []

  // Datos para el gráfico de tendencias
  const tendenciasData = mockData.map(item => ({
    carrera: item.carr_generica,
    indice_fortaleza: item.indice_fortaleza,
    tendencia_matricula: item.tendencia_matricula
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Fortaleza de Demanda Laboral</h2>
        <div className="flex items-center space-x-2">
          <Select value={selectedCarrera} onValueChange={setSelectedCarrera}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Seleccionar carrera" />
            </SelectTrigger>
            <SelectContent>
              {mockData.map(item => (
                <SelectItem key={item.carr_generica} value={item.carr_generica}>
                  {item.carr_generica}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Índice de Fortaleza</CardTitle>
            <CardDescription>Evaluación global de la demanda laboral</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{formatIndex(carreraData?.indice_fortaleza || 0)}</div>
            <div className="mt-1 text-sm font-medium">
              Categoría: <span className="text-primary">{carreraData?.categoria_fortaleza}</span>
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-secondary/20">
              <div 
                className="h-2 rounded-full bg-primary" 
                style={{ width: `${(carreraData?.indice_fortaleza || 0) * 100}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>0.0</span>
              <span>0.5</span>
              <span>1.0</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Empleabilidad</CardTitle>
            <CardDescription>Tasas de empleabilidad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">Primer Año</span>
                  <span className="text-sm font-medium">{formatPercent(carreraData?.est_empleabilidad_primer_ano || 0)}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary/20">
                  <div 
                    className="h-2 rounded-full bg-primary" 
                    style={{ width: `${carreraData?.est_empleabilidad_primer_ano || 0}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">Segundo Año</span>
                  <span className="text-sm font-medium">{formatPercent(carreraData?.est_empleabilidad_segundo_ano || 0)}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary/20">
                  <div 
                    className="h-2 rounded-full bg-primary" 
                    style={{ width: `${carreraData?.est_empleabilidad_segundo_ano || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crecimiento Salarial</CardTitle>
            <CardDescription>Tasa compuesta de crecimiento anual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{formatPercent(carreraData?.cagr_ingresos || 0)}</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Crecimiento anual promedio
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium">Brecha 75/25:</span>
              <span className="ml-2 text-sm">
                {formatPercent(carreraData?.brecha_75_25_primer_ano || 0)} → {formatPercent(carreraData?.brecha_75_25_quinto_ano || 0)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="perfil" className="space-y-4">
        <TabsList>
          <TabsTrigger value="perfil">Perfil de Fortaleza</TabsTrigger>
          <TabsTrigger value="comparativa">Comparativa</TabsTrigger>
          <TabsTrigger value="componentes">Componentes</TabsTrigger>
          <TabsTrigger value="tendencias">Tendencias</TabsTrigger>
        </TabsList>
        
        <TabsContent value="perfil" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Perfil de Fortaleza: {selectedCarrera}</CardTitle>
              <CardDescription>Análisis multidimensional de factores de demanda laboral</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  valor: { color: colors.primary, label: "Valor" },
                }}
              >
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="factor" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Fortaleza"
                        dataKey="valor"
                        stroke={colors.primary}
                        fill={colors.primary}
                        fillOpacity={0.6}
                      />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Valor"]}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparativa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparativa de Índices de Fortaleza</CardTitle>
              <CardDescription>Ranking de carreras según su fortaleza de demanda laboral</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  indice: { color: colors.primary, label: "Índice de Fortaleza" },
                }}
              >
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={comparacionData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" domain={[0, 1]} tickFormatter={formatIndex} />
                      <YAxis 
                        type="category" 
                        dataKey="carrera" 
                        tick={{ fontSize: 12 }}
                        width={140}
                      />
                      <Tooltip
                        formatter={(value) => [formatIndex(value as number), "Índice"]}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Bar 
                        dataKey="indice" 
                        radius={[0, 4, 4, 0]}
                      >
                        {comparacionData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.carrera === selectedCarrera ? colors.primary : colors.secondary}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="componentes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Componentes del Índice de Fortaleza</CardTitle>
              <CardDescription>Desglose de los factores que componen el índice</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  valor: { color: colors.primary, label: "Valor del Componente" },
                }}
              >
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={componentesData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" domain={[0, 1]} tickFormatter={formatIndex} />
                      <YAxis 
                        type="category" 
                        dataKey="componente" 
                        tick={{ fontSize: 12 }}
                        width={140}
                      />
                      <Tooltip
                        formatter={(value) => [formatIndex(value as number), "Valor"]}
                      />
                      <Bar 
                        dataKey="valor" 
                        fill={colors.primary}
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tendencias" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fortaleza vs Tendencia de Matrícula</CardTitle>
              <CardDescription>Relación entre fortaleza de demanda y tendencia de matrícula</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  indice_fortaleza: { color: colors.primary, label: "Índice de Fortaleza" },
                  tendencia_matricula: { color: colors.secondary, label: "Tendencia de Matrícula (%)" },
                }}
              >
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={tendenciasData.sort((a, b) => b.indice_fortaleza - a.indice_fortaleza)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="carrera" />
                      <YAxis yAxisId="left" tickFormatter={formatIndex} />
                      <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value.toFixed(1)}%`} />
                      <Tooltip
                        formatter={(value, name) => {
                          if (name === "indice_fortaleza") {
                            return [formatIndex(value as number), "Índice de Fortaleza"];
                          }
                          return [`${(value as number).toFixed(1)}%`, "Tendencia de Matrícula"];
                        }}
                      />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="indice_fortaleza" 
                        stroke={colors.primary} 
                        strokeWidth={2}
                        dot={{ r: 4, fill: colors.primary }}
                        activeDot={{ r: 6, fill: colors.primary }}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="tendencia_matricula" 
                        stroke={colors.secondary} 
                        strokeWidth={2}
                        dot={{ r: 4, fill: colors.secondary }}
                        activeDot={{ r: 6, fill: colors.secondary }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 