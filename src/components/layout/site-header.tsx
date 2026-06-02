import Link from "next/link";
import {
  ChevronDown,
  MonitorPlay,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { categories } from "@/lib/catalog-data";
import { Button } from "@/components/ui/button";
import { Container } from "./container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 shadow-sm backdrop-blur">
      <Container className="flex min-h-20 flex-col justify-center gap-3 py-3 lg:min-h-16 lg:flex-row lg:items-center lg:justify-between lg:py-0">
        <div className="flex w-full items-center justify-between gap-4 lg:w-auto">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="AVS Depot home"
          >
            <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <MonitorPlay className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-xl font-bold tracking-tight">
                AVS Depot
              </span>
              <span className="hidden text-xs font-medium uppercase tracking-wide text-muted-foreground sm:block">
                Professional AV Store
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-1 lg:hidden">
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
          </div>
        </div>

        <div className="grid w-full gap-3 lg:max-w-3xl lg:grid-cols-[190px_1fr]">
          <details className="group relative">
            <summary className="flex h-11 cursor-pointer list-none items-center justify-between rounded-md border bg-background px-3 text-sm font-medium shadow-sm transition hover:bg-secondary">
              Categories
              <ChevronDown className="size-4 transition group-open:rotate-180" />
            </summary>
            <div className="absolute left-0 top-12 z-50 w-full min-w-64 overflow-hidden rounded-md border bg-popover p-2 text-popover-foreground shadow-lg">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-secondary"
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {category.description}
                  </span>
                </Link>
              ))}
            </div>
          </details>

          <form action="/category/antivirus" className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="q"
              placeholder="Search displays, cameras, switches, mounts..."
              className="h-11 w-full rounded-md border bg-background pl-10 pr-4 text-sm shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20 sm:pr-24"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1.5 top-1/2 hidden -translate-y-1/2 sm:inline-flex"
            >
              Search
            </Button>
          </form>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/account">
              <UserRound className="size-5" />
              Account
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/cart">
              <ShoppingCart className="size-5" />
              Cart
            </Link>
          </Button>
        </nav>
      </Container>

      <div className="hidden border-t bg-secondary/40 md:block">
        <Container className="flex h-10 items-center gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/account"
            className="ml-auto text-sm font-medium text-primary hover:underline"
          >
            Trade account
          </Link>
        </Container>
      </div>

      <div className="border-t bg-secondary/40 md:hidden">
        <Container className="flex gap-4 overflow-x-auto py-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="whitespace-nowrap text-sm font-medium text-muted-foreground"
            >
              {category.name}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
