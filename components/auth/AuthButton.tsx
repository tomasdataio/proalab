"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { LogIn, User, Settings, LogOut } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase"

export function AuthButton() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createBrowserClient()

  useEffect(() => {
    // Verificar la sesión actual al cargar el componente
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (data?.session) {
          setUser(data.session.user)
        }
      } catch (error) {
        console.error("Error al obtener la sesión:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    // Suscribirse a cambios en la autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => {
      // Limpiar el listener al desmontar el componente
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      router.refresh()
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Button variant="ghost" disabled><LogIn className="mr-2 h-4 w-4" /> Cargando...</Button>
  }

  if (!user) {
    return (
      <Link href="/auth/login">
        <Button variant="secondary">
          <LogIn className="mr-2 h-4 w-4" /> Iniciar sesión
        </Button>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline-block">
            {user.email ? user.email.split('@')[0] : 'Usuario'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled className="font-medium">
          {user.email || 'Usuario'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/perfil" className="flex items-center cursor-pointer w-full">
            <User className="mr-2 h-4 w-4" /> Mi perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/configuracion" className="flex items-center cursor-pointer w-full">
            <Settings className="mr-2 h-4 w-4" /> Configuración
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
          <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 