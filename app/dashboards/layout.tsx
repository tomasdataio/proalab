import type React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

const dashboardAreas = [
  {
    title: "Análisis de Mercado",
    items: [
      { name: "Tendencias Ocupacionales", href: "/dashboards/tendencias-ocupacionales" },
      { name: "Análisis Sectorial", href: "/dashboards/analisis-sectorial" },
      { name: "Tendencias por Sectores", href: "/dashboards/tendencias-sectores" },
    ],
  },
  {
    title: "Benchmarking Educativo",
    items: [
      { name: "Distribución Institucional", href: "/dashboards/distribucion-institucional" },
      { name: "Análisis por Área", href: "/dashboards/analisis-area" },
      { name: "Brechas de Género", href: "/dashboards/brechas-genero" },
    ],
  },
  {
    title: "Trayectorias Profesionales",
    items: [{ name: "Explorador de Carreras", href: "/dashboards/explorador-carreras" }],
  },
]

export default function DashboardsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu className="p-4 border-b">
        <NavigationMenuList>
          {dashboardAreas.map((area) => (
            <NavigationMenuItem key={area.title}>
              <NavigationMenuLink href="#" className="font-semibold">
                {area.title}
              </NavigationMenuLink>
              <ul className="p-2 bg-background border rounded-md shadow-md">
                {area.items.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="block py-2 px-4 hover:bg-accent">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">{children}</main>
    </div>
  )
}

