"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Lock, Truck, Shield, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  getCartSnapshot,
  getCartSubtotal,
  getServerCartSnapshot,
  parseCartSnapshot,
  subscribeToCartChanges,
} from "@/lib/cart-storage";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutPage() {
  const cartSnapshot = useSyncExternalStore(
    subscribeToCartChanges,
    getCartSnapshot,
    getServerCartSnapshot,
  );
  const cartItems = parseCartSnapshot(cartSnapshot);
  const subtotal = getCartSubtotal(cartItems);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate form
      if (!formData.email || !formData.firstName || !formData.lastName) {
        throw new Error("Please fill in all required fields");
      }

      // Create Stripe checkout session
      const response = await fetch('/api/checkout/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during checkout");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container className="py-10">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-3xl font-bold tracking-tight">Your cart is empty</h1>
          <p className="mt-4 text-muted-foreground">
            Add some products to your cart before checking out.
          </p>
          <Button asChild className="mt-6">
            <Link href="/category/antivirus">Continue Shopping</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="mb-8">
        <Link href="/cart" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to cart
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Checkout</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <form onSubmit={handleSubmit} className="grid gap-8">
          {/* Customer Information */}
          <section className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                1
              </div>
              <h2 className="text-xl font-semibold">Customer Information</h2>
            </div>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  We'll send your license keys to this email
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First name *</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    autoComplete="family-name"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {error && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Continue to Payment
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            <Lock className="inline h-3 w-3 mr-1" />
            Your payment information is secure and encrypted
          </p>
        </form>

        {/* Order Summary */}
        <aside className="h-fit space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.productSlug}`}
                      className="font-semibold hover:underline line-clamp-1"
                    >
                      {item.productName}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {item.durationYears}yr · {item.deviceCount} device
                    </p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Digital delivery</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatCurrency(0)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-3">
                <span>Total</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-semibold mb-4">Why buy from us?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">100% Genuine Licenses</p>
                  <p className="text-xs text-muted-foreground">Authentic software from authorized distributors</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Instant Digital Delivery</p>
                  <p className="text-xs text-muted-foreground">License keys delivered to your email immediately</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">Your information is protected with encryption</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
