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

  useEffect(() => {
    if (!datos || datos.length === 0) return

    // Determinar si es una serie temporal
    const esFechaTemporal = datos.length > 0 && isDateString(datos[0][campoX])

    if (series) {
      // Para datos con múltiples series
      const uniqueXValues = [...new Set(datos.map((d) => d[campoX]))].sort((a, b) => {
        // Ordenar por fecha si son fechas, o alfabéticamente si no
        if (esFechaTemporal) {
          return new Date(a).getTime() - new Date(b).getTime()
        }
        return a.localeCompare(b)
      })

      const uniqueSeries = [...new Set(datos.map((d) => d[series]))]
      setSeriesUnicas(uniqueSeries)

      // Inicializar todas las series como visibles
      const initialVisibility: Record<string, boolean> = {}
      uniqueSeries.forEach((s) => {
        initialVisibility[s] = true
      })
      setSeriesVisibles(initialVisibility)

      // Procesar datos para series
      const processed = uniqueXValues.map((xValue) => {
        const obj: any = { [campoX]: xValue }

        uniqueSeries.forEach((serie) => {
          const match = datos.find((d) => d[campoX] === xValue && d[series] === serie)
          obj[serie] = match ? parseFloat(match[campoY]) || 0 : 0
        })

        return obj
      })

      setDataProcesada(processed)
    } else {
      // Para una sola serie
      const processed = datos
        .map((d) => ({
          [campoX]: d[campoX],
          [campoY]: parseFloat(d[campoY]) || 0,
        }))
        .sort((a, b) => {
          if (esFechaTemporal) {
            return new Date(a[campoX]).getTime() - new Date(b[campoX]).getTime()
          }
          return a[campoX].localeCompare(b[campoX])
        })

      setDataProcesada(processed)
      setSeriesUnicas([campoY])
      setSeriesVisibles({ [campoY]: true })
    }
  }, [datos, campoX, campoY, series])

  // Comprobar si una cadena es una fecha válida
  const isDateString = (str: string) => {
    if (!str) return false
    const date = new Date(str)
    return !isNaN(date.getTime())
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
            ))}
          </div>
        </div>
      )
    }
    return null
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