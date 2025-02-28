// components/visualizaciones/grafico-dispersion.tsx
"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface GraficoDispersionProps {
  datos: any[]
  campoX: string
  campoY: string
  tamano?: string
  color?: string
  etiqueta?: string
  formatoX?: (value: any) => string
  formatoY?: (value: any) => string
}

export function GraficoDispersion({
  datos,
  campoX,
  campoY,
  tamano,
  color,
  etiqueta,
  formatoX = (d) => d.toString(),
  formatoY = (d) => d.toString(),
}: GraficoDispersionProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !datos || datos.length === 0) return

    // Limpiar SVG
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    // Dimensiones
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight
    const margin = { top: 20, right: 80, bottom: 60, left: 80 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Crear grupo principal
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Escalas
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(datos, (d) => d[campoX]) || 0])
      .range([0, innerWidth])
      .nice()

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(datos, (d) => d[campoY]) || 0])
      .range([innerHeight, 0])
      .nice()

    let rScale
    if (tamano) {
      const minSize = 5
      const maxSize = 20
      rScale = d3
        .scaleSqrt()
        .domain([0, d3.max(datos, (d) => d[tamano]) || 0])
        .range([minSize, maxSize])
    }

    let colorScale
    if (color) {
      const uniqueCategories = [...new Set(datos.map((d) => d[color]))]
      colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(uniqueCategories)
    }

    // Ejes
    const xAxis = d3.axisBottom(xScale).tickFormat(formatoX as any)

    const yAxis = d3.axisLeft(yScale).tickFormat(formatoY as any)

    g.append("g").attr("transform", `translate(0,${innerHeight})`).call(xAxis)

    g.append("g").call(yAxis)

    // Etiquetas de ejes
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 40)
      .attr("text-anchor", "middle")
      .text(campoX)

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -60)
      .attr("text-anchor", "middle")
      .text(campoY)

    // Dibujar puntos
    g.selectAll(".point")
      .data(datos)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", (d) => xScale(d[campoX]))
      .attr("cy", (d) => yScale(d[campoY]))
      .attr("r", (d) => (tamano ? rScale!(d[tamano]) : 6))
      .attr("fill", (d) => (color ? colorScale!(d[color]) : "#3B82F6"))
      .attr("opacity", 0.7)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .append("title")
      .text((d) => (etiqueta ? d[etiqueta] : `${campoX}: ${d[campoX]}, ${campoY}: ${d[campoY]}`))

    // Leyenda para color
    if (color) {
      const uniqueCategories = [...new Set(datos.map((d) => d[color]))]
      const legend = svg.append("g").attr("transform", `translate(${width - margin.right + 20}, ${margin.top})`)

      uniqueCategories.forEach((category, i) => {
        const legendRow = legend.append("g").attr("transform", `translate(0, ${i * 20})`)

        legendRow.append("circle").attr("r", 6).attr("fill", colorScale!(category))

        legendRow
          .append("text")
          .attr("x", 15)
          .attr("y", 5)
          .attr("text-anchor", "start")
          .style("font-size", "12px")
          .text(category)
      })
    }

    // Leyenda para tamaño si aplica
    if (tamano) {
      const sizeLegend = svg
        .append("g")
        .attr(
          "transform",
          `translate(${width - margin.right + 20}, ${margin.top + (color ? uniqueCategories.length * 20 + 30 : 0)})`,
        )

      sizeLegend.append("text").attr("y", -10).attr("text-anchor", "start").style("font-size", "12px").text(tamano)

      const sizes = [
        d3.min(datos, (d) => d[tamano]) || 0,
        (d3.min(datos, (d) => d[tamano]) || 0 + d3.max(datos, (d) => d[tamano]) || 0) / 2,
        d3.max(datos, (d) => d[tamano]) || 0,
      ]

      sizes.forEach((size, i) => {
        sizeLegend
          .append("circle")
          .attr("cy", i * 25)
          .attr("r", rScale!(size))
          .attr("fill", "none")
          .attr("stroke", "#333")

        sizeLegend
          .append("text")
          .attr("x", 25)
          .attr("y", i * 25 + 5)
          .attr("text-anchor", "start")
          .style("font-size", "12px")
          .text(Math.round(size).toString())
      })
    }
  }, [datos, campoX, campoY, tamano, color, etiqueta, formatoX, formatoY])

  return <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" />
}

