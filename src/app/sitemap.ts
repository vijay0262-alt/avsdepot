import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/catalog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return [
    "",
    "/cart",
    "/checkout",
    "/login",
    "/register",
    "/account",
    "/legal/privacy",
    "/legal/terms",
    "/legal/returns",
    "/legal/warranty",
    ...categories.map((category) => `/category/${category.slug}`),
    ...products.map((product) => `/product/${product.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
