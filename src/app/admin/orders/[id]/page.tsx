"use client";

import { useState } from "react";
import { ArrowLeft, Package, User, Mail, Phone, MapPin, Calendar, DollarSign, Save, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

type OrderStatus = "Pending" | "Paid" | "Processing" | "Completed" | "Refunded";

type OrderItem = {
  id: string;
  productName: string;
  productSlug: string;
  brand: string;
  imageUrl: string;
  variantId: string;
  sku: string;
  durationYears: number;
  deviceCount: number;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  subtotal: number;
  tax: number;
  createdAt: string;
  updatedAt: string;
  notes: string[];
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Mock order data - in production, this would come from an API
  const [order, setOrder] = useState<Order>({
    id: "ORD-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    items: [
      {
        id: "item-1",
        productName: "Norton 360 Deluxe",
        productSlug: "norton-360-deluxe",
        brand: "Norton",
        imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=900&q=80",
        variantId: "norton-360-deluxe-1y-1d",
        sku: "N360DLX-1Y-1D",
        durationYears: 1,
        deviceCount: 1,
        price: 24.99,
        quantity: 2,
      },
    ],
    status: "Processing",
    total: 49.98,
    subtotal: 49.98,
    tax: 0,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    notes: [
      "Order received via website",
      "Payment confirmed",
    ],
  });

  const [newNote, setNewNote] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order.status);

  const statusColors: Record<OrderStatus, string> = {
    Pending: "outline",
    Paid: "secondary",
    Processing: "default",
    Completed: "default",
    Refunded: "destructive",
  };

  const handleStatusUpdate = () => {
    setOrder({ ...order, status: selectedStatus, updatedAt: new Date().toISOString() });
    alert(`Order status updated to ${selectedStatus}`);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setOrder({
        ...order,
        notes: [...order.notes, `${new Date().toLocaleString()}: ${newNote}`],
      });
      setNewNote("");
    }
  };

  const handleMarkCompleted = () => {
    setOrder({
      ...order,
      status: "Completed",
      updatedAt: new Date().toISOString(),
      notes: [...order.notes, `${new Date().toLocaleString()}: Order marked as completed`],
    });
    alert("Order marked as completed! License keys should be delivered manually.");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/admin/orders">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Order {order.id}</h1>
            <p className="text-muted-foreground mt-2">
              Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <Badge variant={statusColors[order.status] as any} className="text-lg px-4 py-2">
            {order.status}
          </Badge>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-lg bg-secondary/50">
                  <div className="relative h-20 w-20 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/product/${item.productSlug}`}
                      className="font-semibold hover:underline"
                    >
                      {item.productName}
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                    <div className="mt-2 flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">SKU: {item.sku}</span>
                      <span className="text-muted-foreground">
                        {item.durationYears} year · {item.deviceCount} device
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(item.price)}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="font-semibold mt-1">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Information */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{order.customer.name}</p>
                  <p className="text-sm text-muted-foreground">Customer</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{order.customer.email}</p>
                  <p className="text-sm text-muted-foreground">Email</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{order.customer.phone}</p>
                  <p className="text-sm text-muted-foreground">Phone</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:col-span-2">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">
                    {order.customer.address}, {order.customer.city}, {order.customer.state} {order.customer.zipCode}
                  </p>
                  <p className="text-sm text-muted-foreground">{order.customer.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Internal Notes
            </h2>
            <div className="space-y-3 mb-4">
              {order.notes.map((note, index) => (
                <div key={index} className="p-3 rounded-lg bg-secondary/50 text-sm">
                  {note}
                </div>
              ))}
              {order.notes.length === 0 && (
                <p className="text-sm text-muted-foreground">No notes yet</p>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddNote())}
              />
              <Button type="button" onClick={handleAddNote}>
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Management */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Order Status</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Update Status</Label>
                <select
                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
                  className="h-10 rounded-md border bg-background px-3"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
              <Button onClick={handleStatusUpdate} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Update Status
              </Button>
              <Button
                onClick={handleMarkCompleted}
                className="w-full"
                disabled={order.status === "Completed"}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark as Completed
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Digital Delivery</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-3">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <div className="w-0.5 h-full bg-border mt-1" />
                </div>
                <div>
                  <p className="font-medium text-sm">Order Created</p>
                  <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
              {order.status !== "Pending" && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <div className="w-0.5 h-full bg-border mt-1" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Status Updated</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
              {order.status === "Completed" && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Order Completed</p>
                    <p className="text-xs text-muted-foreground">License keys delivered</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-2" />
                View Product Details
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                View Customer Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Send Email to Customer
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                Process Refund
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
