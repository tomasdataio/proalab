import type React from "react"

export default function DashboardsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">{children}</main>
    </div>
  )
}

