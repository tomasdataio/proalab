import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = supabaseAdmin()
    
    // Obtener todas las regiones de la tabla regiones
    const { data, error } = await supabase
      .from('regiones')
      .select('nombre')
      .order('id', { ascending: true })
    
    if (error) {
      throw error
    }
    
    // Extraer solo los nombres de regiones
    const regiones = data.map(region => region.nombre)
    
    return NextResponse.json(regiones)
  } catch (error: any) {
    console.error("Error al obtener regiones:", error.message)
    return NextResponse.json(
      [
        "Metropolitana", "Valparaíso", "Biobío", "Maule", "Araucanía", 
        "Los Lagos", "O'Higgins", "Coquimbo", "Los Ríos", "Antofagasta", 
        "Tarapacá", "Atacama", "Magallanes", "Aysén", "Arica y Parinacota", "Ñuble"
      ], 
      { status: 200 }
    ) // Devolver valores predeterminados en caso de error
  }
} 