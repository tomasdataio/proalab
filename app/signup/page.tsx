import { SignUpForm } from "@/components/auth/SignUpForm"

export default function SignUpPage() {
  return (
    <div className="container mx-auto max-w-md mt-10">
      <h1 className="text-2xl font-bold mb-5">Registrarse</h1>
      <SignUpForm />
    </div>
  )
}

