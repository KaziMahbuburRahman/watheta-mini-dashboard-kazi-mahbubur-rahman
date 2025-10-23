import { mockOrders } from "@/lib/mock-data/orders";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      data: mockOrders,
      total: mockOrders.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate order ID
    const orderId = `ORD-${String(Date.now()).slice(-6)}`;

    // In a real app, you would save to database
    const newOrder = {
      id: Date.now().toString(),
      orderId,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newOrder,
      message: "Order created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}

