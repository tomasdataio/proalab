// components/visualizaciones/mapa-calor.tsx
"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface MapaCalorProps {
  datos: any[]
  filas: string
  columnas: string
  valores: string
  colorEscala: string
}

export function MapaCalor({ datos, filas, columnas, valores, colorEscala }: MapaCalorProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !datos || datos.length === 0) return

    // Limpiar SVG
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    // Dimensiones
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight
    const margin = { top: 50, right: 50, bottom: 100, left: 100 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Crear grupo principal
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Procesar los datos para el mapa de calor
    const filasUnicas = [...new Set(datos.map((d) => d[filas]))]
    const columnasUnicas = [...new Set(datos.map((d) => d[columnas]))]

    // Crear una matriz de datos
    const matrixData = filasUnicas.map((fila) => {
      return columnasUnicas.map((columna) => {
        const item = datos.find((d) => d[filas] === fila && d[columnas] === columna)
        return {
          fila,
          columna,
          valor: item ? item[valores] : 0,
        }
      })
    })

    // Escalas
    const xScale = d3.scaleBand().domain(columnasUnicas).range([0, innerWidth]).padding(0.05)

    const yScale = d3.scaleBand().domain(filasUnicas).range([0, innerHeight]).padding(0.05)

    // Escala de color
    const valoresArray = datos.map((d) => d[valores])
    const colorInterpolator =
      colorEscala === "viridis"
        ? d3.interpolateViridis
        : colorEscala === "inferno"
          ? d3.interpolateInferno
          : colorEscala === "plasma"
            ? d3.interpolatePlasma
            : colorEscala === "reds"
              ? d3.interpolateReds
              : colorEscala === "blues"
                ? d3.interpolateBlues
                : d3.interpolateYlOrRd

    const colorScale = d3
      .scaleSequential()
      .domain([Math.min(...valoresArray), Math.max(...valoresArray)])
      .interpolator(colorInterpolator)

    // Ejes
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")

    g.append("g").call(yAxis)

    // Dibujar celdas del mapa de calor
    matrixData.forEach((filaDatos, filaIndex) => {
      filaDatos.forEach((celda, columnaIndex) => {
        g.append("rect")
          .attr("x", xScale(celda.columna) || 0)
          .attr("y", yScale(celda.fila) || 0)
          .attr("width", xScale.bandwidth())
          .attr("height", yScale.bandwidth())
          .attr("fill", colorScale(celda.valor))
          .append("title")
          .text(`${celda.fila}, ${celda.columna}: ${celda.valor}`)

        // Añadir texto de valor si hay espacio suficiente
        if (xScale.bandwidth() > 30 && yScale.bandwidth() > 20) {
          g.append("text")
            .attr("x", (xScale(celda.columna) || 0) + xScale.bandwidth() / 2)
            .attr("y", (yScale(celda.fila) || 0) + yScale.bandwidth() / 2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .style("font-size", "10px")
            .style("fill", d3.lab(colorScale(celda.valor)).l < 50 ? "white" : "black")
            .text(celda.valor.toFixed(1))
        }
      })
    })

    // Leyenda de color
    const legendWidth = 20
    const legendHeight = innerHeight

    const legend = svg.append("g").attr("transform", `translate(${width - margin.right + 20},${margin.top})`)

    // Escala para la leyenda
    const legendScale = d3
      .scaleLinear()
      .domain([Math.min(...valoresArray), Math.max(...valoresArray)])
      .range([legendHeight, 0])

    // Gradiente de color
    const defs = svg.append("defs")
    const gradient = defs
      .append("linearGradient")
      .attr("id", "color-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", legendHeight)
      .attr("x2", 0)
      .attr("y2", 0)

    // Pasos de gradiente
    const steps = 10
    for (let i = 0; i <= steps; i++) {
      const offset = i / steps
      const value = Math.min(...valoresArray) + offset * (Math.max(...valoresArray) - Math.min(...valoresArray))
      gradient
        .append("stop")
        .attr("offset", `${offset * 100}%`)
        .attr("stop-color", colorScale(value))
    }

    // Rectángulo de leyenda
    legend.append("rect").attr("width", legendWidth).attr("height", legendHeight).style("fill", "url(#color-gradient)")

    // Eje de leyenda
    const legendAxis = d3.axisRight(legendScale).ticks(5)

    legend.append("g").attr("transform", `translate(${legendWidth},0)`).call(legendAxis)

    // Título de la leyenda
    legend
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -legendHeight / 2)
      .attr("y", -30)
      .attr("text-anchor", "middle")
      .text("Valor")
  }, [datos, filas, columnas, valores, colorEscala])

  return <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" />
}

