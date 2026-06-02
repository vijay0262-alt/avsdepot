import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Wrench } from "lucide-react";
import { CategoryTile } from "@/components/catalog/category-tile";
import { ProductCard } from "@/components/catalog/product-card";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { categories, featuredProducts } from "@/lib/catalog-data";

export default function HomePage() {
  return (
    <>
      <section className="border-b bg-secondary/50">
        <Container className="grid gap-10 py-12 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              AVS Depot
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Professional AV and security supplies, organized for real projects.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Build quotes faster with curated categories for displays, cameras,
              networking, cable, mounts and installation hardware.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/category/displays">
                  Shop categories <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/account">Create trade account</Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
            <div className="grid grid-cols-2 gap-px bg-border">
              {categories.slice(0, 4).map((category) => (
                <CategoryTile key={category.slug} category={category} compact />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Installer ready",
              body: "Products grouped by job type, compatibility and install workflow.",
              icon: Wrench,
            },
            {
              title: "Project confidence",
              body: "Foundation built for verified inventory, specs and account pricing later.",
              icon: ShieldCheck,
            },
            {
              title: "Fast fulfillment",
              body: "Frontend structure prepared for shipping options and order tracking.",
              icon: Truck,
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border p-5">
              <item.icon className="size-5 text-primary" />
              <h2 className="mt-4 font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="pb-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Featured products
            </h2>
            <p className="mt-1 text-muted-foreground">
              Starter catalog data for frontend development.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/category/displays">View all</Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </>
  );
}
