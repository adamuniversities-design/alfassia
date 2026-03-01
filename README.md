# ALFASSIA ALLHURRA — Luxury E-Commerce

A production-ready Next.js 14 e-commerce platform with multilingual support (FR/EN/AR + RTL), Stripe Checkout, Prisma ORM, and a full admin dashboard. Styled in matte black and brass.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS (custom luxury theme) |
| Database | PostgreSQL + Prisma ORM |
| Payments | Stripe Checkout |
| i18n | next-intl (EN / FR / AR + RTL) |
| Fonts | Cormorant Garamond + Jost + Amiri |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Localized storefront (FR/EN/AR)
│   │   ├── page.tsx       # Homepage with hero + featured products
│   │   ├── shop/          # Product listing + PDP pages
│   │   └── checkout/      # Success/cancel pages
│   ├── admin/             # Admin dashboard (no locale prefix)
│   │   ├── page.tsx       # Dashboard with stats
│   │   ├── products/      # CRUD product management
│   │   └── orders/        # Order management with status updates
│   └── api/
│       ├── checkout/      # Stripe session creation
│       ├── webhook/       # Stripe webhook → order creation
│       └── admin/         # Protected REST API
├── components/            # Shared UI components
├── context/               # CartContext (localStorage-persisted)
├── lib/                   # Prisma client, Stripe singleton
├── messages/              # en.json, fr.json, ar.json
└── styles/                # globals.css (luxury design system)
```

---

## Setup Instructions

### 1. Clone & Install

```bash
git clone <your-repo>
cd alfassia-allhurra
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

Required variables:
- `DATABASE_URL` — PostgreSQL connection string (use Neon.tech or Supabase for free tier)
- `STRIPE_SECRET_KEY` — From Stripe Dashboard → Developers → API Keys
- `STRIPE_WEBHOOK_SECRET` — From Stripe Dashboard → Webhooks
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key
- `NEXT_PUBLIC_APP_URL` — Your deployment URL
- `ADMIN_SECRET` — Any strong password for admin access

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed sample products
npm run db:seed
```

### 4. Run Locally

```bash
npm run dev
# App: http://localhost:3000/fr
# Admin: http://localhost:3000/admin
```

### 5. Stripe Webhook (local testing)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhook
```

---

## Deployment on Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add all environment variables in Vercel Dashboard → Settings → Environment Variables
4. Set Build Command: `prisma generate && next build`
5. Deploy 🚀

### Stripe Webhook on Production

In Stripe Dashboard → Webhooks → Add endpoint:
- URL: `https://your-domain.vercel.app/api/webhook`
- Events: `checkout.session.completed`

---

## Adding Your Logo & Images

### Logo
Replace the placeholder in `src/components/Navbar.tsx`:
```tsx
// Replace this block:
<div className="w-8 h-8 ...">...</div>

// With:
<Image src="/logo.svg" alt="Alfassia Allhurra" width={40} height={40} />
```

Place your logo at `public/logo.svg` (or `.png`).

### Product Images
Place product images in `public/images/products/` and reference them in:
- The seed file (`prisma/seed.ts`) for initial products
- The admin dashboard when adding/editing products

Recommended image format: **WebP or JPEG**, 800×1000px (3:4 ratio), max 200KB.

---

## Admin Dashboard

**Access:** `https://your-domain.com/admin`

**Login:** Use the `ADMIN_SECRET` from your environment variables.

**Features:**
- Dashboard with revenue, order, product stats
- Full product CRUD (all 3 languages)
- Order management with status updates (Pending → Paid → Processing → Shipped → Delivered)
- Inline order status dropdown

---

## Internationalization

Three locales supported:

| Locale | URL | Direction |
|--------|-----|-----------|
| French (default) | `/fr/...` | LTR |
| English | `/en/...` | LTR |
| Arabic | `/ar/...` | **RTL** |

RTL is handled automatically via HTML `dir` attribute and CSS logical properties (`start`/`end` instead of `left`/`right`).

Add translations in `src/messages/{locale}.json`.

---

## Customization

### Colors (tailwind.config.ts)
```ts
brass: {
  DEFAULT: '#b8902a',  // Main brass
  light: '#d4a840',    // Hover state
  dark: '#8a6a1a',     // Dark variant
}
```

### Fonts
The luxury trio:
- **Cormorant Garamond** — Display headings (`.font-display` / `var(--font-cormorant)`)
- **Jost** — Body text (`.font-body` / `var(--font-jost)`)
- **Amiri** — Arabic text (`.font-arabic` / `var(--font-amiri)`)

---

## Currency

Products are priced in **MAD** (Moroccan Dirham). Stripe processes in `mad`.
To change currency, update:
- Prisma schema: `currency` default value
- `src/app/api/checkout/route.ts`: `currency: 'mad'`

---

## Security Notes

- Admin routes are protected by HTTP-only cookie + server-side check
- For production, consider upgrading to NextAuth.js with a proper user system
- Stripe webhook signature is verified on every request
- All admin API routes require the `x-admin-secret` header

---

*Built for Alfassia Allhurra — Where Heritage Meets Luxury*
