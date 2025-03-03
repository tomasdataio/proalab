import type React from "react"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6 p-8">
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Análisis de Mercado Laboral</h1>
          <p className="text-muted-foreground">Visualiza y analiza las tendencias del mercado laboral en tiempo real</p>
        </div>
        <Suspense
          fallback={
            <div className="grid gap-4">
              <Skeleton className="h-[200px]" />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-[200px]" />
                <Skeleton className="h-[200px]" />
                <Skeleton className="h-[200px]" />
              </div>
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  )
}

