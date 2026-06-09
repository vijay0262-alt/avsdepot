"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import type { Category, Product } from "@/types/catalog";
import { ProductCard } from "@/components/catalog/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { categories, products, getProductsByCategory } from "@/lib/catalog-data";
import { formatCurrency } from "@/lib/utils";

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

interface CategoryPageProps {
  category: Category;
  searchParams: {
    q?: string;
    sort?: string;
    page?: string;
    brand?: string;
  };
}

const PRODUCTS_PER_PAGE = 12;

export function CategoryPage({ category, searchParams }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState(searchParams.q || "");
  const [selectedSort, setSelectedSort] = useState<SortOption>(
    (searchParams.sort as SortOption) || "featured"
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.brand ? searchParams.brand.split(",") : []
  );
  const [currentPage, setCurrentPage] = useState(
    searchParams.page ? parseInt(searchParams.page) : 1
  );
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique brands from products
  const allBrands = useMemo(() => {
    const brands = new Set(products.map((p) => p.brand));
    return Array.from(brands).sort();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = getProductsByCategory(category.slug);

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.shortDescription.toLowerCase().includes(query)
      );
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Apply sorting
    switch (selectedSort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // featured - keep original order
        break;
    }

    return result;
  }, [category.slug, searchQuery, selectedBrands, selectedSort]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSelectedSort(sort);
    setCurrentPage(1);
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBrands([]);
    setSelectedSort("featured");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || selectedBrands.length > 0 || selectedSort !== "featured";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-48 md:h-64 bg-muted overflow-hidden">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{category.name}</h1>
            <p className="text-lg md:text-xl text-white/90">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{category.name}</span>
        </nav>

        {/* Search and Sort Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="appearance-none bg-background border border-input rounded-md px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`w-64 flex-shrink-0 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="sticky top-4 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Brand Filter */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Brand</h4>
                  <div className="space-y-2">
                    {allBrands.map((brand) => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="rounded border-input"
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Active Filters</h4>
                    <div className="flex flex-wrap gap-2">
                      {searchQuery && (
                        <Badge variant="secondary" className="gap-1">
                          Search: {searchQuery}
                          <button
                            onClick={() => handleSearchChange("")}
                            className="ml-1 hover:text-foreground"
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                      {selectedBrands.map((brand) => (
                        <Badge key={brand} variant="secondary" className="gap-1">
                          {brand}
                          <button
                            onClick={() => handleBrandToggle(brand)}
                            className="ml-1 hover:text-foreground"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                      {selectedSort !== "featured" && (
                        <Badge variant="secondary" className="gap-1">
                          Sort: {selectedSort}
                          <button
                            onClick={() => handleSortChange("featured")}
                            className="ml-1 hover:text-foreground"
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </p>
            </div>

            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found</p>
                {hasActiveFilters && (
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
