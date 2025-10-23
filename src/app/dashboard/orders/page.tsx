"use client";

import { OverviewCharts } from "@/components/charts/overview-charts";
import StateCard from "@/components/StateCard";
import { DataTable } from "@/components/tables/advanced-table";
import { orderColumns } from "@/components/tables/orders-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockOrders } from "@/lib/mock-data/orders";
import { Order } from "@/lib/types";
import { motion } from "framer-motion";
import { CheckCircle, Package, Plus, Smile, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(
    (o) => o.deliveryStatus === "delivered"
  ).length;
  const pendingOrders = orders.filter(
    (o) => o.deliveryStatus === "pending" || o.deliveryStatus === "shipped"
  ).length;
  const averageSatisfaction =
    orders.filter((o) => o.deliveryStatus === "delivered").length / totalOrders;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track customer orders
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/orders/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Order
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <motion.div
        className="grid gap-4 md:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <StateCard
          name="Total Orders"
          icon={Package}
          value={totalOrders}
          description="+18.7% from last month"
          trend="up"
          trendValue="18.7%"
        />
        <StateCard
          name="Delivered"
          icon={CheckCircle}
          value={deliveredOrders}
          description={`${Math.round(
            (deliveredOrders / totalOrders) * 100
          )}% of total`}
          trend="up"
          trendValue="12.3%"
        />
        <StateCard
          name="Pending"
          icon={Truck}
          value={pendingOrders}
          description="+5.2% from last month"
          trend="up"
          trendValue="5.2%"
        />
        <StateCard
          name="Satisfaction"
          icon={Smile}
          value={`${Math.round(averageSatisfaction * 100)}%`}
          description="+8.9% from last month"
          trend="up"
          trendValue="8.9%"
        />
      </motion.div>

      {/* Overview Charts */}
      <OverviewCharts ordersData={orders} productsData={[]} />

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <CardDescription>View and manage all orders</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={orderColumns}
            data={orders}
            searchKey="orderId"
            searchPlaceholder="Search orders..."
            enableRowSelection={true}
            enableColumnVisibility={true}
            enableSorting={true}
            enablePagination={true}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
