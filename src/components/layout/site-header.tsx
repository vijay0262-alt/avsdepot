import Link from "next/link";
import { Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import { categories } from "@/lib/catalog-data";
import { Button } from "@/components/ui/button";
import { Container } from "./container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            AVS Depot
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="size-5" />
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Account">
            <Link href="/account">
              <UserRound className="size-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Cart">
            <Link href="/cart">
              <ShoppingCart className="size-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
            <Menu className="size-5" />
          </Button>
        </div>
      </Container>
    </header>
  );
}
