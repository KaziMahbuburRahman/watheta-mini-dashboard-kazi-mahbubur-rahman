"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#10b981", // Green for Delivered
  "#f59e0b", // Orange for Processing
  "#ef4444", // Red for Canceled
  "#3b82f6", // Blue for Pending
];

const OrderDistributionChart = () => {
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setOrderStatusData(data.orderStatus);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order status data:", error);
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
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <motion.h2
        className="text-base md:text-lg font-medium mb-4 text-foreground text-center md:text-left"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Order Status Distribution
      </motion.h2>

      <div className="w-full h-64 md:h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={orderStatusData}
              cx="50%"
              cy="50%"
              outerRadius={70}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name} ${((percent as number) * 100).toFixed(0)}%`
              }
            >
              {orderStatusData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "8px",
                padding: "8px",
                fontSize: "12px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
              cursor={false}
            />

            <Legend
              iconType="circle"
              layout="horizontal"
              align="center"
              wrapperStyle={{ fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default OrderDistributionChart;
