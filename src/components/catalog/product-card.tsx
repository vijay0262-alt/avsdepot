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
    <article className="group overflow-hidden rounded-xl border-2 border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 card-hover">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square bg-secondary overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              {product.brand}
            </p>
            <Link
              href={`/product/${product.slug}`}
              className="mt-1 block text-lg font-bold text-foreground hover:text-primary transition-colors"
            >
              {product.name}
            </Link>
          </div>
          <Badge variant="secondary" className="text-xs">{product.stockStatus}</Badge>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {product.shortDescription}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice)}
              </p>
            )}
          </div>
          <Button size="sm" variant="outline" className="rounded-lg">
            View
          </Button>
        </div>
      </div>
    </article>
  );
}
