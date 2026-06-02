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
      className="group relative block overflow-hidden bg-background"
    >
      <div className={cn("relative aspect-[4/3]", compact && "aspect-square")}>
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <p className="font-semibold">{category.name}</p>
        {!compact && (
          <p className="mt-1 line-clamp-2 text-sm text-white/80">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  );
}
