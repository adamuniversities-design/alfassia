import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';
import { ProductCard } from '@/components/ProductCard';
import { AddToCartButton } from '@/components/AddToCartButton';
import type { Metadata } from 'next';

type Props = { params: { locale: string; slug: string } };

export async function generateStaticParams() {
  return [];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) return {};

  const name =
    params.locale === 'ar' ? product.nameAr :
    params.locale === 'fr' ? product.nameFr :
    product.nameEn;

  const desc =
    params.locale === 'ar' ? product.descAr :
    params.locale === 'fr' ? product.descFr :
    product.descEn;

  return {
    title: name,
    description: desc.slice(0, 160),
    openGraph: {
      title: name,
      description: desc.slice(0, 160),
      images: product.images[0] ? [{ url: product.images[0], width: 800, height: 1000, alt: name }] : [],
      type: 'website',
    },
    other: {
      'product:price:amount': String(product.price),
      'product:price:currency': product.currency,
    },
  };
}

export default async function ProductPage({ params: { locale, slug } }: Props) {
  const product = await prisma.product.findUnique({ where: { slug, active: true } });
  if (!product) notFound();

  const t = await getTranslations('product');

  const name =
    locale === 'ar' ? product.nameAr :
    locale === 'fr' ? product.nameFr :
    product.nameEn;

  const desc =
    locale === 'ar' ? product.descAr :
    locale === 'fr' ? product.descFr :
    product.descEn;

  const related = await prisma.product.findMany({
    where: { category: product.category, active: true, id: { not: product.id } },
    take: 3,
  });

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: desc,
    image: product.images,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    brand: { '@type': 'Brand', name: 'Alfassia Allhurra' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Product */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-10">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-black-700 overflow-hidden">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-8xl text-brass/10">A</span>
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(1).map((img, i) => (
                    <div key={i} className="relative aspect-square bg-black-700 overflow-hidden border border-black-600 hover:border-brass transition-colors cursor-pointer">
                      <Image src={img} alt={`${name} ${i + 2}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="lg:sticky lg:top-24 space-y-8 self-start">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-brass" />
                  <span className="text-brass/70 text-xs tracking-widest uppercase">{product.category}</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl leading-tight">{name}</h1>
                <p className="font-display text-3xl text-brass">{product.price.toLocaleString()} {product.currency}</p>
              </div>

              <div className="brass-divider" />

              <div>
                <h2 className="text-xs tracking-widest uppercase text-cream/40 mb-3">{t('description')}</h2>
                <p className="text-cream/70 leading-relaxed">{desc}</p>
              </div>

              <div className="brass-divider" />

              <AddToCartButton product={product} />

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                {[
                  { icon: '◈', text: '100% Authentic' },
                  { icon: '✦', text: 'Free Shipping +1000 MAD' },
                  { icon: '◇', text: 'Secure Checkout' },
                  { icon: '◉', text: '30-Day Returns' },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2 text-cream/40 text-xs">
                    <span className="text-brass">{b.icon}</span>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <section className="mt-24" aria-label="Related products">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-px bg-brass" />
                <h2 className="font-display text-2xl">{t('relatedProducts')}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
