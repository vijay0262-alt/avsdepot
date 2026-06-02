import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types/catalog";
import { cn } from "@/lib/utils";

type CategoryTileProps = {
  category: Category;
  compact?: boolean;
};

export function CategoryTile({ category, compact }: CategoryTileProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative block overflow-hidden rounded-xl bg-background shadow-sm hover:shadow-lg transition-all duration-300 card-hover"
    >
      <div className={cn("relative aspect-[4/3]", compact && "aspect-square")}>
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <p className="text-xl font-bold tracking-tight">{category.name}</p>
        {!compact && (
          <p className="mt-2 line-clamp-2 text-sm text-white/90 leading-relaxed">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  );
}
