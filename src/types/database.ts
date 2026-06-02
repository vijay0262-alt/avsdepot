export type UUID = string;
export type CurrencyCode = "USD" | "INR" | "EUR" | "GBP" | string;

export type ProductType = "digital_license" | "subscription" | "download";
export type LicenseDelivery = "email" | "account" | "manual";
export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "fulfilled"
  | "cancelled"
  | "refunded";
export type PaymentStatus = "unpaid" | "paid" | "failed" | "refunded";
export type FulfillmentStatus = "pending" | "sent" | "failed" | "refunded";

export type Address = {
  name?: string;
  company?: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
};

export type CategoryRow = {
  id: UUID;
  parentId: UUID | null;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductRow = {
  id: UUID;
  categoryId: UUID;
  name: string;
  slug: string;
  brand: string;
  shortDescription: string;
  description: string | null;
  imageUrl: string | null;
  productType: ProductType;
  platform: string | null;
  licenseDelivery: LicenseDelivery;
  isFeatured: boolean;
  isBestSeller: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductVariantRow = {
  id: UUID;
  productId: UUID;
  sku: string;
  name: string;
  durationMonths: number;
  deviceCount: number;
  price: number;
  compareAtPrice: number | null;
  currency: CurrencyCode;
  licenseRegion: string;
  stockQuantity: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CustomerRow = {
  id: UUID;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  companyName: string | null;
  billingAddress: Address | null;
  marketingOptIn: boolean;
  createdAt: string;
  updatedAt: string;
};

export type OrderRow = {
  id: UUID;
  orderNumber: string;
  customerId: UUID | null;
  customerEmail: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  total: number;
  currency: CurrencyCode;
  billingAddress: Address | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OrderItemRow = {
  id: UUID;
  orderId: UUID;
  productId: UUID | null;
  productVariantId: UUID | null;
  productName: string;
  variantName: string;
  sku: string;
  durationMonths: number;
  deviceCount: number;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  licenseKey: string | null;
  fulfillmentStatus: FulfillmentStatus;
  createdAt: string;
};

export type ProductWithVariants = ProductRow & {
  category: CategoryRow;
  variants: ProductVariantRow[];
};

export type OrderWithItems = OrderRow & {
  customer: CustomerRow | null;
  items: OrderItemRow[];
};

export type CreateProductVariantInput = Pick<
  ProductVariantRow,
  | "productId"
  | "sku"
  | "name"
  | "durationMonths"
  | "deviceCount"
  | "price"
  | "currency"
> &
  Partial<
    Pick<
      ProductVariantRow,
      "compareAtPrice" | "licenseRegion" | "stockQuantity" | "isActive"
    >
  >;

export type CartVariantSelection = {
  productId: UUID;
  variantId: UUID;
  durationMonths: number;
  deviceCount: number;
  quantity: number;
  price: number;
  currency: CurrencyCode;
};
