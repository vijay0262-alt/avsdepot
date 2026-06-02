"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Shield, Truck, RotateCcw, HeadphonesIcon, Star, ChevronDown, ChevronUp, Lock, CheckCircle2, Zap, Award, Clock } from "lucide-react";
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
  ];

  const requirements = systemRequirements[product.categorySlug as keyof typeof systemRequirements] || systemRequirements.productivity;

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const savingsPercentage = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/category/${category.slug}`} className="hover:text-foreground transition-colors">
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
        <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16 mb-16">
          {/* Product Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden border-2 border-border">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.compareAtPrice && (
                <Badge className="absolute top-6 left-6 bg-red-500 hover:bg-red-600 text-white font-bold text-base px-4 py-2 rounded-full shadow-lg">
                  Save {savingsPercentage}%
                </Badge>
              )}
            </div>
            <div className="flex gap-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square w-24 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index ? "border-primary shadow-md" : "border-transparent hover:border-border"
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

          {/* Sticky Purchase Box */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border-2 border-border bg-card p-8 shadow-lg">
              <div className="mb-6">
                <Badge variant="outline" className="mb-3 text-sm font-semibold">
                  {product.brand}
                </Badge>
                <h1 className="text-2xl font-bold mb-3">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(4.0) · 128 reviews</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-6 pb-6 border-b-2 border-border">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-foreground">{formatCurrency(product.price)}</span>
                  {product.compareAtPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</span>
                      <Badge className="bg-green-500 hover:bg-green-600 text-white font-semibold">
                        Save {savingsPercentage}%
                      </Badge>
                    </>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Instant digital delivery</p>
              </div>

              {/* Product Variant Selector */}
              <div className="mb-6">
                <ProductVariantSelector product={product} />
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6 pb-6 border-b-2 border-border">
                <div className={`w-3 h-3 rounded-full ${product.stockStatus === "In stock" ? "bg-green-500" : "bg-yellow-500"}`} />
                <span className={`text-sm font-semibold ${product.stockStatus === "In stock" ? "text-green-600" : "text-yellow-600"}`}>
                  {product.stockStatus}
                </span>
              </div>

              {/* CTA Button */}
              <Button size="lg" className="w-full mb-4 text-lg font-bold shadow-md">
                Add to Cart
              </Button>

              {/* Secure Checkout Indicators */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                <Lock className="h-4 w-4" />
                <span>Secure checkout powered by Stripe</span>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-medium">100% Genuine</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-medium">Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RotateCcw className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-medium">30-Day Returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HeadphonesIcon className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Benefits Section */}
        <div className="mb-20">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="rounded-2xl border-2 border-border bg-card p-6 text-center hover:border-primary/50 transition-colors">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Genuine Licenses</h3>
              <p className="text-sm text-muted-foreground">100% authentic software from authorized distributors</p>
            </div>
            <div className="rounded-2xl border-2 border-border bg-card p-6 text-center hover:border-primary/50 transition-colors">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Instant Delivery</h3>
              <p className="text-sm text-muted-foreground">License keys delivered to your email instantly</p>
            </div>
            <div className="rounded-2xl border-2 border-border bg-card p-6 text-center hover:border-primary/50 transition-colors">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">30-Day Guarantee</h3>
              <p className="text-sm text-muted-foreground">Money-back guarantee if not satisfied</p>
            </div>
            <div className="rounded-2xl border-2 border-border bg-card p-6 text-center hover:border-primary/50 transition-colors">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <HeadphonesIcon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Expert support available around the clock</p>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-20">
          <div className="border-b-2 border-border mb-8">
            <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-primary font-bold text-base">Description</button>
              <button className="pb-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground font-medium text-base">Features</button>
              <button className="pb-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground font-medium text-base">System Requirements</button>
              <button className="pb-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground font-medium text-base">FAQ</button>
            </div>
          </div>

          {/* Description */}
          <div className="prose max-w-none mb-12">
            <h2 className="text-3xl font-bold mb-6">Product Description</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">{product.shortDescription}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This premium software license provides you with full access to all features and updates.
              Perfect for both personal and professional use, our licenses are sourced from authorized
              distributors and come with manufacturer warranty support.
            </p>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {product.specs.map((spec, index) => (
                <div key={index} className="flex items-start gap-4 p-5 bg-secondary/50 rounded-xl border border-border">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-base font-medium">{spec}</span>
                </div>
              ))}
              <div className="flex items-start gap-4 p-5 bg-secondary/50 rounded-xl border border-border">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-base font-medium">Instant digital delivery via email</span>
              </div>
              <div className="flex items-start gap-4 p-5 bg-secondary/50 rounded-xl border border-border">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-base font-medium">Secure payment processing</span>
              </div>
              <div className="flex items-start gap-4 p-5 bg-secondary/50 rounded-xl border border-border">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-base font-medium">30-day money-back guarantee</span>
              </div>
            </div>
          </div>

          {/* System Requirements */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">System Requirements</h2>
            <div className="bg-secondary/50 rounded-2xl border-2 border-border p-8">
              <dl className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                  <dt className="font-bold text-base min-w-[180px]">Operating System:</dt>
                  <dd className="text-muted-foreground text-base">{requirements.operatingSystem}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                  <dt className="font-bold text-base min-w-[180px]">Processor:</dt>
                  <dd className="text-muted-foreground text-base">{requirements.processor}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                  <dt className="font-bold text-base min-w-[180px]">Memory:</dt>
                  <dd className="text-muted-foreground text-base">{requirements.memory}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                  <dt className="font-bold text-base min-w-[180px]">Disk Space:</dt>
                  <dd className="text-muted-foreground text-base">{requirements.diskSpace}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                  <dt className="font-bold text-base min-w-[180px]">Internet:</dt>
                  <dd className="text-muted-foreground text-base">{requirements.internet}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="rounded-xl border-2 border-border overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  >
                    <span className="font-bold text-base">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="p-6 pt-0 text-muted-foreground border-t-2 border-border text-base leading-relaxed">
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
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
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
