export type Subcategory = {
  slug: string;
  name: string;
  description: string;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  subcategories?: Subcategory[];
};

export type ProductVariant = {
  id: string;
  sku: string;
  durationYears: 1 | 2 | 3;
  deviceCount: 1 | 3 | 5;
  price: number;
  compareAtPrice?: number;
  available: boolean;
  stockLabel: "In stock" | "Low stock" | "Out of stock";
};

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  subcategorySlug?: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  shortDescription: string;
  imageUrl: string;
  specs: string[];
  stockStatus: "In stock" | "Low stock" | "Preorder";
  variants: ProductVariant[];
};
