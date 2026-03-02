'use client';

import { useCart } from '@/context/CartContext';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';

export function CartDrawer() {
  const t = useTranslations('cart');
  const { state, dispatch, total, count } = useCart();

  async function handleCheckout() {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: state.items }),
      });
      const { sessionId } = await res.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      await stripe?.redirectToCheckout({ sessionId });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      {/* Backdrop */}
      {state.open && (
        <div
          className="fixed inset-0 bg-black-900/70 z-40 backdrop-blur-sm"
          onClick={() => dispatch({ type: 'CLOSE' })}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 end-0 h-full w-full max-w-md bg-black-800 border-s border-black-600 z-50 flex flex-col transition-transform duration-500 ${
          state.open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label={t('title')}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-black-600">
          <h2 className="font-display text-xl tracking-widest">{t('title')}</h2>
          <button
            onClick={() => dispatch({ type: 'CLOSE' })}
            className="text-cream/50 hover:text-brass transition-colors"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-cream/40">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p className="text-sm tracking-wider">{t('empty')}</p>
            </div>
          ) : (
            state.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0 bg-black-700 overflow-hidden">
                  {item.image ? (
                    <Image src={item.image} alt={item.nameEn} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-brass/30 text-2xl font-display">A</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.nameFr || item.nameEn}</p>
                  <p className="text-brass text-sm mt-1">{item.price.toLocaleString()} MAD</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.quantity - 1 })}
                      className="w-6 h-6 border border-black-500 flex items-center justify-center text-cream/60 hover:border-brass hover:text-brass transition-colors"
                    >−</button>
                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.quantity + 1 })}
                      className="w-6 h-6 border border-black-500 flex items-center justify-center text-cream/60 hover:border-brass hover:text-brass transition-colors"
                    >+</button>
                    <button
                      onClick={() => dispatch({ type: 'REMOVE', id: item.id })}
                      className="ms-auto text-cream/30 hover:text-red-400 transition-colors text-xs tracking-widest uppercase"
                    >
                      {t('remove')}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="px-8 py-6 border-t border-black-600 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-cream/60 tracking-wider uppercase text-xs">{t('subtotal')}</span>
              <span className="font-display text-lg text-brass">{total.toLocaleString()} MAD</span>
            </div>
            <button
              onClick={handleCheckout}
              className="btn-brass w-full py-4 text-xs tracking-widest uppercase font-medium"
            >
              {t('checkout')}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
