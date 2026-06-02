import Link from "next/link";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary/40">
      <Container className="grid gap-8 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold">AVS Depot</p>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Frontend foundation for a professional ecommerce experience serving
            AV, security and network installation buyers.
          </p>
        </div>
        <div>
          <p className="font-semibold">Shop</p>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <Link href="/category/displays">Displays</Link>
            <Link href="/category/security">Security</Link>
            <Link href="/category/networking">Networking</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold">Account</p>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
            <Link href="/account">Dashboard</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
