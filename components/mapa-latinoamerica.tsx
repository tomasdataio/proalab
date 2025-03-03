"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export function MapaLatinoamerica() {
  const [paisSeleccionado, setPaisSeleccionado] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const paises = [
    {
      id: "mexico",
      nombre: "México",
      path: "M 210,180 L 190,210 L 180,230 L 190,250 L 210,260 L 230,270 L 250,260 L 260,240 L 270,220 L 280,200 L 290,180 L 270,170 L 250,160 L 230,170 L 210,180 Z",
      stats: { matricula: "4.5M", universidades: 3250, ranking: 2 },
    },
    {
      id: "guatemala",
      nombre: "Guatemala",
      path: "M 270,270 L 280,280 L 290,275 L 295,265 L 290,260 L 280,265 L 270,270 Z",
      stats: { matricula: "350K", universidades: 150, ranking: 8 },
    },
    {
      id: "elsalvador",
      nombre: "El Salvador",
      path: "M 285,285 L 295,285 L 300,280 L 295,275 L 290,280 L 285,285 Z",
      stats: { matricula: "180K", universidades: 40, ranking: 12 },
    },
    {
      id: "honduras",
      nombre: "Honduras",
      path: "M 290,270 L 300,275 L 310,270 L 305,265 L 295,265 L 290,270 Z",
      stats: { matricula: "210K", universidades: 38, ranking: 15 },
    },
    {
      id: "nicaragua",
      nombre: "Nicaragua",
      path: "M 295,285 L 305,290 L 315,285 L 310,275 L 300,280 L 295,285 Z",
      stats: { matricula: "160K", universidades: 60, ranking: 14 },
    },
    {
      id: "costarica",
      nombre: "Costa Rica",
      path: "M 300,295 L 310,300 L 315,295 L 310,290 L 305,295 L 300,295 Z",
      stats: { matricula: "220K", universidades: 64, ranking: 7 },
    },
    {
      id: "panama",
      nombre: "Panamá",
      path: "M 315,295 L 325,300 L 335,295 L 330,290 L 320,295 L 315,295 Z",
      stats: { matricula: "150K", universidades: 35, ranking: 9 },
    },
    {
      id: "colombia",
      nombre: "Colombia",
      path: "M 330,300 L 340,320 L 350,340 L 360,330 L 370,310 L 360,290 L 350,280 L 340,290 L 330,300 Z",
      stats: { matricula: "2.4M", universidades: 288, ranking: 5 },
    },
    {
      id: "venezuela",
      nombre: "Venezuela",
      path: "M 370,310 L 390,310 L 410,300 L 400,290 L 380,290 L 360,290 L 370,310 Z",
      stats: { matricula: "2.0M", universidades: 167, ranking: 10 },
    },
    {
      id: "ecuador",
      nombre: "Ecuador",
      path: "M 320,350 L 330,360 L 340,350 L 350,340 L 340,330 L 330,340 L 320,350 Z",
      stats: { matricula: "700K", universidades: 62, ranking: 11 },
    },
    {
      id: "peru",
      nombre: "Perú",
      path: "M 320,350 L 330,370 L 340,390 L 350,410 L 360,400 L 370,380 L 360,360 L 350,340 L 340,350 L 330,360 L 320,350 Z",
      stats: { matricula: "1.8M", universidades: 143, ranking: 6 },
    },
    {
      id: "bolivia",
      nombre: "Bolivia",
      path: "M 370,380 L 390,390 L 410,380 L 400,370 L 380,370 L 370,380 Z",
      stats: { matricula: "750K", universidades: 72, ranking: 13 },
    },
    {
      id: "chile",
      nombre: "Chile",
      path: "M 360,400 L 370,450 L 380,500 L 390,490 L 400,440 L 390,390 L 380,400 L 370,410 L 360,400 Z",
      stats: { matricula: "1.2M", universidades: 150, ranking: 3 },
    },
    {
      id: "argentina",
      nombre: "Argentina",
      path: "M 390,390 L 410,400 L 430,410 L 440,450 L 430,490 L 410,500 L 390,490 L 400,440 L 390,390 Z",
      stats: { matricula: "3.1M", universidades: 131, ranking: 4 },
    },
    {
      id: "uruguay",
      nombre: "Uruguay",
      path: "M 430,490 L 440,500 L 450,490 L 440,480 L 430,490 Z",
      stats: { matricula: "160K", universidades: 41, ranking: 16 },
    },
    {
      id: "paraguay",
      nombre: "Paraguay",
      path: "M 410,410 L 420,420 L 430,410 L 420,400 L 410,410 Z",
      stats: { matricula: "225K", universidades: 54, ranking: 17 },
    },
    {
      id: "brasil",
      nombre: "Brasil",
      path: "M 410,300 L 450,320 L 490,340 L 500,380 L 480,420 L 450,440 L 430,410 L 410,400 L 390,390 L 410,380 L 430,370 L 450,350 L 460,330 L 450,310 L 430,300 L 410,300 Z",
      stats: { matricula: "8.6M", universidades: 2364, ranking: 1 },
    },
  ]

  const handleMouseEnter = (pais: string, event: React.MouseEvent) => {
    setPaisSeleccionado(pais)
    setTooltipPosition({ x: event.clientX, y: event.clientY })
  }

  const handleMouseLeave = () => {
    setPaisSeleccionado(null)
  }

  const getPaisInfo = (id: string) => {
    return paises.find((pais) => pais.id === id)
  }

  return (
    <div className="relative w-full">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-2/3 relative">
          <svg viewBox="150 150 400 400" className="w-full h-auto" style={{ maxHeight: "600px" }}>
            {paises.map((pais) => (
              <Link key={pais.id} href={`/paises/${pais.id}`}>
                <path
                  d={pais.path}
                  fill={paisSeleccionado === pais.id ? "var(--color-primary-hover)" : "var(--color-primary)"}
                  stroke="white"
                  strokeWidth="2"
                  className="transition-colors duration-300 hover:fill-[#ff6b6b] cursor-pointer"
                  onMouseEnter={(e) => handleMouseEnter(pais.id, e)}
                  onMouseLeave={handleMouseLeave}
                />
              </Link>
            ))}
          </svg>
        </div>

        <div className="w-full md:w-1/3 space-y-6">
          <h3 className="text-2xl font-bold">Radiografía Educacional Latinoamericana</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Explore el panorama educativo de América Latina a través de nuestro mapa interactivo. Haga clic en cualquier
            país para acceder a análisis detallados sobre su sistema educativo, tendencias del mercado laboral y
            oportunidades de desarrollo.
          </p>

          {paisSeleccionado && (
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <h4 className="text-xl font-bold mb-2">{getPaisInfo(paisSeleccionado)?.nombre}</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Matrícula</p>
                    <p className="font-semibold">{getPaisInfo(paisSeleccionado)?.stats.matricula}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Instituciones</p>
                    <p className="font-semibold">{getPaisInfo(paisSeleccionado)?.stats.universidades}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Ranking LAC</p>
                    <p className="font-semibold">#{getPaisInfo(paisSeleccionado)?.stats.ranking}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <Link
                    href={`/paises/${paisSeleccionado}`}
                    className="text-primary hover:text-primary-hover text-sm font-medium flex items-center"
                  >
                    Ver análisis completo
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {!paisSeleccionado && (
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <h4 className="text-xl font-bold mb-2">Panorama Regional</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  América Latina cuenta con más de 20 millones de estudiantes en educación superior y más de 3,500
                  instituciones educativas.
                </p>
                <Link
                  href="/panorama-regional"
                  className="text-primary hover:text-primary-hover text-sm font-medium flex items-center"
                >
                  Ver panorama completo
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <style jsx>{`
        :root {
          --color-primary: #FF7B7B;
          --color-primary-hover: #ff6b6b;
        }
      `}</style>
    </div>
  )
}

