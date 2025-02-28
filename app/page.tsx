import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, BarChart2, BookOpen, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FF7B7B] via-[#FF9B9B] to-[#FFA07A] dark:from-[#4A1E1E] dark:via-[#6B2D2D] dark:to-[#8B3D3D] text-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Capturando el Momentum de los
            <br className="hidden md:inline" /> Mercados Laborales en América Latina
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Análisis avanzado del mercado laboral y benchmarking para instituciones educativas y stakeholders en LAC y
            España
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-[#FF7B7B] hover:bg-gray-100 hover:text-[#FF6B6B] dark:bg-gray-800 dark:text-[#FF9B9B] dark:hover:bg-gray-700"
            >
              <Link href="/demo" className="flex items-center">
                Solicitar Demo <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white/10 dark:border-gray-300 dark:hover:bg-gray-800"
            >
              Ver Video
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Nuestras Soluciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart2 className="h-10 w-10 text-[#FF7B7B] dark:text-[#FF9B9B]" />}
              title="Análisis de Mercado"
              description="Obtenga insights detallados sobre las tendencias del mercado laboral en tiempo real."
              links={[
                { href: "/dashboards/tendencias-ocupacionales", label: "Tendencias Ocupacionales" },
                { href: "/dashboards/analisis-sectorial", label: "Análisis Sectorial" },
                { href: "/dashboards/tendencias-sectores", label: "Tendencias por Sectores" },
              ]}
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-[#FF7B7B] dark:text-[#FF9B9B]" />}
              title="Benchmarking Educativo"
              description="Compare su institución con otras líderes en el sector educativo."
              links={[
                { href: "/dashboards/distribucion-institucional", label: "Distribución Institucional" },
                { href: "/dashboards/analisis-area", label: "Análisis por Área" },
                { href: "/dashboards/brechas-genero", label: "Brechas de Género" },
              ]}
            />
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10 text-[#FF7B7B] dark:text-[#FF9B9B]" />}
              title="Trayectorias Profesionales"
              description="Analice y optimice las trayectorias profesionales de sus estudiantes."
              links={[{ href: "/dashboards/explorador-carreras", label: "Explorador de Carreras" }]}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-[#FF9B9B] to-[#FFA07A] dark:from-[#6B2D2D] dark:to-[#8B3D3D] py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para tomar decisiones basadas en datos?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a las instituciones líderes que ya están utilizando nuestras herramientas para transformar la
            educación y el empleo.
          </p>
          <Button
            size="lg"
            className="bg-white text-[#FF7B7B] hover:bg-gray-100 hover:text-[#FF6B6B] dark:bg-gray-800 dark:text-[#FF9B9B] dark:hover:bg-gray-700"
          >
            <Link href="/signup" className="flex items-center">
              Comienza Ahora <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, links }) {
  return (
    <Card className="flex flex-col h-full transition-transform duration-300 hover:scale-105 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="text-[#FF7B7B] hover:text-[#FF6B6B] dark:text-[#FF9B9B] dark:hover:text-[#FFBDBD] flex items-center"
              >
                {link.label}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

