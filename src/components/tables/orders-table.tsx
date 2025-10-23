"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Order } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  Eye,
  Frown,
  Meh,
  MoreHorizontal,
  Smile,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export const orderColumns: ColumnDef<Order>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => row.toggleExpanded()}
        className="h-8 w-8 p-0"
      >
        {row.getIsExpanded() ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        className="rounded border-gray-300"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
        className="rounded border-gray-300"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <Link
          href={`/dashboard/orders/${order.id}`}
          className="font-medium text-primary hover:underline"
        >
          {order.orderId}
        </Link>
      );
    },
  },
  {
    accessorKey: "clientName",
    header: "Client",
    cell: ({ row }) => {
      const clientName = row.getValue("clientName") as string;
      const getInitials = (name: string) => {
        return name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();
      };
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {getInitials(clientName)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{clientName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus") as string;
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
      const paymentStatus = getPaymentStatusBadge(status);
      return (
        <Badge variant={paymentStatus.variant}>{paymentStatus.label}</Badge>
      );
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: "Delivery",
    cell: ({ row }) => {
      const status = row.getValue("deliveryStatus") as string;
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
      const deliveryStatus = getDeliveryStatusBadge(status);
      return (
        <Badge variant={deliveryStatus.variant}>{deliveryStatus.label}</Badge>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      return <span className="font-medium">${amount.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: "Progress",
    cell: ({ row }) => {
      const status = row.getValue("deliveryStatus") as string;
      const getDeliveryProgress = (status: string) => {
        const progress = {
          pending: 0,
          shipped: 50,
          delivered: 100,
          canceled: 0,
        };
        return progress[status as keyof typeof progress] || 0;
      };
      const progress = getDeliveryProgress(status);
      return (
        <div className="flex items-center space-x-2">
          <Progress value={progress} className="w-16" />
          <span className="text-xs text-muted-foreground">{progress}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: "Feedback",
    cell: ({ row }) => {
      const order = row.original;
      const getCustomerSatisfaction = (order: Order) => {
        if (
          order.deliveryStatus === "delivered" &&
          order.paymentStatus === "paid"
        ) {
          return { icon: Smile, color: "text-green-500", label: "Happy" };
        } else if (
          order.deliveryStatus === "canceled" ||
          order.paymentStatus === "refunded"
        ) {
          return { icon: Frown, color: "text-red-500", label: "Unhappy" };
        } else {
          return { icon: Meh, color: "text-yellow-500", label: "Neutral" };
        }
      };
      const satisfaction = getCustomerSatisfaction(order);
      return (
        <div className="flex items-center space-x-1">
          <satisfaction.icon className={`h-4 w-4 ${satisfaction.color}`} />
          <span className="text-xs text-muted-foreground">
            {satisfaction.label}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <span className="text-sm text-muted-foreground">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/orders/${order.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/orders/${order.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
