'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useCart } from '@/context/CartContext';
import type { Product } from '@prisma/client';

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  const t = useTranslations('shop');
  const locale = useLocale();
  const { dispatch } = useCart();

  const name =
    locale === 'ar' ? product.nameAr :
    locale === 'fr' ? product.nameFr :
    product.nameEn;

  function addToCart() {
    dispatch({
      type: 'ADD',
      item: {
        id: product.id,
        slug: product.slug,
        nameEn: product.nameEn,
        nameFr: product.nameFr,
        nameAr: product.nameAr,
        price: product.price,
        image: product.images[0] ?? '',
        quantity: 1,
      },
    });
    dispatch({ type: 'OPEN' });
  }

  return (
    <article className="luxury-card group overflow-hidden">
      {/* Image */}
      <Link href={`/${locale}/shop/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-black-700">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-5xl text-brass/20">A</span>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black-900/0 group-hover:bg-black-900/30 transition-colors duration-300" />
      </Link>

      {/* Info */}
      <div className="p-6 space-y-3">
        <div className="brass-divider w-8" />
        <Link href={`/${locale}/shop/${product.slug}`}>
          <h3 className="font-display text-lg leading-tight hover:text-brass transition-colors">{name}</h3>
        </Link>
        <p className="text-brass font-display text-xl">{product.price.toLocaleString()} MAD</p>
        <button
          onClick={addToCart}
          disabled={product.stock === 0}
          className={`w-full py-3 text-xs tracking-widest uppercase ${
            product.stock === 0 ? 'opacity-30 cursor-not-allowed bg-black-600 text-cream' : 'btn-brass'
          }`}
        >
          {product.stock === 0 ? t('outOfStock') : t('addToCart')}
        </button>
      </div>
    </article>
  );
}
