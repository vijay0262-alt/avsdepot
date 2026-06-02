# Ecommerce Database Schema

This schema is PostgreSQL/Supabase-ready and designed for a digital software
license store selling antivirus keys, productivity software, Windows licenses,
Office licenses and other activation keys.

## Variant Model

Products hold shared information like name, brand, category, image and
description. `product_variants` handles purchasable options:

- `duration_months`: 1 month, 12 months, 36 months, etc.
- `device_count`: 1 device, 3 devices, 5 devices, etc.
- `price`: variant-specific price
- `compare_at_price`: optional strike-through price
- `license_region`: global, US, EU, India, etc.
- `stock_quantity`: nullable for unlimited digital inventory

Example:

```text
Product: Norton 360 Deluxe
Variant A: 12 months, 1 device, $19.99
Variant B: 12 months, 3 devices, $29.99
Variant C: 24 months, 5 devices, $49.99
```

## Order Snapshotting

`order_items` stores product and variant names, SKU, duration, device count and
price at purchase time. This protects order history if products or prices change
later.
