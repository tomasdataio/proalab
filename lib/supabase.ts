import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (typeof window !== "undefined" && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error("Missing Supabase environment variables")
}

export const createBrowserClient = () => {
  return createClientComponentClient()
}

export const createServerClient = () => {
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

export const supabaseAdmin = () => {
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Missing Supabase admin environment variables")
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export const fetchFromSupabase = async (tableName: string, query: any, errorMessage: string) => {
  const { data, error } = await query
  if (error) {
    console.error(errorMessage, error)
    return null
  }
  return data
}

// Export a default Supabase instance for backwards compatibility
export const supabase = createBrowserClient()

