"use client";

import StateCard from "@/components/StateCard";
import { DataTable } from "@/components/tables/advanced-table";
import { productColumns } from "@/components/tables/products-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockProducts } from "@/lib/mock-data/products";
import { Product } from "@/lib/types";
import { motion } from "framer-motion";
import {
  ChartBarStacked,
  DollarSign,
  Plus,
  ShoppingBag,
  SquareActivity,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProductsPage() {
  const [products] = useState<Product[]>(mockProducts);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Products
          </h1>
          <p className="text-muted-foreground">
            Manage your product inventory and details
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/dashboard/products/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
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
          name="Total Products"
          icon={ShoppingBag}
          value={products.length}
          description="+12.5% from last month"
          trend="up"
          trendValue="12.5%"
        />
        <StateCard
          name="Total Stock"
          icon={SquareActivity}
          value={products.reduce((sum, p) => sum + p.stock, 0)}
          description="+8.2% from last month"
          trend="up"
          trendValue="8.2%"
        />
        <StateCard
          name="Total Revenue"
          icon={DollarSign}
          value={`$${products
            .reduce((sum, p) => sum + p.price * Math.floor(p.stock * 0.3), 0)
            .toLocaleString()}`}
          description="+15.3% from last month"
          trend="up"
          trendValue="15.3%"
        />
        <StateCard
          name="Categories"
          icon={ChartBarStacked}
          value={new Set(products.map((p) => p.category)).size}
          description="+2.1% from last month"
          trend="up"
          trendValue="2.1%"
        />
      </motion.div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>View and manage all your products</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={productColumns}
            data={products}
            searchKey="name"
            searchPlaceholder="Search products..."
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
