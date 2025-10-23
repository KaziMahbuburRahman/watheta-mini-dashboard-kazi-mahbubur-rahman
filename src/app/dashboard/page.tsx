"use client";
import StateCard from "@/components/StateCard";
import CategoryDistributionChart from "@/components/charts/CategoryDistributionChart";
import OrderDistributionChart from "@/components/charts/OrderDistributionChart";
import ProductPerformanceChart from "@/components/charts/ProductPerformanceChart";
import SalesOverviewChart from "@/components/charts/SalesOverviewChart";
import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, SquareActivity, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex-1 relative z-10">
      <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
        >
          <StateCard
            name="Total Sales"
            icon={DollarSign}
            value="$182,450"
            description="+20.1% from last month"
            trend="up"
            trendValue="20.1%"
          />
          <StateCard
            name="Total Clients"
            icon={Users}
            value="1,473"
            description="+15.3% from last month"
            trend="up"
            trendValue="15.3%"
          />
          <StateCard
            name="Total Products"
            icon={ShoppingBag}
            value="674"
            description="+12.5% from last month"
            trend="up"
            trendValue="12.5%"
          />
          <StateCard
            name="Stock"
            icon={SquareActivity}
            value="12,874"
            description="+8.2% from last month"
            trend="up"
            trendValue="8.2%"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionChart />
          <OrderDistributionChart />
          <ProductPerformanceChart />
        </div>
      </main>
    </div>
  );
}
