import { mockProducts } from "@/lib/mock-data/products";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      data: mockProducts,
      total: mockProducts.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real app, you would save to database
    const newProduct = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}

