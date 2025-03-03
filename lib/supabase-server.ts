import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const createServerClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}

// Alias for createServerClient to match the expected export
export const createServerComponentSupabaseClient = createServerClient

