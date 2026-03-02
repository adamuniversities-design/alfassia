'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useParams } from 'next/navigation';

export default function CheckoutSuccessPage() {
  const t = useTranslations('checkout.success');
  const { dispatch } = useCart();
  const { locale } = useParams();

  useEffect(() => {
    dispatch({ type: 'CLEAR' });
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="text-center space-y-8 max-w-md">
        <div className="w-20 h-20 border border-brass/40 rounded-full flex items-center justify-center mx-auto">
          <span className="text-brass text-3xl">✓</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-brass" />
            <h1 className="font-display text-3xl">{t('title')}</h1>
            <div className="w-8 h-px bg-brass" />
          </div>
          <p className="text-cream/60 leading-relaxed">{t('message')}</p>
        </div>
        <Link href={`/${locale}/shop`} className="btn-brass inline-block px-10 py-4 text-xs tracking-widest uppercase">
          {t('backToShop')}
        </Link>
      </div>
    </div>
  );
}
