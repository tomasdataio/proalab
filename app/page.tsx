import Link from "next/link"
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  LayoutDashboard,
  ArrowRight,
  TrendingUp,
  Users,
  Calendar
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarNav } from "@/components/ui/sidebar"
import { TopBanner } from "@/components/ui/top-banner"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Análisis del Mercado Laboral y Educativo",
  description: "Plataforma de visualización de datos del mercado laboral y educativo",
}

export default function HomePage() {
  const dashboards = [
    {
      title: "Dashboard Principal",
      description: "Resumen general de indicadores y métricas clave del mercado laboral y educativo.",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Brechas Salariales",
      description: "Análisis detallado de las brechas salariales por carrera y su evolución temporal.",
      icon: BarChart3,
      href: "/brechas-salariales",
      color: "bg-secondary/10 text-secondary",
    },
    {
      title: "Distribución Sectorial",
      description: "Visualización de la distribución del empleo por sector económico para cada carrera.",
      icon: PieChart,
      href: "/distribucion-sectorial",
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Fortaleza de Demanda",
      description: "Evaluación multidimensional de la fortaleza de demanda laboral para diferentes carreras.",
      icon: LineChart,
      href: "/fortaleza-demanda",
      color: "bg-primary/10 text-primary",
    },
  ]

  const features = [
    {
      title: "Visualizaciones Interactivas",
      description: "Gráficos interactivos que permiten explorar los datos desde múltiples perspectivas, con filtros y opciones de personalización.",
      icon: TrendingUp,
    },
    {
      title: "Análisis Multidimensional",
      description: "Evaluación de la empleabilidad y demanda laboral considerando múltiples factores como salarios, tendencias y distribución sectorial.",
      icon: BarChart3,
    },
    {
      title: "Datos Actualizados",
      description: "Información actualizada sobre el mercado laboral y educativo, con datos históricos para análisis de tendencias.",
      icon: Calendar,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <TopBanner />
      
      <div className="flex flex-1">
        <div className="hidden md:flex">
          <SidebarNav />
        </div>
        
        <div className="flex-1">
          <header className="bg-institutional-gradient dark:bg-institutional-gradient-dark text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Análisis del Mercado Laboral y Educativo</h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  Plataforma integral para la visualización y análisis de datos del mercado laboral 
                  y educativo, con enfoque en empleabilidad, brechas salariales y distribución sectorial.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/dashboard">
                      Explorar Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    <Link href="/datos">
                      Ver Datos
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-16">
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Dashboards Disponibles</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {dashboards.map((dashboard, index) => (
                  <Card key={index} className="overflow-hidden border-primary/10 hover:border-primary/30 transition-colors">
                    <CardHeader className={`${dashboard.color} p-4`}>
                      <dashboard.icon className="h-8 w-8" />
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="text-xl mb-2">{dashboard.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {dashboard.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link 
                        href={dashboard.href}
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        Explorar
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Características Principales</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {features.map((feature, index) => (
                  <Card key={index} className="border-primary/10">
                    <CardHeader>
                      <div className="mb-4 p-3 w-fit rounded-full bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="bg-institutional-radial dark:bg-institutional-gradient-dark rounded-lg p-8 text-center text-white">
                <h2 className="text-2xl font-bold mb-4">¿Listo para explorar los datos?</h2>
                <p className="mb-6 max-w-2xl mx-auto text-white/90">
                  Accede al dashboard principal para comenzar a explorar los indicadores clave
                  del mercado laboral y educativo.
                </p>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/dashboard">
                    Ir al Dashboard Principal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </section>
          </main>

          <footer className="bg-muted py-8">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p className="mb-2">© 2024 Análisis del Mercado Laboral y Educativo</p>
              <div className="flex justify-center space-x-4">
                <Link href="/terminos" className="text-sm hover:text-primary transition-colors">Términos de Uso</Link>
                <Link href="/privacidad" className="text-sm hover:text-primary transition-colors">Política de Privacidad</Link>
                <Link href="/contacto" className="text-sm hover:text-primary transition-colors">Contacto</Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
} 