"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

interface Metrica {
  nombre: string
  campo: string
  min?: number
  max?: number
}

interface GraficoRadarProps {
  datos: Record<string, any>[]
  metricas: Metrica[]
  etiqueta: string
  titulo?: string
  colorPalette?: string[]
}

export function GraficoRadarShadcn({
  datos,
  metricas,
  etiqueta,
  titulo = "",
  colorPalette = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"],
}: GraficoRadarProps) {
  const [dataProcesada, setDataProcesada] = useState<any[]>([])
  const [categorias, setCategorias] = useState<string[]>([])

  useEffect(() => {
    if (!datos || !Array.isArray(datos) || datos.length === 0 || !metricas || !Array.isArray(metricas) || metricas.length === 0) {
      setDataProcesada([])
      setCategorias([])
      return
    }

    try {
      // Limitar a un número razonable de categorías para evitar errores de memoria
      const uniqueEtiquetas = new Set<string>()
      datos.forEach(d => {
        if (d && typeof d === 'object' && etiqueta in d) {
          uniqueEtiquetas.add(String(d[etiqueta]))
        }
      })
      
      // Extraer y limitar categorías (máximo 20 para prevenir problemas de rendimiento)
      const categoriasArray = Array.from(uniqueEtiquetas).slice(0, 20)
      setCategorias(categoriasArray)

      // Procesar los datos para cada métrica con manejo seguro de valores
      const dataTransformada = metricas.map((metrica) => {
        // Para cada métrica, creamos un objeto con los valores de cada item en datos
        const item: Record<string, any> = {
          metrica: metrica.nombre,
        }

        // Normalizar los valores para cada categoría de manera segura
        categoriasArray.forEach(cat => {
          // Inicializar con valor por defecto
          item[cat] = 0
          
          // Encontrar datos para esta categoría
          const datosCategoria = datos.filter(d => 
            d && typeof d === 'object' && etiqueta in d && d[etiqueta] === cat
          )
          
          // Calcular valor promedio si hay datos
          if (datosCategoria.length > 0) {
            let suma = 0
            let conteo = 0
            
            datosCategoria.forEach(d => {
              if (d && typeof d === 'object' && metrica.campo in d) {
                const valor = parseFloat(d[metrica.campo])
                if (!isNaN(valor)) {
                  suma += valor
                  conteo++
                }
              }
            })
            
            if (conteo > 0) {
              let valorPromedio = suma / conteo
              
              // Normalizar el valor entre 0 y 100 si hay min/max definidos
              if (typeof metrica.min !== 'undefined' && typeof metrica.max !== 'undefined') {
                valorPromedio = ((valorPromedio - metrica.min) / (metrica.max - metrica.min)) * 100
                valorPromedio = Math.max(0, Math.min(100, valorPromedio)) // Limitar entre 0 y 100
              }
              
              item[cat] = valorPromedio
            }
          }
        })

        return item
      })

      setDataProcesada(dataTransformada)
    } catch (error) {
      console.error("Error al procesar datos del gráfico radar:", error)
      setDataProcesada([])
      setCategorias([])
    }
  }, [datos, metricas, etiqueta])

  // Función para personalizar el tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-md">
          <p className="font-medium mb-1">{payload[0].payload.metrica}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {payload.map((entry: any, index: number) => (
              <div key={`item-${index}`} className="col-span-2 flex justify-between items-center">
                <span className="flex items-center">
                  <span
                    className="inline-block w-3 h-3 mr-1 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></span>
                  <span className="text-muted-foreground">{entry.name}:</span>
                </span>
                <span className="font-medium">{entry.value.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  if (!datos || datos.length === 0 || !metricas || metricas.length === 0 || categorias.length === 0) {
    return (
      <Card className="w-full h-full">
        {titulo && (
          <CardHeader>
            <CardTitle>{titulo}</CardTitle>
          </CardHeader>
        )}
        <CardContent className="p-4 flex items-center justify-center h-full">
          <p className="text-muted-foreground">No hay datos suficientes para visualizar</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full h-full">
      {titulo && (
        <CardHeader>
          <CardTitle>{titulo}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div className="w-full h-full min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataProcesada}>
              <PolarGrid gridType="polygon" className="stroke-muted" />
              <PolarAngleAxis
                dataKey="metrica"
                tick={{ fill: "hsl(var(--foreground))" }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: "hsl(var(--foreground))" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: 20,
                  color: "hsl(var(--foreground))"
                }}
              />
              {categorias.map((categoria, index) => (
                <Radar
                  key={categoria}
                  name={categoria}
                  dataKey={categoria}
                  stroke={colorPalette[index % colorPalette.length]}
                  fill={colorPalette[index % colorPalette.length]}
                  fillOpacity={0.2}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 