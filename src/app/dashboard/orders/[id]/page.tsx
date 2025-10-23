"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { mockOrders } from "@/lib/mock-data/orders";
import { Order } from "@/lib/types";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Package,
  Phone,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const [orders] = useState<Order[]>(mockOrders);
  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    notFound();
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getPaymentStatusBadge = (status: string) => {
    const variants = {
      paid: { variant: "default" as const, label: "Paid" },
      pending: { variant: "secondary" as const, label: "Pending" },
      refunded: { variant: "destructive" as const, label: "Refunded" },
    };
    return (
      variants[status as keyof typeof variants] || {
        variant: "outline" as const,
        label: status,
      }
    );
  };

  const getDeliveryStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, label: "Pending" },
      shipped: { variant: "default" as const, label: "Shipped" },
      delivered: { variant: "default" as const, label: "Delivered" },
      canceled: { variant: "destructive" as const, label: "Canceled" },
    };
    return (
      variants[status as keyof typeof variants] || {
        variant: "outline" as const,
        label: status,
      }
    );
  };

  const getDeliveryProgress = (status: string) => {
    const progress = {
      pending: 0,
      shipped: 50,
      delivered: 100,
      canceled: 0,
    };
    return progress[status as keyof typeof progress] || 0;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const paymentStatus = getPaymentStatusBadge(order.paymentStatus);
  const deliveryStatus = getDeliveryStatusBadge(order.deliveryStatus);
  const progress = getDeliveryProgress(order.deliveryStatus);

  // Timeline data
  const timeline = [
    {
      id: 1,
      title: "Order Placed",
      description: "Order was successfully placed",
      date: order.createdAt,
      status: "completed",
      icon: Package,
    },
    {
      id: 2,
      title: "Payment Processed",
      description:
        order.paymentStatus === "paid"
          ? "Payment confirmed"
          : "Payment pending",
      date: order.createdAt,
      status: order.paymentStatus === "paid" ? "completed" : "pending",
      icon: CheckCircle,
    },
    {
      id: 3,
      title: "Order Shipped",
      description:
        order.deliveryStatus === "shipped" ||
        order.deliveryStatus === "delivered"
          ? "Order has been shipped"
          : "Preparing for shipment",
      date:
        order.deliveryStatus === "shipped" ||
        order.deliveryStatus === "delivered"
          ? order.updatedAt
          : null,
      status:
        order.deliveryStatus === "shipped" ||
        order.deliveryStatus === "delivered"
          ? "completed"
          : "pending",
      icon: Truck,
    },
    {
      id: 4,
      title: "Order Delivered",
      description:
        order.deliveryStatus === "delivered"
          ? "Order has been delivered"
          : "Out for delivery",
      date: order.deliveryStatus === "delivered" ? order.updatedAt : null,
      status: order.deliveryStatus === "delivered" ? "completed" : "pending",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
          <p className="text-muted-foreground">Order #{order.orderId}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Order Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Delivery Progress</span>
                <span className="text-sm text-muted-foreground">
                  {progress}%
                </span>
              </div>
              <Progress value={progress} className="w-full" />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant={paymentStatus.variant}>
                    {paymentStatus.label}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={deliveryStatus.variant}>
                    {deliveryStatus.label}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Delivery
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="text-lg">
                    {getInitials(order.clientName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{order.clientName}</h3>
                  <p className="text-sm text-muted-foreground">Customer</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{order.deliveryAddress}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Expected delivery:{" "}
                    {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium">{product.productName}</h4>
                        <p className="text-sm text-muted-foreground">
                          SKU: {product.productId}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${product.price.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {product.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-lg font-bold">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
              <CardDescription>Track your order progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : item.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-sm font-medium ${
                          item.status === "completed"
                            ? "text-green-900"
                            : "text-gray-900"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      {item.date && (
                        <p className="text-xs text-muted-foreground">
                          {formatDate(item.date)}
                        </p>
                      )}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="absolute left-4 mt-8 w-0.5 h-8 bg-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Contact Customer
              </Button>
              <Button className="w-full" variant="outline">
                <Truck className="mr-2 h-4 w-4" />
                Update Status
              </Button>
              <Button className="w-full" variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                Reschedule Delivery
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
