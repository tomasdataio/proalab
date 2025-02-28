"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface MapaChileProps {
  datos: any[]
  valorCampo: string
  colorEscala?: string
  titulo?: string
}

const regiones = [
  { id: "15", nombre: "Arica y Parinacota", posicion: { x: 20, y: 10 } },
  { id: "01", nombre: "Tarapacá", posicion: { x: 25, y: 25 } },
  { id: "02", nombre: "Antofagasta", posicion: { x: 30, y: 50 } },
  { id: "03", nombre: "Atacama", posicion: { x: 35, y: 80 } },
  { id: "04", nombre: "Coquimbo", posicion: { x: 40, y: 110 } },
  { id: "05", nombre: "Valparaíso", posicion: { x: 45, y: 135 } },
  { id: "13", nombre: "Metropolitana", posicion: { x: 55, y: 145 } },
  { id: "06", nombre: "O'Higgins", posicion: { x: 50, y: 160 } },
  { id: "07", nombre: "Maule", posicion: { x: 55, y: 175 } },
  { id: "16", nombre: "Ñuble", posicion: { x: 60, y: 190 } },
  { id: "08", nombre: "Biobío", posicion: { x: 58, y: 205 } },
  { id: "09", nombre: "Araucanía", posicion: { x: 60, y: 225 } },
  { id: "14", nombre: "Los Ríos", posicion: { x: 62, y: 245 } },
  { id: "10", nombre: "Los Lagos", posicion: { x: 65, y: 270 } },
  { id: "11", nombre: "Aysén", posicion: { x: 70, y: 320 } },
  { id: "12", nombre: "Magallanes", posicion: { x: 80, y: 390 } },
]

export function MapaChileShadcn({
  datos,
  valorCampo,
  colorEscala = "blue",
  titulo = "Mapa de Chile"
}: MapaChileProps) {
  const [valoresNormalizados, setValoresNormalizados] = useState<Map<string, number>>(new Map())
  const [min, setMin] = useState<number>(0)
  const [max, setMax] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Validación de datos
      if (!datos || !Array.isArray(datos) || datos.length === 0) {
        setValoresNormalizados(new Map())
        setMin(0)
        setMax(0)
        return
      }

      // Verificar que el campo de valor existe
      const sampleData = datos[0]
      if (!sampleData || typeof sampleData !== 'object' || !(valorCampo in sampleData)) {
        setError(`El campo ${valorCampo} no existe en los datos`)
        setValoresNormalizados(new Map())
        setMin(0)
        setMax(0)
        return
      }

      // Verificar que existe el campo región
      if (!('region' in sampleData)) {
        setError(`Los datos no contienen el campo 'region'`)
        setValoresNormalizados(new Map())
        setMin(0)
        setMax(0)
        return
      }

      // Procesar datos para normalizar los valores
      const valoresPorRegion = new Map<string, number>()
      let minValor = Infinity
      let maxValor = -Infinity
      let algunValorValido = false

      // Mapear nombres de regiones a sus valores, con validación
      datos.forEach(d => {
        if (!d || typeof d !== 'object') return
        
        const nombreRegion = d.region || ""
        // Verificar que es una región válida (existe en nuestro arreglo de regiones)
        const regionValida = regiones.some(r => r.nombre === nombreRegion)
        
        if (!nombreRegion || !regionValida) return
        
        const valorRaw = d[valorCampo]
        const valor = typeof valorRaw === 'number' ? valorRaw : parseFloat(valorRaw)
        
        if (isNaN(valor)) return
        
        valoresPorRegion.set(nombreRegion, valor)
        algunValorValido = true
        
        if (valor < minValor) minValor = valor
        if (valor > maxValor) maxValor = valor
      })

      // Verificar si obtuvimos al menos un valor válido
      if (!algunValorValido) {
        setError("No se encontraron valores válidos para las regiones")
        setValoresNormalizados(new Map())
        setMin(0)
        setMax(0)
        return
      }

      setMin(minValor)
      setMax(maxValor)
      setValoresNormalizados(valoresPorRegion)
      setError(null)
    } catch (err) {
      console.error("Error al procesar datos del mapa:", err)
      setError("Error al procesar los datos del mapa")
      setValoresNormalizados(new Map())
      setMin(0)
      setMax(0)
    }
  }, [datos, valorCampo])

  // Función para generar color basado en el valor normalizado
  const getColor = (nombreRegion: string) => {
    const valor = valoresNormalizados.get(nombreRegion) || 0
    
    if (max === min) return `hsl(var(--${colorEscala}-500))`
    
    const normalizado = (valor - min) / (max - min)
    
    // Determinamos intensidad basada en el valor normalizado
    const intensidad = Math.floor(normalizado * 9) * 100
    
    // Usamos la escala de color especificada
    return `hsl(var(--${colorEscala}-${intensidad || 100}))`
  }

  // Función para obtener tamaño basado en el valor normalizado
  const getSize = (nombreRegion: string) => {
    const valor = valoresNormalizados.get(nombreRegion) || 0
    
    if (max === min) return 30
    
    const normalizado = (valor - min) / (max - min)
    return 20 + normalizado * 30
  }

  // Manejo de errores
  if (error) {
    return (
      <Card className="w-full h-full">
        {titulo && (
          <CardHeader className="p-4">
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

  // Mostrar un mensaje si no hay datos
  if (valoresNormalizados.size === 0) {
    return (
      <Card className="w-full h-full">
        {titulo && (
          <CardHeader className="p-4">
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
        <CardHeader className="p-4">
          <CardTitle>{titulo}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="relative p-0 w-full h-[500px]">
        <div className="relative w-full h-full bg-background border border-border rounded-md overflow-hidden">
          <div className="absolute top-0 right-0 p-4 space-y-2 bg-background/90 rounded-bl-md border-l border-b border-border z-10">
            <p className="text-sm font-medium">Leyenda</p>
            <div className="flex items-center justify-between text-xs">
              <span>{min.toLocaleString()}</span>
              <div className="w-24 h-2 mx-2 rounded-full" style={{ 
                background: `linear-gradient(to right, hsl(var(--${colorEscala}-100)), hsl(var(--${colorEscala}-900)))` 
              }}></div>
              <span>{max.toLocaleString()}</span>
            </div>
          </div>
          
          <TooltipProvider>
            {regiones.map(region => (
              <Tooltip key={region.id}>
                <TooltipTrigger asChild>
                  <div 
                    className="absolute rounded-full hover:ring-2 hover:ring-ring flex items-center justify-center cursor-pointer transition-all duration-200 select-none"
                    style={{
                      left: `${region.posicion.x}%`,
                      top: `${region.posicion.y}px`,
                      width: `${getSize(region.nombre)}px`,
                      height: `${getSize(region.nombre)}px`,
                      backgroundColor: getColor(region.nombre),
                      opacity: valoresNormalizados.has(region.nombre) ? 1 : 0.3,
                    }}
                  >
                    <span className="text-[8px] font-bold text-background">{region.id}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="space-y-1">
                    <p className="font-medium">{region.nombre}</p>
                    <Badge variant="outline">
                      {valorCampo}: {valoresNormalizados.get(region.nombre)?.toLocaleString() || "Sin datos"}
                    </Badge>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
} 