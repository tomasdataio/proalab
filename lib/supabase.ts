import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Configuración para el cliente del navegador (componentes del cliente)
export const createBrowserClient = () => {
  return createClientComponentClient()
}

// Configuración para el cliente del servidor (API routes, Server Actions)
export const createServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Configuración para el cliente de administrador (operaciones privilegiadas)
export const supabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Missing Supabase admin environment variables")
  }
  
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        'X-Supabase-Auth-Override': 'service_role',
      },
    },
  })
}

// Función de utilidad para consultas a Supabase
export const fetchFromSupabase = async (tableName: string, query: any, errorMessage: string) => {
  const { data, error } = await query
  if (error) {
    console.error(errorMessage, error)
    return null
  }
  return data
}

// Cliente predeterminado para uso en componentes del cliente
export const supabase = createBrowserClient()
