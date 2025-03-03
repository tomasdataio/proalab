"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SignInForm } from "@/components/auth/SignInForm"
import { SignUpForm } from "@/components/auth/SignUpForm"

export function Header({ session }: { session: any | null }) {
  const router = useRouter()
  const [isSignInOpen, setIsSignInOpen] = React.useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false)

  const handleSignOut = async () => {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* ... (rest of the header content) */}
        <nav className="flex items-center space-x-4">
          <ThemeToggle />
          {session ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-base">
              <LogOut className="h-5 w-5 mr-2" />
              Cerrar sesión
            </Button>
          ) : (
            <>
              <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-base">
                    Iniciar sesión
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Iniciar sesión</DialogTitle>
                    <DialogDescription>Ingresa tus credenciales para acceder a tu cuenta.</DialogDescription>
                  </DialogHeader>
                  <SignInForm onSuccess={() => setIsSignInOpen(false)} />
                </DialogContent>
              </Dialog>

              <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm" className="text-base bg-primary hover:bg-primary/90">
                    Registrarse
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear una cuenta</DialogTitle>
                    <DialogDescription>Regístrate para acceder a todas nuestras funcionalidades.</DialogDescription>
                  </DialogHeader>
                  <SignUpForm onSuccess={() => setIsSignUpOpen(false)} />
                </DialogContent>
              </Dialog>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

