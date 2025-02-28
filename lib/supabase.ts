// lib/supabase.ts
import { createClient } from "@supabase/supabase-js"

// Cliente para el lado del cliente (con clave anónima)
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// Cliente para rutas API (con clave de servicio)
export const supabaseAdmin = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// Función para obtener datos con manejo de errores
export async function fetchFromSupabase(tableName: string, query: any, errorMessage = "Error fetching data") {
  try {
    const { data, error } = await query

    if (error) throw new Error(`${errorMessage}: ${error.message}`)
    if (!data) return []

    return data
  } catch (error: any) {
    console.error(`Error in ${tableName}:`, error.message)
    throw error
  }
}

