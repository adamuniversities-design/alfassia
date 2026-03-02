'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, type Locale } from '@/i18n';

const labels: Record<Locale, string> = { en: 'EN', fr: 'FR', ar: 'ع' };

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(locale: Locale) {
    // Replace the first segment (locale) in the path
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  }

  return (
    <div className="flex items-center gap-1" role="navigation" aria-label="Language">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`text-[11px] tracking-widest px-2 py-1 transition-colors ${
            locale === currentLocale
              ? 'text-brass border-b border-brass'
              : 'text-cream/40 hover:text-cream/70'
          }`}
          aria-current={locale === currentLocale ? 'true' : undefined}
        >
          {labels[locale]}
        </button>
      ))}
    </div>
  );
}
