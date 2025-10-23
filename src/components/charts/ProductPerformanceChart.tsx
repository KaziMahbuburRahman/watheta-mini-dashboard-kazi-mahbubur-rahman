"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ProductPerformanceChart = () => {
  const [productPerformanceData, setProductPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setProductPerformanceData(data.productPerformance);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product performance data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <motion.div
        className="bg-card backdrop-blur-lg shadow-lg rounded-xl p-4 md:p-6 border border-border"
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
      className="bg-card backdrop-blur-lg shadow-lg rounded-xl p-4 md:p-6 border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <motion.h2
        className="text-base md:text-xl font-semibold text-foreground mb-4 text-center md:text-left"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Product Performance
      </motion.h2>

      <div className="w-full h-64 md:h-72">
        <ResponsiveContainer>
          <BarChart data={productPerformanceData || []}>
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
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                fontSize: "12px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="Retention" fill="#3b82f6" />
            <Bar dataKey="Revenue" fill="#10b981" />
            <Bar dataKey="Profit" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ProductPerformanceChart;
