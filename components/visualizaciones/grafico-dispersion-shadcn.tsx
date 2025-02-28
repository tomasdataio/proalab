"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ZAxis
} from "recharts"

interface GraficoDispersionProps {
  datos: any[]
  campoX: string
  campoY: string
  etiqueta?: string
  tamano?: string
  formatoX?: (valor: number) => string
  formatoY?: (valor: number) => string
  titulo?: string
  colorPalette?: string[]
}

export function GraficoDispersionShadcn({
  datos,
  campoX,
  campoY,
  etiqueta,
  tamano,
  formatoX = (v) => `${v}`,
  formatoY = (v) => `${v}`,
  titulo = "",
  colorPalette = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
}: GraficoDispersionProps) {
  const [dataProcessed, setDataProcessed] = useState<any[]>([])
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([])

  useEffect(() => {
    if (!datos || datos.length === 0) return
    
    // Procesamiento de datos para la visualización
    const processedData = datos.map(d => ({
      x: parseFloat(d[campoX]) || 0,
      y: parseFloat(d[campoY]) || 0,
      z: tamano ? (parseFloat(d[tamano]) || 5) : 10,
      categoria: etiqueta ? d[etiqueta] : 'default',
      // Guardamos los datos originales para mostrarlos en el tooltip
      original: d
    }))
    
    // Si hay una categoría, agrupamos los datos por ella
    let categories: string[] = ['default']
    if (etiqueta) {
      categories = Array.from(new Set(processedData.map(d => d.categoria)))
    }
    
    setUniqueCategories(categories)
    setDataProcessed(processedData)
  }, [datos, campoX, campoY, etiqueta, tamano])

  // Configuración para el tooltip personalizado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-md">
          {etiqueta && (
            <p className="font-medium mb-1">{data.categoria}</p>
          )}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <span className="text-muted-foreground">{campoX}:</span>
            <span className="font-medium">{formatoX(data.x)}</span>
            <span className="text-muted-foreground">{campoY}:</span>
            <span className="font-medium">{formatoY(data.y)}</span>
            {tamano && (
              <>
                <span className="text-muted-foreground">{tamano}:</span>
                <span className="font-medium">{data.z}</span>
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Agrupar datos por categoría
  const getDataByCategory = (categoria: string) => {
    return dataProcessed.filter(d => d.categoria === categoria);
  };

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
            <ScatterChart
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name={campoX} 
                tickFormatter={formatoX}
                tick={{ fill: "hsl(var(--foreground))" }}
                tickLine={{ stroke: "hsl(var(--muted))" }}
                axisLine={{ stroke: "hsl(var(--muted))" }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name={campoY} 
                tickFormatter={formatoY}
                tick={{ fill: "hsl(var(--foreground))" }}
                tickLine={{ stroke: "hsl(var(--muted))" }}
                axisLine={{ stroke: "hsl(var(--muted))" }}
              />
              <ZAxis type="number" dataKey="z" range={[60, 400]} />
              <Tooltip content={<CustomTooltip />} />
              
              {etiqueta ? (
                <>
                  <Legend 
                    wrapperStyle={{
                      paddingTop: 20,
                      color: "hsl(var(--foreground))"
                    }}
                  />
                  {uniqueCategories.map((categoria, index) => (
                    <Scatter
                      key={categoria}
                      name={categoria}
                      data={getDataByCategory(categoria)}
                      fill={colorPalette[index % colorPalette.length]}
                    />
                  ))}
                </>
              ) : (
                <Scatter 
                  name="Datos" 
                  data={dataProcessed} 
                  fill={colorPalette[0]} 
                />
              )}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 