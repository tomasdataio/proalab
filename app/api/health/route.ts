// app/api/health/route.ts
import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    // Verificar la conexión a Supabase con una consulta simple
    const supabase = supabaseAdmin()

    // Intentar obtener un solo registro de cualquier tabla
    // Puedes usar una tabla que sepas que siempre tendrá datos
    const { data, error } = await supabase.from("dashboard_distribucion_institucional").select("*").limit(1)

    if (error) {
      console.error("Error en health check de Supabase:", error.message)
      return NextResponse.json(
        {
          status: "error",
          message: "Supabase connection failed",
          error: error.message,
        },
        { status: 503 }, // Service Unavailable
      )
    }

    // Todo está bien
    return NextResponse.json(
      {
        status: "ok",
        message: "All systems operational",
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error inesperado en health check:", error.message)
    return NextResponse.json(
      {
        status: "error",
        message: "Unexpected error during health check",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

