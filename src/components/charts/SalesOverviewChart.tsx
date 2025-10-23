"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SalesOverviewChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setSalesData(data.sales);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sales data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <motion.div
        className="bg-card backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="h-64 md:h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-card backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <motion.h2
        className="text-base md:text-lg font-medium mb-4 text-foreground text-center md:text-left"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Sales Overview
      </motion.h2>

      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--muted-foreground))"
              opacity={0.3}
            />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "8px",
                padding: "12px",
                fontSize: "12px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
              labelStyle={{ color: "hsl(var(--muted-foreground))" }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{
                fill: "#3b82f6",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                fill: "#3b82f6",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesOverviewChart;
