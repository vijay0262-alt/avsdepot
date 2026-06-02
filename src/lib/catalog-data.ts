import type { Category, Product, ProductVariant } from "@/types/catalog";

const durationDeviceVariants = (
  productSlug: string,
  baseSku: string,
  prices: Record<string, { price: number; compareAtPrice?: number; available?: boolean }>,
): ProductVariant[] =>
  ([1, 2, 3] as const).flatMap((durationYears) =>
    ([1, 3, 5] as const).map((deviceCount) => {
      const key = `${durationYears}-${deviceCount}`;
      const price = prices[key];

      return {
        id: `${productSlug}-${durationYears}y-${deviceCount}d`,
        sku: `${baseSku}-${durationYears}Y-${deviceCount}D`,
        durationYears,
        deviceCount,
        price: price.price,
        compareAtPrice: price.compareAtPrice,
        available: price.available ?? true,
        stockLabel:
          price.available === false
            ? "Out of stock"
            : deviceCount === 5 && durationYears === 3
              ? "Low stock"
              : "In stock",
      };
    }),
  );

export const categories: Category[] = [
  {
    slug: "antivirus",
    name: "Antivirus",
    description: "Security suites, VPN protection and malware defense keys.",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "productivity",
    name: "Productivity",
    description: "Office apps, PDF tools and business productivity licenses.",
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "windows",
    name: "Windows",
    description: "Windows operating system licenses for home and business.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "office",
    name: "Office",
    description: "Microsoft Office and collaboration software license keys.",
    imageUrl:
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=900&q=80",
  },
];

export const products: Product[] = [
  {
    slug: "norton-360-deluxe",
    name: "Norton 360 Deluxe",
    categorySlug: "antivirus",
    brand: "Norton",
    price: 24.99,
    compareAtPrice: 89.99,
    shortDescription:
      "Advanced antivirus, VPN, dark web monitoring and device security.",
    imageUrl:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=900&q=80",
    specs: [
      "Instant digital key delivery",
      "Works on Windows, macOS, Android and iOS",
      "Secure activation instructions included",
    ],
    stockStatus: "In stock",
    variants: durationDeviceVariants("norton-360-deluxe", "N360DLX", {
      "1-1": { price: 24.99, compareAtPrice: 89.99 },
      "1-3": { price: 34.99, compareAtPrice: 109.99 },
      "1-5": { price: 44.99, compareAtPrice: 129.99 },
      "2-1": { price: 39.99, compareAtPrice: 149.99 },
      "2-3": { price: 54.99, compareAtPrice: 189.99 },
      "2-5": { price: 69.99, compareAtPrice: 219.99 },
      "3-1": { price: 54.99, compareAtPrice: 199.99 },
      "3-3": { price: 74.99, compareAtPrice: 249.99 },
      "3-5": { price: 89.99, compareAtPrice: 299.99, available: false },
    }),
  },
  {
    slug: "mcafee-total-protection",
    name: "McAfee Total Protection",
    categorySlug: "antivirus",
    brand: "McAfee",
    price: 19.99,
    compareAtPrice: 79.99,
    shortDescription:
      "Award-winning antivirus with identity, privacy and web protection.",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
    specs: ["Instant license key", "Multi-device plans", "Identity monitoring"],
    stockStatus: "In stock",
    variants: durationDeviceVariants("mcafee-total-protection", "MTP", {
      "1-1": { price: 19.99, compareAtPrice: 79.99 },
      "1-3": { price: 29.99, compareAtPrice: 99.99 },
      "1-5": { price: 39.99, compareAtPrice: 119.99 },
      "2-1": { price: 34.99, compareAtPrice: 139.99 },
      "2-3": { price: 49.99, compareAtPrice: 169.99 },
      "2-5": { price: 59.99, compareAtPrice: 199.99 },
      "3-1": { price: 49.99, compareAtPrice: 179.99 },
      "3-3": { price: 64.99, compareAtPrice: 229.99 },
      "3-5": { price: 79.99, compareAtPrice: 269.99 },
    }),
  },
  {
    slug: "windows-11-pro",
    name: "Windows 11 Pro License",
    categorySlug: "windows",
    brand: "Microsoft",
    price: 29.99,
    compareAtPrice: 199.99,
    shortDescription:
      "Genuine Windows 11 Pro activation key for professional PCs.",
    imageUrl:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
    specs: ["Lifetime activation", "Digital delivery", "64-bit compatible"],
    stockStatus: "In stock",
    variants: durationDeviceVariants("windows-11-pro", "WIN11PRO", {
      "1-1": { price: 29.99, compareAtPrice: 199.99 },
      "1-3": { price: 79.99, compareAtPrice: 599.97 },
      "1-5": { price: 119.99, compareAtPrice: 999.95 },
      "2-1": { price: 29.99, compareAtPrice: 199.99 },
      "2-3": { price: 79.99, compareAtPrice: 599.97 },
      "2-5": { price: 119.99, compareAtPrice: 999.95 },
      "3-1": { price: 29.99, compareAtPrice: 199.99 },
      "3-3": { price: 79.99, compareAtPrice: 599.97 },
      "3-5": { price: 119.99, compareAtPrice: 999.95 },
    }),
  },
  {
    slug: "office-2021-professional-plus",
    name: "Office 2021 Professional Plus",
    categorySlug: "office",
    brand: "Microsoft",
    price: 39.99,
    compareAtPrice: 249.99,
    shortDescription:
      "One-time Office license with Word, Excel, PowerPoint, Outlook and more.",
    imageUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
    specs: ["One-time activation", "Windows compatible", "Email delivery"],
    stockStatus: "Low stock",
    variants: durationDeviceVariants("office-2021-professional-plus", "OFF21PP", {
      "1-1": { price: 39.99, compareAtPrice: 249.99 },
      "1-3": { price: 99.99, compareAtPrice: 749.97 },
      "1-5": { price: 149.99, compareAtPrice: 1249.95, available: false },
      "2-1": { price: 39.99, compareAtPrice: 249.99 },
      "2-3": { price: 99.99, compareAtPrice: 749.97 },
      "2-5": { price: 149.99, compareAtPrice: 1249.95 },
      "3-1": { price: 39.99, compareAtPrice: 249.99 },
      "3-3": { price: 99.99, compareAtPrice: 749.97 },
      "3-5": { price: 149.99, compareAtPrice: 1249.95 },
    }),
  },
];

export const featuredProducts = products.slice(0, 4);

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.categorySlug === slug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
