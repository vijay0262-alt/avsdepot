"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import {
  type CartItem,
  getCartSnapshot,
  getCartSubtotal,
  getServerCartSnapshot,
  parseCartSnapshot,
  saveCartItems,
  subscribeToCartChanges,
} from "@/lib/cart-storage";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CartContent() {
  const cartSnapshot = useSyncExternalStore(
    subscribeToCartChanges,
    getCartSnapshot,
    getServerCartSnapshot,
  );
  const cartItems = parseCartSnapshot(cartSnapshot);
  const subtotal = getCartSubtotal(cartItems);

  function updateQuantity(itemId: string, quantity: number) {
    const nextItems = cartItems
      .map((item) => (item.id === itemId ? { ...item, quantity } : item))
      .filter((item) => item.quantity > 0);

    saveCartItems(nextItems);
  }

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto max-w-2xl rounded-lg border p-8 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-secondary">
          <ShoppingCart className="size-5 text-primary" />
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight">
          Your cart is empty
        </h1>
        <p className="mt-3 text-muted-foreground">
          Select a license duration and device count from a product page to add
          software keys to your cart.
        </p>
        <Button asChild className="mt-6">
          <Link href="/category/antivirus">Shop software licenses</Link>
        </Button>
      </section>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="overflow-hidden rounded-lg border">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid gap-4 border-b p-5 last:border-b-0 sm:grid-cols-[96px_1fr_auto] sm:items-center"
            >
              <div className="relative aspect-square overflow-hidden rounded-md bg-secondary">
                <Image
                  src={item.imageUrl}
                  alt={item.productName}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  {item.brand}
                </p>
                <Link
                  href={`/product/${item.productSlug}`}
                  className="mt-1 block font-semibold hover:underline"
                >
                  {item.productName}
                </Link>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.durationYears} year - {item.deviceCount}{" "}
                  {item.deviceCount === 1 ? "device" : "devices"} - SKU{" "}
                  {item.sku}
                </p>
                <div className="mt-3 inline-flex items-center rounded-md border">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1.5 text-sm"
                    aria-label={`Decrease ${item.productName} quantity`}
                  >
                    -
                  </button>
                  <span className="border-x px-3 py-1.5 text-sm">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1.5 text-sm"
                    aria-label={`Increase ${item.productName} quantity`}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-semibold">
                  {formatCurrency(item.price * item.quantity)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatCurrency(item.price)} each
                </p>
              </div>
            </div>
          ))}
        </section>

        <aside className="h-fit rounded-lg border p-5">
          <h2 className="font-semibold">Order summary</h2>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-muted-foreground">Digital delivery</span>
            <span>Free</span>
          </div>
          <div className="mt-5 flex justify-between border-t pt-5 font-semibold">
            <span>Total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <Button asChild className="mt-6 w-full">
            <Link href="/checkout">Continue to checkout</Link>
          </Button>
        </aside>
      </div>
    </>
  );
}
