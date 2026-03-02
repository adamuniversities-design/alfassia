import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ProductCard';
import { ShopFilters } from '@/components/ShopFilters';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === 'ar' ? 'المتجر' : locale === 'fr' ? 'La Boutique' : 'Shop',
    description: locale === 'ar'
      ? 'استكشف مجموعتنا الكاملة من المنتجات المغربية الفاخرة'
      : locale === 'fr'
      ? 'Explorez notre collection complète de produits marocains de luxe'
      : 'Explore our complete collection of luxury Moroccan products',
  };
}

export default async function ShopPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { category?: string };
}) {
  const t = await getTranslations('shop');
  const category = searchParams.category;

  const products = await prisma.product.findMany({
    where: {
      active: true,
      ...(category && category !== 'all' ? { category } : {}),
    },
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  });

  const categories = await prisma.product.groupBy({
    by: ['category'],
    where: { active: true },
  });

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-brass/40" />
            <h1 className="font-display text-4xl md:text-6xl">{t('title')}</h1>
            <div className="w-16 h-px bg-brass/40" />
          </div>
          <p className="text-cream/50">{t('subtitle')}</p>
        </div>

        {/* Filters */}
        <ShopFilters
          categories={categories.map((c) => c.category)}
          activeCategory={category ?? 'all'}
          locale={locale}
        />

        {/* Products grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-cream/30">
            <p className="font-display text-2xl">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
