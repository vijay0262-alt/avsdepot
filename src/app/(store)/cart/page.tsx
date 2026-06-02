import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { featuredProducts } from "@/lib/catalog-data";
import { formatCurrency } from "@/lib/utils";

const cartItems = featuredProducts.slice(0, 2).map((product, index) => ({
  product,
  quantity: index + 1,
}));

export const metadata = {
  title: "Cart",
  description: "Review selected AVS Depot products before checkout.",
};

export default function CartPage() {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="rounded-lg border">
          {cartItems.map((item) => (
            <div
              key={item.product.slug}
              className="flex flex-col gap-4 border-b p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Qty {item.quantity} · {formatCurrency(item.product.price)}
                </p>
              </div>
              <p className="font-semibold">
                {formatCurrency(item.product.price * item.quantity)}
              </p>
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
            <span className="text-muted-foreground">Shipping</span>
            <span>Calculated later</span>
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
    </Container>
  );
}
