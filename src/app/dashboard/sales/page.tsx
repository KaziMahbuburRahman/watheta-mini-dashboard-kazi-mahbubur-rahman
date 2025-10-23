"use client";
import StateCard from "@/components/StateCard";
import CategoryDistributionChart from "@/components/charts/CategoryDistributionChart";
import SalesOverviewChart from "@/components/charts/SalesOverviewChart";
import { motion } from "framer-motion";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

const SalesPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <main>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          >
            <StateCard
              name="Total Revenue"
              icon={DollarSign}
              value="$42,300"
              description="+36.2% from last month"
              trend="up"
              trendValue="36.2%"
            />
            <StateCard
              name="Avg. Order Value"
              icon={ShoppingCart}
              value="$78.50"
              description="+5.2% from last month"
              trend="up"
              trendValue="5.2%"
            />
            <StateCard
              name="Total Sales"
              icon={CreditCard}
              value="128,500"
              description="+18.7% from last month"
              trend="up"
              trendValue="18.7%"
            />
            <StateCard
              name="Growth Rate"
              icon={TrendingUp}
              value="36.2%"
              description="+2.1% from last month"
              trend="up"
              trendValue="2.1%"
            />
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <SalesOverviewChart />
            <CategoryDistributionChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SalesPage;
