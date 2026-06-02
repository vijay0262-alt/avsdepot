export type Category = {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
};

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  brand: string;
  price: number;
  shortDescription: string;
  imageUrl: string;
  specs: string[];
  stockStatus: "In stock" | "Low stock" | "Preorder";
};
