// lib/supabase.ts
import { createClient } from "@supabase/supabase-js"
import { PostgrestFilterBuilder } from '@supabase/postgrest-js'

// Cliente para el lado del cliente (con clave anónima)
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// Cliente para rutas API (con clave de servicio)
export const supabaseAdmin = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// Datos de fallback para cada tabla
const fallbackData: Record<string, any[]> = {
  // Añadir datos de ejemplo para tablas críticas
  dashboard_distribucion_institucional: [
    {
      tipo: "Universidades",
      acreditacion: "5 años",
      region: "Metropolitana",
      num_instituciones: 25,
      num_carreras: 450,
      matricula_total: 125000
    },
    {
      tipo: "Centros de Formación Técnica",
      acreditacion: "4 años",
      region: "Valparaíso",
      num_instituciones: 12,
      num_carreras: 180,
      matricula_total: 35000
    }
  ],
  dashboard_brechas_genero: [
    {
      area: "Tecnología",
      region: "Metropolitana",
      pct_mujeres: 23.5,
      pct_hombres: 76.5,
      brecha_desocupacion: 3.2,
      brecha_informalidad: 5.8
    }
  ],
  dashboard_analisis_sectorial: [
    {
      sector: "Tecnología",
      region: "Metropolitana",
      tasa_desocupacion: 4.2,
      variabilidad: 15.3,
      fuerza_trabajo: 120000,
      informalidad: 12.5
    }
  ]
}

// Función para obtener datos con manejo de errores
export async function fetchFromSupabase<T>(
  tableName: string,
  query: PostgrestFilterBuilder<any, any, any[]>,
  errorMessage: string = "Error fetching data",
  options: { silentErrors?: boolean } = {}
): Promise<T[]> {
  try {
    const { data, error } = await query

    if (error) {
      throw new Error(`${errorMessage}: ${error.message}`)
    }

    if (!data || data.length === 0) {
      // Si no hay datos, buscar en los datos de fallback
      const fallback = fallbackData[tableName]
      if (fallback && fallback.length > 0) {
        console.warn(`No data found in ${tableName}. Using fallback data.`)
        return fallback as unknown as T[]
      }
      
      console.warn(`No data found in ${tableName}.`)
      return [] as T[]
    }

    return data as T[]
  } catch (error: any) {
    // Si hay un error, verificar si tenemos datos de fallback
    const fallback = fallbackData[tableName]
    if (fallback && fallback.length > 0) {
      console.warn(`Error fetching from ${tableName}: ${error.message}. Using fallback data.`)
      return fallback as unknown as T[]
    }
    
    if (options.silentErrors) {
      console.error(`Error fetching from ${tableName}: ${error.message}`)
      return [] as T[]
    }
    
    throw new Error(`${errorMessage}: ${error.message}`)
  }
}

