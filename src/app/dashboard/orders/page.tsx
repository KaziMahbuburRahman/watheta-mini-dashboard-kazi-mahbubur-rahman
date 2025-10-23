"use client";

import { OverviewCharts } from "@/components/charts/overview-charts";
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
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveredOrders}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((deliveredOrders / totalOrders) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Truck className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Smile className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(averageSatisfaction * 100)}%
            </div>
          </CardContent>
        </Card>
      </div>

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
