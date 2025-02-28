// components/visualizaciones/grafico-radar.tsx
"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface MetricaRadar {
  nombre: string
  campo: string
  min?: number
  max?: number
}

interface GraficoRadarProps {
  datos: any[]
  metricas: MetricaRadar[]
  etiqueta: string
  colorPor?: string
}

export function GraficoRadar({ datos, metricas, etiqueta, colorPor }: GraficoRadarProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !datos || datos.length === 0) return

    // Limpiar SVG
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    // Dimensiones
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight
    const margin = 80
    const radius = Math.min(width, height) / 2 - margin

    // Crear grupo principal centrado
    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`)

    // Procesar los datos
    const entidades = [...new Set(datos.map((d) => d[etiqueta]))]

    // Escala para cada dimensión/eje
    const angleScale = d3
      .scalePoint()
      .domain(metricas.map((m) => m.nombre))
      .range([0, 2 * Math.PI])

    // Crear escalas para cada dimensión
    const escalasRadiales = metricas.map((metrica) => {
      // Determinar min y max para la escala
      const min = metrica.min !== undefined ? metrica.min : d3.min(datos, (d) => d[metrica.campo]) || 0

      const max = metrica.max !== undefined ? metrica.max : d3.max(datos, (d) => d[metrica.campo]) || 1

      return {
        nombre: metrica.nombre,
        campo: metrica.campo,
        escala: d3.scaleLinear().domain([min, max]).range([0, radius]),
      }
    })

    // Escala de color
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(entidades)

    // Dibujar los ejes radiales
    escalasRadiales.forEach((eje) => {
      const angulo = angleScale(eje.nombre)
      if (angulo === undefined) return

      // Línea del eje
      g.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", radius * Math.cos(angulo - Math.PI / 2))
        .attr("y2", radius * Math.sin(angulo - Math.PI / 2))
        .attr("stroke", "#ddd")
        .attr("stroke-width", 1)

      // Etiqueta del eje
      g.append("text")
        .attr("x", (radius + 20) * Math.cos(angulo - Math.PI / 2))
        .attr("y", (radius + 20) * Math.sin(angulo - Math.PI / 2))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "12px")
        .text(eje.nombre)
    })

    // Círculos concéntricos para escala de referencia
    const circleCount = 4
    for (let i = 1; i <= circleCount; i++) {
      const r = (radius * i) / circleCount
      g.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", r)
        .attr("fill", "none")
        .attr("stroke", "#ddd")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3,3")
    }

    // Dibujar una forma para cada entidad
    entidades.forEach((entidad) => {
      const entityData = datos.filter((d) => d[etiqueta] === entidad)
      if (entityData.length === 0) return

      // Construir el path para el polígono radar
      const lineGenerator = d3
        .lineRadial<{ angulo: number; radio: number }>()
        .angle((d) => d.angulo)
        .radius((d) => d.radio)
        .curve(d3.curveLinearClosed)

      const pathData = escalasRadiales.map((eje) => {
        const angulo = angleScale(eje.nombre)
        if (angulo === undefined) return { angulo: 0, radio: 0 }

        const valor = entityData[0][eje.campo]
        return {
          angulo: angulo - Math.PI / 2, // Ajuste para que el primer eje apunte hacia arriba
          radio: eje.escala(valor),
        }
      })

      // Dibujar el polígono
      g.append("path")
        .datum(pathData)
        .attr("d", lineGenerator)
        .attr("fill", colorScale(entidad))
        .attr("fill-opacity", 0.3)
        .attr("stroke", colorScale(entidad))
        .attr("stroke-width", 2)

      // Añadir puntos en los vértices
      pathData.forEach((point, i) => {
        g.append("circle")
          .attr("cx", point.radio * Math.cos(point.angulo))
          .attr("cy", point.radio * Math.sin(point.angulo))
          .attr("r", 4)
          .attr("fill", colorScale(entidad))
      })
    })

    // Leyenda
    const legend = svg.append("g").attr("transform", `translate(${width - 120}, 20)`)

    entidades.forEach((entidad, i) => {
      const legendRow = legend.append("g").attr("transform", `translate(0, ${i * 20})`)

      legendRow.append("rect").attr("width", 10).attr("height", 10).attr("fill", colorScale(entidad))

      legendRow
        .append("text")
        .attr("x", 20)
        .attr("y", 10)
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .text(entidad)
    })
  }, [datos, metricas, etiqueta, colorPor])

  return <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet" />
}

