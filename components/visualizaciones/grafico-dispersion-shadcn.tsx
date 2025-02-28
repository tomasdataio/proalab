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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Validar datos de entrada
      if (!datos || !Array.isArray(datos) || datos.length === 0) {
        setDataProcessed([])
        setUniqueCategories([])
        return
      }

      // Verificar si los campos necesarios existen en los datos
      const sampleData = datos[0]
      if (!sampleData || typeof sampleData !== 'object' || !(campoX in sampleData) || !(campoY in sampleData)) {
        setError(`Los campos ${campoX} o ${campoY} no existen en los datos`)
        setDataProcessed([])
        setUniqueCategories([])
        return
      }

      // Validar campo de etiqueta si se proporciona
      if (etiqueta && !sampleData[etiqueta]) {
        setError(`El campo de etiqueta ${etiqueta} no existe en los datos`)
        setDataProcessed([])
        setUniqueCategories([])
        return
      }

      // Validar campo de tamaño si se proporciona
      if (tamano && !sampleData[tamano]) {
        setError(`El campo de tamaño ${tamano} no existe en los datos`)
        setDataProcessed([])
        setUniqueCategories([])
        return
      }
      
      // Limitar a un máximo de 500 puntos de datos para evitar problemas de rendimiento
      const limitedData = datos.slice(0, 500)
      
      // Procesamiento de datos para la visualización con validación
      const processedData = limitedData.map(d => {
        // Validar y convertir valores X e Y
        const xValue = parseFloat(d[campoX])
        const yValue = parseFloat(d[campoY])
        
        if (isNaN(xValue) || isNaN(yValue)) {
          return null
        }
        
        return {
          x: xValue,
          y: yValue,
          z: tamano ? (parseFloat(d[tamano]) || 5) : 10,
          categoria: etiqueta ? (d[etiqueta] || 'Sin categoría') : 'default',
          // Guardamos los datos originales para mostrarlos en el tooltip
          original: d
        }
      }).filter((d): d is NonNullable<typeof d> => d !== null)
      
      // Si hay una categoría, agrupamos los datos por ella
      let categories: string[] = ['default']
      if (etiqueta) {
        // Extraer categorías únicas y limitar a un máximo de 10
        const uniqueCategoriesSet = new Set(processedData.map(d => d.categoria))
        categories = Array.from(uniqueCategoriesSet).slice(0, 10)
      }
      
      setUniqueCategories(categories)
      setDataProcessed(processedData)
      setError(null)
    } catch (err) {
      console.error("Error al procesar datos del gráfico de dispersión:", err)
      setError("Error al procesar los datos del gráfico")
      setDataProcessed([])
      setUniqueCategories([])
    }
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

  if (dataProcessed.length === 0) {
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