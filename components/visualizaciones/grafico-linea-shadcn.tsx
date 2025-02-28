"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"

interface GraficoLineaProps {
  datos: Record<string, any>[]
  campoX: string
  campoY: string
  series?: string
  formatoFecha?: string
  colorPor?: string
  conPuntos?: boolean
  leyendaInteractiva?: boolean
  titulo?: string
  colorPalette?: string[]
}

export function GraficoLineaShadcn({
  datos,
  campoX,
  campoY,
  series,
  formatoFecha = "yyyy-MM-dd",
  colorPor,
  conPuntos = false,
  leyendaInteractiva = false,
  titulo = "",
  colorPalette = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"],
}: GraficoLineaProps) {
  const [dataProcesada, setDataProcesada] = useState<any[]>([])
  const [seriesUnicas, setSeriesUnicas] = useState<string[]>([])
  const [seriesVisibles, setSeriesVisibles] = useState<Record<string, boolean>>({})
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Validación de datos de entrada
      if (!datos || !Array.isArray(datos) || datos.length === 0) {
        setDataProcesada([])
        setSeriesUnicas([])
        setSeriesVisibles({})
        return
      }

      // Verificar que los campos existan en los datos
      const sampleData = datos[0]
      if (!sampleData || typeof sampleData !== 'object' || !(campoX in sampleData) || !(campoY in sampleData)) {
        setError(`Los campos ${campoX} o ${campoY} no existen en los datos`)
        setDataProcesada([])
        setSeriesUnicas([])
        setSeriesVisibles({})
        return
      }

      // Validar campo de series si se proporciona
      if (series && !sampleData[series]) {
        setError(`El campo de series ${series} no existe en los datos`)
        setDataProcesada([])
        setSeriesUnicas([])
        setSeriesVisibles({})
        return
      }

      // Cache para evitar múltiples conversiones de fechas
      const dateCache = new Map<string, number>()
      
      // Función para obtener timestamp seguro
      const getTimestamp = (value: string): number => {
        if (!value) return 0
        
        if (dateCache.has(value)) {
          return dateCache.get(value) || 0
        }
        
        try {
          const timestamp = new Date(value).getTime()
          if (!isNaN(timestamp)) {
            dateCache.set(value, timestamp)
            return timestamp
          }
        } catch {
          // No hacer nada, seguir con el flujo
        }
        
        return 0
      }

      // Determinar si es una serie temporal
      const esFechaTemporal = !!sampleData[campoX] && isDateString(String(sampleData[campoX]))

      if (series) {
        // Para datos con múltiples series
        // Limitar la cantidad de valores únicos para el eje X (máximo 100)
        const uniqueXValuesSet = new Set(datos.map(d => d[campoX]))
        const uniqueXValuesArray = Array.from(uniqueXValuesSet)
        
        // Ordenar valores de X (temporal o alfabéticamente)
        const uniqueXValues = uniqueXValuesArray
          .slice(0, 100)
          .sort((a, b) => {
            if (esFechaTemporal) {
              return getTimestamp(String(a)) - getTimestamp(String(b))
            }
            return String(a).localeCompare(String(b))
          })

        // Limitar la cantidad de series (máximo 10)
        const uniqueSeriesSet = new Set(datos.map(d => d[series]))
        const uniqueSeries = Array.from(uniqueSeriesSet).slice(0, 10)
        setSeriesUnicas(uniqueSeries)

        // Inicializar todas las series como visibles
        const initialVisibility: Record<string, boolean> = {}
        uniqueSeries.forEach((s) => {
          initialVisibility[s] = true
        })
        setSeriesVisibles(initialVisibility)

        // Procesar datos para series, limitando procesamiento
        const processed = uniqueXValues.map((xValue) => {
          const obj: any = { [campoX]: xValue }

          uniqueSeries.forEach((serie) => {
            // Buscar el primer elemento que coincida para esta serie y valor X
            const match = datos.find((d) => d[campoX] === xValue && d[series] === serie)
            // En lugar de 0, usamos null para gaps en las series
            obj[serie] = match ? (parseFloat(match[campoY]) || null) : null
          })

          return obj
        })

        setDataProcesada(processed)
      } else {
        // Para una sola serie, limitamos a 100 puntos de datos
        const limitedData = datos.slice(0, 100)
        
        // Mapeamos y procesamos con validación
        const processed = limitedData
          .map((d) => {
            if (!d || typeof d !== 'object') return null
            
            const yValue = parseFloat(d[campoY])
            if (isNaN(yValue)) return null
            
            return {
              [campoX]: d[campoX],
              [campoY]: yValue,
            }
          })
          .filter((d): d is Record<string, any> => d !== null)
          .sort((a, b) => {
            if (esFechaTemporal) {
              return getTimestamp(String(a[campoX])) - getTimestamp(String(b[campoX]))
            }
            return String(a[campoX]).localeCompare(String(b[campoX]))
          })

        setDataProcesada(processed)
        setSeriesUnicas([campoY])
        setSeriesVisibles({ [campoY]: true })
      }
      
      setError(null)
    } catch (err) {
      console.error("Error al procesar datos del gráfico de línea:", err)
      setError("Error al procesar los datos del gráfico")
      setDataProcesada([])
      setSeriesUnicas([])
      setSeriesVisibles({})
    }
  }, [datos, campoX, campoY, series])

  // Comprobar si una cadena es una fecha válida
  const isDateString = (str: string) => {
    if (!str) return false
    
    try {
      const date = new Date(str)
      return !isNaN(date.getTime())
    } catch {
      return false
    }
  }

  // Formatear fechas para el eje X
  const formatXAxis = (value: string) => {
    if (!value) return ""
    
    if (isDateString(value)) {
      try {
        return format(parseISO(value), formatoFecha, { locale: es })
      } catch (e) {
        return value
      }
    }
    
    return value
  }

  // Manejar clic en leyenda (para ocultar/mostrar series)
  const handleLegendClick = (serie: string) => {
    if (!leyendaInteractiva) return
    
    setSeriesVisibles((prev) => ({
      ...prev,
      [serie]: !prev[serie],
    }))
  }

  // Función para personalizar el tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-md">
          <p className="font-medium mb-1">
            {isDateString(label) ? formatXAxis(label) : label}
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {payload.map((entry: any, index: number) => (
              entry.value !== null && (
                <div key={`item-${index}`} className="col-span-2 flex justify-between items-center">
                  <span className="flex items-center">
                    <span
                      className="inline-block w-3 h-3 mr-1 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className="text-muted-foreground">{entry.name}:</span>
                  </span>
                  <span className="font-medium">{entry.value.toLocaleString()}</span>
                </div>
              )
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  // Manejo de errores y estados vacíos
  if (error) {
    return (
      <Card className="w-full h-full">
        {titulo && (
          <CardHeader>
            <CardTitle>{titulo}</CardTitle>
          </CardHeader>
        )}
        <CardContent className="flex items-center justify-center h-full p-6">
          <div className="text-destructive text-center">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (dataProcesada.length === 0 || seriesUnicas.length === 0) {
    return (
      <Card className="w-full h-full">
        {titulo && (
          <CardHeader>
            <CardTitle>{titulo}</CardTitle>
          </CardHeader>
        )}
        <CardContent className="flex items-center justify-center h-full p-6">
          <div className="text-muted-foreground text-center">
            <p>No hay datos suficientes para visualizar</p>
          </div>
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
            <LineChart
              data={dataProcesada}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey={campoX}
                tickFormatter={formatXAxis}
                tick={{ fill: "hsl(var(--foreground))" }}
                tickLine={{ stroke: "hsl(var(--muted))" }}
                axisLine={{ stroke: "hsl(var(--muted))" }}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis
                tick={{ fill: "hsl(var(--foreground))" }}
                tickLine={{ stroke: "hsl(var(--muted))" }}
                axisLine={{ stroke: "hsl(var(--muted))" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: 20,
                  color: "hsl(var(--foreground))"
                }}
                onClick={leyendaInteractiva ? ({ dataKey }) => handleLegendClick(dataKey as string) : undefined}
              />
              {seriesUnicas.map((serie, index) => (
                seriesVisibles[serie] && (
                  <Line
                    key={serie}
                    type="monotone"
                    dataKey={serie}
                    name={serie}
                    stroke={colorPalette[index % colorPalette.length]}
                    activeDot={{ r: 8 }}
                    dot={conPuntos}
                    connectNulls={true}
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 