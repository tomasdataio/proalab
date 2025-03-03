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
    if (sector && sector !== "todos") query = query.eq("sector", sector)
    if (fechaInicio) query = query.gte("fecha", fechaInicio)
    if (fechaFin) query = query.lte("fecha", fechaFin)
    if (region && region !== "todas") query = query.eq("region", region)

    // Ordenar por fecha
    query = query.order("fecha", { ascending: true })

    const data = await fetchFromSupabase("dashboard_sectores_tendencias", query, "Error fetching sector trends")

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error("Error in sectores-tendencias route:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

