import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { categories } from "@/lib/catalog-data";
import { Container } from "./container";

export function SiteFooter() {
  const supportLinks = [
    { href: "/account", label: "My account" },
    { href: "/cart", label: "Order status" },
    { href: "/checkout", label: "Shipping options" },
    { href: "/login", label: "Trade login" },
  ];

  const legalLinks = [
    { href: "/legal/privacy", label: "Privacy Policy" },
    { href: "/legal/terms", label: "Terms of Service" },
    { href: "/legal/returns", label: "Returns Policy" },
    { href: "/legal/warranty", label: "Warranty" },
  ];

  return (
    <footer className="border-t bg-secondary/50">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
        <section>
          <Link href="/" className="text-xl font-bold tracking-tight">
            AVS Depot
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Professional ecommerce destination for commercial AV, security,
            networking and installation supplies. Built for integrators,
            facility teams and project buyers.
          </p>
          <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Phone className="size-4 text-primary" />
              Sales support available soon
            </span>
            <span className="flex items-center gap-2">
              <Mail className="size-4 text-primary" />
              support@avsdepot.com
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              Serving professional installers nationwide
            </span>
          </div>
        </section>

        <FooterColumn title="Categories">
          {categories.map((category) => (
            <FooterLink
              key={category.slug}
              href={`/category/${category.slug}`}
              label={category.name}
            />
          ))}
        </FooterColumn>

        <FooterColumn title="Support">
          {supportLinks.map((link) => (
            <FooterLink key={link.href} href={link.href} label={link.label} />
          ))}
        </FooterColumn>

        <FooterColumn title="Legal Pages">
          {legalLinks.map((link) => (
            <FooterLink key={link.href} href={link.href} label={link.label} />
          ))}
        </FooterColumn>
      </Container>

      <div className="border-t">
        <Container className="flex flex-col gap-3 py-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} AVS Depot. All rights reserved.</p>
          <p>Secure ecommerce foundation for professional buyers.</p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
        {title}
      </h2>
      <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function FooterLink({ href, label }: Readonly<{ href: string; label: string }>) {
  return (
    <Link href={href} className="transition hover:text-foreground hover:underline">
      {label}
    </Link>
  );
}
