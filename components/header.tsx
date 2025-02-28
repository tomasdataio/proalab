"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bell } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const tools = [
  {
    title: "Asesoría Académica",
    href: "/herramientas/asesoria-academica",
    description: "Orientación personalizada y evaluación completa para optimizar tu trayectoria académica.",
  },
  {
    title: "Desarrollo Profesional",
    href: "/herramientas/desarrollo-profesional",
    description: "Programas de mentoría y recursos para potenciar tu crecimiento profesional.",
  },
  {
    title: "Análisis de Datos",
    href: "/herramientas/analisis-datos",
    description: "Herramientas avanzadas de visualización y análisis de datos educativos.",
  },
]

const insights = [
  {
    title: "Análisis de Mercado",
    href: "/dashboards/tendencias-ocupacionales",
    description: "Análisis detallado de tendencias y demanda en el mercado laboral.",
  },
  {
    title: "Benchmarking Educativo",
    href: "/dashboards/distribucion-institucional",
    description: "Métricas y análisis del sector educativo superior.",
  },
  {
    title: "Trayectorias Profesionales",
    href: "/dashboards/explorador-carreras",
    description: "Seguimiento y análisis de trayectorias laborales.",
  },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PROA-Logo-Transparent-B3ULAPB2wcqUqp5KgaM42JtH9twCp0.png"
            alt="PROA Consulting Logo"
            width={140}
            height={45}
            className="object-contain"
            priority
          />
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Herramientas</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {tools.map((tool) => (
                    <ListItem key={tool.title} title={tool.title} href={tool.href}>
                      {tool.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Insights</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {insights.map((insight) => (
                    <ListItem key={insight.title} title={insight.title} href={insight.href}>
                      {insight.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Documentación</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-[1.2rem] w-[1.2rem]" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
          <Button asChild className="bg-[#FF7B7B] hover:bg-[#ff6b6b] text-white">
            <Link href="/demo">Prueba ProaLab</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
)

