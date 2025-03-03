import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-[#FF7B7B] via-[#FF9B9B] to-[#FFA07A]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Capturando el Momentum de los Mercados Laborales en América Latina
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-100 md:text-xl">
                Análisis avanzado del mercado laboral y benchmarking para instituciones educativas y stakeholders en LAC
                y España
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/80 transition-colors duration-300"
              >
                <Link href="/demo">Solicitar Demo</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/20 transition-colors duration-300"
              >
                <Link href="/video">Ver Video</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50 dark:bg-zinc-900">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Nuestras Soluciones
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<BarChart2 className="h-10 w-10 text-primary" />}
              title="Análisis de Mercado"
              description="Obtenga insights detallados sobre las tendencias del mercado laboral en tiempo real."
              links={[
                { href: "/dashboards/tendencias-ocupacionales", label: "Tendencias Ocupacionales" },
                { href: "/dashboards/analisis-sectorial", label: "Análisis Sectorial" },
                { href: "/dashboards/tendencias-sectores", label: "Tendencias por Sectores" },
              ]}
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-primary" />}
              title="Benchmarking Educativo"
              description="Compare su institución con otras líderes en el sector educativo."
              links={[
                { href: "/dashboards/distribucion-institucional", label: "Distribución Institucional" },
                { href: "/dashboards/analisis-area", label: "Análisis por Área" },
                { href: "/dashboards/brechas-genero", label: "Brechas de Género" },
              ]}
            />
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10 text-primary" />}
              title="Trayectorias Profesionales"
              description="Analice y optimice las trayectorias profesionales de sus estudiantes."
              links={[{ href: "/dashboards/explorador-carreras", label: "Explorador de Carreras" }]}
            />
          </div>
        </div>
      </section> */}

      {/* Mapa Latinoamérica Section */}
      {/* <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Panorama Educativo Latinoamericano
          </h2>
          <MapaLatinoamerica />
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#FF9B9B] to-[#FFA07A]">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-6">
            ¿Listo para tomar decisiones basadas en datos?
          </h2>
          <p className="mx-auto max-w-[700px] text-zinc-100 md:text-xl mb-8">
            Únete a las instituciones líderes que ya están utilizando nuestras herramientas para transformar la
            educación y el empleo.
          </p>
          <Button asChild size="lg">
            <Link href="/signup">
              Comienza Ahora <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

{
  /* function FeatureCard({ icon, title, description, links }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 mb-4">{description}</p>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="text-primary hover:underline flex items-center justify-center">
              {link.label}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
} */
}

