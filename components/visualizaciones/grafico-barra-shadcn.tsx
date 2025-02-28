"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface GraficoBarraProps {
  datos: any[]
  campoX: string
  campoY: string
  agruparPor?: string
  apilado?: boolean
  titulo?: string
  colorPalette?: string[]
}

export function GraficoBarraShadcn({
  datos,
  campoX,
  campoY,
  agruparPor,
  apilado = false,
  titulo = "",
  colorPalette = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"],
}: GraficoBarraProps) {
  const [dataProcessed, setDataProcessed] = useState<any[]>([])
  const [keys, setKeys] = useState<string[]>([])

  useEffect(() => {
    if (!datos || datos.length === 0) return
    
    // Procesamiento de datos
    let processedData: any[] = []
    let groupKeys: string[] = []

    if (agruparPor) {
      // Si tenemos un campo para agrupar, procesamos los datos acordemente
      const uniqueXValues = Array.from(new Set(datos.map(d => d[campoX])))
      const uniqueGroupValues = Array.from(new Set(datos.map(d => d[agruparPor])))
      
      groupKeys = uniqueGroupValues as string[]
      
      processedData = uniqueXValues.map(xValue => {
        const obj: any = { [campoX]: xValue }
        
        uniqueGroupValues.forEach(groupValue => {
          const filtered = datos.filter(d => d[campoX] === xValue && d[agruparPor] === groupValue)
          const sum = filtered.reduce((acc, curr) => acc + (parseFloat(curr[campoY]) || 0), 0)
          obj[groupValue as string] = sum
        })
        
        return obj
      })
    } else {
      // Caso simple sin agrupación
      processedData = datos.map(d => ({
        [campoX]: d[campoX],
        [campoY]: parseFloat(d[campoY]) || 0
      }))
      
      groupKeys = [campoY]
    }
    
    setDataProcessed(processedData)
    setKeys(groupKeys)
  }, [datos, campoX, campoY, agruparPor])

  // Definir el tipo de stackOffset
  const stackOffset = apilado ? "normal" : undefined
  
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
            <BarChart
              data={dataProcessed}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              stackOffset={stackOffset}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey={campoX}
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
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))"
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: 20,
                  color: "hsl(var(--foreground))"
                }}
              />
              {keys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId={apilado ? "stack" : undefined}
                  fill={colorPalette[index % colorPalette.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 