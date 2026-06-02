import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProduct, products } from "@/lib/catalog-data";
import { ProductPage } from "./product-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | AVS Depot`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [
        {
          url: product.imageUrl,
          width: 900,
          height: 900,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: `${siteUrl}/product/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPageRoute({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.shortDescription,
            image: product.imageUrl,
            brand: {
              "@type": "Brand",
              name: product.brand,
            },
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "USD",
              lowPrice: Math.min(...product.variants.map((v) => v.price)),
              highPrice: Math.max(...product.variants.map((v) => v.price)),
              offerCount: product.variants.length,
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductPage product={product} relatedProducts={relatedProducts} />
      </Suspense>
    </>
  );
}
