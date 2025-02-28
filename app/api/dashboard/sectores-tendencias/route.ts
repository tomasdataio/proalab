// app/api/dashboard/sectores-tendencias/route.ts
import { NextResponse } from "next/server"
import { supabaseAdmin, fetchFromSupabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sector = searchParams.get("sector")
  const fechaInicio = searchParams.get("fechaInicio")
  const fechaFin = searchParams.get("fechaFin")
  const region = searchParams.get("region")

  const supabase = supabaseAdmin()

  try {
    let query = supabase.from("dashboard_sectores_tendencias").select("*")

    // Aplicar filtros
    if (sector) query = query.eq("sector", sector)
    if (fechaInicio) query = query.gte("tmp_fecha", fechaInicio)
    if (fechaFin) query = query.lte("tmp_fecha", fechaFin)
    if (region) query = query.eq("region", region)

    // Ordenar por fecha
    query = query.order("tmp_fecha", { ascending: true })

    const data = await fetchFromSupabase("dashboard_sectores_tendencias", query, "Error fetching sector trends")

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

