import type React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TendenciasOcupacionalesChartProps {
  data: any[]
}

export const TendenciasOcupacionalesChart: React.FC<TendenciasOcupacionalesChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fecha" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="valor" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

