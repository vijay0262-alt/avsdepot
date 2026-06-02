"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { CreditCard, Lock, Truck, Shield, CheckCircle2, ChevronRight } from "lucide-react";
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

export const metadata = {
  title: "Checkout",
  description: "Complete your purchase at AVS Depot.",
};

export default function CheckoutPage() {
  const cartSnapshot = useSyncExternalStore(
    subscribeToCartChanges,
    getCartSnapshot,
    getServerCartSnapshot,
  );
  const cartItems = parseCartSnapshot(cartSnapshot);
  const subtotal = getCartSubtotal(cartItems);

  const [selectedPayment, setSelectedPayment] = useState<"stripe" | "paypal" | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Checkout submitted:", formData, selectedPayment);
    alert("Checkout functionality coming soon!");
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

          {/* Billing Information */}
          <section className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                2
              </div>
              <h2 className="text-xl font-semibold">Billing Information</h2>
            </div>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="address">Street address *</Label>
                <Input
                  id="address"
                  placeholder="123 Main Street"
                  autoComplete="street-address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    autoComplete="address-level2"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    autoComplete="address-level1"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="zipCode">ZIP/Postal code *</Label>
                  <Input
                    id="zipCode"
                    placeholder="10001"
                    autoComplete="postal-code"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    placeholder="United States"
                    autoComplete="country-name"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                3
              </div>
              <h2 className="text-xl font-semibold">Payment Method</h2>
            </div>

            <div className="grid gap-4">
              {/* Stripe Placeholder */}
              <button
                type="button"
                onClick={() => setSelectedPayment("stripe")}
                className={`relative rounded-lg border-2 p-4 text-left transition ${
                  selectedPayment === "stripe"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <p className="font-semibold">Credit Card</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                    </div>
                  </div>
                  {selectedPayment === "stripe" && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>
                {selectedPayment === "stripe" && (
                  <div className="mt-4 grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cardNumber">Card number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="4242 4242 4242 4242"
                        autoComplete="cc-number"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="cardExpiry">Expiry date</Label>
                        <Input
                          id="cardExpiry"
                          placeholder="MM/YY"
                          autoComplete="cc-exp"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cardCvc">CVC</Label>
                        <Input
                          id="cardCvc"
                          placeholder="123"
                          autoComplete="cc-csc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cardName">Name on card</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        autoComplete="cc-name"
                        value={formData.cardName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
              </button>

              {/* PayPal Placeholder */}
              <button
                type="button"
                onClick={() => setSelectedPayment("paypal")}
                className={`relative rounded-lg border-2 p-4 text-left transition ${
                  selectedPayment === "paypal"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <div>
                      <p className="font-semibold">PayPal</p>
                      <p className="text-sm text-muted-foreground">Pay with your PayPal account</p>
                    </div>
                  </div>
                  {selectedPayment === "paypal" && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>
                {selectedPayment === "paypal" && (
                  <div className="mt-4 p-4 bg-secondary/50 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      You will be redirected to PayPal to complete your purchase securely.
                    </p>
                    <Badge variant="outline">PayPal Integration Coming Soon</Badge>
                  </div>
                )}
              </button>
            </div>
          </section>

          <Button type="submit" size="lg" className="w-full" disabled={!selectedPayment}>
            Complete Purchase
            <ChevronRight className="ml-2 h-4 w-4" />
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
