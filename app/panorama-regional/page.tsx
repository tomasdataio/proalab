import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, TrendingUp, Users, GraduationCap, BookOpen } from "lucide-react"

export default function PanoramaRegional() {
  return (
    <div className="container py-8">
      <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Volver al inicio
      </Link>

      <div className="bg-gradient-to-br from-[#FF7B7B] via-[#FF9B9B] to-[#FFA07A] dark:from-[#4A1E1E] dark:via-[#6B2D2D] dark:to-[#8B3D3D] text-white p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold">Panorama Educativo Regional</h1>
        <p className="text-xl mt-2">Análisis Comparativo de América Latina y el Caribe</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Estudiantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">23.4M</p>
            <p className="text-sm text-muted-foreground">Matriculados en educación superior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-primary" />
              Instituciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">3,800+</p>
            <p className="text-sm text-muted-foreground">Universidades y centros educativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              Cobertura
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">52%</p>
            <p className="text-sm text-muted-foreground">Promedio de tasa de cobertura</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Crecimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">3.8%</p>
            <p className="text-sm text-muted-foreground">Crecimiento anual promedio</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Tendencias Regionales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Expansión de la Educación Superior</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  En las últimas dos décadas, América Latina ha experimentado una expansión significativa en el acceso a
                  la educación superior, con un aumento del 150% en la matrícula. Sin embargo, persisten importantes
                  desigualdades entre países y dentro de ellos.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Diversificación Institucional</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  La región ha visto una creciente diversificación de instituciones de educación superior, con un
                  aumento notable en el número de universidades privadas y centros de formación técnica, respondiendo a
                  la demanda creciente y a las necesidades del mercado laboral.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Desafíos de Calidad</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A pesar del crecimiento cuantitativo, la región enfrenta importantes desafíos en términos de calidad
                  educativa, con solo un pequeño número de universidades figurando en los rankings internacionales y
                  brechas significativas en investigación e innovación.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comparativa por Subregiones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Tasa de Cobertura en Educación Superior</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Cono Sur</span>
                      <span>68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "68%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Región Andina</span>
                      <span>52%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "52%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Centroamérica</span>
                      <span>28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "28%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Caribe</span>
                      <span>23%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "23%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Inversión en Educación (% del PIB)</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Cono Sur</span>
                      <span>1.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Región Andina</span>
                      <span>1.4%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "47%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Centroamérica</span>
                      <span>1.1%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "37%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Caribe</span>
                      <span>0.9%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Países Líderes en Educación</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              <li className="flex justify-between items-center">
                <span className="font-medium">1. Brasil</span>
                <span className="text-sm text-muted-foreground">8.6M estudiantes</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">2. México</span>
                <span className="text-sm text-muted-foreground">4.5M estudiantes</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">3. Argentina</span>
                <span className="text-sm text-muted-foreground">3.1M estudiantes</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">4. Colombia</span>
                <span className="text-sm text-muted-foreground">2.4M estudiantes</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">5. Chile</span>
                <span className="text-sm text-muted-foreground">1.2M estudiantes</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Carreras con Mayor Demanda</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Ingeniería</span>
                <span className="text-sm text-muted-foreground">24.5%</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Administración y Negocios</span>
                <span className="text-sm text-muted-foreground">22.3%</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Ciencias de la Salud</span>
                <span className="text-sm text-muted-foreground">18.7%</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Ciencias Sociales</span>
                <span className="text-sm text-muted-foreground">12.4%</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Educación</span>
                <span className="text-sm text-muted-foreground">10.8%</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Desafíos Regionales</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                <span>Desigualdad en el acceso a educación de calidad</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                <span>Baja inversión en investigación y desarrollo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                <span>Desconexión entre academia y mercado laboral</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                <span>Alta deserción estudiantil</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                <span>Limitada internacionalización</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button className="bg-[#FF7B7B] hover:bg-[#ff6b6b]">
          <Link href="/dashboards/panorama-regional">Explorar Datos Detallados</Link>
        </Button>
      </div>
    </div>
  )
}

