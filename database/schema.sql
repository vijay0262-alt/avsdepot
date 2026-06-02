-- AVS Depot ecommerce database schema
-- PostgreSQL/Supabase-ready design for digital software license products.

create extension if not exists "pgcrypto";

create table categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete restrict,
  name text not null,
  slug text not null unique,
  brand text not null,
  short_description text not null,
  description text,
  image_url text,
  product_type text not null default 'digital_license'
    check (product_type in ('digital_license', 'subscription', 'download')),
  platform text,
  license_delivery text not null default 'email'
    check (license_delivery in ('email', 'account', 'manual')),
  is_featured boolean not null default false,
  is_best_seller boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  sku text not null unique,
  name text not null,
  duration_months integer not null check (duration_months > 0),
  device_count integer not null check (device_count > 0),
  price numeric(10, 2) not null check (price >= 0),
  compare_at_price numeric(10, 2) check (
    compare_at_price is null or compare_at_price >= price
  ),
  currency char(3) not null default 'USD',
  license_region text not null default 'global',
  stock_quantity integer,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, duration_months, device_count, license_region)
);

create table customers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  last_name text,
  phone text,
  company_name text,
  billing_address jsonb,
  marketing_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid references customers(id) on delete set null,
  customer_email text not null,
  status text not null default 'pending'
    check (
      status in (
        'pending',
        'paid',
        'processing',
        'fulfilled',
        'cancelled',
        'refunded'
      )
    ),
  payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid', 'paid', 'failed', 'refunded')),
  subtotal numeric(10, 2) not null check (subtotal >= 0),
  discount_total numeric(10, 2) not null default 0 check (discount_total >= 0),
  tax_total numeric(10, 2) not null default 0 check (tax_total >= 0),
  total numeric(10, 2) not null check (total >= 0),
  currency char(3) not null default 'USD',
  billing_address jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_variant_id uuid references product_variants(id) on delete set null,
  product_name text not null,
  variant_name text not null,
  sku text not null,
  duration_months integer not null check (duration_months > 0),
  device_count integer not null check (device_count > 0),
  quantity integer not null check (quantity > 0),
  unit_price numeric(10, 2) not null check (unit_price >= 0),
  line_total numeric(10, 2) not null check (line_total >= 0),
  license_key text,
  fulfillment_status text not null default 'pending'
    check (fulfillment_status in ('pending', 'sent', 'failed', 'refunded')),
  created_at timestamptz not null default now()
);

create index categories_parent_id_idx on categories(parent_id);
create index products_category_id_idx on products(category_id);
create index products_featured_idx on products(is_featured) where is_featured = true;
create index products_best_seller_idx on products(is_best_seller) where is_best_seller = true;
create index product_variants_product_id_idx on product_variants(product_id);
create index customers_email_idx on customers(email);
create index orders_customer_id_idx on orders(customer_id);
create index orders_status_idx on orders(status);
create index order_items_order_id_idx on order_items(order_id);
