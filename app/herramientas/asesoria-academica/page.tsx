import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, Target } from "lucide-react"

export default function AsesoriaAcademica() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 bg-gradient-to-r from-[#FF7B7B] to-[#FF9B9B] dark:from-[#8B4343] dark:to-[#6B3434] text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Asesoría Académica</h1>
        <p className="text-xl">Orientación personalizada para optimizar tu trayectoria académica y profesional</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Evaluación de Perfil
            </CardTitle>
            <CardDescription>Análisis completo de tus aptitudes y objetivos académicos</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Test de aptitudes y habilidades
              </li>
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Evaluación de intereses profesionales
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Análisis de trayectoria académica
              </li>
            </ul>
            <Button className="w-full mt-6">Solicitar Evaluación</Button>
          </CardContent>
        </Card>

        {/* Agregar más cards con servicios específicos */}
      </div>
    </div>
  )
}

