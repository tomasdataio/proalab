export const REGIONES_CHILE = [
  { value: "Tarapaca", label: "Tarapacá" },
  { value: "Antofagasta", label: "Antofagasta" },
  { value: "Atacama", label: "Atacama" },
  { value: "Coquimbo", label: "Coquimbo" },
  { value: "Valparaiso", label: "Valparaíso" },
  { value: "O'Higgins", label: "O'Higgins" },
  { value: "Maule", label: "Maule" },
  { value: "Biobio", label: "Biobío" },
  { value: "La Araucania", label: "La Araucanía" },
  { value: "Los Lagos", label: "Los Lagos" },
  { value: "Aysen", label: "Aysén" },
  { value: "Magallanes", label: "Magallanes" },
  { value: "Metropolitana", label: "Metropolitana" },
  { value: "Los Rios", label: "Los Ríos" },
  { value: "Arica y Parinacota", label: "Arica y Parinacota" },
  { value: "Nuble", label: "Ñuble" },
  { value: "Total", label: "Total Nacional" },
]

// Determinar la URL base de la aplicación
export const APP_URL = 
  process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://v0-proa-lab.vercel.app'

// URL para redirecciones de autenticación
export const AUTH_REDIRECT_URL = `${APP_URL}/auth/callback`

// URL del dashboard
export const DASHBOARD_URL = `${APP_URL}/dashboard`

// Determinar si estamos en desarrollo local
export const IS_LOCAL_DEV = 
  process.env.NODE_ENV === 'development' && 
  (typeof window !== 'undefined' ? window.location.hostname === 'localhost' : true)

// Función para corregir URLs de redirección
export function fixRedirectUrl(url: string): string {
  if (IS_LOCAL_DEV && url.includes('v0-proa-lab.vercel.app')) {
    return url.replace('v0-proa-lab.vercel.app', 'localhost:3000')
  }
  return url
}

