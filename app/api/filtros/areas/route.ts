import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = supabaseAdmin()
    
    // Intentar obtener áreas de conocimiento de la tabla áreas si existe
    let data
    let error
    
    try {
      const result = await supabase
        .from('areas')
        .select('nombre')
        .order('id', { ascending: true })
      
      data = result.data
      error = result.error
    } catch (err) {
      // Si no existe la tabla específica, intentar extraer áreas únicas de otra tabla
      const backupResult = await supabase
        .from('dashboard_distribucion_institucional')
        .select('area_conocimiento')
        .order('area_conocimiento')
      
      if (backupResult.data) {
        // Extraer valores únicos
        const areas = new Set(backupResult.data.map(item => 
          item.area_conocimiento
        ).filter(Boolean))
        
        data = Array.from(areas).map(nombre => ({ nombre }))
        error = null
      } else {
        error = backupResult.error
      }
    }
    
    if (error) {
      throw error
    }
    
    // Extraer solo los nombres de áreas
    const areas = data?.map(area => area.nombre) || []
    
    return NextResponse.json(areas)
  } catch (error: any) {
    console.error("Error al obtener áreas de conocimiento:", error.message)
    return NextResponse.json([
      "Administración y Comercio", "Agropecuaria", "Arte y Arquitectura", 
      "Ciencias Básicas", "Ciencias Sociales", "Derecho", "Educación", 
      "Humanidades", "Salud", "Tecnología"
    ], { status: 200 }) // Devolver valores predeterminados en caso de error
  }
} 