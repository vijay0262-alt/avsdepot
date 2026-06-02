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
      <section className="border-b bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Container className="grid gap-16 py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-8 text-sm font-bold uppercase tracking-widest">Premium Software Licenses</Badge>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-tight">
              Genuine Software at Unbeatable Prices
            </h1>
            <p className="mt-8 text-xl leading-relaxed text-muted-foreground">
              Shop antivirus, Microsoft Office, Windows, and productivity software with instant digital delivery. Save up to 80% on authentic licenses from authorized distributors.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/category/antivirus">
                  Shop Antivirus <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/category/microsoft-office">
                  Shop Office <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="mt-12 flex items-center gap-8">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">100% Genuine</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">Secure Payment</span>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Background gradient blobs */}
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
              
              {/* Main illustration container */}
              <div className="relative bg-card rounded-3xl p-12 shadow-2xl border-2 border-border">
                <div className="grid grid-cols-2 gap-6">
                  {/* Software icons with modern styling */}
                  <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:scale-105 transition-transform duration-300">
                    <Shield className="h-16 w-16 text-primary mb-4" />
                    <span className="font-bold text-base text-center">Antivirus</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 hover:scale-105 transition-transform duration-300">
                    <FileText className="h-16 w-16 text-blue-500 mb-4" />
                    <span className="font-bold text-base text-center">Office</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 hover:scale-105 transition-transform duration-300">
                    <Monitor className="h-16 w-16 text-purple-500 mb-4" />
                    <span className="font-bold text-base text-center">Windows</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 hover:scale-105 transition-transform duration-300">
                    <Grid3x3 className="h-16 w-16 text-green-500 mb-4" />
                    <span className="font-bold text-base text-center">Productivity</span>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-xl px-4 py-2 shadow-lg">
                  <span className="text-sm font-bold">80% OFF</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground rounded-xl px-4 py-2 shadow-lg">
                  <span className="text-sm font-bold">Instant Delivery</span>
                </div>
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
        <Container className="py-20">
          <SectionHeading
            title="Shop by Category"
            description="Browse our complete catalog of software licenses organized by category."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => {
              const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] || Shield;
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group overflow-hidden rounded-xl border-2 border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 card-hover"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <Icon className="h-8 w-8 text-white mb-3" />
                      <h3 className="text-xl font-bold text-white">{category.name}</h3>
                      <p className="text-sm text-white/90 line-clamp-2 leading-relaxed">{category.description}</p>
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
        <Container className="py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-primary-foreground/70">
                Why Choose AVS Depot
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                Premium Software Licenses at Unbeatable Prices
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-primary-foreground/75">
                Save up to 80% on genuine software licenses with instant digital delivery and 24/7 support.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-xl border border-white/15 bg-white/10 p-6 hover:bg-white/15 transition-all duration-300"
                >
                  <benefit.icon className="size-6" />
                  <h3 className="mt-4 font-bold text-lg">{benefit.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-primary-foreground/75">
                    {benefit.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <SectionHeading
            title="Customer Reviews"
            description="See what our customers say about their experience with AVS Depot."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="rounded-xl border-2 border-border p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-5 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-6 border-t pt-6">
                  <p className="font-bold text-base">{review.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{review.role}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y bg-secondary/30">
        <Container className="grid gap-12 py-20 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Everything you need to know about buying software licenses from AVS Depot.
            </p>
          </div>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border-2 border-border bg-background p-6 hover:border-primary/50 transition-all duration-300">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-base">
                  {faq.question}
                  <span className="text-2xl leading-none text-primary group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <div className="grid gap-12 rounded-2xl border-2 border-border bg-foreground p-10 text-background shadow-lg md:grid-cols-[1fr_0.9fr] md:items-center md:p-14">
            <div>
              <div className="flex size-14 items-center justify-center rounded-xl bg-background/10">
                <Mail className="size-7" />
              </div>
              <h2 className="mt-6 text-4xl font-bold tracking-tight">
                Get exclusive deals and updates.
              </h2>
              <p className="mt-4 text-lg text-background/80 leading-relaxed">
                Join the AVS Depot newsletter for exclusive discounts, new product launches, and software buying tips.
              </p>
            </div>
            <form className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <input
                type="email"
                placeholder="your@email.com"
                className="h-14 rounded-xl border-2 border-white/20 bg-white px-5 text-base text-foreground outline-none placeholder:text-background/50 focus:ring-2 focus:ring-accent transition-all duration-200"
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
      <Container className="py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title={title} description={description} />
          <Button asChild variant="ghost" className="w-fit">
            <Link href={href}>
              View all <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
