"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { mockProducts } from "@/lib/mock-data/products";
import { DELIVERY_STATUSES, PAYMENT_STATUSES, Product } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Calculator, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const orderSchema = z.object({
  products: z
    .array(
      z.object({
        productId: z.string().min(1, "Product is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
      })
    )
    .min(1, "At least one product is required"),
  clientName: z.string().min(1, "Client name is required"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  paymentStatus: z.enum(["paid", "pending", "refunded"]),
  deliveryStatus: z.enum(["pending", "shipped", "delivered", "canceled"]),
  expectedDeliveryDate: z.string().min(1, "Expected delivery date is required"),
});

type OrderFormData = z.infer<typeof orderSchema>;

export default function CreateOrderPage() {
  const router = useRouter();
  const [products] = useState<Product[]>(mockProducts);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      products: [{ productId: "", quantity: 1 }],
      paymentStatus: "pending",
      deliveryStatus: "pending",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const watchedProducts = watch("products");

  // Calculate total amount
  const totalAmount = watchedProducts.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const addProduct = () => {
    append({ productId: "", quantity: 1 });
  };

  const removeProduct = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Order data:", data);

      toast.success("Order created successfully!");
      router.push("/dashboard/orders");
    } catch (error) {
      toast.error("Failed to create order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Order</h1>
          <p className="text-muted-foreground">
            Create a new order for a customer
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Order Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Products Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Select products and quantities for this order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-end space-x-4">
                    <div className="flex-1 space-y-2">
                      <Label>Product</Label>
                      <Select
                        value={watchedProducts[index]?.productId || ""}
                        onValueChange={(value) =>
                          setValue(`products.${index}.productId`, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name} - ${product.price.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.products?.[index]?.productId && (
                        <p className="text-sm text-red-500">
                          {errors.products[index]?.productId?.message}
                        </p>
                      )}
                    </div>
                    <div className="w-24 space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        min="1"
                        {...register(`products.${index}.quantity`, {
                          valueAsNumber: true,
                        })}
                      />
                      {errors.products?.[index]?.quantity && (
                        <p className="text-sm text-red-500">
                          {errors.products[index]?.quantity?.message}
                        </p>
                      )}
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeProduct(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addProduct}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>
                  Enter customer details and delivery information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    {...register("clientName")}
                    placeholder="Enter client name"
                  />
                  {errors.clientName && (
                    <p className="text-sm text-red-500">
                      {errors.clientName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                  <Textarea
                    id="deliveryAddress"
                    {...register("deliveryAddress")}
                    placeholder="Enter delivery address"
                    rows={3}
                  />
                  {errors.deliveryAddress && (
                    <p className="text-sm text-red-500">
                      {errors.deliveryAddress.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="paymentStatus">Payment Status</Label>
                    <Select
                      value={watch("paymentStatus")}
                      onValueChange={(value) =>
                        setValue("paymentStatus", value as any)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment status" />
                      </SelectTrigger>
                      <SelectContent>
                        {PAYMENT_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryStatus">Delivery Status</Label>
                    <Select
                      value={watch("deliveryStatus")}
                      onValueChange={(value) =>
                        setValue("deliveryStatus", value as any)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery status" />
                      </SelectTrigger>
                      <SelectContent>
                        {DELIVERY_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedDeliveryDate">
                    Expected Delivery Date *
                  </Label>
                  <Input
                    id="expectedDeliveryDate"
                    type="date"
                    {...register("expectedDeliveryDate")}
                  />
                  {errors.expectedDeliveryDate && (
                    <p className="text-sm text-red-500">
                      {errors.expectedDeliveryDate.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/orders">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Order"}
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Products</h4>
                <div className="space-y-2">
                  {watchedProducts.map((item, index) => {
                    const product = products.find(
                      (p) => p.id === item.productId
                    );
                    if (!product) return null;

                    return (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{product.name}</span>
                        <span>
                          ${(product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total Amount</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Order will be processed immediately</p>
                <p>• Customer will receive confirmation email</p>
                <p>• Delivery tracking will be available</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

