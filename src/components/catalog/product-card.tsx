import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/catalog";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square bg-secondary">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              {product.brand}
            </p>
            <Link
              href={`/product/${product.slug}`}
              className="mt-1 block font-semibold hover:underline"
            >
              {product.name}
            </Link>
          </div>
          <Badge variant="secondary">{product.stockStatus}</Badge>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="font-bold">{formatCurrency(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice)}
              </p>
            )}
          </div>
          <Button size="sm" variant="outline">
            View
          </Button>
        </div>
      </div>
    </article>
  );
}
