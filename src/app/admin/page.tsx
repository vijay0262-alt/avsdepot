import { Package, ShoppingCart, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const stats = [
    {
      name: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      name: "Total Orders",
      value: "356",
      change: "+12.5%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      name: "Total Products",
      value: "14",
      change: "+2",
      trend: "up",
      icon: Package,
    },
    {
      name: "Total Customers",
      value: "2,345",
      change: "+5.2%",
      trend: "up",
      icon: Users,
    },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", amount: "$89.99", status: "Completed", date: "2 hours ago" },
    { id: "ORD-002", customer: "Jane Smith", amount: "$149.99", status: "Processing", date: "5 hours ago" },
    { id: "ORD-003", customer: "Bob Johnson", amount: "$24.99", status: "Completed", date: "1 day ago" },
    { id: "ORD-004", customer: "Alice Brown", amount: "$199.99", status: "Pending", date: "2 days ago" },
    { id: "ORD-005", customer: "Charlie Wilson", amount: "$34.99", status: "Completed", date: "3 days ago" },
  ];

  const topProducts = [
    { name: "Norton 360 Deluxe", sales: 156, revenue: "$3,899.44" },
    { name: "Windows 11 Pro", sales: 134, revenue: "$4,018.66" },
    { name: "Office 2021 Professional Plus", sales: 98, revenue: "$3,919.02" },
    { name: "McAfee Total Protection", sales: 87, revenue: "$1,739.13" },
    { name: "Kaspersky Total Security", sales: 76, revenue: "$2,279.24" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of your store performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-secondary p-2">
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <Badge
                      variant={
                        order.status === "Completed"
                          ? "default"
                          : order.status === "Processing"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">Top Products</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Button className="h-auto py-4 flex flex-col gap-2">
            <Package className="h-5 w-5" />
            <span>Add Product</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span>View Orders</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
            <Users className="h-5 w-5" />
            <span>Manage Customers</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
            <TrendingUp className="h-5 w-5" />
            <span>View Analytics</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
