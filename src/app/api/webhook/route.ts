import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import type Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const items: { id: string; qty: number; price: number }[] = JSON.parse(
      session.metadata?.items ?? '[]'
    );

    try {
      await prisma.order.create({
        data: {
          stripeSessionId: session.id,
          status: 'PAID',
          total: (session.amount_total ?? 0) / 100,
          currency: session.currency?.toUpperCase() ?? 'MAD',
          customerEmail: session.customer_details?.email ?? '',
          customerName: session.customer_details?.name ?? '',
         shippingAddress: (session.shipping_details?.address as any) ?? {},
          items: {
            create: items.map((item) => ({
              productId: item.id,
              quantity: item.qty,
              price: item.price,
            })),
          },
        },
      });
    } catch (err) {
      console.error('Order creation error:', err);
    }
  }

  return NextResponse.json({ received: true });
}
