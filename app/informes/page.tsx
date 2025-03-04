import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Eye } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Informes del Mercado Laboral",
  description: "Informes y análisis del mercado laboral y educativo",
}

export default function InformesPage() {
  // Informes de ejemplo
  const informes = [
    {
      titulo: "Tendencias del Mercado Laboral 2024",
      descripcion: "Análisis de las principales tendencias del mercado laboral en América Latina para el año 2024.",
      fecha: "15 de mayo, 2024",
      autor: "Equipo de Análisis",
      enlace: "#"
    },
    {
      titulo: "Brechas Salariales por Sector",
      descripcion: "Estudio detallado de las brechas salariales existentes en diferentes sectores económicos.",
      fecha: "3 de abril, 2024",
      autor: "Departamento de Investigación",
      enlace: "#"
    },
    {
      titulo: "Evolución de la Empleabilidad por Carrera",
      descripcion: "Análisis de la evolución de la empleabilidad de diferentes carreras en los últimos 5 años.",
      fecha: "22 de marzo, 2024",
      autor: "Equipo de Análisis",
      enlace: "#"
    },
    {
      titulo: "Impacto de la Automatización en el Empleo",
      descripcion: "Estudio sobre el impacto de la automatización y la inteligencia artificial en el mercado laboral.",
      fecha: "10 de febrero, 2024",
      autor: "Departamento de Investigación",
      enlace: "#"
    },
    {
      titulo: "Demanda de Habilidades Emergentes",
      descripcion: "Análisis de las habilidades emergentes más demandadas por los empleadores en la actualidad.",
      fecha: "5 de enero, 2024",
      autor: "Equipo de Análisis",
      enlace: "#"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Informes y Análisis</h1>
      
      <p className="text-lg text-muted-foreground mb-8">
        Accede a nuestros informes detallados sobre el mercado laboral y educativo, 
        con análisis de tendencias, brechas salariales y empleabilidad por carrera.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {informes.map((informe, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-primary/5 border-b">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">{informe.fecha}</span>
              </div>
              <CardTitle className="text-xl">{informe.titulo}</CardTitle>
              <CardDescription>{informe.autor}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-muted-foreground">
                {informe.descripcion}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/50 p-4">
              <Link 
                href={informe.enlace} 
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                <Eye className="mr-1 h-4 w-4" />
                Ver informe
              </Link>
              <Link 
                href={informe.enlace} 
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                <Download className="mr-1 h-4 w-4" />
                Descargar PDF
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-muted rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">¿Necesitas un informe personalizado?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Podemos generar informes personalizados según tus necesidades específicas, 
          con análisis detallados y recomendaciones adaptadas a tu contexto.
        </p>
        <Link 
          href="/contacto" 
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"
        >
          Solicitar informe personalizado
        </Link>
      </div>
    </div>
  )
} 