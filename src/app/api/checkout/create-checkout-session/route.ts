import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe/client';
import { getCartItems } from '@/lib/cart-storage';
import { products } from '@/lib/catalog-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartItems } = body;

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Create line items for Stripe checkout
    const lineItems = cartItems.map((item: any) => {
      const product = products.find(p => p.slug === item.productSlug);
      if (!product) {
        throw new Error(`Product not found: ${item.productSlug}`);
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.productName,
            description: `${item.durationYears} year - ${item.deviceCount} device(s)`,
            images: [item.imageUrl],
            metadata: {
              productSlug: item.productSlug,
              variantId: item.variantId,
              sku: item.sku,
              durationYears: item.durationYears.toString(),
              deviceCount: item.deviceCount.toString(),
            },
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe checkout session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      customer_email: body.customerEmail,
      metadata: {
        customerName: body.customerName || '',
        cartItems: JSON.stringify(cartItems),
      },
      allow_promotion_codes: false,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout session creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
