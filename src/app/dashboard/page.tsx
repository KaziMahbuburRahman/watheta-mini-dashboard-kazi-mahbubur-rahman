import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package2, ShoppingCart, TrendingUp, Users } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Products",
      value: "1,234",
      description: "+20.1% from last month",
      icon: Package2,
    },
    {
      title: "Total Orders",
      value: "2,345",
      description: "+15.3% from last month",
      icon: ShoppingCart,
    },
    {
      title: "Revenue",
      value: "$45,231",
      description: "+12.5% from last month",
      icon: TrendingUp,
    },
    {
      title: "Active Users",
      value: "1,234",
      description: "+8.2% from last month",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your Watheta dashboard. Manage your products and orders
          efficiently.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
            <CardDescription>Your latest product additions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Package2 className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Wireless Headphones</p>
                  <p className="text-xs text-muted-foreground">Electronics</p>
                </div>
                <div className="text-sm font-medium">$99.99</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Package2 className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Gaming Mouse</p>
                  <p className="text-xs text-muted-foreground">Electronics</p>
                </div>
                <div className="text-sm font-medium">$49.99</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest order activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Order #1234</p>
                  <p className="text-xs text-muted-foreground">John Doe</p>
                </div>
                <div className="text-sm font-medium">$149.99</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Order #1235</p>
                  <p className="text-xs text-muted-foreground">Jane Smith</p>
                </div>
                <div className="text-sm font-medium">$89.99</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

