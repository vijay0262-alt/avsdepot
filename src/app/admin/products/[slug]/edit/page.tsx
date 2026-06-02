"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Trash2, Upload, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { categories, getProduct } from "@/lib/catalog-data";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

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

export default function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // For now, we'll use the first product as an example since params is async
  const product = getProduct("norton-360-deluxe");

  if (!product) {
    notFound();
  }

  const [formData, setFormData] = useState({
    name: product.name,
    slug: product.slug,
    categorySlug: product.categorySlug,
    brand: product.brand,
    price: product.price,
    compareAtPrice: product.compareAtPrice || 0,
    shortDescription: product.shortDescription,
    imageUrl: product.imageUrl,
    specs: [...product.specs],
  });

  const [variants, setVariants] = useState<Variant[]>(
    product.variants.map((v) => ({
      durationYears: v.durationYears,
      deviceCount: v.deviceCount,
      price: v.price,
      compareAtPrice: v.compareAtPrice,
      available: v.available,
      sku: v.sku,
    }))
  );
  const [specInput, setSpecInput] = useState("");
  const [imagePreview, setImagePreview] = useState(product.imageUrl);

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
    console.log("Updated product data:", formData);
    console.log("Updated variants:", variants);
    alert("Product updated! (Backend integration required)");
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
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="text-muted-foreground mt-2">Edit {product.name}</p>
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
                  required
                  value={formData.slug}
                  onChange={handleInputChange}
                />
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
                  value={formData.compareAtPrice}
                  onChange={handleInputChange}
                />
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
                Regenerate Variants
              </Button>
            </div>

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
                  {formData.brand}
                </p>
                <p className="font-semibold">{formData.name}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {formData.shortDescription}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <p className="font-bold">{formatCurrency(formData.price)}</p>
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
                Update Product
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
