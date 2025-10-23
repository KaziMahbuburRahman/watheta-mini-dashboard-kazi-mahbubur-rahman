"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React from "react";

interface StateCardProps {
  name: string;
  icon: LucideIcon;
  value: string | number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

const StateCard: React.FC<StateCardProps> = ({
  name,
  icon: Icon,
  value,
  description,
  trend,
  trendValue,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        transition: { duration: 0.2 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-border hover:shadow-xl transition-all duration-300"
    >
      <div className="px-3 py-4 sm:px-4 sm:py-5 lg:p-6">
        <div className="flex items-center justify-between">
          <span className="flex items-center text-sm font-medium text-muted-foreground">
            <Icon size={20} className="mr-2" />
            {name}
          </span>
          {trend && trendValue && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                trend === "up"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : trend === "down"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
              }`}
            >
              {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"} {trendValue}
            </motion.span>
          )}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="mt-1 text-2xl sm:text-3xl font-semibold text-foreground"
        >
          {value}
        </motion.p>
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="text-xs text-muted-foreground mt-1"
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default StateCard;
