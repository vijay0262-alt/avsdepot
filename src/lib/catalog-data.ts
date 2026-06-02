import type { Category, Product, ProductVariant } from "@/types/catalog";

const durationDeviceVariants = (
  productSlug: string,
  baseSku: string,
  prices: Record<string, { price: number; compareAtPrice?: number; available?: boolean }>,
): ProductVariant[] =>
  ([1, 2, 3] as const).flatMap((durationYears) =>
    ([1, 3, 5] as const).map((deviceCount) => {
      const key = `${durationYears}-${deviceCount}`;
      const price = prices[key];

      return {
        id: `${productSlug}-${durationYears}y-${deviceCount}d`,
        sku: `${baseSku}-${durationYears}Y-${deviceCount}D`,
        durationYears,
        deviceCount,
        price: price.price,
        compareAtPrice: price.compareAtPrice,
        available: price.available ?? true,
        stockLabel:
          price.available === false
            ? "Out of stock"
            : deviceCount === 5 && durationYears === 3
              ? "Low stock"
              : "In stock",
      };
    }),
  );

export const categories: Category[] = [
  {
    slug: "antivirus",
    name: "Antivirus",
    description: "Complete security solutions including Norton, McAfee, Kaspersky, Bitdefender, and more.",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=900&q=80",
    subcategories: [
      { slug: "norton", name: "Norton", description: "Norton 360 and Norton security products" },
      { slug: "mcafee", name: "McAfee", description: "McAfee Total Protection and security suites" },
      { slug: "kaspersky", name: "Kaspersky", description: "Kaspersky Total Security and antivirus" },
      { slug: "bitdefender", name: "Bitdefender", description: "Bitdefender Total Security and protection" },
      { slug: "trend-micro", name: "Trend Micro", description: "Trend Micro Maximum Security" },
      { slug: "avg", name: "AVG", description: "AVG Antivirus and security products" },
      { slug: "avast", name: "Avast", description: "Avast Antivirus and premium security" },
      { slug: "eset", name: "ESET", description: "ESET NOD32 and Smart Security" },
      { slug: "webroot", name: "Webroot", description: "Webroot SecureAnywhere antivirus" },
      { slug: "malwarebytes", name: "Malwarebytes", description: "Malwarebytes premium protection" },
    ],
  },
  {
    slug: "productivity",
    name: "Productivity",
    description: "PDF tools, virtualization software, and business productivity applications.",
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    subcategories: [
      { slug: "adobe", name: "Adobe", description: "Adobe Acrobat and creative tools" },
      { slug: "pdf-tools", name: "PDF Tools", description: "Nitro PDF and other PDF solutions" },
      { slug: "virtualization", name: "Virtualization", description: "VMware and virtual machine software" },
    ],
  },
  {
    slug: "microsoft-office",
    name: "Microsoft Office",
    description: "Microsoft Office 2021, Office 365, and business productivity suites.",
    imageUrl:
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=900&q=80",
    subcategories: [
      { slug: "office-2021", name: "Office 2021", description: "Office 2021 Home & Business, Professional Plus" },
      { slug: "office-365", name: "Office 365", description: "Microsoft 365 Business and Personal" },
      { slug: "office-2019", name: "Office 2019", description: "Office 2019 Professional and Home" },
    ],
  },
  {
    slug: "microsoft-windows",
    name: "Microsoft Windows",
    description: "Windows 11, Windows 10, and Windows Server operating system licenses.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    subcategories: [
      { slug: "windows-11", name: "Windows 11", description: "Windows 11 Home and Pro licenses" },
      { slug: "windows-10", name: "Windows 10", description: "Windows 10 Home and Pro licenses" },
      { slug: "windows-server", name: "Windows Server", description: "Windows Server 2022 and 2019" },
    ],
  },
  {
    slug: "other",
    name: "Other",
    description: "Other software licenses and digital products.",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
    subcategories: [
      { slug: "vpn", name: "VPN", description: "Virtual Private Network services" },
      { slug: "backup", name: "Backup", description: "Cloud backup and recovery software" },
      { slug: "utilities", name: "Utilities", description: "System utilities and optimization tools" },
    ],
  },
];

