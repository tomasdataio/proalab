import { NextResponse } from "next/server"
import { getUsers } from "@/lib/supabase-queries"

export async function GET(request: Request) {
  try {
    // Obtener parámetros de consulta
    const url = new URL(request.url)
    const email = url.searchParams.get("email")
    const id = url.searchParams.get("id")
    
    // Construir filtros
    const filters: { email?: string; id?: string } = {}
    if (email) filters.email = email
    if (id) filters.id = id
    
    // Obtener usuarios
    const users = await getUsers(filters)
    
    if (!users) {
      return NextResponse.json(
        { error: "Error al obtener usuarios" },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ users })
  } catch (error: any) {
    console.error("Error en la ruta de usuarios:", error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
