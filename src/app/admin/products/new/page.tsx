"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Upload, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/lib/catalog-data";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const durations = [1, 2, 3] as const;
const devices = [1, 3, 5, 10] as const;

type Variant = {
  durationYears: number;
  deviceCount: number;
  price: number;
  compareAtPrice?: number;
  available: boolean;
  sku: string;
};

export const metadata = {
  title: "Add Product - Admin",
  description: "Add a new product to your store",
};

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    categorySlug: "",
    brand: "",
    price: 0,
    compareAtPrice: 0,
    shortDescription: "",
    imageUrl: "",
    specs: [] as string[],
  });

  const [variants, setVariants] = useState<Variant[]>([]);
  const [specInput, setSpecInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSpec = () => {
    if (specInput.trim()) {
      setFormData({ ...formData, specs: [...formData.specs, specInput.trim()] });
      setSpecInput("");
    }
  };

  const handleRemoveSpec = (index: number) => {
    setFormData({ ...formData, specs: formData.specs.filter((_, i) => i !== index) });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateVariants = () => {
    const newVariants: Variant[] = [];
    durations.forEach((duration) => {
      devices.forEach((deviceCount) => {
        const sku = `${formData.slug.toUpperCase().replace(/[^A-Z0-9]/g, "")}-${duration}Y-${deviceCount}D`;
        newVariants.push({
          durationYears: duration,
          deviceCount,
          price: formData.price,
          compareAtPrice: formData.compareAtPrice || undefined,
          available: true,
          sku,
        });
      });
    });
    setVariants(newVariants);
  };

  const updateVariantPrice = (index: number, field: keyof Variant, value: number | boolean) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setVariants(updatedVariants);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product data:", formData);
    console.log("Variants:", variants);
    alert("Product saved! (Backend integration required)");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        <p className="text-muted-foreground mt-2">Create a new product with variants</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Norton 360 Deluxe"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="norton-360-deluxe"
                  required
                  value={formData.slug}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  URL-friendly identifier (lowercase, hyphens only)
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="categorySlug">Category *</Label>
                <select
                  id="categorySlug"
                  name="categorySlug"
                  className="h-10 rounded-md border bg-background px-3"
                  required
                  value={formData.categorySlug}
                  onChange={handleInputChange}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="brand">Brand *</Label>
                <Input
                  id="brand"
                  name="brand"
                  placeholder="Norton"
                  required
                  value={formData.brand}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="shortDescription">Short Description *</Label>
                <textarea
                  id="shortDescription"
                  name="shortDescription"
                  placeholder="Advanced antivirus, VPN, dark web monitoring and device security."
                  className="min-h-[100px] rounded-md border bg-background px-3 py-2"
                  required
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Base Pricing</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="price">Base Price *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="24.99"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="compareAtPrice">Compare at Price</Label>
                <Input
                  id="compareAtPrice"
                  name="compareAtPrice"
                  type="number"
                  step="0.01"
                  placeholder="89.99"
                  value={formData.compareAtPrice}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  Original price for showing discounts
                </p>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Product Image</h2>
            <div className="grid gap-4">
              <div className="relative aspect-video rounded-lg border-2 border-dashed bg-secondary/50 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Product preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload image</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              {imagePreview && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setImagePreview("");
                    setFormData({ ...formData, imageUrl: "" });
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove Image
                </Button>
              )}
            </div>
          </div>

          {/* Specifications */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Key Specifications</h2>
            <div className="grid gap-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a specification"
                  value={specInput}
                  onChange={(e) => setSpecInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSpec())}
                />
                <Button type="button" onClick={handleAddSpec}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.specs.map((spec, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {spec}
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Product Variants</h2>
              <Button type="button" variant="outline" onClick={generateVariants}>
                <Plus className="h-4 w-4 mr-2" />
                Generate Variants
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Generate variants based on duration (1-3 years) and devices (1, 3, 5, 10)
            </p>

            {variants.length > 0 && (
              <div className="space-y-3">
                {variants.map((variant, index) => (
                  <div key={index} className="rounded-lg border bg-secondary/50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 grid gap-3 sm:grid-cols-4">
                        <div>
                          <Label className="text-xs">Duration</Label>
                          <p className="font-medium">{variant.durationYears} Year{variant.durationYears > 1 ? "s" : ""}</p>
                        </div>
                        <div>
                          <Label className="text-xs">Devices</Label>
                          <p className="font-medium">{variant.deviceCount}</p>
                        </div>
                        <div>
                          <Label className="text-xs">SKU</Label>
                          <code className="text-xs">{variant.sku}</code>
                        </div>
                        <div>
                          <Label className="text-xs">Price</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={variant.price}
                            onChange={(e) => updateVariantPrice(index, "price", parseFloat(e.target.value))}
                            className="h-8"
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeVariant(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg bg-secondary overflow-hidden">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Product preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  {formData.brand || "Brand"}
                </p>
                <p className="font-semibold">{formData.name || "Product Name"}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {formData.shortDescription || "Product description will appear here..."}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <p className="font-bold">{formData.price ? formatCurrency(formData.price) : "$0.00"}</p>
                  {formData.compareAtPrice && (
                    <p className="text-sm text-muted-foreground line-through">
                      {formatCurrency(formData.compareAtPrice)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Actions</h2>
            <div className="space-y-3">
              <Button type="submit" className="w-full" size="lg">
                <Save className="h-4 w-4 mr-2" />
                Save Product
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Save as Draft
              </Button>
              <Button type="button" variant="ghost" className="w-full text-destructive">
                Cancel
              </Button>
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-lg border bg-secondary/50 p-6">
            <h3 className="font-semibold mb-3">Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use descriptive product names</li>
              <li>• Keep slugs short and URL-friendly</li>
              <li>• Generate variants after setting base price</li>
              <li>• Upload high-quality product images</li>
              <li>• Add key specifications for customers</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}
