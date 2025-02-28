import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = supabaseAdmin()
    
    // Intentar obtener ocupaciones de las tablas relacionadas con tendencias ocupacionales
    let ocupaciones: string[] = []
    
    try {
      // Intentar primero con la tabla de tendencias ocupacionales
      const { data, error } = await supabase
        .from('dashboard_tendencias_ocupacionales')
        .select('ocupacion')
        .order('ocupacion')
      
      if (!error && data) {
        const ocupacionesSet = new Set(data.map(item => item.ocupacion).filter(Boolean))
        ocupaciones = Array.from(ocupacionesSet) as string[]
      }
    } catch (err) {
      // Si falla, intentar con la tabla panel_region_sector
      try {
        const { data } = await supabase
          .from('panel_region_sector')
          .select('sector_codigo')
          .order('sector_codigo')
        
        if (data) {
          const sectoresSet = new Set(data.map(item => item.sector_codigo).filter(Boolean))
          ocupaciones = Array.from(sectoresSet) as string[]
        }
      } catch {
        // Si todo falla, usaremos valores predeterminados
      }
    }
    
    // Si no se encontraron ocupaciones, usar valores predeterminados
    if (ocupaciones.length === 0) {
      ocupaciones = [
        "Desarrollador de Software", "Ingeniero de Datos", "Analista de Sistemas",
        "Médico", "Enfermero/a", "Profesor/a", "Contador/a", "Administrador/a",
        "Ingeniero Civil", "Arquitecto/a", "Diseñador/a", "Abogado/a",
        "Vendedor/a", "Técnico/a", "Asistente Administrativo/a"
      ]
    }
    
    return NextResponse.json(ocupaciones)
  } catch (error: any) {
    console.error("Error al obtener ocupaciones:", error.message)
    return NextResponse.json([
      "Desarrollador de Software", "Ingeniero de Datos", "Analista de Sistemas",
      "Médico", "Enfermero/a", "Profesor/a", "Contador/a", "Administrador/a",
      "Ingeniero Civil", "Arquitecto/a", "Diseñador/a", "Abogado/a",
      "Vendedor/a", "Técnico/a", "Asistente Administrativo/a"
    ], { status: 200 }) // Valores predeterminados en caso de error
  }
} 