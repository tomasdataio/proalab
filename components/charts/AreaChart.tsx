"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart as RechartsAreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface AreaChartProps {
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
  startEndOnly?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  yAxisWidth?: number;
  showAnimation?: boolean;
}

const defaultColors = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"];

export function AreaChart({
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
  startEndOnly = false,
  showXAxis = true,
  showYAxis = true,
  yAxisWidth = 40,
  showAnimation = true,
}: AreaChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RechartsAreaChart data={data}>
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
                tickFormatter={startEndOnly ? (value, index) => (index === 0 || index === data.length - 1 ? value : "") : undefined}
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
            {categories.map((category, index) => (
              <Area
                key={category}
                type="monotone"
                dataKey={category}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.2}
                activeDot={{ r: 6 }}
                isAnimationActive={showAnimation}
                name={category}
              />
            ))}
          </RechartsAreaChart>
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