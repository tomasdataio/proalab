"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CartesianGrid, Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface LineChartProps {
  title: string;
  description?: string;
  data: any[];
  categories: string[];
  index: string;
  colors?: string[];
  className?: string;
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showGridLines?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  yAxisWidth?: number;
  showAnimation?: boolean;
  showDots?: boolean;
  showGradient?: boolean;
  curveType?: "linear" | "monotone" | "natural" | "step";
  connectNulls?: boolean;
}

const defaultColors = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"];

export function LineChart({
  title,
  description,
  data,
  categories,
  index,
  colors = defaultColors,
  className,
  valueFormatter = (value: number) => value.toString(),
  showLegend = true,
  showGridLines = true,
  showXAxis = true,
  showYAxis = true,
  yAxisWidth = 40,
  showAnimation = true,
  showDots = true,
  showGradient = false,
  curveType = "linear",
  connectNulls = false,
}: LineChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RechartsLineChart data={data}>
            {showGridLines && (
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.2} />
            )}
            {showXAxis && (
              <XAxis
                dataKey={index}
                tick={{ fill: "hsl(var(--foreground))" }}
                tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--muted-foreground))" }}
                tickMargin={8}
              />
            )}
            {showYAxis && (
              <YAxis
                width={yAxisWidth}
                tick={{ fill: "hsl(var(--foreground))" }}
                tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--muted-foreground))" }}
                tickMargin={8}
                tickFormatter={(value) => valueFormatter(value)}
              />
            )}
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload) return null;
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="font-medium">{label}</div>
                    {payload.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-medium">{item.name}:</span>
                        <span>{valueFormatter(item.value as number)}</span>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
            {categories.map((category, index) => {
              // Crear un ID único para el gradiente
              const gradientId = `gradient-${category}`;
              
              return (
                <Line
                  key={category}
                  type={curveType}
                  dataKey={category}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={showDots ? { r: 4, fill: colors[index % colors.length] } : false}
                  activeDot={{ r: 6, fill: colors[index % colors.length] }}
                  isAnimationActive={showAnimation}
                  name={category}
                  connectNulls={connectNulls}
                  strokeOpacity={1}
                />
              );
            })}
            {showGradient && categories.map((category, index) => {
              const gradientId = `gradient-${category}`;
              return (
                <defs key={`gradient-${category}`}>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0} />
                  </linearGradient>
                </defs>
              );
            })}
          </RechartsLineChart>
        </ResponsiveContainer>
        {showLegend && (
          <div className="mt-4 flex flex-wrap gap-4">
            {categories.map((category, index) => (
              <div key={category} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                <span className="text-sm">{category}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 