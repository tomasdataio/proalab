import { Metadata } from "next"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import MainDashboard from "@/components/dashboards/MainDashboard"

export const metadata: Metadata = {
  title: "Dashboard de Análisis del Mercado Laboral",
  description: "Visualización de datos del mercado laboral y educativo",
}

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()
  
  // Obtener datos de informalidad (últimos datos nacionales)
  const { data: informalidadData } = await supabase
    .from('informalidad')
    .select('*')
    .eq('region_codigo', 'NACIONAL')
    .order('anio', { ascending: false })
    .limit(5)
  
  // Obtener datos de matriculados por año
  const { data: matriculaData } = await supabase
    .from('matricula_2024')
    .select('anio, mat_total')
    .order('anio', { ascending: false })
    .limit(5)
  
  // Obtener datos de distribución sectorial
  const { data: sectorData } = await supabase
    .from('vista_distribucion_sectorial')
    .select('*')
    .eq('region', 'NACIONAL')
    .limit(10)
  
  // Obtener datos de fortaleza de demanda
  const { data: demandaData } = await supabase
    .from('vista_fortaleza_demanda')
    .select('*')
    .eq('region', 'NACIONAL')
    .order('indice_fortaleza_demanda', { ascending: false })
    .limit(10)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <MainDashboard 
        informalidadData={informalidadData || []}
        matriculaData={matriculaData || []}
        sectorData={sectorData || []}
        demandaData={demandaData || []}
      />
    </div>
  )
}

