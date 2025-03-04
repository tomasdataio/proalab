import { Metadata } from "next"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import DistribucionSectorialDashboard from "@/components/dashboards/DistribucionSectorialDashboard"

export const metadata: Metadata = {
  title: "Distribución Sectorial",
  description: "Análisis de la distribución sectorial del empleo por carrera y región",
}

export default async function DistribucionSectorialPage() {
  const supabase = createServerSupabaseClient()
  
  // Obtener datos de panel_region_sector
  const { data: panelRegionSectorData, error: panelError } = await supabase
    .from('panel_region_sector')
    .select('*')
    .order('anio', { ascending: false })
    .order('trimestre_movil', { ascending: false })
    .limit(500)
  
  if (panelError) {
    console.error("Error al obtener datos de panel_region_sector:", panelError)
  }
  
  // Obtener datos de informalidad
  const { data: informalidadData, error: informalidadError } = await supabase
    .from('informalidad')
    .select('*')
    .order('anio', { ascending: false })
    .limit(100)
  
  if (informalidadError) {
    console.error("Error al obtener datos de informalidad:", informalidadError)
  }
  
  // Intentar obtener datos de tasa_desocupacion
  let tasaDesocupacionData = []
  try {
    const { data, error } = await supabase
      .from('tasa_desocupacion')
      .select('*')
      .order('anio', { ascending: false })
      .limit(100)
    
    if (error) throw error
    tasaDesocupacionData = data || []
  } catch (err) {
    console.error("Error o tabla tasa_desocupacion no existe:", err)
  }
  
  // Intentar obtener datos de fuerza_trabajo
  let fuerzaTrabajoData = []
  try {
    const { data, error } = await supabase
      .from('fuerza_trabajo')
      .select('*')
      .order('anio', { ascending: false })
      .limit(100)
    
    if (error) throw error
    fuerzaTrabajoData = data || []
  } catch (err) {
    console.error("Error o tabla fuerza_trabajo no existe:", err)
  }
  
  // Intentar obtener datos de tendencias_regionales
  let tendenciasRegionalesData = []
  try {
    const { data, error } = await supabase
      .from('tendencias_regionales')
      .select('*')
      .limit(100)
    
    if (error) throw error
    tendenciasRegionalesData = data || []
  } catch (err) {
    console.error("Error o tabla tendencias_regionales no existe:", err)
  }
  
  // Intentar obtener datos de tendencias_ocupacionales
  let tendenciasOcupacionalesData = []
  try {
    const { data, error } = await supabase
      .from('tendencias_ocupacionales')
      .select('*')
      .limit(100)
    
    if (error) throw error
    tendenciasOcupacionalesData = data || []
  } catch (err) {
    console.error("Error o tabla tendencias_ocupacionales no existe:", err)
  }
  
  // También obtener datos de distribucion_sectorial (vista existente)
  const { data: distribucionSectorialData, error: distError } = await supabase
    .from('vista_distribucion_sectorial')
    .select('*')
    .limit(100)
  
  if (distError) {
    console.error("Error al obtener datos de vista_distribucion_sectorial:", distError)
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Distribución Sectorial</h1>
      <p className="text-muted-foreground mb-8">
        Análisis del mercado laboral por sector económico y región, incluyendo tendencias temporales y proyecciones.
      </p>
      
      <DistribucionSectorialDashboard 
        panelRegionSectorData={panelRegionSectorData || []}
        informalidadData={informalidadData || []}
        tasaDesocupacionData={tasaDesocupacionData}
        fuerzaTrabajoData={fuerzaTrabajoData}
        tendenciasRegionalesData={tendenciasRegionalesData}
        tendenciasOcupacionalesData={tendenciasOcupacionalesData}
        distribucionSectorialData={distribucionSectorialData || []}
      />
    </div>
  )
} 