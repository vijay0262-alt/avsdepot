"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Shield, Truck, RotateCcw, HeadphonesIcon, Star, Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import type { Product } from "@/types/catalog";
import { ProductVariantSelector } from "@/components/catalog/product-variant-selector";
import { ProductCard } from "@/components/catalog/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategory } from "@/lib/catalog-data";
import { formatCurrency } from "@/lib/utils";

interface ProductPageProps {
  product: Product;
  relatedProducts: Product[];
}

const faqData = [
  {
    question: "How will I receive my license key?",
    answer: "Your license key will be delivered instantly via email after purchase. You'll also find it in your account dashboard for future reference.",
  },
  {
    question: "Is this a legitimate license?",
    answer: "Yes, all our licenses are 100% genuine and authentic. We source directly from authorized distributors and provide full manufacturer warranties.",
  },
  {
    question: "Can I transfer the license to another computer?",
    answer: "Most licenses allow transfers, but policies vary by manufacturer. Check the specific product documentation or contact our support team for details.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and various digital payment methods. All transactions are secure and encrypted.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee on all products. If you're not satisfied, contact our support team for a full refund.",
  },
];

const systemRequirements = {
  antivirus: {
    operatingSystem: "Windows 10, 11 (64-bit) / macOS 10.15+ / Android 8.0+ / iOS 13+",
    processor: "1 GHz or faster",
    memory: "2 GB RAM (4 GB recommended)",
    diskSpace: "2 GB available disk space",
    internet: "High-speed internet connection required",
  },
  windows: {
    operatingSystem: "Windows 10 or 11 (64-bit)",
    processor: "1 GHz or faster with 2+ cores",
    memory: "4 GB RAM (8 GB recommended)",
    diskSpace: "20 GB available disk space",
    internet: "Internet connection for activation",
  },
  office: {
    operatingSystem: "Windows 10 or 11 (64-bit) / macOS 10.15+",
    processor: "1.6 GHz or faster, 2-core",
    memory: "4 GB RAM (8 GB recommended)",
    diskSpace: "4 GB available disk space",
    internet: "Internet connection for activation and updates",
  },
  productivity: {
    operatingSystem: "Windows 10 or 11 (64-bit) / macOS 10.15+",
    processor: "1 GHz or faster",
    memory: "2 GB RAM (4 GB recommended)",
    diskSpace: "1 GB available disk space",
    internet: "Internet connection for cloud features",
  },
};

export function ProductPage({ product, relatedProducts }: ProductPageProps) {
  const category = getCategory(product.categorySlug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const images = [
    product.imageUrl,
    // Add more image variations in a real implementation
  ];

  const requirements = systemRequirements[product.categorySlug as keyof typeof systemRequirements] || systemRequirements.productivity;

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/category/${category.slug}`} className="hover:text-foreground">
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Product Gallery and Info */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 mb-16">
          {/* Product Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.compareAtPrice && (
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                  Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.brand}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(4.0) · 128 reviews</span>
              </div>
              <p className="text-lg text-muted-foreground">{product.shortDescription}</p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y">
              <div className="flex flex-col items-center text-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xs font-medium">Genuine License</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="h-6 w-6 text-primary" />
                <span className="text-xs font-medium">Instant Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="h-6 w-6 text-primary" />
                <span className="text-xs font-medium">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <HeadphonesIcon className="h-6 w-6 text-primary" />
                <span className="text-xs font-medium">24/7 Support</span>
              </div>
            </div>

            {/* Product Variant Selector */}
            <ProductVariantSelector product={product} />

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${product.stockStatus === "In stock" ? "bg-green-500" : "bg-yellow-500"}`} />
              <span className={product.stockStatus === "In stock" ? "text-green-600" : "text-yellow-600"}>
                {product.stockStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b mb-8">
            <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-primary font-semibold">Description</button>
              <button className="pb-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground">
                Features
              </button>
              <button className="pb-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground">
                System Requirements
              </button>
              <button className="pb-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground">
                FAQ
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="prose max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4">Product Description</h2>
            <p className="text-muted-foreground mb-4">{product.shortDescription}</p>
            <p className="text-muted-foreground">
              This premium software license provides you with full access to all features and updates.
              Perfect for both personal and professional use, our licenses are sourced from authorized
              distributors and come with manufacturer warranty support.
            </p>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {product.specs.map((spec, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm">{spec}</span>
                </div>
              ))}
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-sm">Instant digital delivery via email</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-sm">Secure payment processing</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-sm">30-day money-back guarantee</span>
              </div>
            </div>
          </div>

          {/* System Requirements */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">System Requirements</h2>
            <div className="bg-secondary/50 rounded-lg p-6">
              <dl className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <dt className="font-medium min-w-[150px]">Operating System:</dt>
                  <dd className="text-muted-foreground">{requirements.operatingSystem}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <dt className="font-medium min-w-[150px]">Processor:</dt>
                  <dd className="text-muted-foreground">{requirements.processor}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <dt className="font-medium min-w-[150px]">Memory:</dt>
                  <dd className="text-muted-foreground">{requirements.memory}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <dt className="font-medium min-w-[150px]">Disk Space:</dt>
                  <dd className="text-muted-foreground">{requirements.diskSpace}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <dt className="font-medium min-w-[150px]">Internet:</dt>
                  <dd className="text-muted-foreground">{requirements.internet}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqData.map((faq, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition"
                  >
                    <span className="font-medium">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="p-4 pt-0 text-muted-foreground border-t">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.slug} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
