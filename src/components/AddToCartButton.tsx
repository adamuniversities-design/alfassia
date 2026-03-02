'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useTranslations } from 'next-intl';
import type { Product } from '@prisma/client';

export function AddToCartButton({ product }: { product: Product }) {
  const t = useTranslations('product');
  const { dispatch } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

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
        quantity: qty,
      },
    });
    setAdded(true);
    dispatch({ type: 'OPEN' });
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-4">
      {/* Quantity selector */}
      <div className="flex items-center gap-4">
        <span className="text-xs tracking-widest uppercase text-cream/40">{t('quantity')}</span>
        <div className="flex items-center border border-black-500">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-10 h-10 flex items-center justify-center text-cream/60 hover:text-brass transition-colors"
            aria-label="Decrease quantity"
          >−</button>
          <span className="w-10 text-center text-sm">{qty}</span>
          <button
            onClick={() => setQty(Math.min(product.stock, qty + 1))}
            className="w-10 h-10 flex items-center justify-center text-cream/60 hover:text-brass transition-colors"
            aria-label="Increase quantity"
          >+</button>
        </div>
      </div>

      <button
        onClick={addToCart}
        disabled={product.stock === 0}
        className={`w-full py-5 text-xs tracking-[0.25em] uppercase transition-all ${
          product.stock === 0
            ? 'bg-black-600 text-cream/30 cursor-not-allowed'
            : added
            ? 'bg-green-800/80 text-cream border border-green-600'
            : 'btn-brass'
        }`}
        aria-label={product.stock === 0 ? 'Out of stock' : t('addToCart')}
      >
        {product.stock === 0 ? 'Out of Stock' : added ? '✓ Added to Cart' : t('addToCart')}
      </button>
    </div>
  );
}
