import { Metadata } from "next"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import EvolucionGeneroDashboard from "@/components/dashboards/EvolucionGeneroDashboard"

export const metadata: Metadata = {
  title: "Evolución por Género",
  description: "Análisis de la evolución de matrículas por género en educación superior",
}

export default async function EvolucionGeneroPage() {
  const supabase = createServerSupabaseClient()
  
  // Obtener datos de evolución por género
  const { data: evolucionGeneroData } = await supabase
    .from('vista_evolucion_genero')
    .select('*')
    .order('anio', { ascending: true })
  
  // Obtener lista de tipos de instituciones para filtros
  // En lugar de usar distinct(), obtenemos todos los datos y luego filtramos los valores únicos
  const { data: institucionesData } = await supabase
    .from('vista_evolucion_genero')
    .select('inst_tipo')
  
  // Extraer valores únicos de inst_tipo
  const institucionesTipos = institucionesData 
    ? [...new Set(institucionesData.map(item => item.inst_tipo))].sort()
    : []
  
  // Obtener lista de carreras genéricas para filtros
  // En lugar de usar distinct(), obtenemos todos los datos y luego filtramos los valores únicos
  const { data: carrerasData } = await supabase
    .from('vista_evolucion_genero')
    .select('carr_generica')
    .limit(500) // Limitamos para no sobrecargar la consulta
  
  // Extraer valores únicos de carr_generica
  const carrerasGenericas = carrerasData 
    ? [...new Set(carrerasData.map(item => item.carr_generica))].sort()
    : []
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Evolución de Matrículas por Género</h1>
      <p className="text-muted-foreground mb-8">
        Análisis de la distribución y evolución de matrículas por género en diferentes carreras e instituciones educativas.
      </p>
      
      <EvolucionGeneroDashboard 
        evolucionGeneroData={evolucionGeneroData || []} 
        institucionesTipos={institucionesTipos}
        carrerasGenericas={carrerasGenericas}
      />
    </div>
  )
} 