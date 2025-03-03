// app/api/dashboard/brechas-genero/route.ts
import { NextResponse } from "next/server"
import { supabaseAdmin, fetchFromSupabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const area = searchParams.get("area")
  const region = searchParams.get("region")

  const supabase = supabaseAdmin()

  try {
    let query = supabase.from("dashboard_brechas_genero").select("*")

    // Aplicar filtros
    if (area) query = query.eq("area", area)
    if (region) query = query.eq("region", region)

    const data = await fetchFromSupabase("dashboard_brechas_genero", query, "Error fetching gender gap data")

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

