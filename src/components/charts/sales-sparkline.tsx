"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";

interface SalesSparklineProps {
  data: number[];
  color?: string;
  height?: number;
}

export function SalesSparkline({
  data,
  color = "#8884d8",
  height = 30,
}: SalesSparklineProps) {
  const chartData = data.map((value, index) => ({
    day: index + 1,
    sales: value,
  }));

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="sales"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
