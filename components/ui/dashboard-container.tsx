import type React from "react"
// components/ui/dashboard-container.tsx
interface DashboardContainerProps {
  children: React.ReactNode
}

export function DashboardContainer({ children }: DashboardContainerProps) {
  return <div className="container mx-auto space-y-6">{children}</div>
}

