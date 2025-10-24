"use client";

import { Order, Product } from "@/lib/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartDataPoint {
  month?: string;
  sales?: number;
  orders?: number;
  name?: string;
  value?: number;
  color?: string;
  status?: string;
}

interface OverviewChartsProps {
  ordersData: Order[];
  productsData: Product[];
}

export function OverviewCharts({
  ordersData,
  productsData,
}: OverviewChartsProps) {
  // Sample data for charts
  const salesData = [
    { month: "Jan", sales: 4000, orders: 24 },
    { month: "Feb", sales: 3000, orders: 13 },
    { month: "Mar", sales: 2000, orders: 98 },
    { month: "Apr", sales: 2780, orders: 39 },
    { month: "May", sales: 1890, orders: 48 },
    { month: "Jun", sales: 2390, orders: 38 },
  ];

  const categoryData = [
    { name: "Electronics", value: 35, color: "#8884d8" },
    { name: "Furniture", value: 25, color: "#82ca9d" },
    { name: "Clothing", value: 20, color: "#ffc658" },
    { name: "Books", value: 10, color: "#ff7300" },
    { name: "Sports", value: 10, color: "#00ff00" },
  ];

  const deliveryData = [
    { status: "Delivered", value: 65, color: "#10b981" },
    { status: "Shipped", value: 20, color: "#3b82f6" },
    { status: "Pending", value: 10, color: "#f59e0b" },
    { status: "Canceled", value: 5, color: "#ef4444" },
  ];

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Sales Trend Chart */}
      <div className="rounded-lg border p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Sales Trend</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders Chart */}
      <div className="rounded-lg border p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4">
          Orders by Month
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Distribution */}
      <div className="rounded-lg border p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4">
          Product Categories
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Pie key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Delivery Status */}
      <div className="rounded-lg border p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4">
          Delivery Status
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={deliveryData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {deliveryData.map((entry, index) => (
                <Pie key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Chart */}
      <div className="rounded-lg border p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4">
          Revenue Overview
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Satisfaction */}
      <div className="rounded-lg border p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4">
          Customer Satisfaction
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Happy</span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
            <span className="text-sm font-medium">75%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Neutral</span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: "20%" }}
              ></div>
            </div>
            <span className="text-sm font-medium">20%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Unhappy</span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: "5%" }}
              ></div>
            </div>
            <span className="text-sm font-medium">5%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
