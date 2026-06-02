import type { Product, ProductVariant } from "@/types/catalog";

export const CART_STORAGE_KEY = "avsdepot-cart";
export const CART_CHANGED_EVENT = "avsdepot-cart-changed";

export type CartItem = {
  id: string;
  productSlug: string;
  productName: string;
  brand: string;
  imageUrl: string;
  variantId: string;
  sku: string;
  durationYears: number;
  deviceCount: number;
  price: number;
  compareAtPrice?: number;
  quantity: number;
};

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!rawCart) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawCart);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_CHANGED_EVENT));
}

export function addVariantToCart(product: Product, variant: ProductVariant) {
  const items = getCartItems();
  const itemId = `${product.slug}:${variant.id}`;
  const existingItem = items.find((item) => item.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    items.push({
      id: itemId,
      productSlug: product.slug,
      productName: product.name,
      brand: product.brand,
      imageUrl: product.imageUrl,
      variantId: variant.id,
      sku: variant.sku,
      durationYears: variant.durationYears,
      deviceCount: variant.deviceCount,
      price: variant.price,
      compareAtPrice: variant.compareAtPrice,
      quantity: 1,
    });
  }

  saveCartItems(items);

  return items;
}

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function subscribeToCartChanges(callback: () => void) {
  window.addEventListener(CART_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(CART_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getCartSnapshot() {
  return JSON.stringify(getCartItems());
}

export function getServerCartSnapshot() {
  return "[]";
}

export function parseCartSnapshot(snapshot: string): CartItem[] {
  try {
    const parsed = JSON.parse(snapshot);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
