"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart as RechartsBarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface BarChartProps {
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
  layout?: "vertical" | "horizontal";
  stack?: boolean;
}

const defaultColors = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"];

export function BarChart({
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
  layout = "horizontal",
  stack = false,
}: BarChartProps) {
  const isVertical = layout === "vertical";

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RechartsBarChart
            data={data}
            layout={layout}
          >
            {showGridLines && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={!isVertical} 
                horizontal={isVertical} 
                stroke="hsl(var(--muted-foreground))" 
                opacity={0.2} 
              />
            )}
            {showXAxis && (
              <XAxis
                dataKey={isVertical ? undefined : index}
                type={isVertical ? "number" : "category"}
                tick={{ fill: "hsl(var(--foreground))" }}
                tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--muted-foreground))" }}
                tickMargin={8}
                tickFormatter={isVertical ? (value) => valueFormatter(value) : undefined}
              />
            )}
            {showYAxis && (
              <YAxis
                dataKey={isVertical ? index : undefined}
                type={isVertical ? "category" : "number"}
                width={isVertical ? undefined : yAxisWidth}
                tick={{ fill: "hsl(var(--foreground))" }}
                tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--muted-foreground))" }}
                tickMargin={8}
                tickFormatter={!isVertical ? (value) => valueFormatter(value) : undefined}
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
            {categories.map((category, index) => (
              <Bar
                key={category}
                dataKey={category}
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
                isAnimationActive={showAnimation}
                name={category}
                stackId={stack ? "stack" : undefined}
              />
            ))}
          </RechartsBarChart>
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