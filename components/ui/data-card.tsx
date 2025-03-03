import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface DataCardProps {
  title: string
  description?: string
  className?: string
  isLoading?: boolean
  children: React.ReactNode
}

export function DataCard({ title, description, className, isLoading = false, children }: DataCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-1/2" />
            {description && <Skeleton className="h-4 w-2/3" />}
          </>
        ) : (
          <>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-[200px] w-full" />
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
}

