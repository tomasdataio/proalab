import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET() {
  try {
    const startTime = Date.now()

    // Crear un cliente de Supabase sin usar cookies
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Verificar la conexión a Supabase con una consulta simple
    const { data, error } = await supabase
      .from("users") // Cambiamos a una tabla que sabemos que existe
      .select("count")
      .limit(1)

    if (error) {
      console.error("Error en health check de Supabase:", error.message)
      return NextResponse.json(
        {
          status: "error",
          message: "Supabase connection failed",
          error: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 503 }, // Service Unavailable
      )
    }

    const endTime = Date.now()
    const responseTime = endTime - startTime

    // Todo está bien
    return NextResponse.json(
      {
        status: "ok",
        message: "All systems operational",
        timestamp: new Date().toISOString(),
        responseTime: `${responseTime}ms`,
        supabase: {
          status: "connected",
          message: "Successfully queried users table",
        },
        environment: process.env.NODE_ENV,
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
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

