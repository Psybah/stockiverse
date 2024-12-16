import * as React from "react"
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartProps {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  className?: string
}

export function LineChart({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  className,
}: ChartProps) {
  return (
    <ChartContainer className={className} config={{}}>
      <ResponsiveContainer>
        <Line data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={index}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
            tickFormatter={valueFormatter}
          />
          <ChartTooltip
            content={({ active, payload, label }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                label={label}
              />
            )}
          />
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors?.[i] || `hsl(var(--primary))`}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </Line>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export function BarChart({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  className,
}: ChartProps) {
  return (
    <ChartContainer className={className} config={{}}>
      <ResponsiveContainer>
        <Bar data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={index}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
            tickFormatter={valueFormatter}
          />
          <ChartTooltip
            content={({ active, payload, label }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                label={label}
              />
            )}
          />
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors?.[i] || `hsl(var(--primary))`}
            />
          ))}
        </Bar>
      </ResponsiveContainer>
    </ChartContainer>
  )
}