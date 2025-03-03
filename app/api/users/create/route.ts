import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    // Obtener datos del cuerpo de la solicitud
    const userData = await request.json()
    
    // Validar datos mínimos requeridos
    if (!userData.email) {
      return NextResponse.json(
        { error: "El email es requerido" },
        { status: 400 }
      )
    }
    
    // Usar el cliente de administrador para omitir RLS
    const supabase = supabaseAdmin()
    
    // Crear usuario
    const { data: user, error } = await supabase
      .from("users")
      .insert({
        email: userData.email,
        full_name: userData.full_name || null,
        avatar_url: userData.avatar_url || null,
        metadata: userData.metadata || null,
      })
      .select()
      .single()
    
    if (error) {
      console.error("Error creating user:", error)
      return NextResponse.json(
        { error: "Error al crear el usuario" },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ user }, { status: 201 })
  } catch (error: any) {
    console.error("Error al crear usuario:", error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
