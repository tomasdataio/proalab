import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = supabaseAdmin()
    
    // Obtener instituciones de la tabla instituciones
    const { data, error } = await supabase
      .from('instituciones')
      .select('nombre')
      .order('nombre', { ascending: true })
    
    if (error) {
      throw error
    }
    
    // Extraer solo los nombres de instituciones
    const instituciones = data.map(inst => inst.nombre)
    
    return NextResponse.json(instituciones)
  } catch (error: any) {
    console.error("Error al obtener instituciones:", error.message)
    
    // Intentar un enfoque alternativo usando otras tablas
    try {
      const supabase = supabaseAdmin()
      const { data } = await supabase
        .from('dashboard_distribucion_institucional')
        .select('institucion')
        .order('institucion')
      
      if (data && data.length > 0) {
        // Extraer valores únicos
        const institucionesSet = new Set(data.map(item => item.institucion).filter(Boolean))
        return NextResponse.json(Array.from(institucionesSet))
      }
    } catch {
      // Si fallan ambos enfoques, devolver valores predeterminados
    }
    
    return NextResponse.json([
      "Universidad de Chile", "Pontificia Universidad Católica de Chile", 
      "Universidad de Santiago de Chile", "Universidad de Concepción", 
      "Universidad Técnica Federico Santa María", "Universidad Austral de Chile",
      "Universidad Católica del Norte", "Universidad de Valparaíso",
      "Universidad de Talca", "Universidad Católica de Valparaíso"
    ], { status: 200 }) // Valores predeterminados en caso de error
  }
} 