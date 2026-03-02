import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-black-800 border-t border-black-600">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div className="md:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image src="/images/logo.png" alt="Alfassia Allhurra" fill className="object-contain" />
              </div>
              <span className="font-display text-lg text-cream tracking-widest">ALFASSIA</span>
            </div>
            <div className="brass-divider w-12" />
            <p className="text-cream/40 text-sm leading-relaxed">
              Soins de luxe artisanaux,<br />nés à Fès, Maroc.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.instagram.com/allfassia_allhurra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-black-500 hover:border-brass flex items-center justify-center text-cream/40 hover:text-brass transition-all"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href="https://wa.me/212602912822"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 border border-black-500 hover:border-brass flex items-center justify-center text-cream/40 hover:text-brass transition-all"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                </svg>
              </a>
              <a
                href="tel:+212602912822"
                aria-label="Téléphone"
                className="w-9 h-9 border border-black-500 hover:border-brass flex items-center justify-center text-cream/40 hover:text-brass transition-all"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5 19.79 19.79 0 01.22 4a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.16 6.16l1.27-.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <h3 className="text-xs tracking-[0.3em] uppercase text-cream/40">Boutique</h3>
            <nav className="space-y-3" aria-label="Footer shop navigation">
              {[
                { label: 'Tous les produits', href: '/fr/shop' },
                { label: 'Soins Capillaires', href: '/fr/shop?category=hair' },
                { label: 'Nouveautés', href: '/fr/shop' },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="block text-sm text-cream/50 hover:text-brass transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h3 className="text-xs tracking-[0.3em] uppercase text-cream/40">Alfassia</h3>
            <nav className="space-y-3" aria-label="Footer company navigation">
              {[
                { label: 'Notre Histoire', href: '/fr/about' },
                { label: 'Contact', href: '/fr/contact' },
                { label: 'Politique de Confidentialité', href: '#' },
                { label: 'Conditions Générales', href: '#' },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="block text-sm text-cream/50 hover:text-brass transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="text-xs tracking-[0.3em] uppercase text-cream/40">Contact</h3>
            <div className="space-y-4">
              <a href="tel:+212602912822" className="flex items-center gap-3 group">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brass flex-shrink-0" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5 19.79 19.79 0 01.22 4a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.16 6.16l1.27-.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <span className="text-sm text-cream/50 group-hover:text-brass transition-colors">+212 602-912822</span>
              </a>
              <a href="mailto:contact@alfassiaallhurra.com" className="flex items-center gap-3 group">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brass flex-shrink-0" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span className="text-sm text-cream/50 group-hover:text-brass transition-colors">contact@alfassiaallhurra.com</span>
              </a>
              <div className="flex items-center gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brass flex-shrink-0" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="text-sm text-cream/50">Fès, Maroc</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-4 space-y-3">
              <p className="text-xs tracking-[0.2em] uppercase text-cream/30">{t('newsletter')}</p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder={t('newsletterPlaceholder')}
                  className="flex-1 bg-black-700 border border-black-500 border-e-0 px-3 py-2.5 text-xs text-cream placeholder:text-cream/20 focus:outline-none focus:border-brass transition-colors"
                  aria-label={t('newsletterPlaceholder')}
                />
                <button type="submit" className="btn-brass px-4 py-2.5 text-[10px] tracking-widest uppercase">
                  OK
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="brass-divider" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-xs text-cream/25 tracking-wide">
            © {new Date().getFullYear()} Alfassia Allhurra. {t('rights')}
          </p>
          <p className="text-xs text-cream/20 tracking-widest uppercase">Made in Fès, Morocco</p>
        </div>
      </div>
    </footer>
  );
}
