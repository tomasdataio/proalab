"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MapaCalorProps {
  datos: Record<string, any>[]
  filas: string
  columnas: string
  valores: string
  colorEscala?: "blues" | "reds" | "greens" | "purples" | "viridis"
  titulo?: string
}

export function MapaCalorShadcn({
  datos,
  filas,
  columnas,
  valores,
  colorEscala = "blues",
  titulo = "",
}: MapaCalorProps) {
  const [matrizDatos, setMatrizDatos] = useState<{ 
    etiquetasFilas: string[], 
    etiquetasColumnas: string[], 
    matriz: number[][]
  }>({
    etiquetasFilas: [],
    etiquetasColumnas: [],
    matriz: []
  })
  const [min, setMin] = useState<number>(0)
  const [max, setMax] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  // Función para obtener el color según la escala
  const getColorForValue = (valor: number) => {
    if (valor === undefined || valor === null) return "hsl(var(--muted))"
    
    const normalizado = (valor - min) / (max - min) || 0
    const intensidad = Math.floor(normalizado * 9) * 100 || 100

    // Mapeo de escalas a colores de shadcn
    const escalaMap: Record<string, string> = {
      "blues": "primary",
      "reds": "destructive",
      "greens": "success",
      "purples": "accent",
      "viridis": "primary", // Fallback a primary si no hay un equivalente directo
    }
    
    const colorBase = escalaMap[colorEscala] || "primary"
    return `hsl(var(--${colorBase}-${intensidad || 100}))`
  }

  useEffect(() => {
    try {
      // Validar datos de entrada
      if (!datos || !Array.isArray(datos) || datos.length === 0) {
        setMatrizDatos({ etiquetasFilas: [], etiquetasColumnas: [], matriz: [] })
        return
      }

      // Extraer etiquetas únicas para filas y columnas
      const etiquetasFilasSet = new Set<string>()
      const etiquetasColumnasSet = new Set<string>()
      
      datos.forEach(d => {
        if (d && d[filas]) etiquetasFilasSet.add(String(d[filas]))
        if (d && d[columnas]) etiquetasColumnasSet.add(String(d[columnas]))
      })
      
      // Limitar el número de filas y columnas para evitar problemas de memoria
      const etiquetasFilas = Array.from(etiquetasFilasSet).slice(0, 50)
      const etiquetasColumnas = Array.from(etiquetasColumnasSet).slice(0, 50).sort()
      
      // Verificación de seguridad para evitar matrices demasiado grandes
      if (etiquetasFilas.length > 0 && etiquetasColumnas.length > 0) {
        if (etiquetasFilas.length * etiquetasColumnas.length > 2500) {
          // Limitar aún más si el producto es demasiado grande (50x50 = 2500 celdas como máximo)
          const newRowCount = Math.min(etiquetasFilas.length, Math.floor(Math.sqrt(2500)))
          const newColCount = Math.min(etiquetasColumnas.length, Math.floor(2500 / newRowCount))
          
          // Redimensionar arrays
          const limitedFilas = etiquetasFilas.slice(0, newRowCount)
          const limitedColumnas = etiquetasColumnas.slice(0, newColCount)
          
          // Crear matriz para el mapa de calor con tamaño seguro
          const matriz: number[][] = Array(limitedFilas.length).fill(0).map(() => 
            Array(limitedColumnas.length).fill(undefined)
          )
          
          // Llenar la matriz con valores y encontrar min/max
          let minValor = Infinity
          let maxValor = -Infinity
          
          datos.forEach(d => {
            if (!d) return
            
            const filaIndex = limitedFilas.indexOf(String(d[filas]))
            const columnaIndex = limitedColumnas.indexOf(String(d[columnas]))
            
            if (filaIndex !== -1 && columnaIndex !== -1) {
              const valor = parseFloat(d[valores]) || 0
              matriz[filaIndex][columnaIndex] = valor
              
              if (valor < minValor) minValor = valor
              if (valor > maxValor) maxValor = valor
            }
          })
          
          setMin(minValor === Infinity ? 0 : minValor)
          setMax(maxValor === -Infinity ? 1 : maxValor)
          setMatrizDatos({ etiquetasFilas: limitedFilas, etiquetasColumnas: limitedColumnas, matriz })
          setError(null)
        } else {
          // Caso normal, matriz de tamaño razonable
          // Crear matriz para el mapa de calor
          const matriz: number[][] = Array(etiquetasFilas.length).fill(0).map(() => 
            Array(etiquetasColumnas.length).fill(undefined)
          )
          
          // Llenar la matriz con valores y encontrar min/max
          let minValor = Infinity
          let maxValor = -Infinity
          
          datos.forEach(d => {
            if (!d) return
            
            const filaIndex = etiquetasFilas.indexOf(String(d[filas]))
            const columnaIndex = etiquetasColumnas.indexOf(String(d[columnas]))
            
            if (filaIndex !== -1 && columnaIndex !== -1) {
              const valor = parseFloat(d[valores]) || 0
              matriz[filaIndex][columnaIndex] = valor
              
              if (valor < minValor) minValor = valor
              if (valor > maxValor) maxValor = valor
            }
          })
          
          setMin(minValor === Infinity ? 0 : minValor)
          setMax(maxValor === -Infinity ? 1 : maxValor)
          setMatrizDatos({ etiquetasFilas, etiquetasColumnas, matriz })
          setError(null)
        }
      } else {
        // No hay suficientes datos para crear la matriz
        setMatrizDatos({ etiquetasFilas: [], etiquetasColumnas: [], matriz: [] })
      }
    } catch (err) {
      console.error("Error al procesar datos del mapa de calor:", err)
      setError("Error al procesar los datos")
      setMatrizDatos({ etiquetasFilas: [], etiquetasColumnas: [], matriz: [] })
    }
  }, [datos, filas, columnas, valores])

  // Ajustar tamaños de celdas según el número de elementos
  const cellWidth = Math.max(30, 600 / Math.max(1, matrizDatos.etiquetasColumnas.length))
  const cellHeight = Math.max(30, 400 / Math.max(1, matrizDatos.etiquetasFilas.length))
  
  return (
    <Card className="w-full h-full">
      {titulo && (
        <CardHeader>
          <CardTitle>{titulo}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-4">
        {error ? (
          <div className="w-full h-full flex items-center justify-center text-destructive">
            {error}
          </div>
        ) : matrizDatos.etiquetasFilas.length === 0 || matrizDatos.etiquetasColumnas.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No hay datos suficientes para visualizar
          </div>
        ) : (
          <div className="w-full overflow-auto">
            <div className="flex flex-col">
              {/* Encabezados de columnas */}
              <div className="flex border-b">
                <div style={{ width: 150 }} className="flex-shrink-0"></div>
                {matrizDatos.etiquetasColumnas.map((col, i) => (
                  <div 
                    key={`col-${i}`} 
                    className="text-center p-2 text-xs font-medium" 
                    style={{ width: cellWidth, minWidth: cellWidth }}
                  >
                    {col}
                  </div>
                ))}
              </div>
              
              {/* Filas con datos */}
              <TooltipProvider>
                {matrizDatos.etiquetasFilas.map((fila, i) => (
                  <div key={`row-${i}`} className="flex border-b">
                    <div 
                      className="p-2 text-xs font-medium flex items-center" 
                      style={{ width: 150, minWidth: 150 }}
                    >
                      {fila}
                    </div>
                    
                    {matrizDatos.matriz[i]?.map((valor, j) => (
                      <Tooltip key={`cell-${i}-${j}`}>
                        <TooltipTrigger asChild>
                          <div
                            className="m-1 border border-border hover:ring-1 hover:ring-ring cursor-default transition-colors"
                            style={{
                              width: cellWidth - 2,
                              height: cellHeight - 2,
                              backgroundColor: getColorForValue(valor),
                            }}
                          ></div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-sm">
                            <div className="font-medium">{fila}</div>
                            <div className="text-muted-foreground">{matrizDatos.etiquetasColumnas[j]}</div>
                            <div className="font-bold mt-1">{valor !== undefined ? valor.toLocaleString() : 'Sin datos'}</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                ))}
              </TooltipProvider>
            </div>
            
            {/* Leyenda */}
            <div className="mt-6 flex items-center justify-center">
              <div className="text-xs mr-2">{min.toLocaleString()}</div>
              <div 
                className="h-3 w-48 rounded-full" 
                style={{ 
                  background: `linear-gradient(to right, hsl(var(--${colorEscala === 'reds' ? 'destructive' : 'primary'}-100)), hsl(var(--${colorEscala === 'reds' ? 'destructive' : 'primary'}-900)))` 
                }}
              ></div>
              <div className="text-xs ml-2">{max.toLocaleString()}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 