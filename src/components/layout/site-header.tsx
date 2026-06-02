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
    <header className="sticky top-0 z-40 border-b-2 border-border bg-background/95 backdrop-blur-lg shadow-sm">
      <Container className="flex min-h-24 flex-col justify-center gap-4 py-4 lg:min-h-20 lg:flex-row lg:items-center lg:justify-between lg:py-0">
        <div className="flex w-full items-center justify-between gap-4 lg:w-auto">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="AVS Depot home"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
              <MonitorPlay className="size-6" />
            </span>
            <span className="leading-tight">
              <span className="block text-2xl font-bold tracking-tight">
                AVS Depot
              </span>
              <span className="hidden text-xs font-bold uppercase tracking-widest text-muted-foreground sm:block">
                Software Licenses
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2 lg:hidden">
            <Button asChild variant="ghost" size="icon" aria-label="Account" className="rounded-lg">
              <Link href="/account">
                <UserRound className="size-6" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="Cart" className="rounded-lg">
              <Link href="/cart">
                <ShoppingCart className="size-6" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid w-full gap-4 lg:max-w-3xl lg:grid-cols-[200px_1fr]">
          <details className="group relative">
            <summary className="flex h-12 cursor-pointer list-none items-center justify-between rounded-lg border-2 border-border bg-background px-4 text-base font-semibold shadow-sm transition-all duration-200 hover:border-primary hover:bg-secondary">
              Categories
              <ChevronDown className="size-5 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="absolute left-0 top-14 z-50 w-full min-w-72 overflow-hidden rounded-xl border-2 border-border bg-popover p-2 text-popover-foreground shadow-lg">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-secondary transition-colors"
                >
                  <span className="font-bold">{category.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground leading-relaxed">
                    {category.description}
                  </span>
                </Link>
              ))}
            </div>
          </details>

          <form action="/category/antivirus" className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="q"
              placeholder="Search software licenses..."
              className="h-12 w-full rounded-lg border-2 border-border bg-background pl-12 pr-4 text-base shadow-sm outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20 sm:pr-28"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-2 top-1/2 hidden -translate-y-1/2 sm:inline-flex rounded-lg"
            >
              Search
            </Button>
          </form>
        </div>

        <nav className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="ghost" className="gap-2 rounded-lg text-base font-semibold">
            <Link href="/account">
              <UserRound className="size-5" />
              Account
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2 rounded-lg text-base font-semibold">
            <Link href="/cart">
              <ShoppingCart className="size-5" />
              Cart
            </Link>
          </Button>
        </nav>
      </Container>

      <div className="hidden border-t border-border bg-secondary/40 md:block">
        <Container className="flex h-12 items-center gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/account"
            className="ml-auto text-sm font-bold text-primary hover:underline"
          >
            Trade account
          </Link>
        </Container>
      </div>

      <div className="border-t border-border bg-secondary/40 md:hidden">
        <Container className="flex gap-6 overflow-x-auto py-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="whitespace-nowrap text-sm font-semibold text-muted-foreground"
            >
              {category.name}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
