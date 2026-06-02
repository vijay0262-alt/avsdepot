"use client";

import { Plus, Search, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { products, categories } from "@/lib/catalog-data";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductsPage() {
  const [productList, setProductList] = useState(products);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (slug: string) => {
    setProductList(productList.filter((p) => p.slug !== slug));
    setDeleteConfirm(null);
    alert("Product deleted! (Backend integration required)");
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-2">Manage your product inventory</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10"
          />
        </div>
        <select className="h-10 rounded-md border bg-background px-3 text-sm">
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        <select className="h-10 rounded-md border bg-background px-3 text-sm">
          <option value="">All Brands</option>
          <option value="Norton">Norton</option>
          <option value="McAfee">McAfee</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Kaspersky">Kaspersky</option>
          <option value="Bitdefender">Bitdefender</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Brand</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Variants</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr key={product.slug} className="border-t hover:bg-secondary/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-md overflow-hidden bg-secondary">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/product/${product.slug}`}
                          className="font-medium hover:underline"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">{product.categorySlug}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">{product.brand}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{formatCurrency(product.price)}</p>
                      {product.compareAtPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          {formatCurrency(product.compareAtPrice)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={product.stockStatus === "In stock" ? "default" : "secondary"}
                    >
                      {product.stockStatus}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">{product.variants.length}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">
                      Active
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/products/${product.slug}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      {deleteConfirm === product.slug ? (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product.slug)}
                            className="text-destructive"
                          >
                            Confirm
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteConfirm(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteConfirm(product.slug)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/products/${product.slug}`}>
                          <MoreVertical className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground">
          Showing 1-{productList.length} of {productList.length} products
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
