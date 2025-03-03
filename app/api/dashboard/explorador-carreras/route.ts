// app/api/dashboard/explorador-carreras/route.ts
import { NextResponse } from "next/server"
import { supabaseAdmin, fetchFromSupabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const carrera = searchParams.get("carrera")
  const area = searchParams.get("area")
  const institucion = searchParams.get("institucion")
  const tipo = searchParams.get("tipo_inst")
  const region = searchParams.get("region")

  const supabase = supabaseAdmin()

  try {
    let query = supabase.from("dashboard_explorador_carreras").select("*")

    // Aplicar filtros
    if (carrera) query = query.ilike("carrera", `%${carrera}%`)
    if (area) query = query.eq("area", area)
    if (institucion) query = query.eq("institucion", institucion)
    if (tipo) query = query.eq("tipo_inst", tipo)
    if (region) query = query.eq("region", region)

    // Limitar resultados para evitar respuestas muy grandes
    query = query.limit(100)

    const data = await fetchFromSupabase("dashboard_explorador_carreras", query, "Error fetching careers data")

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

