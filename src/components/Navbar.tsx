'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const { dispatch, count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black-900/95 backdrop-blur-sm border-b border-black-600' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Alfassia Allhurra"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-display text-lg text-cream tracking-[0.2em] uppercase group-hover:text-brass transition-colors hidden sm:block">
            Alfassia Allhurra
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href={`/${locale}/shop`}
            className="text-xs tracking-widest uppercase text-cream/70 hover:text-brass transition-colors"
          >
            {t('shop')}
          </Link>
          <Link
            href={`/${locale}/about`}
            className="text-xs tracking-widest uppercase text-cream/70 hover:text-brass transition-colors"
          >
            {t('about')}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="text-xs tracking-widest uppercase text-cream/70 hover:text-brass transition-colors"
          >
            {t('contact')}
          </Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-6">
          <LanguageSwitcher currentLocale={locale} />

          {/* Cart button */}
          <button
            onClick={() => dispatch({ type: 'OPEN' })}
            className="relative text-cream/70 hover:text-brass transition-colors p-1"
            aria-label={`${t('cart')} ${count > 0 ? `(${count})` : ''}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brass text-black-900 text-[10px] flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-cream/70 hover:text-brass transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12"/>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black-800 border-t border-black-600 px-6 py-6 flex flex-col gap-5">
          {(['shop', 'about', 'contact'] as const).map((key) => (
            <Link
              key={key}
              href={`/${locale}/${key}`}
              className="text-sm tracking-widest uppercase text-cream/70 hover:text-brass transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t(key)}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
