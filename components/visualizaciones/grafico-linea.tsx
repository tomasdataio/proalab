// components/visualizaciones/grafico-linea.tsx
"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface GraficoLineaProps {
  datos: any[]
  campoX: string
  campoY: string
  series?: string
  formatoFecha?: string
  colorPor?: string
  conPuntos?: boolean
  leyendaInteractiva?: boolean
}

export function GraficoLinea({
  datos,
  campoX,
  campoY,
  series,
  formatoFecha = "MMM YYYY",
  colorPor,
  conPuntos = true,
  leyendaInteractiva = false,
}: GraficoLineaProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !datos || datos.length === 0) return

    // Limpiar SVG
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    // Dimensiones
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight
    const margin = { top: 20, right: 80, bottom: 60, left: 60 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Crear grupo principal
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Procesamiento de datos
    let processedData
    let seriesNames: string[] = []

    if (series) {
      // Si tenemos series, procesamos los datos por series
      seriesNames = [...new Set(datos.map((d) => d[series]))]

      processedData = seriesNames.map((name) => {
        return {
          name,
          values: datos
            .filter((d) => d[series] === name)
            .map((d) => ({
              x: d[campoX],
              y: d[campoY],
            })),
        }
      })
    } else {
      // Caso simple sin series
      processedData = [
        {
          name: campoY,
          values: datos.map((d) => ({
            x: d[campoX],
            y: d[campoY],
          })),
        },
      ]

      seriesNames = [campoY]
    }

    // Verificar si los datos de X son fechas
    const esFecha = typeof datos[0][campoX] === "string" && !isNaN(Date.parse(datos[0][campoX]))

    // Escalas
    let xScale

    if (esFecha) {
      const fechas = datos.map((d) => new Date(d[campoX]))
      xScale = d3
        .scaleTime()
        .domain([d3.min(fechas) || new Date(), d3.max(fechas) || new Date()])
        .range([0, innerWidth])
    } else {
      xScale = d3
        .scalePoint()
        .domain(datos.map((d) => d[campoX]))
        .range([0, innerWidth])
        .padding(0.5)
    }

    const allValues = datos.map((d) => d[campoY])
    const yScale = d3
      .scaleLinear()
      .domain([Math.min(0, d3.min(allValues) || 0), d3.max(allValues) || 0])
      .range([innerHeight, 0])
      .nice()

    // Escala de color
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(seriesNames)

    // Línea generadora
    const line = d3
      .line<{ x: any; y: any }>()
      .x((d) => {
        if (esFecha) {
          return xScale(new Date(d.x))
        }
        return xScale(d.x) || 0
      })
      .y((d) => yScale(d.y))
      .curve(d3.curveMonotoneX)

    // Ejes
    const xAxis = esFecha
      ? d3.axisBottom(xScale).tickFormat((d) => d3.timeFormat(formatoFecha)(d as Date))
      : d3.axisBottom(xScale)

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

    // Dibujar líneas
    processedData.forEach((serie) => {
      // Dibujar línea
      g.append("path")
        .datum(serie.values)
        .attr("class", `line-${serie.name.replace(/\s+/g, "-").toLowerCase()}`)
        .attr("fill", "none")
        .attr("stroke", colorScale(serie.name))
        .attr("stroke-width", 2)
        .attr("d", line)

      // Añadir puntos si se solicitan
      if (conPuntos) {
        g.selectAll(`.point-${serie.name.replace(/\s+/g, "-").toLowerCase()}`)
          .data(serie.values)
          .enter()
          .append("circle")
          .attr("class", `point-${serie.name.replace(/\s+/g, "-").toLowerCase()}`)
          .attr("cx", (d) => {
            if (esFecha) {
              return xScale(new Date(d.x))
            }
            return xScale(d.x) || 0
          })
          .attr("cy", (d) => yScale(d.y))
          .attr("r", 4)
          .attr("fill", colorScale(serie.name))
          .append("title")
          .text((d) => `${d.x}: ${d.y}`)
      }
    })

    // Leyenda
    const legend = svg.append("g").attr("transform", `translate(${width - margin.right + 20}, ${margin.top})`)

    seriesNames.forEach((name, i) => {
      const legendRow = legend
        .append("g")
        .attr("transform", `translate(0, ${i * 20})`)
        .attr("class", "legend-item")

      if (leyendaInteractiva) {
        legendRow.style("cursor", "pointer").on("click", () => {
          // Toggle visibilidad de la serie al hacer clic
          const opacity = g.select(`.line-${name.replace(/\s+/g, "-").toLowerCase()}`).style("opacity")
          const newOpacity = opacity === "1" ? "0.2" : "1"

          g.select(`.line-${name.replace(/\s+/g, "-").toLowerCase()}`)
            .transition()
            .style("opacity", newOpacity)

          if (conPuntos) {
            g.selectAll(`.point-${name.replace(/\s+/g, "-").toLowerCase()}`)
              .transition()
              .style("opacity", newOpacity)
          }

          legendRow
            .select("text")
            .transition()
            .style("opacity", newOpacity === "1" ? 1 : 0.5)
        })
      }

      legendRow.append("rect").attr("width", 10).attr("height", 10).attr("fill", colorScale(name))

      legendRow
        .append("text")
        .attr("x", 20)
        .attr("y", 10)
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .text(name)
    })
  }, [datos, campoX, campoY, series, formatoFecha, colorPor, conPuntos, leyendaInteractiva])

  return <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" />
}

