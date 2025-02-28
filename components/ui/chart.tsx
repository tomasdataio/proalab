"use client"

import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ChartProps {
  data: Array<{ [key: string]: string | number }>
  xKey: string
  yKey: string
  color?: string
}

export function Chart({ data, xKey, yKey, color = "#FF7B7B" }: ChartProps) {
  const { theme } = useTheme()

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#374151" : "#E5E7EB"} />
        <XAxis dataKey={xKey} stroke={theme === "dark" ? "#9CA3AF" : "#6B7280"} />
        <YAxis stroke={theme === "dark" ? "#9CA3AF" : "#6B7280"} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
            borderColor: theme === "dark" ? "#374151" : "#E5E7EB",
          }}
        />
        <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

