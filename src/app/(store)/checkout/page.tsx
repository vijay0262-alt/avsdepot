import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Checkout",
  description: "Checkout flow placeholder for AVS Depot frontend foundation.",
};

export default function CheckoutPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form className="grid gap-6 rounded-lg border p-5">
          <section className="grid gap-4">
            <h2 className="font-semibold">Contact</h2>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" />
            </div>
          </section>
          <section className="grid gap-4 border-t pt-6">
            <h2 className="font-semibold">Shipping address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" autoComplete="given-name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" autoComplete="family-name" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" autoComplete="street-address" />
            </div>
          </section>
          <Button type="button" className="w-full sm:w-fit">
            Continue to payment
          </Button>
        </form>
        <aside className="h-fit rounded-lg border p-5">
          <h2 className="font-semibold">Frontend-only checkout</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Payment, tax, shipping and order creation will be wired when the
            backend and Supabase integration are added.
          </p>
        </aside>
      </div>
    </Container>
  );
}
