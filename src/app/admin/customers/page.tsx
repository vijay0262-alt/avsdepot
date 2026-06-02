import { Search, Filter, MoreVertical, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "Customers - Admin",
  description: "Manage customer accounts",
};

export default function CustomersPage() {
  const customers = [
    {
      id: "CUST-001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, USA",
      orders: 12,
      spent: 1249.87,
      joined: "2024-01-01",
      status: "Active",
    },
    {
      id: "CUST-002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, USA",
      orders: 8,
      spent: 899.92,
      joined: "2024-01-05",
      status: "Active",
    },
    {
      id: "CUST-003",
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, USA",
      orders: 5,
      spent: 324.95,
      joined: "2024-01-10",
      status: "Active",
    },
    {
      id: "CUST-004",
      name: "Alice Brown",
      email: "alice@example.com",
      phone: "+1 (555) 456-7890",
      location: "Houston, USA",
      orders: 3,
      spent: 199.97,
      joined: "2024-01-12",
      status: "Inactive",
    },
    {
      id: "CUST-005",
      name: "Charlie Wilson",
      email: "charlie@example.com",
      phone: "+1 (555) 567-8901",
      location: "Phoenix, USA",
      orders: 15,
      spent: 1524.85,
      joined: "2023-12-15",
      status: "Active",
    },
    {
      id: "CUST-006",
      name: "Diana Lee",
      email: "diana@example.com",
      phone: "+1 (555) 678-9012",
      location: "Philadelphia, USA",
      orders: 7,
      spent: 559.93,
      joined: "2024-01-08",
      status: "Active",
    },
    {
      id: "CUST-007",
      name: "Eve Davis",
      email: "eve@example.com",
      phone: "+1 (555) 789-0123",
      location: "San Antonio, USA",
      orders: 2,
      spent: 129.98,
      joined: "2024-01-14",
      status: "Inactive",
    },
    {
      id: "CUST-008",
      name: "Frank Miller",
      email: "frank@example.com",
      phone: "+1 (555) 890-1234",
      location: "San Diego, USA",
      orders: 9,
      spent: 949.91,
      joined: "2024-01-02",
      status: "Active",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-2">Manage customer accounts and information</p>
        </div>
        <Button>
          Add Customer
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search customers..."
            className="pl-10"
          />
        </div>
        <select className="h-10 rounded-md border bg-background px-3 text-sm">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select className="h-10 rounded-md border bg-background px-3 text-sm">
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="orders">Orders</option>
          <option value="spent">Total Spent</option>
          <option value="joined">Join Date</option>
        </select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Customers Table */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Orders</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Total Spent</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-t hover:bg-secondary/50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <code className="text-xs text-muted-foreground">{customer.id}</code>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{customer.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{customer.orders}</td>
                  <td className="px-6 py-4 font-medium">{formatCurrency(customer.spent)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{customer.joined}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={customer.status === "Active" ? "default" : "secondary"}
                    >
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
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
          Showing 1-{customers.length} of {customers.length} customers
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
