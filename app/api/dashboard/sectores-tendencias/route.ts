// app/api/dashboard/sectores-tendencias/route.ts
import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { PostgrestError } from '@supabase/supabase-js'

// Definir interfaz para los datos
interface PanelRegionSectorItem {
  id: number
  anio: number
  sector_codigo: string
  sector_id: number
  region_id: number
  region_codigo: string
  tmp_trimestre_codigo: string
  valor_total: number | null
  valor_hombres: number | null
  valor_mujeres: number | null
  valor: number | null
  [key: string]: any
}

// Definir interfaz para los datos transformados
interface TransformedData {
  sector: string
  region: string
  tmp_fecha: string
  valor: number
  valor_hombres?: number | null
  valor_mujeres?: number | null
  [key: string]: any
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sector = searchParams.get("sector")
  const fechaInicio = searchParams.get("fechaInicio")
  const fechaFin = searchParams.get("fechaFin")
  const region = searchParams.get("region")

  const supabase = supabaseAdmin()

  try {
    // Usar la tabla panel_region_sector que sí existe en la base de datos
    let query = supabase.from("panel_region_sector")
      .select(`
        id,
        anio,
        sector_codigo,
        sector_id,
        region_id,
        region_codigo,
        tmp_trimestre_codigo,
        valor_total,
        valor_hombres,
        valor_mujeres,
        valor
      `)

    // Aplicar filtros
    if (sector) {
      query = query.eq("sector_codigo", sector)
    }
    
    // Convertir filtros de fecha a formato de trimestre
    if (fechaInicio) {
      const anioInicio = new Date(fechaInicio).getFullYear()
      query = query.gte("anio", anioInicio)
    }
    
    if (fechaFin) {
      const anioFin = new Date(fechaFin).getFullYear()
      query = query.lte("anio", anioFin)
    }
    
    if (region) {
      query = query.eq("region_codigo", region)
    }

    // Ordenar por fecha
    query = query.order("anio", { ascending: true })
      .order("tmp_trimestre_codigo", { ascending: true })

    // Ejecutar la consulta
    const { data, error } = await query

    if (error) {
      throw error
    }

    // Asegurarnos de que data es un array válido
    if (!data || !Array.isArray(data)) {
      throw new Error("No se recibieron datos válidos")
    }

    // Transformar los datos al formato esperado por el dashboard
    const transformedData: TransformedData[] = data.map((item: PanelRegionSectorItem) => ({
      sector: item.sector_codigo,
      region: item.region_codigo,
      // Usar el tmp_trimestre_codigo como fecha (ej: 2020-V01)
      tmp_fecha: item.tmp_trimestre_codigo,
      // Preferir usar valor_total si está disponible, o valor si no
      valor: item.valor_total !== null ? item.valor_total : (item.valor || 0),
      // Agregar otros campos que podrían ser útiles
      valor_hombres: item.valor_hombres,
      valor_mujeres: item.valor_mujeres
    }))

    return NextResponse.json({ data: transformedData })
  } catch (error: any) {
    console.error("Error fetching sector trends:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

