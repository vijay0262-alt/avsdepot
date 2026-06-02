import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "AVS Depot";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Industrial AV, Security and Network Supplies`,
    template: `%s | ${siteName}`,
  },
  description:
    "Shop curated audiovisual, security, networking and installation supplies for professional projects.",
  openGraph: {
    title: siteName,
    description:
      "Professional AV, security and network supplies for installers, integrators and businesses.",
    url: siteUrl,
    siteName,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
