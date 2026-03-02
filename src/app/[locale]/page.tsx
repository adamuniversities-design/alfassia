import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ProductCard';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('homeTitle'),
    description: t('homeDesc'),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_APP_URL}/en`,
        fr: `${process.env.NEXT_PUBLIC_APP_URL}/fr`,
        ar: `${process.env.NEXT_PUBLIC_APP_URL}/ar`,
      },
    },
  };
}

async function getFeaturedProducts() {
  return prisma.product.findMany({ where: { featured: true, active: true }, take: 3 });
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('hero');
  const ts = await getTranslations('shop');
  const featured = await getFeaturedProducts();

  const staticProducts = [
    { img: '/images/products/huile-cheveux-4.jpg', name: 'Huile Capillaire Premium', nameAr: 'زيت الشعر الفاخر', price: '280 MAD', slug: 'huile-cheveux-premium' },
    { img: '/images/products/huile-cheveux-2.jpg', name: 'Huile Capillaire — Duo', nameAr: 'زيت الشعر — ثنائي', price: '480 MAD', slug: 'huile-cheveux-premium' },
    { img: '/images/products/huile-cheveux-3.jpg', name: 'Coffret Luxe', nameAr: 'طقم الفخامة', price: '650 MAD', slug: 'huile-cheveux-premium' },
  ];

  return (
    <div>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/products/huile-cheveux-4.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-25 scale-105"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black-900 via-black-900/88 to-black-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black-900/80 via-transparent to-transparent" />
        </div>

        {/* Geometric lines */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 start-[15%] w-px h-full bg-brass opacity-[0.07]" />
          <div className="absolute top-0 end-[15%] w-px h-full bg-brass opacity-[0.07]" />
          <div className="absolute top-2/3 start-0 w-full h-px bg-brass opacity-[0.04]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-32">
          {/* Text */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 opacity-0 animate-fade-in stagger-1">
              <div className="w-10 h-px bg-brass" />
              <span className="text-brass text-xs tracking-[0.4em] uppercase">Made in Fes, Morocco</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.05] opacity-0 animate-fade-up stagger-2">
              {t('tagline')}
            </h1>

            <p className="text-cream/60 text-lg leading-relaxed max-w-lg opacity-0 animate-fade-up stagger-3">
              {t('subtitle')}
            </p>

            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up stagger-4">
              <Link href={`/${locale}/shop`} className="btn-brass inline-block px-10 py-4 text-xs tracking-[0.25em] uppercase">
                {t('cta')}
              </Link>
              <Link href={`/${locale}/about`} className="btn-outline-brass inline-block px-10 py-4 text-xs tracking-[0.25em] uppercase">
                Notre Histoire
              </Link>
            </div>

            <div className="flex gap-10 pt-4 opacity-0 animate-fade-up stagger-5 border-t border-black-600">
              {[
                { num: '100%', label: 'Naturel' },
                { num: 'Fès', label: 'Origine Maroc' },
                { num: '5★', label: 'Premium' },
              ].map((s) => (
                <div key={s.label} className="pt-6">
                  <p className="font-display text-xl text-brass">{s.num}</p>
                  <p className="text-[10px] text-cream/40 tracking-[0.2em] uppercase mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero product image */}
          <div className="hidden lg:flex justify-end items-center opacity-0 animate-fade-in stagger-3">
            <div className="relative">
              <div className="absolute -inset-4 border border-brass/8 rounded-full" />
              <div className="w-[400px] h-[520px] relative overflow-hidden shadow-2xl">
                <Image
                  src="/images/products/huile-cheveux-4.jpg"
                  alt="Alfassia Allhurra — Huile capillaire premium"
                  fill
                  priority
                  className="object-cover"
                  sizes="400px"
                />
              </div>
              <div className="absolute -bottom-4 -start-8 bg-black-800 border border-brass/20 px-5 py-3 shadow-xl">
                <p className="text-brass font-display text-sm">Handcrafted in Fès</p>
                <p className="text-cream/40 text-xs tracking-widest">Al Fassia Al Hurra</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40" aria-hidden="true">
          <div className="w-px h-12 bg-gradient-to-b from-brass to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── BRAND STRIP ───────────────────────────────────────── */}
      <section className="border-y border-black-600 bg-black-800 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-black-600 text-center">
            {[
              { label: 'Ingrédients 100% Naturels', sub: 'Zéro additif, zéro compromis' },
              { label: 'Artisanat de Fès', sub: 'Fabriqué à la main au Maroc' },
              { label: 'Livraison Mondiale', sub: 'Expédition rapide & sécurisée' },
            ].map((v) => (
              <div key={v.label} className="py-8 px-6 space-y-1">
                <p className="font-display text-base text-cream">{v.label}</p>
                <p className="text-cream/40 text-xs tracking-wide">{v.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-brass" />
              <span className="text-brass text-xs tracking-[0.4em] uppercase">Collection</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl">{ts('title')}</h2>
          </div>
          <Link href={`/${locale}/shop`} className="btn-outline-brass self-start px-8 py-3 text-xs tracking-[0.2em] uppercase">
            Voir tout
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.length > 0
            ? featured.map((product, i) => (
                <div key={product.id} className={`opacity-0 animate-fade-up stagger-${i + 1}`}>
                  <ProductCard product={product} />
                </div>
              ))
            : staticProducts.map((p, i) => (
                <Link key={i} href={`/${locale}/shop/${p.slug}`} className="luxury-card group overflow-hidden block opacity-0 animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-black-700">
                    <Image src={p.img} alt={locale === 'ar' ? p.nameAr : p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:640px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-black-900/0 group-hover:bg-black-900/20 transition-colors duration-300" />
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="w-8 h-px bg-brass" />
                    <h3 className="font-display text-lg group-hover:text-brass transition-colors">{locale === 'ar' ? p.nameAr : p.name}</h3>
                    <p className="text-brass font-display text-xl">{p.price}</p>
                  </div>
                </Link>
              ))}
        </div>
      </section>

      {/* ── BRAND STORY ───────────────────────────────────────── */}
      <section className="bg-black-800 border-y border-black-600">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="relative aspect-square lg:aspect-auto lg:min-h-[500px] overflow-hidden order-2 lg:order-1">
            <Image
              src="/images/products/huile-cheveux-3.jpg"
              alt="Alfassia Allhurra — Coffret luxe artisanal"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black-800/40" />
          </div>
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-brass" />
              <span className="text-brass text-xs tracking-[0.4em] uppercase">Notre Histoire</span>
            </div>
            <h2 className="font-display text-4xl leading-tight">L'Art du Soin<br />Né à Fès</h2>
            <div className="brass-divider w-16" />
            <p className="text-cream/60 leading-relaxed text-sm">
              Alfassia Allhurra est née d'une passion profonde pour les trésors naturels du Maroc.
              Chaque formule est élaborée à la main dans notre atelier de Fès, en utilisant des
              ingrédients sélectionnés avec soin — huile d'argan pure, plantes médicinales,
              essences florales précieuses.
            </p>
            <p className="text-cream/60 leading-relaxed text-sm">
              Notre philosophie : allier la sagesse des traditions ancestrales à l'exigence du
              luxe contemporain. Chaque flacon est une promesse de qualité, un hommage à
              la femme libre et souveraine.
            </p>
            <Link href={`/${locale}/about`} className="btn-outline-brass self-start px-8 py-3 text-xs tracking-[0.2em] uppercase mt-2">
              Découvrir notre histoire
            </Link>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM GALLERY ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-brass/40" />
            <a
              href="https://www.instagram.com/allfassia_allhurra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brass text-xs tracking-[0.4em] uppercase hover:text-brass-light transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              Instagram
            </a>
            <div className="w-12 h-px bg-brass/40" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl">@allfassia_allhurra</h2>
          <p className="text-cream/40 text-xs tracking-widest uppercase">Suivez-nous pour les dernières actualités</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {/* Large featured cell (spans 2×2) */}
          <div className="col-span-2 row-span-2 relative overflow-hidden group" style={{ aspectRatio: '1' }}>
            <Image
              src="/images/products/huile-cheveux-2.jpg"
              alt="Alfassia Allhurra — Collection botaniques"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <a
              href="https://www.instagram.com/allfassia_allhurra"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-black-900/0 group-hover:bg-black-900/50 transition-all duration-300 flex items-center justify-center"
              aria-label="Voir sur Instagram"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-brass text-brass text-xs tracking-widest uppercase px-6 py-3">
                Voir sur Instagram
              </span>
            </a>
          </div>

          {/* 4 small cells */}
          {[
            '/images/products/huile-cheveux-4.jpg',
            '/images/products/huile-cheveux-1.jpg',
            '/images/products/huile-cheveux-3.jpg',
            '/images/products/huile-cheveux-2.jpg',
          ].map((src, i) => (
            <a
              key={i}
              href="https://www.instagram.com/allfassia_allhurra"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden group block"
              style={{ aspectRatio: '1' }}
              aria-label={`Photo Instagram ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Alfassia Allhurra — Instagram ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width:768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black-900/0 group-hover:bg-black-900/50 transition-all duration-300 flex items-center justify-center">
                <svg
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-brass"
                  width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/allfassia_allhurra"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-brass inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            Suivre @allfassia_allhurra
          </a>
        </div>
      </section>
    </div>
  );
}
