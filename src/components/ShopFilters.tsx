'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

type Props = {
  categories: string[];
  activeCategory: string;
  locale: string;
};

export function ShopFilters({ categories, activeCategory, locale }: Props) {
  const t = useTranslations('shop.filters');
  const router = useRouter();
  const pathname = usePathname();

  const all = ['all', ...categories];

  function setFilter(cat: string) {
    const params = cat === 'all' ? '' : `?category=${cat}`;
    router.push(`${pathname}${params}`);
  }

  return (
    <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by category">
      {all.map((cat) => (
        <button
          key={cat}
          onClick={() => setFilter(cat)}
          aria-pressed={cat === activeCategory}
          className={`px-6 py-2 text-xs tracking-widest uppercase border transition-all duration-200 ${
            cat === activeCategory
              ? 'bg-brass text-black-900 border-brass'
              : 'bg-transparent text-cream/50 border-black-500 hover:border-brass hover:text-brass'
          }`}
        >
          {t(cat as any) ?? cat}
        </button>
      ))}
    </div>
  );
}
