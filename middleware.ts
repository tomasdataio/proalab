import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from './utils/supabase/middleware'
import { APP_URL, fixRedirectUrl } from './lib/constants'

export async function middleware(request: NextRequest) {
  // Obtener la URL de la solicitud
  const url = new URL(request.url)
  const hostname = url.hostname

  // Si la URL es la de v0.proa-lab.vercel.app y estamos en desarrollo local,
  // redirigir a localhost:3000
  if (hostname === 'v0-proa-lab.vercel.app' && process.env.NODE_ENV === 'development') {
    const path = url.pathname + url.search
    const redirectUrl = new URL(path, APP_URL)
    console.log(`Redireccionando de ${url.toString()} a ${redirectUrl.toString()}`)
    return NextResponse.redirect(redirectUrl)
  }

  // Para cualquier solicitud de autenticación, verificar si necesitamos interceptar
  if (url.pathname.startsWith('/auth/callback')) {
    // Forzar redirección al localhost para entornos de desarrollo
    if (process.env.NODE_ENV === 'development') {
      // Procesar la solicitud normalmente
      const response = await updateSession(request)
      
      // Interceptar la respuesta si contiene una redirección
      const location = response.headers.get('location')
      if (location && location.includes('v0-proa-lab.vercel.app')) {
        const redirectUrl = fixRedirectUrl(location)
        console.log(`Interceptando redirección: ${location} -> ${redirectUrl}`)
        return NextResponse.redirect(redirectUrl)
      }
      
      return response
    }
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
