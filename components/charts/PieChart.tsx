"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart as ReChartsPie, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const defaultColors = ["#FF7B7B", "#FF9B9B", "#FFA07A", "#FFB347", "#FFD700"]

interface PieChartProps {
  title: string;
  description?: string;
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  className?: string;
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showTooltip?: boolean;
  showAnimation?: boolean;
  donut?: boolean;
  donutThickness?: number;
}

export function PieChart({
  title,
  description,
  data,
  index,
  categories,
  colors = defaultColors,
  className,
  valueFormatter = (value: number) => value.toString(),
  showLegend = true,
  showTooltip = true,
  showAnimation = true,
  donut = false,
  donutThickness = 35,
}: PieChartProps) {
  // Solo usamos la primera categoría para el gráfico circular
  const category = categories[0];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ReChartsPie>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                innerRadius={donut ? 90 - donutThickness : 0}
                dataKey={category}
                nameKey={index}
                isAnimationActive={showAnimation}
              >
                {data.map((entry, idx) => (
                  <Cell 
                    key={`cell-${idx}`} 
                    fill={colors[idx % colors.length]} 
                  />
                ))}
              </Pie>
              {showTooltip && (
                <Tooltip 
                  formatter={(value) => [valueFormatter(value as number), ""]}
                />
              )}
              {showLegend && (
                <Legend />
              )}
            </ReChartsPie>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 