import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Headphones,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
} from "lucide-react";
import { CategoryTile } from "@/components/catalog/category-tile";
import { ProductCard } from "@/components/catalog/product-card";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, featuredProducts, products } from "@/lib/catalog-data";

const bestSellers = [...products].reverse();

const benefits = [
  {
    title: "Curated pro catalog",
    body: "Commercial-grade AV, security and network supplies organized by job type.",
    icon: BadgeCheck,
  },
  {
    title: "Installer-ready specs",
    body: "Product pages are structured for dimensions, compatibility and install notes.",
    icon: Wrench,
  },
  {
    title: "Trade workflow ready",
    body: "Frontend foundation prepared for saved carts, quotes and account pricing.",
    icon: ShieldCheck,
  },
  {
    title: "Fulfillment focused",
    body: "Designed for future shipping rates, stock visibility and order tracking.",
    icon: Truck,
  },
];

const reviews = [
  {
    name: "Maya Chen",
    role: "AV Project Manager",
    quote:
      "The category flow feels built for real installs. I can find displays, mounts and network gear without jumping through generic retail filters.",
  },
  {
    name: "Derrick Lawson",
    role: "Security Integrator",
    quote:
      "AVS Depot has the right structure for quote building. Product details, account workflows and cart review all feel clean and professional.",
  },
  {
    name: "Priya Raman",
    role: "Facilities Buyer",
    quote:
      "The storefront is simple to scan, especially for repeat purchasing. It feels much closer to a trade portal than a consumer shop.",
  },
];

const faqs = [
  {
    question: "Does AVS Depot support trade accounts?",
    answer:
      "The frontend includes trade account entry points and account dashboard structure. Pricing rules and approvals will be connected when the backend is added.",
  },
  {
    question: "Are the products live inventory?",
    answer:
      "Not yet. Current products are mock data for frontend development. Inventory and pricing will be powered by PostgreSQL and Supabase later.",
  },
  {
    question: "Can shoppers request project quotes?",
    answer:
      "The product and account flows are designed for quote workflows, but quote submission will be implemented with the backend.",
  },
  {
    question: "Is checkout production ready?",
    answer:
      "The checkout layout is ready as a frontend foundation. Payments, taxes, shipping and order creation are intentionally deferred.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b bg-secondary/40">
        <Container className="grid gap-10 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-16">
          <div className="max-w-2xl">
            <Badge variant="secondary">Professional AV ecommerce</Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Build AV, security and network projects from one premium depot.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Shop curated commercial displays, cameras, PoE networking,
              mounts and install essentials with a storefront designed for
              integrators and business buyers.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/category/antivirus">
                  Shop products <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/register">Create trade account</Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
              <p>
                <span className="block text-2xl font-bold text-foreground">
                  500+
                </span>
                SKUs planned
              </p>
              <p>
                <span className="block text-2xl font-bold text-foreground">
                  24/7
                </span>
                Online ordering
              </p>
              <p>
                <span className="block text-2xl font-bold text-foreground">
                  Pro
                </span>
                Buyer workflows
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border bg-background shadow-sm">
            <div className="relative aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
                alt="Professional team reviewing AV project equipment"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/75">
                Featured project kit
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Conference room AV starter bundle
              </h2>
              <p className="mt-2 max-w-md text-sm text-white/80">
                Displays, switching, mounts and networking components grouped
                for faster project planning.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ProductSection
        title="Featured Products"
        description="High-priority products for storefront merchandising and launch testing."
        href="/category/antivirus"
        products={featuredProducts}
      />

      <section className="border-y bg-secondary/30">
        <Container className="py-12">
          <SectionHeading
            title="Top Categories"
            description="Start with the project area, then drill into curated product sets."
          />
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.slug} className="overflow-hidden rounded-lg border shadow-sm">
                <CategoryTile category={category} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ProductSection
        title="Best Sellers"
        description="Mock bestseller data for validating product grids, cards and buying flows."
        href="/category/productivity"
        products={bestSellers}
      />

      <section className="bg-primary text-primary-foreground">
        <Container className="py-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
                Why choose AVS Depot
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Built like a professional purchasing tool, not a generic catalog.
              </h2>
              <p className="mt-4 text-primary-foreground/75">
                The frontend is ready for complex ecommerce behavior without
                making the shopping experience feel heavy.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-lg border border-white/15 bg-white/10 p-5"
                >
                  <benefit.icon className="size-5" />
                  <h3 className="mt-4 font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-primary-foreground/75">
                    {benefit.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-12">
          <SectionHeading
            title="Customer Reviews"
            description="Representative buyer feedback for the storefront experience."
          />
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="rounded-lg border p-5 shadow-sm">
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 leading-7 text-muted-foreground">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-5 border-t pt-4">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y bg-secondary/30">
        <Container className="grid gap-8 py-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Common ecommerce questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Clear expectations while AVS Depot is still frontend-only.
            </p>
          </div>
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-lg border bg-background p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {faq.question}
                  <span className="text-xl leading-none text-primary group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-12">
          <div className="grid gap-8 rounded-lg border bg-foreground p-6 text-background shadow-sm md:grid-cols-[1fr_0.9fr] md:items-center md:p-8">
            <div>
              <div className="flex size-11 items-center justify-center rounded-md bg-background/10">
                <Headphones className="size-5" />
              </div>
              <h2 className="mt-5 text-3xl font-bold tracking-tight">
                Get launch updates and pro buying tips.
              </h2>
              <p className="mt-3 text-background/70">
                Join the AVS Depot newsletter for product drops, trade account
                updates and project-ready buying guides.
              </p>
            </div>
            <form className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                type="email"
                placeholder="work@email.com"
                className="h-11 rounded-md border border-white/15 bg-white px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-accent"
              />
              <Button type="button" variant="secondary" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}

function ProductSection({
  title,
  description,
  href,
  products: sectionProducts,
}: Readonly<{
  title: string;
  description: string;
  href: string;
  products: typeof products;
}>) {
  return (
    <section>
      <Container className="py-12">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title={title} description={description} />
          <Button asChild variant="ghost" className="w-fit">
            <Link href={href}>
              View all <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sectionProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function SectionHeading({
  title,
  description,
}: Readonly<{
  title: string;
  description: string;
}>) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
    </div>
  );
}
