import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import type { CartItem } from '@/context/CartContext';

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    // Detect locale from referer or default to 'fr'
    const referer = req.headers.get('referer') ?? '';
    const localeMatch = referer.match(/\/(en|fr|ar)\//);
    const locale = localeMatch?.[1] ?? 'fr';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${appUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/${locale}/checkout/cancel`,
      locale: locale === 'ar' ? 'auto' : (locale as 'fr' | 'en'),
      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: 'mad',
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: item.nameFr || item.nameEn,
            images: item.image ? [item.image] : [],
          },
        },
      })),
      shipping_address_collection: {
        allowed_countries: ['MA', 'FR', 'BE', 'CH', 'DE', 'GB', 'US', 'CA', 'AE', 'SA'],
      },
      metadata: {
        items: JSON.stringify(items.map((i) => ({ id: i.id, qty: i.quantity, price: i.price }))),
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
