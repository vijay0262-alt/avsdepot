# AVS Depot

Frontend foundation for a production-ready ecommerce application.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Shadcn UI-compatible component structure
- PostgreSQL/Supabase-ready frontend boundaries
- SEO-friendly metadata, robots and sitemap routes

## Project Structure

```text
src/
  app/
    (store)/                 Storefront route group and shared layout
      category/[slug]/       Category listing pages
      product/[slug]/        Product detail pages
      cart/                  Cart page shell
      checkout/              Checkout page shell
      login/                 Login page shell
      register/              Register page shell
      account/               Account dashboard shell
    globals.css              Tailwind and design tokens
    layout.tsx               Root metadata and font setup
    robots.ts                SEO robots route
    sitemap.ts               SEO sitemap route
  components/
    catalog/                 Ecommerce display components
    forms/                   Form composition
    layout/                  Site layout primitives
    ui/                      Shadcn-style reusable UI primitives
  lib/
    catalog-data.ts          Temporary typed frontend data
    utils.ts                 Shared utilities
  types/
    catalog.ts               Product and category contracts
```

## Environment

Copy `.env.example` to `.env.local` when local environment values are needed.
Backend and Supabase variables are intentionally deferred until data integration begins.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```
