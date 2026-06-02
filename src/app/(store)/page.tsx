import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
  Shield,
  FileText,
  Monitor,
  Grid3x3,
  Mail,
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
    title: "100% Genuine Licenses",
    body: "Authentic software licenses from authorized distributors with instant digital delivery.",
    icon: BadgeCheck,
  },
  {
    title: "Instant Digital Delivery",
    body: "License keys delivered to your email immediately after purchase.",
    icon: Truck,
  },
  {
    title: "Secure Payment",
    body: "Your payment information is protected with enterprise-grade encryption.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    body: "Expert support available around the clock to help with activation and troubleshooting.",
    icon: Wrench,
  },
];

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    quote:
      "AVS Depot has the best prices on antivirus software. I saved over 70% compared to retail prices and got my license key instantly.",
  },
  {
    name: "Mike Thompson",
    role: "IT Manager",
    quote:
      "The category structure makes it easy to find exactly what I need. Norton, McAfee, Kaspersky - all in one place with great prices.",
  },
  {
    name: "Emily Rodriguez",
    role: "Freelance Designer",
    quote:
      "I bought Office 2021 and Windows 11 Pro from here. The activation was smooth and the prices are unbeatable.",
  },
];

const faqs = [
  {
    question: "Are the software licenses genuine?",
    answer:
      "Yes, all our software licenses are 100% genuine and sourced from authorized distributors. We provide authentic activation keys.",
  },
  {
    question: "How do I receive my license key?",
    answer:
      "License keys are delivered instantly to your email after successful payment. You'll also find them in your account dashboard.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Due to the nature of digital products, we offer refunds only if the license key cannot be activated. Contact support for assistance.",
  },
  {
    question: "Can I use the license on multiple devices?",
    answer:
      "Each license has specific device limits based on the variant you purchase (1, 3, or 5 devices). Check the product details for more information.",
  },
];

const categoryIcons = {
  antivirus: Shield,
  "microsoft-office": FileText,
  "microsoft-windows": Monitor,
  productivity: Grid3x3,
  other: Wrench,
};

export default function HomePage() {
  return (
    <>
      <section className="border-b bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <Container className="grid gap-10 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-4">Premium Software Licenses</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Genuine Software at Unbeatable Prices
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Shop antivirus, Microsoft Office, Windows, and productivity software with instant digital delivery. Save up to 80% on authentic licenses.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/category/antivirus">
                  Shop Antivirus <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/category/microsoft-office">
                  Shop Office <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-card rounded-3xl p-8 shadow-2xl border">
              <div className="grid grid-cols-2 gap-4">
                {categories.slice(0, 4).map((category) => {
                  const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] || Shield;
                  return (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="group flex flex-col items-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition"
                    >
                      <Icon className="h-8 w-8 text-primary mb-3" />
                      <span className="font-semibold text-sm text-center">{category.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ProductSection
        title="Featured Products"
        description="Top-selling antivirus and security software with instant digital delivery."
        href="/category/antivirus"
        products={featuredProducts}
      />

      <section className="border-y bg-secondary/30">
        <Container className="py-12">
          <SectionHeading
            title="Shop by Category"
            description="Browse our complete catalog of software licenses organized by category."
          />
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => {
              const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] || Shield;
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-md transition"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Icon className="h-6 w-6 text-white mb-2" />
                      <h3 className="text-lg font-bold text-white">{category.name}</h3>
                      <p className="text-sm text-white/80 line-clamp-2">{category.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <ProductSection
        title="Best Sellers"
        description="Most popular software licenses chosen by our customers."
        href="/category/antivirus"
        products={bestSellers}
      />

      <section className="bg-primary text-primary-foreground">
        <Container className="py-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
                Why Choose AVS Depot
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Premium Software Licenses at Unbeatable Prices
              </h2>
              <p className="mt-4 text-primary-foreground/75">
                Save up to 80% on genuine software licenses with instant digital delivery and 24/7 support.
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
            description="See what our customers say about their experience with AVS Depot."
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
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to know about buying software licenses from AVS Depot.
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
                <Mail className="size-5" />
              </div>
              <h2 className="mt-5 text-3xl font-bold tracking-tight">
                Get exclusive deals and updates.
              </h2>
              <p className="mt-3 text-background/70">
                Join the AVS Depot newsletter for exclusive discounts, new product launches, and software buying tips.
              </p>
            </div>
            <form className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                type="email"
                placeholder="your@email.com"
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
