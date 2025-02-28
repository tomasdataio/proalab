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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Validar entrada
      if (!datos || !Array.isArray(datos) || datos.length === 0) {
        setDataProcessed([])
        setKeys([])
        return
      }

      // Verificar si los campos necesarios existen en los datos
      const sampleData = datos[0]
      if (!sampleData || typeof sampleData !== 'object' || !(campoX in sampleData) || !(campoY in sampleData)) {
        setError(`Los campos ${campoX} o ${campoY} no existen en los datos`)
        setDataProcessed([])
        setKeys([])
        return
      }

      // Validar campo de agrupación si existe
      if (agruparPor && (!sampleData[agruparPor] && sampleData[agruparPor] !== 0)) {
        setError(`El campo de agrupación ${agruparPor} no existe en los datos`)
        setDataProcessed([])
        setKeys([])
        return
      }
      
      // Procesamiento de datos
      let processedData: any[] = []
      let groupKeys: string[] = []

      if (agruparPor) {
        // Si tenemos un campo para agrupar, procesamos los datos acordemente
        // Limitar la cantidad de valores únicos para el eje X (máximo 50)
        const uniqueXValuesSet = new Set(datos.map(d => d[campoX]))
        const uniqueXValues = Array.from(uniqueXValuesSet).slice(0, 50)
        
        // Limitar la cantidad de grupos (máximo 10)
        const uniqueGroupValuesSet = new Set(datos.map(d => d[agruparPor]))
        const uniqueGroupValues = Array.from(uniqueGroupValuesSet).slice(0, 10)
        
        groupKeys = uniqueGroupValues as string[]
        
        processedData = uniqueXValues.map(xValue => {
          const obj: any = { [campoX]: xValue }
          
          uniqueGroupValues.forEach(groupValue => {
            const filtered = datos.filter(d => d[campoX] === xValue && d[agruparPor] === groupValue)
            // Limitar la cantidad de elementos a procesar en la reducción
            const limitedFiltered = filtered.slice(0, 1000)
            const sum = limitedFiltered.reduce((acc, curr) => {
              const value = parseFloat(curr[campoY])
              return acc + (isNaN(value) ? 0 : value)
            }, 0)
            obj[groupValue as string] = sum
          })
          
          return obj
        })
      } else {
        // Caso simple sin agrupación
        // Limitar a 100 elementos para evitar problemas de memoria
        const limitedData = datos.slice(0, 100)
        processedData = limitedData.map(d => ({
          [campoX]: d[campoX],
          [campoY]: parseFloat(d[campoY]) || 0
        }))
        
        groupKeys = [campoY]
      }
      
      setDataProcessed(processedData)
      setKeys(groupKeys)
      setError(null)
    } catch (err) {
      console.error("Error en el procesamiento de datos:", err)
      setError("Error al procesar los datos del gráfico")
      setDataProcessed([])
      setKeys([])
    }
  }, [datos, campoX, campoY, agruparPor])

  // Definir el tipo de stackOffset
  const stackOffset = apilado ? "normal" : undefined
  
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

  if (dataProcessed.length === 0 || keys.length === 0) {
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