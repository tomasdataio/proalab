// app/api/dashboard/tendencias-ocupacionales/route.ts
import { NextResponse } from "next/server"
import { supabaseAdmin, fetchFromSupabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fechaInicio = searchParams.get("fechaInicio")
  const fechaFin = searchParams.get("fechaFin")
  const ocupacion = searchParams.get("ocupacion")
  const region = searchParams.get("region")

  const supabase = supabaseAdmin()

  try {
    let query = supabase.from("dashboard_tendencias_ocupacionales").select("*")

    // Aplicar filtros
    if (fechaInicio) query = query.gte("tmp_fecha", fechaInicio)
    if (fechaFin) query = query.lte("tmp_fecha", fechaFin)
    if (ocupacion) query = query.eq("ocupacion", ocupacion)
    if (region) query = query.eq("region", region)

    // Ordenar por fecha
    query = query.order("tmp_fecha", { ascending: true })

    const data = await fetchFromSupabase(
      "dashboard_tendencias_ocupacionales",
      query,
      "Error fetching occupational trends",
    )

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

