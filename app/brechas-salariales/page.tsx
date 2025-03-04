import { Metadata } from "next"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import BrechasSalarialesDashboard from "@/components/dashboards/BrechasSalarialesDashboard"

export const metadata: Metadata = {
  title: "Brechas Salariales",
  description: "Análisis de brechas salariales por carrera",
}

export default async function BrechasSalarialesPage() {
  const supabase = createServerSupabaseClient()
  
  // Obtener datos de brechas salariales
  const { data: brechasData } = await supabase
    .from('vista_brechas_salariales')
    .select('*')
    .order('gap_90_10_primer_anio', { ascending: false })
    .limit(20)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <BrechasSalarialesDashboard brechasData={brechasData || []} />
    </div>
  )
} 