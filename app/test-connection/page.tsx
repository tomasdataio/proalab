import { Metadata } from "next"
import { ConnectionTest } from "@/components/tests/ConnectionTest"
import { EnvironmentChecker } from "@/components/auth/EnvironmentChecker"

export const metadata: Metadata = {
  title: "Prueba de Conexión a Supabase",
  description: "Verifica la conexión con la base de datos Supabase",
}

export default function TestConnectionPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Prueba de Conexión a Supabase</h1>
      <div className="max-w-4xl mx-auto space-y-8">
        <EnvironmentChecker />
        <ConnectionTest />
      </div>
    </div>
  )
} 