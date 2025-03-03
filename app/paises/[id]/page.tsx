import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

// Datos de ejemplo para cada país
const paisesData = {
  mexico: {
    nombre: "México",
    stats: {
      matricula: "4.5M",
      universidades: 3250,
      ranking: 2,
      tasaCobertura: "40.2%",
      inversionPIB: "1.0%",
      tasaDesempleo: "8.4%",
    },
    descripcion:
      "México cuenta con uno de los sistemas educativos más grandes de América Latina, con más de 4.5 millones de estudiantes en educación superior. El país ha experimentado un crecimiento significativo en la matrícula universitaria en la última década.",
  },
  brasil: {
    nombre: "Brasil",
    stats: {
      matricula: "8.6M",
      universidades: 2364,
      ranking: 1,
      tasaCobertura: "51.3%",
      inversionPIB: "1.3%",
      tasaDesempleo: "12.7%",
    },
    descripcion:
      "Brasil posee el sistema de educación superior más grande de América Latina, con más de 8.6 millones de estudiantes. El país ha implementado políticas de inclusión que han permitido ampliar significativamente el acceso a la educación superior.",
  },
  chile: {
    nombre: "Chile",
    stats: {
      matricula: "1.2M",
      universidades: 150,
      ranking: 3,
      tasaCobertura: "63.5%",
      inversionPIB: "2.0%",
      tasaDesempleo: "7.2%",
    },
    descripcion:
      "Chile cuenta con uno de los sistemas educativos más desarrollados de la región, con una alta tasa de cobertura en educación superior. El país ha realizado importantes reformas educativas en las últimas décadas para mejorar la calidad y el acceso.",
  },
  // Datos para otros países...
}

export default function PaisPage({ params }: { params: { id: string } }) {
  const paisData = paisesData[params.id]

  if (!paisData) {
    notFound()
  }

  return (
    <div className="container py-8">
      <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Volver al mapa
      </Link>

      <div className="bg-gradient-to-br from-[#FF7B7B] via-[#FF9B9B] to-[#FFA07A] dark:from-[#4A1E1E] dark:via-[#6B2D2D] dark:to-[#8B3D3D] text-white p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold">{paisData.nombre}</h1>
        <p className="text-xl mt-2">Análisis del Sistema Educativo y Mercado Laboral</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Matrícula en Educación Superior</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{paisData.stats.matricula}</p>
            <p className="text-sm text-muted-foreground">Estudiantes activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Instituciones Educativas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{paisData.stats.universidades}</p>
            <p className="text-sm text-muted-foreground">Universidades y centros</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Ranking en Latinoamérica</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">#{paisData.stats.ranking}</p>
            <p className="text-sm text-muted-foreground">Por tamaño del sistema</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Panorama Educativo</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{paisData.descripcion}</p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Tasa de Cobertura</p>
                <p className="text-xl font-bold">{paisData.stats.tasaCobertura}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Inversión en Educación</p>
                <p className="text-xl font-bold">{paisData.stats.inversionPIB} del PIB</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Mercado Laboral</h2>
          <Card className="h-[calc(100%-32px)]">
            <CardContent className="p-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Tasa de Desempleo Profesional</p>
                <p className="text-xl font-bold">{paisData.stats.tasaDesempleo}</p>
              </div>

              <h3 className="text-lg font-semibold mb-2">Sectores con Mayor Demanda</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Tecnología</span>
                  <span className="font-medium">32%</span>
                </li>
                <li className="flex justify-between">
                  <span>Salud</span>
                  <span className="font-medium">24%</span>
                </li>
                <li className="flex justify-between">
                  <span>Ingeniería</span>
                  <span className="font-medium">18%</span>
                </li>
                <li className="flex justify-between">
                  <span>Educación</span>
                  <span className="font-medium">15%</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-center">
        <Button className="bg-[#FF7B7B] hover:bg-[#ff6b6b]">
          <Link href={`/dashboards/pais/${params.id}`}>Ver Análisis Detallado</Link>
        </Button>
      </div>
    </div>
  )
}

