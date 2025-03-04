import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { DASHBOARD_URL, fixRedirectUrl } from "@/lib/constants"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  
  // Si no hay código, no es una redirección de OAuth
  if (!code) {
    return NextResponse.redirect(`${requestUrl.origin}/auth/login`)
  }

  const supabase = createServerSupabaseClient()

  try {
    // Intercambiar el código por una sesión
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error("Error al intercambiar código por sesión:", error)
      return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=${error.message}`)
    }
    
    // Usar la URL constante para el dashboard
    console.log(`Redirigiendo al dashboard: ${DASHBOARD_URL}`)
    
    // Redireccionar al dashboard en caso de éxito
    return NextResponse.redirect(DASHBOARD_URL)
  } catch (error) {
    console.error("Error inesperado en el callback:", error)
    return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=Error%20inesperado`)
  }
}

