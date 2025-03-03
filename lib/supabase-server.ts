import { createServerClient as createServerClientSSR } from "@supabase/ssr"
import { cookies } from "next/headers"

export const createServerClient = () => {
  const cookieStore = cookies()
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  return createServerClientSSR(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookies in Server Components
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookies in Server Components
          }
        }
      }
    }
  )
}

// Alias for createServerClient to match the expected export
export const createServerComponentSupabaseClient = createServerClient
