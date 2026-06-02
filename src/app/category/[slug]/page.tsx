import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCategory, getProductsByCategory, products, categories } from "@/lib/catalog-data";
import { CategoryPage } from "./category-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    q?: string;
    sort?: string;
    page?: string;
    brand?: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} | AVS Depot`,
    description: category.description,
    openGraph: {
      title: category.name,
      description: category.description,
      images: [
        {
          url: category.imageUrl,
          width: 900,
          height: 900,
          alt: category.name,
        },
      ],
    },
    alternates: {
      canonical: `${siteUrl}/category/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPageRoute({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const searchParamsData = await searchParams;
  
  const category = getCategory(slug);
  
  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(slug);

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: `${siteUrl}/category/${slug}`,
    image: category.imageUrl,
    hasPart: categoryProducts.slice(0, 12).map((product) => ({
      "@type": "Product",
      name: product.name,
      description: product.shortDescription,
      image: product.imageUrl,
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "USD",
        availability: product.stockStatus === "In stock" 
          ? "https://schema.org/InStock" 
          : "https://schema.org/LimitedAvailability",
        url: `${siteUrl}/product/${product.slug}`,
      },
    })),
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `${siteUrl}/category/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryPage 
          category={category}
          searchParams={searchParamsData}
        />
      </Suspense>
    </>
  );
}
