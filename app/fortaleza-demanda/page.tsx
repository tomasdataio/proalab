import { Metadata } from "next"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import FortalezaDemandaDashboard from "@/components/dashboards/FortalezaDemandaDashboard"

export const metadata: Metadata = {
  title: "Fortaleza de Demanda",
  description: "Análisis de la fortaleza de demanda laboral por carrera",
}

export default async function FortalezaDemandaPage() {
  const supabase = createServerSupabaseClient()
  
  // Obtener datos de fortaleza de demanda
  const { data: demandaData } = await supabase
    .from('vista_fortaleza_demanda')
    .select('*')
    .order('indice_fortaleza_demanda', { ascending: false })
    .limit(50)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <FortalezaDemandaDashboard demandaData={demandaData || []} />
    </div>
  )
} 