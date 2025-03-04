"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type ChartConfig = Record<
  string,
  {
    label: string
    color: string
  }
>

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: ChartConfig
}

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: ChartContainerProps) {
  // Crear variables CSS para los colores del gráfico
  React.useEffect(() => {
    if (!config) return

    const root = document.documentElement
    Object.entries(config).forEach(([key, value]) => {
      if (value.color) {
        root.style.setProperty(`--color-${key}`, value.color)
      }
    })

    return () => {
      if (!config) return
      Object.keys(config).forEach((key) => {
        root.style.removeProperty(`--color-${key}`)
      })
    }
  }, [config])

  return (
    <div className={cn("w-full", className)} {...props}>
      {children}
    </div>
  )
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    dataKey: string
    payload: Record<string, any>
  }>
  label?: string
  className?: string
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  className,
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className={cn("rounded-lg border bg-background p-2 shadow-sm", className)}>
      <div className="text-xs font-medium">{label}</div>
      <div className="flex flex-col gap-0.5">
        {payload.map((item, index) => {
          const dataKey = item.dataKey
          const name = item.name
          const color = `var(--color-${dataKey})`

          return (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="font-medium" style={{ color }}>
                {name}:
              </span>
              <span>{item.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

