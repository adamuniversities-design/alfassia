import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function CheckoutCancelPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('checkout.cancel');

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="text-center space-y-8 max-w-md">
        <div className="w-20 h-20 border border-brass/20 rounded-full flex items-center justify-center mx-auto">
          <span className="text-cream/30 text-3xl">✕</span>
        </div>
        <div className="space-y-3">
          <h1 className="font-display text-3xl">{t('title')}</h1>
          <p className="text-cream/60 leading-relaxed">{t('message')}</p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link href={`/${locale}/shop`} className="btn-outline-brass inline-block px-8 py-4 text-xs tracking-widest uppercase">
            {t('../success.backToShop' as any)}
          </Link>
          <Link href={`/${locale}/shop`} className="btn-brass inline-block px-8 py-4 text-xs tracking-widest uppercase">
            {t('retry')}
          </Link>
        </div>
      </div>
    </div>
  );
}
