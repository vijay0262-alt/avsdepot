import { ArrowLeft, Plus, Edit, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { getProduct, products } from "@/lib/catalog-data";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Product Variants - Admin",
  description: "Manage product variants",
};

export default function ProductVariantsPage({ params }: { params: Promise<{ slug: string }> }) {
  // This would normally be async, but for now we'll use the first product as an example
  const product = products[0];

  if (!product) {
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
        <p className="text-muted-foreground mt-2">Manage product variants and pricing</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Product Info */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Product Details</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Product Name</Label>
                <p className="font-medium">{product.name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Brand</Label>
                <p className="font-medium">{product.brand}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Category</Label>
                <Badge variant="outline">{product.categorySlug}</Badge>
              </div>
              <div>
                <Label className="text-muted-foreground">Base Price</Label>
                <p className="font-medium">{formatCurrency(product.price)}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Compare at Price</Label>
                <p className="font-medium">
                  {product.compareAtPrice ? formatCurrency(product.compareAtPrice) : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Variants Table */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold">Product Variants</h2>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Variant
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">SKU</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Duration</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Devices</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Compare Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Stock</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((variant) => (
                    <tr key={variant.id} className="border-t hover:bg-secondary/50">
                      <td className="px-6 py-4">
                        <code className="text-sm bg-secondary px-2 py-1 rounded">
                          {variant.sku}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {variant.durationYears} {variant.durationYears === 1 ? "Year" : "Years"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {variant.deviceCount} {variant.deviceCount === 1 ? "Device" : "Devices"}
                      </td>
                      <td className="px-6 py-4">
                        <Input
                          type="number"
                          defaultValue={variant.price}
                          className="w-24"
                          step="0.01"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Input
                          type="number"
                          defaultValue={variant.compareAtPrice || ""}
                          className="w-24"
                          step="0.01"
                          placeholder="N/A"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={variant.stockLabel === "In stock" ? "default" : "secondary"}
                        >
                          {variant.stockLabel}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={variant.available ? "outline" : "secondary"}
                          className={variant.available ? "bg-green-500/10 text-green-600" : ""}
                        >
                          {variant.available ? "Available" : "Unavailable"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {product.variants.length} variants
            </p>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
