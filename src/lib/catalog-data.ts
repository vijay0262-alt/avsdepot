import type { Category, Product } from "@/types/catalog";

export const categories: Category[] = [
  {
    slug: "displays",
    name: "Displays",
    description: "Commercial displays, touch screens and signage hardware.",
    imageUrl:
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "security",
    name: "Security",
    description: "Cameras, recorders and surveillance accessories.",
    imageUrl:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "networking",
    name: "Networking",
    description: "Switches, routers, access points and structured cabling.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "installation",
    name: "Installation",
    description: "Mounts, cable management, tools and project essentials.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
  },
];

export const products: Product[] = [
  {
    slug: "commercial-4k-display-55",
    name: '55" Commercial 4K Display',
    categorySlug: "displays",
    brand: "AVS Pro",
    price: 699,
    shortDescription: "Bright UHD display for conference rooms and signage.",
    imageUrl:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=900&q=80",
    specs: ["55 inch UHD panel", "350 nit brightness", "HDMI and USB-C"],
    stockStatus: "In stock",
  },
  {
    slug: "ptz-security-camera",
    name: "Outdoor PTZ Security Camera",
    categorySlug: "security",
    brand: "SecureLine",
    price: 289,
    shortDescription: "Weather-rated PTZ camera with night vision.",
    imageUrl:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=80",
    specs: ["4MP sensor", "IP66 enclosure", "PoE ready"],
    stockStatus: "Low stock",
  },
  {
    slug: "managed-poe-switch-24-port",
    name: "24-Port Managed PoE Switch",
    categorySlug: "networking",
    brand: "NetCore",
    price: 449,
    shortDescription: "Managed switch for AV-over-IP and camera networks.",
    imageUrl:
      "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=900&q=80",
    specs: ["24 PoE+ ports", "Layer 2 management", "Rack mountable"],
    stockStatus: "In stock",
  },
  {
    slug: "low-profile-tv-wall-mount",
    name: "Low Profile TV Wall Mount",
    categorySlug: "installation",
    brand: "MountWorks",
    price: 79,
    shortDescription: "Slim fixed mount for commercial display installs.",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    specs: ["Supports 42-75 inch displays", "150 lb capacity", "VESA compatible"],
    stockStatus: "In stock",
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
