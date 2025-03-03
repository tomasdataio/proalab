import { createServerClient } from "@/lib/supabase-server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SignInForm } from "@/components/auth/SignInForm"

export default async function SignInPage() {
  const cookieStore = cookies()
  const supabase = await createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h1 className="text-2xl font-bold mb-5">Iniciar Sesión</h1>
      <SignInForm />
    </div>
  )
}

