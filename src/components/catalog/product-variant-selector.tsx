"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck, ShoppingCart } from "lucide-react";
import type { Product, ProductVariant } from "@/types/catalog";
import { addVariantToCart } from "@/lib/cart-storage";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ProductVariantSelectorProps = {
  product: Product;
};

const durations = [1, 2, 3] as const;
const devices = [1, 3, 5] as const;

export function ProductVariantSelector({ product }: ProductVariantSelectorProps) {
  const firstAvailableVariant =
    product.variants.find((variant) => variant.available) ?? product.variants[0];
  const [selectedDuration, setSelectedDuration] = useState(
    firstAvailableVariant.durationYears,
  );
  const [selectedDevices, setSelectedDevices] = useState(
    firstAvailableVariant.deviceCount,
  );
  const [addedVariant, setAddedVariant] = useState<ProductVariant | null>(null);

  const selectedVariant = useMemo(
    () =>
      product.variants.find(
        (variant) =>
          variant.durationYears === selectedDuration &&
          variant.deviceCount === selectedDevices,
      ),
    [product.variants, selectedDevices, selectedDuration],
  );

  const availableVariant = selectedVariant?.available ? selectedVariant : null;
  const savings =
    availableVariant?.compareAtPrice && availableVariant.compareAtPrice > availableVariant.price
      ? availableVariant.compareAtPrice - availableVariant.price
      : 0;

  function handleAddToCart() {
    if (!availableVariant) {
      return;
    }

    addVariantToCart(product, availableVariant);
    setAddedVariant(availableVariant);
  }

  return (
    <div className="mt-8 rounded-lg border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            Configure your license
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <p className="text-3xl font-bold">
              {availableVariant ? formatCurrency(availableVariant.price) : "Unavailable"}
            </p>
            {availableVariant?.compareAtPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {formatCurrency(availableVariant.compareAtPrice)}
              </p>
            )}
            {savings > 0 && (
              <Badge variant="secondary">Save {formatCurrency(savings)}</Badge>
            )}
          </div>
        </div>
        <Badge variant={availableVariant ? "default" : "outline"}>
          {selectedVariant?.stockLabel ?? "Out of stock"}
        </Badge>
      </div>

      <OptionGroup label="Duration">
        {durations.map((duration) => {
          const isSelected = duration === selectedDuration;
          const hasAvailableOption = product.variants.some(
            (variant) =>
              variant.durationYears === duration &&
              variant.deviceCount === selectedDevices &&
              variant.available,
          );

          return (
            <button
              key={duration}
              type="button"
              onClick={() => setSelectedDuration(duration)}
              className={cn(
                "relative rounded-lg border p-4 text-left transition hover:border-primary hover:bg-secondary/60",
                isSelected && "border-primary bg-primary/5 ring-2 ring-primary/15",
                !hasAvailableOption && "border-dashed opacity-60",
              )}
            >
              {isSelected && (
                <Check className="absolute right-3 top-3 size-4 text-primary" />
              )}
              <span className="block font-semibold">
                {duration} {duration === 1 ? "Year" : "Years"}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {hasAvailableOption ? "Digital key delivery" : "Unavailable"}
              </span>
            </button>
          );
        })}
      </OptionGroup>

      <OptionGroup label="Devices">
        {devices.map((deviceCount) => {
          const variant = product.variants.find(
            (item) =>
              item.durationYears === selectedDuration &&
              item.deviceCount === deviceCount,
          );
          const isSelected = deviceCount === selectedDevices;

          return (
            <button
              key={deviceCount}
              type="button"
              onClick={() => setSelectedDevices(deviceCount)}
              className={cn(
                "relative rounded-lg border p-4 text-left transition hover:border-primary hover:bg-secondary/60",
                isSelected && "border-primary bg-primary/5 ring-2 ring-primary/15",
                !variant?.available && "border-dashed opacity-60",
              )}
            >
              {isSelected && (
                <Check className="absolute right-3 top-3 size-4 text-primary" />
              )}
              <span className="block font-semibold">
                {deviceCount} {deviceCount === 1 ? "Device" : "Devices"}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {variant?.available
                  ? formatCurrency(variant.price)
                  : "Out of stock"}
              </span>
            </button>
          );
        })}
      </OptionGroup>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <Button
          size="lg"
          onClick={handleAddToCart}
          disabled={!availableVariant}
          className="w-full"
        >
          <ShoppingCart className="size-4" />
          Add selected variant to cart
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/cart">View cart</Link>
        </Button>
      </div>

      {addedVariant && (
        <div className="mt-4 flex items-start gap-3 rounded-md border bg-secondary/50 p-3 text-sm">
          <ShieldCheck className="mt-0.5 size-4 text-primary" />
          <p>
            Added {addedVariant.durationYears} year, {addedVariant.deviceCount}{" "}
            {addedVariant.deviceCount === 1 ? "device" : "devices"} license to
            your cart.
          </p>
        </div>
      )}
    </div>
  );
}

function OptionGroup({
  label,
  children,
}: Readonly<{
  label: string;
  children: React.ReactNode;
}>) {
  return (
    <fieldset className="mt-6">
      <legend className="mb-3 text-sm font-semibold">{label}</legend>
      <div className="grid gap-3 sm:grid-cols-3">{children}</div>
    </fieldset>
  );
}
