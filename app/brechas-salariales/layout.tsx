import { SidebarNav } from "@/components/ui/sidebar"
import { TopBanner } from "@/components/ui/top-banner"

export default function BrechasSalarialesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBanner />
      <div className="flex flex-1">
        <div className="hidden md:flex">
          <SidebarNav />
        </div>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
} 