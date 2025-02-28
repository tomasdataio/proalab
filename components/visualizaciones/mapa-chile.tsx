// components/visualizaciones/mapa-chile.tsx
"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface MapaChileProps {
  datos: any[]
  valorCampo: string
  colorEscala: string
}

export function MapaChile({ datos, valorCampo, colorEscala }: MapaChileProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !datos || datos.length === 0) return

    // Limpiar SVG
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    // Crear escalas de color
    const valoresArray = datos.map((d) => d[valorCampo])
    const colorScale = d3
      .scaleSequential()
      .domain([Math.min(...valoresArray), Math.max(...valoresArray)])
      .interpolator(
        colorEscala === "blues"
          ? d3.interpolateBlues
          : colorEscala === "reds"
            ? d3.interpolateReds
            : d3.interpolateViridis,
      )

    // Dibujar regiones (simplificado)
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // Ejemplo simplificado - en un caso real cargarías un GeoJSON de Chile
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .text("Mapa de Chile (Placeholder)")
      .attr("fill", "#888")

    // Para cada región en los datos, creamos un círculo representativo
    datos.forEach((region, i) => {
      svg
        .append("circle")
        .attr("cx", width / 2)
        .attr("cy", 50 + i * 30)
        .attr("r", 10)
        .attr("fill", colorScale(region[valorCampo]))
        .append("title")
        .text(`${region.region}: ${region[valorCampo]}`)

      svg
        .append("text")
        .attr("x", width / 2 + 20)
        .attr("y", 55 + i * 30)
        .text(`${region.region}: ${region[valorCampo]}`)
        .attr("font-size", "12px")
    })
  }, [datos, valorCampo, colorEscala])

  return <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" />
}

