"use client";

import Link from "next/link";
import { XCircle, ArrowLeft, ShoppingCart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export default function CheckoutCancelPage() {
  return (
    <Container className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
            <XCircle className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Cancelled</h1>
          <p className="mt-2 text-muted-foreground">
            Your payment was cancelled. You can try again or return to your cart.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">What Happened?</h2>
          <p className="text-muted-foreground">
            The payment process was interrupted or cancelled. This could be because:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>You clicked the cancel button during checkout</li>
            <li>The payment window was closed</li>
            <li>There was an issue with the payment method</li>
            <li>The session timed out</li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
          <p className="text-muted-foreground">
            If you encountered any issues during checkout, please contact our support team.
            We're here to help you complete your purchase.
          </p>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <Button asChild size="lg">
            <Link href="/cart">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Return to Cart
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <Link href="/checkout">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Try Checkout Again
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
