import { SidebarNav } from "@/components/ui/sidebar"

export default function ConfiguracionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex">
        <SidebarNav />
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
} 