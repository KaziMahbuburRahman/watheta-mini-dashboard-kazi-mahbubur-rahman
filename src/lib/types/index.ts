export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  image?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderId: string;
  products: OrderProduct[];
  clientName: string;
  deliveryAddress: string;
  paymentStatus: "paid" | "pending" | "refunded";
  deliveryStatus: "pending" | "shipped" | "delivered" | "canceled";
  expectedDeliveryDate: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderProduct {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Furniture",
  "Clothing",
  "Books",
  "Sports",
  "Home & Garden",
  "Automotive",
  "Toys",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const PAYMENT_STATUSES = ["paid", "pending", "refunded"] as const;

export const DELIVERY_STATUSES = [
  "pending",
  "shipped",
  "delivered",
  "canceled",
] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
export type DeliveryStatus = (typeof DELIVERY_STATUSES)[number];

