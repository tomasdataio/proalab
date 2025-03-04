"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SignInForm } from "@/components/auth/SignInForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignUpForm } from "@/components/auth/SignUpForm"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { DASHBOARD_URL, APP_URL } from "@/lib/constants"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>("signin")
  const [originUrl, setOriginUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Asegurarnos de que estamos usando la URL correcta para redireccionar
    if (typeof window !== 'undefined') {
      setOriginUrl(window.location.origin)
    }
    
    // Capturar errores de autenticación desde la URL
    const errorParam = searchParams.get("error")
    if (errorParam) {
      setError(decodeURIComponent(errorParam))
    }
  }, [searchParams])

  const handleAuthSuccess = () => {
    console.log("Redirigiendo a dashboard:", DASHBOARD_URL)
    router.push(DASHBOARD_URL)
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Bienvenido</h1>
          <p className="text-sm text-muted-foreground">
            Inicia sesión para acceder a tu cuenta o regístrate para crear una nueva
          </p>
          <p className="text-xs text-muted-foreground">Entorno: {APP_URL}</p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="signup">Registrarse</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">Iniciar sesión</CardTitle>
                <CardDescription>
                  Ingresa tus credenciales para acceder a tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SignInForm onSuccess={handleAuthSuccess} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">Crear una cuenta</CardTitle>
                <CardDescription>
                  Completa el formulario para registrarte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SignUpForm onSuccess={handleAuthSuccess} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
} 