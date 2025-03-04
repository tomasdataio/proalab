"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart } from "@/components/charts/BarChart"
import { LineChart } from "@/components/charts/LineChart"

// Colores para los gráficos
const colors = ["#FF7B7B", "#FF9B9B", "#FFA07A", "#FFB347", "#FFD700"]

// Funciones de formato
const formatPercent = (value: number) => `${value.toFixed(1)}%`

// Función para formatear valores monetarios
const formatCurrency = (value: number) => 
  new Intl.NumberFormat('es-CL', { 
    style: 'currency', 
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(value)

interface BrechasSalarialesDashboardProps {
  brechasData: any[]
}

export default function BrechasSalarialesDashboard({ brechasData = [] }: BrechasSalarialesDashboardProps) {
  const [selectedCarrera, setSelectedCarrera] = useState<string>(
    brechasData.length > 0 ? brechasData[0].carr_generica : ""
  )

  // Obtener lista de carreras únicas
  const carreras = [...new Set(brechasData.map(item => item.carr_generica))]
    .filter(Boolean)
    .sort()

  // Filtrar datos para la carrera seleccionada
  const carreraData = brechasData.filter(item => item.carr_generica === selectedCarrera)
  
  // Datos para el gráfico de brechas
  const brechasChartData = carreras.map(carrera => {
    const item = brechasData.find(d => d.carr_generica === carrera) || {}
    return {
      carrera,
      primer_anio: item.gap_90_10_primer_anio || 0,
      quinto_anio: item.gap_90_10_quinto_anio || 0
    }
  }).sort((a, b) => b.quinto_anio - a.quinto_anio).slice(0, 10)
  
  // Datos para el gráfico de crecimiento
  const crecimientoChartData = carreras.map(carrera => {
    const item = brechasData.find(d => d.carr_generica === carrera) || {}
    return {
      carrera,
      cagr: item.cagr_ingreso || 0
    }
  }).sort((a, b) => b.cagr - a.cagr).slice(0, 10)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Brechas Salariales</h1>
          <p className="text-muted-foreground">
            Análisis de brechas salariales por carrera y su evolución temporal
          </p>
        </div>
        
        <div className="w-full md:w-[250px]">
          <Select 
            value={selectedCarrera} 
            onValueChange={setSelectedCarrera}
            disabled={carreras.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar carrera" />
            </SelectTrigger>
            <SelectContent>
              {carreras.map(carrera => (
                <SelectItem key={carrera} value={carrera}>
                  {carrera}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="brechas" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="brechas">Brechas Salariales</TabsTrigger>
          <TabsTrigger value="crecimiento">Crecimiento Salarial</TabsTrigger>
        </TabsList>
        
        <TabsContent value="brechas" className="space-y-4">
          {/* Tarjetas de indicadores para la carrera seleccionada */}
          {selectedCarrera && carreraData.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Brecha Salarial Primer Año
                  </CardTitle>
                  <CardDescription>
                    Diferencia entre el percentil 90 y 10
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatPercent(carreraData[0].gap_90_10_primer_anio || 0)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Brecha Salarial Quinto Año
                  </CardTitle>
                  <CardDescription>
                    Diferencia entre el percentil 90 y 10
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatPercent(carreraData[0].gap_90_10_quinto_anio || 0)}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Gráfico de brechas salariales */}
          <Card>
            <CardHeader>
              <CardTitle>Brechas Salariales por Carrera</CardTitle>
              <CardDescription>
                Comparativa de brechas salariales entre el primer y quinto año
              </CardDescription>
            </CardHeader>
            <CardContent>
              {brechasChartData.length > 0 ? (
                <BarChart
                  title="Brechas Salariales"
                  data={brechasChartData}
                  index="carrera"
                  categories={["primer_anio", "quinto_anio"]}
                  colors={[colors[0], colors[1]]}
                  valueFormatter={formatPercent}
                  layout="vertical"
                />
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">No hay datos disponibles</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Explicación de brechas salariales */}
          <Card>
            <CardHeader>
              <CardTitle>¿Qué son las brechas salariales?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Las brechas salariales representan la diferencia porcentual entre los salarios más altos (percentil 90) 
                y los más bajos (percentil 10) para una misma carrera. Una brecha mayor indica mayor desigualdad 
                salarial dentro de la profesión, que puede deberse a factores como especialización, experiencia, 
                ubicación geográfica o sector de empleo.
              </p>
              <p className="text-muted-foreground mt-4">
                La comparación entre el primer y quinto año muestra cómo evoluciona esta desigualdad a medida 
                que los profesionales avanzan en su carrera. Un aumento significativo en la brecha sugiere que 
                las trayectorias profesionales se diversifican considerablemente con el tiempo.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="crecimiento" className="space-y-4">
          {/* Tarjeta de indicador para la carrera seleccionada */}
          {selectedCarrera && carreraData.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Tasa de Crecimiento Anual Compuesta (CAGR)
                </CardTitle>
                <CardDescription>
                  Para la carrera: {selectedCarrera}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatPercent(carreraData[0].cagr_ingreso || 0)}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Gráfico de crecimiento salarial */}
          <Card>
            <CardHeader>
              <CardTitle>Crecimiento Salarial por Carrera</CardTitle>
              <CardDescription>
                Tasa de crecimiento anual compuesta (CAGR)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {crecimientoChartData.length > 0 ? (
                <BarChart
                  title="Crecimiento Salarial"
                  data={crecimientoChartData}
                  index="carrera"
                  categories={["cagr"]}
                  colors={[colors[2]]}
                  valueFormatter={formatPercent}
                  layout="vertical"
                />
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">No hay datos disponibles</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Explicación de crecimiento salarial */}
          <Card>
            <CardHeader>
              <CardTitle>¿Qué es el CAGR?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                La Tasa de Crecimiento Anual Compuesta (CAGR, por sus siglas en inglés) representa el 
                crecimiento promedio anual de los salarios a lo largo del tiempo. Un CAGR más alto indica 
                un mayor potencial de crecimiento salarial en la carrera.
              </p>
              <p className="text-muted-foreground mt-4">
                Este indicador es útil para comparar el potencial de crecimiento salarial entre diferentes 
                carreras y puede ser un factor importante a considerar al elegir una trayectoria profesional. 
                Sin embargo, es importante tener en cuenta que el CAGR es un promedio y que el crecimiento 
                real puede variar significativamente según factores individuales.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 