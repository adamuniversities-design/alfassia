import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Alfassia Allhurra — Fès, Maroc',
};

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-brass/40" />
            <span className="text-brass text-xs tracking-[0.4em] uppercase">Contact</span>
            <div className="w-12 h-px bg-brass/40" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl">Contactez-Nous</h1>
          <p className="text-cream/50 tracking-wide max-w-md mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div className="space-y-10">
            <div className="space-y-2">
              <div className="w-8 h-px bg-brass" />
              <h2 className="font-display text-2xl">Nos Coordonnées</h2>
            </div>

            <div className="space-y-8">

              {/* Phone */}
              <div className="flex items-start gap-5">
                <div className="w-11 h-11 border border-black-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brass" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5 19.79 19.79 0 01.22 4a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.16 6.16l1.27-.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-cream/40 mb-1">Téléphone / WhatsApp</p>
                  <a
                    href="tel:+212602912822"
                    className="font-display text-xl text-cream hover:text-brass transition-colors"
                  >
                    +212 602-912822
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="w-11 h-11 border border-black-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brass" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-cream/40 mb-1">Email</p>
                  <a
                    href="mailto:contact@alfassiaallhurra.com"
                    className="font-display text-xl text-cream hover:text-brass transition-colors"
                  >
                    contact@alfassiaallhurra.com
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-5">
                <div className="w-11 h-11 border border-black-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brass" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-cream/40 mb-1">Instagram</p>
                  <a
                    href="https://www.instagram.com/allfassia_allhurra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xl text-cream hover:text-brass transition-colors"
                  >
                    @allfassia_allhurra
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-5">
                <div className="w-11 h-11 border border-black-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brass" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-cream/40 mb-1">Origine</p>
                  <p className="font-display text-xl text-cream">Fès, Maroc</p>
                  <p className="text-cream/40 text-xs tracking-wide mt-1">Made in Morocco — Since the beginning</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-6 border-t border-black-600 space-y-3">
              <p className="text-xs tracking-[0.2em] uppercase text-cream/30">Suivez-nous</p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/allfassia_allhurra"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 border border-black-500 hover:border-brass flex items-center justify-center text-cream/50 hover:text-brass transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
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
                  className="w-10 h-10 border border-black-500 hover:border-brass flex items-center justify-center text-cream/50 hover:text-brass transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="luxury-card p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="font-display text-2xl">Envoyez un Message</h2>
              <p className="text-cream/40 text-sm">Nous vous répondons sous 24h</p>
            </div>

            <form
              action={`mailto:contact@alfassiaallhurra.com`}
              method="GET"
              className="space-y-5"
              noValidate
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs tracking-[0.2em] uppercase text-cream/40 mb-2">
                    Nom
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full bg-black-700 border border-black-500 focus:border-brass px-4 py-3 text-cream text-sm outline-none transition-colors placeholder:text-cream/20"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs tracking-[0.2em] uppercase text-cream/40 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full bg-black-700 border border-black-500 focus:border-brass px-4 py-3 text-cream text-sm outline-none transition-colors placeholder:text-cream/20"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs tracking-[0.2em] uppercase text-cream/40 mb-2">
                  Sujet
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="w-full bg-black-700 border border-black-500 focus:border-brass px-4 py-3 text-cream text-sm outline-none transition-colors placeholder:text-cream/20"
                  placeholder="Commande, produit, autre..."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs tracking-[0.2em] uppercase text-cream/40 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="body"
                  rows={5}
                  required
                  className="w-full bg-black-700 border border-black-500 focus:border-brass px-4 py-3 text-cream text-sm outline-none transition-colors placeholder:text-cream/20 resize-none"
                  placeholder="Comment pouvons-nous vous aider ?"
                />
              </div>

              <button
                type="submit"
                className="btn-brass w-full py-4 text-xs tracking-[0.25em] uppercase"
              >
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
