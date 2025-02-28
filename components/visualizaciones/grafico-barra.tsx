// components/visualizaciones/grafico-barra.tsx
"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface GraficoBarraProps {
  datos: any[]
  campoX: string
  campoY: string
  agruparPor?: string
  apilado?: boolean
}

export function GraficoBarra({ datos, campoX, campoY, agruparPor, apilado = false }: GraficoBarraProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !datos || datos.length === 0) return

    // Limpiar SVG
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    // Dimensiones
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight
    const margin = { top: 20, right: 30, bottom: 60, left: 60 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Crear grupo principal
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Procesamiento de datos
    let processedData
    let groups

    if (agruparPor) {
      // Si tenemos un campo para agrupar, procesamos los datos acordemente
      const nestedData = d3.group(datos, (d) => d[campoX])
      const categories = [...new Set(datos.map((d) => d[agruparPor]))]

      processedData = Array.from(nestedData, ([key, values]) => {
        const obj: any = { [campoX]: key }
        categories.forEach((cat) => {
          const match = values.find((v) => v[agruparPor] === cat)
          obj[cat] = match ? match[campoY] : 0
        })
        return obj
      })

      groups = categories
    } else {
      // Caso simple sin agrupación
      processedData = datos.map((d) => ({ [campoX]: d[campoX], value: d[campoY] }))
      groups = ["value"]
    }

    // Escalas
    const x0Scale = d3
      .scaleBand()
      .domain(processedData.map((d) => d[campoX]))
      .range([0, innerWidth])
      .padding(0.2)

    let xScale, yScale

    if (agruparPor) {
      if (apilado) {
        // Para gráficos apilados
        xScale = x0Scale

        // Calcular totales para cada grupo
        processedData.forEach((d) => {
          let total = 0
          groups.forEach((group) => {
            d._start = total
            total += d[group] || 0
            d._end = total
          })
        })

        const maxY = d3.max(processedData, (d) => d._end) || 0
        yScale = d3.scaleLinear().domain([0, maxY]).range([innerHeight, 0]).nice()
      } else {
        // Para gráficos agrupados
        const x1Scale = d3.scaleBand().domain(groups).range([0, x0Scale.bandwidth()]).padding(0.05)

        xScale = (d, i) => x0Scale(d[campoX])! + x1Scale(groups[i])!

        const maxY =
          d3.max(processedData, (d) => {
            return d3.max(groups, (group) => d[group]) || 0
          }) || 0

        yScale = d3.scaleLinear().domain([0, maxY]).range([innerHeight, 0]).nice()
      }
    } else {
      // Caso simple sin agrupación
      xScale = x0Scale

      const maxY = d3.max(processedData, (d) => d.value) || 0
      yScale = d3.scaleLinear().domain([0, maxY]).range([innerHeight, 0]).nice()
    }

    // Escala de color
    const colorScale = d3.scaleOrdinal().domain(groups).range(d3.schemeCategory10)

    // Ejes
    const xAxis = d3.axisBottom(x0Scale)
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

    // Dibujar barras
    if (agruparPor) {
      if (apilado) {
        // Barras apiladas
        const layers = groups.map((group) => {
          return processedData.map((d) => ({
            x: d[campoX],
            y0: d._start,
            y1: d._start + d[group],
            group,
          }))
        })

        layers.forEach((layer) => {
          g.selectAll(`.bar-${layer[0].group}`)
            .data(layer)
            .enter()
            .append("rect")
            .attr("class", `bar-${layer[0].group}`)
            .attr("x", (d) => x0Scale(d.x)!)
            .attr("y", (d) => yScale(d.y1))
            .attr("height", (d) => yScale(d.y0) - yScale(d.y1))
            .attr("width", x0Scale.bandwidth())
            .attr("fill", (d) => colorScale(d.group))
        })
      } else {
        // Barras agrupadas
        groups.forEach((group, i) => {
          g.selectAll(`.bar-${group}`)
            .data(processedData)
            .enter()
            .append("rect")
            .attr("class", `bar-${group}`)
            .attr("x", (d) => x0Scale(d[campoX])! + (x0Scale.bandwidth() / groups.length) * i)
            .attr("y", (d) => yScale(d[group] || 0))
            .attr("height", (d) => innerHeight - yScale(d[group] || 0))
            .attr("width", x0Scale.bandwidth() / groups.length)
            .attr("fill", colorScale(group))
        })
      }
    } else {
      // Barras simples
      g.selectAll(".bar")
        .data(processedData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x0Scale(d[campoX])!)
        .attr("y", (d) => yScale(d.value))
        .attr("height", (d) => innerHeight - yScale(d.value))
        .attr("width", x0Scale.bandwidth())
        .attr("fill", "#3B82F6")
    }

    // Leyenda para grupos
    if (agruparPor) {
      const legend = svg.append("g").attr("transform", `translate(${width - margin.right - 100}, ${margin.top})`)

      groups.forEach((group, i) => {
        const legendRow = legend.append("g").attr("transform", `translate(0, ${i * 20})`)

        legendRow.append("rect").attr("width", 10).attr("height", 10).attr("fill", colorScale(group))

        legendRow
          .append("text")
          .attr("x", 20)
          .attr("y", 10)
          .attr("text-anchor", "start")
          .style("font-size", "12px")
          .text(group)
      })
    }
  }, [datos, campoX, campoY, agruparPor, apilado])

  return <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" />
}

