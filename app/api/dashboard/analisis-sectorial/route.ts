// app/api/dashboard/analisis-sectorial/route.ts
import { NextResponse } from "next/server"
import { supabaseAdmin, fetchFromSupabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sector = searchParams.get("sector")
  const region = searchParams.get("region")

  const supabase = supabaseAdmin()

  try {
    let query = supabase.from("dashboard_analisis_sectorial").select("*")

    // Aplicar filtros
    if (sector) query = query.eq("sector", sector)
    if (region) query = query.eq("region", region)

    const data = await fetchFromSupabase("dashboard_analisis_sectorial", query, "Error fetching sectoral analysis")

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

