"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AuthButton } from "@/components/auth/AuthButton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TopBannerProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
}

export function TopBanner({ className, logo, ...props }: TopBannerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-institutional-gradient dark:bg-institutional-gradient-dark shadow-md",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            {logo ? (
              logo
            ) : (
              <Link href="/" className="text-white font-bold text-xl">
                Análisis Laboral
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-white hover:text-white/80 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="link"
                  className="text-white hover:text-white/80 font-medium p-0"
                >
                  Análisis <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/brechas-salariales" className="w-full">
                    Brechas Salariales
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/distribucion-sectorial" className="w-full">
                    Distribución Sectorial
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/fortaleza-demanda" className="w-full">
                    Fortaleza de Demanda
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/datos"
              className="text-white hover:text-white/80 font-medium transition-colors"
            >
              Datos
            </Link>
            <Link
              href="/informes"
              className="text-white hover:text-white/80 font-medium transition-colors"
            >
              Informes
            </Link>
            <AuthButton />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-3">
            <Link
              href="/dashboard"
              className="block text-white hover:text-white/80 font-medium py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <div className="py-2">
              <div className="text-white font-medium mb-2">Análisis</div>
              <div className="pl-4 space-y-2">
                <Link
                  href="/brechas-salariales"
                  className="block text-white/90 hover:text-white font-medium py-1 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Brechas Salariales
                </Link>
                <Link
                  href="/distribucion-sectorial"
                  className="block text-white/90 hover:text-white font-medium py-1 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Distribución Sectorial
                </Link>
                <Link
                  href="/fortaleza-demanda"
                  className="block text-white/90 hover:text-white font-medium py-1 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Fortaleza de Demanda
                </Link>
              </div>
            </div>
            <Link
              href="/datos"
              className="block text-white hover:text-white/80 font-medium py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Datos
            </Link>
            <Link
              href="/informes"
              className="block text-white hover:text-white/80 font-medium py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Informes
            </Link>
            <div className="py-2">
              <AuthButton />
            </div>
          </nav>
        )}
      </div>
    </header>
  )
} 