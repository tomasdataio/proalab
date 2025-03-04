"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Calendar } from "lucide-react"

export default function PerfilPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [nombre, setNombre] = useState("")
  const [saveLoading, setSaveLoading] = useState(false)
  const router = useRouter()
  const supabase = createBrowserClient()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error || !data.session) {
          router.push("/auth/login")
          return
        }
        
        setUser(data.session.user)
        
        // Intentar obtener el perfil del usuario (esto depende de tu esquema de base de datos)
        const { data: profileData } = await supabase
          .from('perfiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single()
        
        if (profileData) {
          setNombre(profileData.nombre || "")
        }
      } catch (error) {
        console.error("Error al obtener la sesión:", error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [router, supabase])

  const handleSaveProfile = async () => {
    if (!user) return

    setSaveLoading(true)
    try {
      // Actualizar o crear el perfil del usuario
      const { error } = await supabase
        .from('perfiles')
        .upsert({
          id: user.id,
          nombre: nombre,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
      
      alert("Perfil actualizado correctamente")
    } catch (error) {
      console.error("Error al guardar el perfil:", error)
      alert("Error al guardar el perfil")
    } finally {
      setSaveLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center">
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push("/auth/login")
    return null
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Información de la Cuenta</CardTitle>
            <CardDescription>
              Detalles de tu cuenta y sesión actual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
              <User className="h-10 w-10 text-primary" />
              <div>
                <p className="font-medium">{user.email}</p>
                <p className="text-sm text-muted-foreground">ID: {user.id.substring(0, 8)}...</p>
              </div>
            </div>
            
            <div className="grid gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Email:</span>
                <span className="text-sm text-muted-foreground">{user.email}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Último inicio de sesión:</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(user.last_sign_in_at).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Editar Perfil</CardTitle>
            <CardDescription>
              Actualiza tu información personal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre completo"
              />
            </div>
            
            <Button 
              onClick={handleSaveProfile} 
              disabled={saveLoading}
              className="w-full"
            >
              {saveLoading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 