import type React from "react"
export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">{children}</div>
    </div>
  )
}

