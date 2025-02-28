// app/api/dashboard/analisis-area/route.ts
import { NextResponse } from "next/server"
import { supabaseAdmin, fetchFromSupabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const area = searchParams.get("area")

  const supabase = supabaseAdmin()

  try {
    let query = supabase.from("dashboard_analisis_area").select("*")

    // Aplicar filtros
    if (area) query = query.eq("area_conocimiento", area)

    // Ordenar por matrícula total
    query = query.order("matricula_total", { ascending: false })

    const data = await fetchFromSupabase("dashboard_analisis_area", query, "Error fetching knowledge area analysis")

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

