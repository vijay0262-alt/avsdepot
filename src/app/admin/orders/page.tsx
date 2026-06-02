import { Search, Filter, MoreVertical, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "Orders - Admin",
  description: "Manage customer orders",
};

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      amount: 89.99,
      status: "Completed",
      date: "2024-01-15",
      items: 2,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      amount: 149.99,
      status: "Processing",
      date: "2024-01-15",
      items: 1,
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      email: "bob@example.com",
      amount: 24.99,
      status: "Completed",
      date: "2024-01-14",
      items: 1,
    },
    {
      id: "ORD-004",
      customer: "Alice Brown",
      email: "alice@example.com",
      amount: 199.99,
      status: "Pending",
      date: "2024-01-14",
      items: 3,
    },
    {
      id: "ORD-005",
      customer: "Charlie Wilson",
      email: "charlie@example.com",
      amount: 34.99,
      status: "Completed",
      date: "2024-01-13",
      items: 1,
    },
    {
      id: "ORD-006",
      customer: "Diana Lee",
      email: "diana@example.com",
      amount: 79.99,
      status: "Shipped",
      date: "2024-01-13",
      items: 2,
    },
    {
      id: "ORD-007",
      customer: "Eve Davis",
      email: "eve@example.com",
      amount: 129.99,
      status: "Cancelled",
      date: "2024-01-12",
      items: 1,
    },
    {
      id: "ORD-008",
      customer: "Frank Miller",
      email: "frank@example.com",
      amount: 54.99,
      status: "Processing",
      date: "2024-01-12",
      items: 2,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "Processing":
        return "secondary";
      case "Pending":
        return "outline";
      case "Shipped":
        return "default";
      case "Cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-2">Manage and track customer orders</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search orders..."
            className="pl-10"
          />
        </div>
        <select className="h-10 rounded-md border bg-background px-3 text-sm">
          <option value="">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Processing">Processing</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select className="h-10 rounded-md border bg-background px-3 text-sm">
          <option value="">Date Range</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Orders Table */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-secondary/50">
                  <td className="px-6 py-4">
                    <code className="text-sm bg-secondary px-2 py-1 rounded">
                      {order.id}
                    </code>
                  </td>
                  <td className="px-6 py-4 font-medium">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{order.email}</td>
                  <td className="px-6 py-4 text-sm">{order.items}</td>
                  <td className="px-6 py-4 font-medium">{formatCurrency(order.amount)}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusColor(order.status) as any}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground">
          Showing 1-{orders.length} of {orders.length} orders
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
