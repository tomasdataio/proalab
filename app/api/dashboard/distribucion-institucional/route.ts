import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Crear el cliente de Supabase
const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tipo = searchParams.get("tipo")
  const acreditacion = searchParams.get("acreditacion")
  const region = searchParams.get("region")

  try {
    let query = supabase.from("dashboard_distribucion_institucional").select("*")

    // Aplicar filtros si existen
    if (tipo) query = query.eq("tipo", tipo)
    if (acreditacion) query = query.eq("acreditacion", acreditacion)
    if (region) query = query.eq("region", region)

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

