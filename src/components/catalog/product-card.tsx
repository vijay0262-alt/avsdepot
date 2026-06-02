import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/catalog";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Monitor } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const savingsPercentage = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  // Extract duration and device count from product name or specs
  const duration = product.name.match(/(\d+)\s*year/i)?.[1] || "1";
  const deviceCount = product.name.match(/(\d+)\s*device/i)?.[1] || "1";

  return (
    <article className="group overflow-hidden rounded-2xl border-2 border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 card-hover">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.compareAtPrice && (
            <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-3 py-1.5 rounded-full shadow-lg">
              Save {savingsPercentage}%
            </Badge>
          )}
          {product.stockStatus === "In stock" && (
            <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white font-bold text-sm px-3 py-1.5 rounded-full shadow-lg">
              In Stock
            </Badge>
          )}
        </div>
      </Link>
      <div className="p-6">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            {product.brand}
          </p>
          <Link
            href={`/product/${product.slug}`}
            className="block text-xl font-bold text-foreground hover:text-primary transition-colors leading-tight"
          >
            {product.name}
          </Link>
        </div>
        
        {/* Duration and Device Count */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{duration} Year</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Monitor className="h-4 w-4" />
            <span className="font-medium">{deviceCount} Device</span>
          </div>
        </div>

        <p className="mb-5 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {product.shortDescription}
        </p>
        
        {/* Pricing */}
        <div className="mb-5">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">{formatCurrency(product.price)}</span>
            {product.compareAtPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</span>
                <Badge className="bg-green-500 hover:bg-green-600 text-white font-semibold text-xs">
                  Save {savingsPercentage}%
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <Button size="lg" className="w-full font-bold shadow-md">
          Add to Cart
        </Button>

        {/* Trust Indicators */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span className="font-medium">Instant Delivery</span>
        </div>
      </div>
    </article>
  );
}
