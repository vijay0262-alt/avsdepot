import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ProductVariantSelector } from "@/components/catalog/product-variant-selector";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { getCategory, getProduct, products } from "@/lib/catalog-data";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const category = getCategory(product.categorySlug);

  return (
    <Container className="py-10">
      <Button asChild variant="ghost" className="mb-6 px-0">
        <Link href={category ? `/category/${category.slug}` : "/"}>
          <ChevronLeft className="size-4" />
          Back to {category?.name ?? "catalog"}
        </Link>
      </Button>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg border bg-secondary">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <section>
          <Badge variant="secondary">{product.stockStatus}</Badge>
          <p className="mt-5 text-sm font-semibold uppercase text-muted-foreground">
            {product.brand}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {product.shortDescription}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <p className="text-sm text-muted-foreground">Starting at</p>
            <p className="text-3xl font-bold">{formatCurrency(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice)}
              </p>
            )}
          </div>
          <ProductVariantSelector product={product} />
          <div className="mt-10 border-t pt-8">
            <h2 className="font-semibold">Key specifications</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              {product.specs.map((spec) => (
                <li key={spec} className="flex items-center gap-3">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </Container>
  );
}