export const products: Product[] = [
  {
    slug: "norton-360-deluxe",
    name: "Norton 360 Deluxe",
    categorySlug: "antivirus",
    subcategorySlug: "norton",
    brand: "Norton",
    price: 24.99,
    compareAtPrice: 89.99,
    shortDescription:
      "Advanced antivirus, VPN, dark web monitoring and device security.",
    imageUrl:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=900&q=80",
    specs: [
      "Instant digital key delivery",
      "Works on Windows, macOS, Android and iOS",
      "Secure activation instructions included",
    ],
    stockStatus: "In stock",
    variants: durationDeviceVariants("norton-360-deluxe", "N360DLX", {
      "1-1": { price: 24.99, compareAtPrice: 89.99 },
      "1-3": { price: 34.99, compareAtPrice: 109.99 },
      "1-5": { price: 44.99, compareAtPrice: 129.99 },
      "2-1": { price: 39.99, compareAtPrice: 149.99 },
      "2-3": { price: 54.99, compareAtPrice: 189.99 },
      "2-5": { price: 69.99, compareAtPrice: 219.99 },
      "3-1": { price: 54.99, compareAtPrice: 199.99 },
      "3-3": { price: 74.99, compareAtPrice: 249.99 },
      "3-5": { price: 89.99, compareAtPrice: 299.99, available: false },
    }),
  },
  {
    slug: "mcafee-total-protection",
    name: "McAfee Total Protection",
    categorySlug: "antivirus",
    subcategorySlug: "mcafee",
    brand: "McAfee",
    price: 19.99,
    compareAtPrice: 79.99,
    shortDescription:
      "Award-winning antivirus with identity, privacy and web protection.",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
    specs: ["Instant license key", "Multi-device plans", "Identity monitoring"],
    stockStatus: "In stock",
    variants: durationDeviceVariants("mcafee-total-protection", "MTP", {
      "1-1": { price: 19.99, compareAtPrice: 79.99 },
      "1-3": { price: 29.99, compareAtPrice: 99.99 },
      "1-5": { price: 39.99, compareAtPrice: 119.99 },
      "2-1": { price: 34.99, compareAtPrice: 139.99 },
      "2-3": { price: 49.99, compareAtPrice: 169.99 },
      "2-5": { price: 59.99, compareAtPrice: 199.99 },
      "3-1": { price: 49.99, compareAtPrice: 179.99 },
      "3-3": { price: 64.99, compareAtPrice: 229.99 },
      "3-5": { price: 79.99, compareAtPrice: 269.99 },
    }),
  },
  {
    slug: "kaspersky-total-security",
    name: "Kaspersky Total Security",
    categorySlug: "antivirus",
    subcategorySlug: "kaspersky",
    brand: "Kaspersky",
    price: 29.99,
    compareAtPrice: 89.99,
    shortDescription:
      "Premium protection against viruses, ransomware and hackers.",
    imageUrl:
      "https://images.unsplash.com/photo-1563206767-5b1d972d9293?auto=format&fit=crop&w=900&q=80",
    specs: ["Multi-device protection", "Password manager", "Parental controls"],
    stockStatus: "In stock",
    variants: durationDeviceVariants("kaspersky-total-security", "KTS", {
      "1-1": { price: 29.99, compareAtPrice: 89.99 },
      "1-3": { price: 39.99, compareAtPrice: 119.99 },
      "1-5": { price: 49.99, compareAtPrice: 149.99 },
      "2-1": { price: 44.99, compareAtPrice: 149.99 },
      "2-3": { price: 59.99, compareAtPrice: 199.99 },
      "2-5": { price: 74.99, compareAtPrice: 239.99 },
      "3-1": { price: 59.99, compareAtPrice: 199.99 },
      "3-3": { price: 79.99, compareAtPrice: 259.99 },
      "3-5": { price: 99.99, compareAtPrice: 319.99 },
    }),
  },
  {
    slug: "bitdefender-total-security",
    name: "Bitdefender Total Security",
    categorySlug: "antivirus",
    subcategorySlug: "bitdefender",
    brand: "Bitdefender",
    price: 34.99,
    compareAtPrice: 99.99,
    shortDescription:
      "Complete protection against all online threats with zero impact on performance.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&w=900&q=80",
    specs: ["Anti-ransomware", "Anti-phishing", "Web attack prevention"],
    stockStatus: "In stock",
    variants: durationDeviceVariants("bitdefender-total-security", "BDTS", {
      "1-1": { price: 34.99, compareAtPrice: 99.99 },
      "1-3": { price: 44.99, compareAtPrice: 129.99 },
      "1-5": { price: 54.99, compareAtPrice: 159.99 },
      "2-1": { price: 49.99, compareAtPrice: 159.99 },
      "2-3": { price: 64.99, compareAtPrice: 209.99 },
      "2-5": { price: 79.99, compareAtPrice: 249.99 },
      "3-1": { price: 64.99, compareAtPrice: 209.99 },
      "3-3": { price: 84.99, compareAtPrice: 269.99 },
      "3-5": { price: 104.99, compareAtPrice: 329.99 },
    }),
  },
  {
    slug: "trend-micro-maximum-security",
    name: "Trend Micro Maximum Security",
    categorySlug: "antivirus",
    subcategorySlug: "trend-micro",
    brand: "Trend Micro",
    price: 27.99,
    compareAtPrice: 84.99,
    shortDescription:
      "Advanced protection for your digital life across all devices.",
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=900&q=80",
    specs: ["Privacy scanner", "Social network protection", "Ransomware protection"],
    stockStatus: "Low stock",
    variants: durationDeviceVariants("trend-micro-maximum-security", "TMMS", {
      "1-1": { price: 27.99, compareAtPrice: 84.99 },
      "1-3": { price: 37.99, compareAtPrice: 114.99 },
      "1-5": { price: 47.99, compareAtPrice: 144.99 },
      "2-1": { price: 42.99, compareAtPrice: 144.99 },
      "2-3": { price: 57.99, compareAtPrice: 194.99 },
      "2-5": { price: 72.99, compareAtPrice: 234.99 },
      "3-1": { price: 57.99, compareAtPrice: 194.99 },
      "3-3": { price: 77.99, compareAtPrice: 254.99 },
      "3-5": { price: 97.99, compareAtPrice: 314.99 },
    }),
  },
  {
    slug: "windows-11-pro",
    name: "Windows 11 Pro License",
    categorySlug: "microsoft-windows",
    subcategorySlug: "windows-11",
    brand: "Microsoft",
    price: 29.99,
    compareAtPrice: 199.99,
    shortDescription:
      "Genuine Windows 11 Pro activation key for professional PCs.",
    imageUrl:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
    specs: ["Lifetime activation", "Digital delivery", "64-bit compatible"],
    stockStatus: "In stock",
    variants: durationDeviceVariants("windows-11-pro", "WIN11PRO", {
      "1-1": { price: 29.99, compareAtPrice: 199.99 },
      "1-3": { price: 79.99, compareAtPrice: 599.97 },
      "1-5": { price: 119.99, compareAtPrice: 999.95 },
      "2-1": { price: 29.99, compareAtPrice: 199.99 },
      "2-3": { price: 79.99, compareAtPrice: 599.97 },
      "2-5": { price: 119.99, compareAtPrice: 999.95 },
      "3-1": { price: 29.99, compareAtPrice: 199.99 },
      "3-3": { price: 79.99, compareAtPrice: 599.97 },
      "3-5": { price: 119.99, compareAtPrice: 999.95 },
    }),
  },
  {
    slug: "windows-11-home",
    name: "Windows 11 Home License",
    categorySlug: "microsoft-windows",
    subcategorySlug: "windows-11",
    brand: "Microsoft",
    price: 19.99,
    compareAtPrice: 139.99,
    shortDescription:
      "Genuine Windows 11 Home activation key for personal PCs.",
    imageUrl:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=900&q=80",
    specs: ["Lifetime activation", "Digital delivery", "32/64-bit compatible"],
    stockStatus: "In stock",
    variants: durationDeviceVariants("windows-11-home", "WIN11HOME", {
      "1-1": { price: 19.99, compareAtPrice: 139.99 },
      "1-3": { price: 49.99, compareAtPrice: 419.97 },
      "1-5": { price: 79.99, compareAtPrice: 699.95 },
      "2-1": { price: 19.99, compareAtPrice: 139.99 },
      "2-3": { price: 49.99, compareAtPrice: 419.97 },
      "2-5": { price: 79.99, compareAtPrice: 699.95 },
      "3-1": { price: 19.99, compareAtPrice: 139.99 },
      "3-3": { price: 49.99, compareAtPrice: 419.97 },
      "3-5": { price: 79.99, compareAtPrice: 699.95 },
    }),
  },
  {
    slug: "windows-10-pro",
    name: "Windows 10 Pro License",
    categorySlug: "microsoft-windows",
    subcategorySlug: "windows-10",
    brand: "Microsoft",
    price: 24.99,
    compareAtPrice: 199.99,
    shortDescription:
      "Genuine Windows 10 Pro activation key for business and professional use.",
    imageUrl:
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=900&q=80",
    specs: ["Lifetime activation", "Digital delivery", "64-bit compatible"],
    stockStatus: "In stock",
    variants: durationDeviceVariants("windows-10-pro", "WIN10PRO", {
      "1-1": { price: 24.99, compareAtPrice: 199.99 },
      "1-3": { price: 69.99, compareAtPrice: 599.97 },
      "1-5": { price: 109.99, compareAtPrice: 999.95 },
      "2-1": { price: 24.99, compareAtPrice: 199.99 },
      "2-3": { price: 69.99, compareAtPrice: 599.97 },
      "2-5": { price: 109.99, compareAtPrice: 999.95 },
      "3-1": { price: 24.99, compareAtPrice: 199.99 },
      "3-3": { price: 69.99, compareAtPrice: 599.97 },
      "3-5": { price: 109.99, compareAtPrice: 999.95 },
    }),
  },
  {
    slug: "windows-server-2022",
    name: "Windows Server 2022",
    categorySlug: "microsoft-windows",
    subcategorySlug: "windows-server",
    brand: "Microsoft",
    price: 149.99,
    compareAtPrice: 1209.99,
    shortDescription:
      "Enterprise-grade server operating system for datacenters.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&w=900&q=80",
    specs: ["Datacenter edition", "Digital delivery", "OEM license"],
    stockStatus: "In stock",
    variants: durationDeviceVariants("windows-server-2022", "WINSRV22", {
      "1-1": { price: 149.99, compareAtPrice: 1209.99 },
      "1-3": { price: 399.99, compareAtPrice: 3629.97 },
      "1-5": { price: 599.99, compareAtPrice: 6049.95 },
      "2-1": { price: 149.99, compareAtPrice: 1209.99 },
      "2-3": { price: 399.99, compareAtPrice: 3629.97 },
      "2-5": { price: 599.99, compareAtPrice: 6049.95 },
      "3-1": { price: 149.99, compareAtPrice: 1209.99 },
      "3-3": { price: 399.99, compareAtPrice: 3629.97 },
      "3-5": { price: 599.99, compareAtPrice: 6049.95 },
    }),
  },
  {
    slug: "office-2021-professional-plus",
    name: "Office 2021 Professional Plus",
    categorySlug: "microsoft-office",
    subcategorySlug: "office-2021",
    brand: "Microsoft",
    price: 39.99,
    compareAtPrice: 249.99,
    shortDescription:
      "One-time Office license with Word, Excel, PowerPoint, Outlook and more.",
    imageUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
    specs: ["One-time activation", "Windows compatible", "Email delivery"],
    stockStatus: "Low stock",
    variants: durationDeviceVariants("office-2021-professional-plus", "OFF21PP", {
      "1-1": { price: 39.99, compareAtPrice: 249.99 },
      "1-3": { price: 99.99, compareAtPrice: 749.97 },
      "1-5": { price: 149.99, compareAtPrice: 1249.95, available: false },
      "2-1": { price: 39.99, compareAtPrice: 249.99 },
      "2-3": { price: 99.99, compareAtPrice: 749.97 },
      "2-5": { price: 149.99, compareAtPrice: 1249.95 },
      "3-1": { price: 39.99, compareAtPrice: 249.99 },
      "3-3": { price: 99.99, compareAtPrice: 749.97 },
      "3-5": { price: 149.99, compareAtPrice: 1249.95 },
    }),
  },
  {
    slug: "office-2021-home-business",
    name: "Office 2021 Home & Business",
    categorySlug: "microsoft-office",
    subcategorySlug: "office-2021",
    brand: "Microsoft",
    price: 34.99,
    compareAtPrice: 249.99,
    shortDescription:
      "Office suite for home and business with Word, Excel, PowerPoint, Outlook.",
    imageUrl:
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=900&q=80",
    specs: ["One-time purchase", "Mac and Windows", "1 PC or Mac"],
    stockStatus: "In stock",
    variants: durationDeviceVariants("office-2021-home-business", "OFF21HB", {
      "1-1": { price: 34.99, compareAtPrice: 249.99 },
      "1-3": { price: 89.99, compareAtPrice: 749.97 },
      "1-5": { price: 134.99, compareAtPrice: 1249.95 },
      "2-1": { price: 34.99, compareAtPrice: 249.99 },
      "2-3": { price: 89.99, compareAtPrice: 749.97 },
      "2-5": { price: 134.99, compareAtPrice: 1249.95 },
      "3-1": { price: 34.99, compareAtPrice: 249.99 },
      "3-3": { price: 89.99, compareAtPrice: 749.97 },
      "3-5": { price: 134.99, compareAtPrice: 1249.95 },
    }),
  },
  {
    slug: "office-365-business-premium",
    name: "Microsoft 365 Business Premium",
    categorySlug: "microsoft-office",
    subcategorySlug: "office-365",
    brand: "Microsoft",
    price: 22.99,
    compareAtPrice: 22.99,
    shortDescription:
      "Complete business solution with Office apps, security, and device management.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    specs: ["Monthly subscription", "Up to 300 users", "Enterprise-grade security"],
    stockStatus: "In stock",
    variants: durationDeviceVariants("office-365-business-premium", "M365BP", {
      "1-1": { price: 22.99, compareAtPrice: 22.99 },
      "1-3": { price: 22.99, compareAtPrice: 22.99 },
      "1-5": { price: 22.99, compareAtPrice: 22.99 },
      "2-1": { price: 22.99, compareAtPrice: 22.99 },
      "2-3": { price: 22.99, compareAtPrice: 22.99 },
      "2-5": { price: 22.99, compareAtPrice: 22.99 },
      "3-1": { price: 22.99, compareAtPrice: 22.99 },
      "3-3": { price: 22.99, compareAtPrice: 22.99 },
      "3-5": { price: 22.99, compareAtPrice: 22.99 },
    }),
  },
  {
    slug: "adobe-acrobat-pro",
    name: "Adobe Acrobat Pro DC",
    categorySlug: "productivity",
    subcategorySlug: "adobe",
    brand: "Adobe",
    price: 14.99,
    compareAtPrice: 14.99,
    shortDescription:
      "Create, edit, and sign PDF documents with industry-leading tools.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&w=900&q=80",
    specs: ["PDF editing", "E-signatures", "Cloud storage"],
    stockStatus: "In stock",
    variants: durationDeviceVariants("adobe-acrobat-pro", "ADOBEAP", {
      "1-1": { price: 14.99, compareAtPrice: 14.99 },
      "1-3": { price: 14.99, compareAtPrice: 14.99 },
      "1-5": { price: 14.99, compareAtPrice: 14.99 },
      "2-1": { price: 14.99, compareAtPrice: 14.99 },
      "2-3": { price: 14.99, compareAtPrice: 14.99 },
      "2-5": { price: 14.99, compareAtPrice: 14.99 },
      "3-1": { price: 14.99, compareAtPrice: 14.99 },
      "3-3": { price: 14.99, compareAtPrice: 14.99 },
      "3-5": { price: 14.99, compareAtPrice: 14.99 },
    }),
  },
  {
    slug: "nitro-pdf-pro",
    name: "Nitro PDF Pro",
    categorySlug: "productivity",
    subcategorySlug: "pdf-tools",
    brand: "Nitro",
    price: 49.99,
    compareAtPrice: 159.99,
    shortDescription:
      "Powerful PDF solution for creating, editing, and converting documents.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    specs: ["One-time license", "Batch processing", "OCR technology"],
    stockStatus: "In stock",
    variants: durationDeviceVariants("nitro-pdf-pro", "NITROPDF", {
      "1-1": { price: 49.99, compareAtPrice: 159.99 },
      "1-3": { price: 129.99, compareAtPrice: 479.97 },
      "1-5": { price: 199.99, compareAtPrice: 799.95 },
      "2-1": { price: 49.99, compareAtPrice: 159.99 },
      "2-3": { price: 129.99, compareAtPrice: 479.97 },
      "2-5": { price: 199.99, compareAtPrice: 799.95 },
      "3-1": { price: 49.99, compareAtPrice: 159.99 },
      "3-3": { price: 129.99, compareAtPrice: 479.97 },
      "3-5": { price: 199.99, compareAtPrice: 799.95 },
    }),
  },
  {
    slug: "vmware-workstation-pro",
    name: "VMware Workstation Pro",
    categorySlug: "productivity",
    subcategorySlug: "virtualization",
    brand: "VMware",
    price: 99.99,
    compareAtPrice: 199.99,
    shortDescription:
      "Run multiple operating systems as virtual machines on a single PC.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&w=900&q=80",
    specs: ["Multiple VMs", "Snapshots", "Clones"],
    stockStatus: "In stock",
    variants: durationDeviceVariants("vmware-workstation-pro", "VMWPRO", {
      "1-1": { price: 99.99, compareAtPrice: 199.99 },
      "1-3": { price: 249.99, compareAtPrice: 599.97 },
      "1-5": { price: 399.99, compareAtPrice: 999.95 },
      "2-1": { price: 99.99, compareAtPrice: 199.99 },
      "2-3": { price: 249.99, compareAtPrice: 599.97 },
      "2-5": { price: 399.99, compareAtPrice: 999.95 },
      "3-1": { price: 99.99, compareAtPrice: 199.99 },
      "3-3": { price: 249.99, compareAtPrice: 599.97 },
      "3-5": { price: 399.99, compareAtPrice: 999.95 },
    }),
  },
];

export const featuredProducts = products.slice(0, 4);

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getSubcategory(categorySlug: string, subcategorySlug: string) {
  const category = getCategory(categorySlug);
  return category?.subcategories?.find((sub) => sub.slug === subcategorySlug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.categorySlug === slug);
}

export function getProductsBySubcategory(categorySlug: string, subcategorySlug: string) {
  return products.filter(
    (product) => product.categorySlug === categorySlug && product.subcategorySlug === subcategorySlug
  );
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
