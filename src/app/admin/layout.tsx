import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const adminAuth = cookieStore.get('admin_auth')?.value;

  if (adminAuth !== process.env.ADMIN_SECRET) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-black-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black-800 border-r border-black-600 flex flex-col">
        <div className="p-6 border-b border-black-600">
          <div className="font-display text-xl text-brass tracking-widest">ALFASSIA</div>
          <div className="text-xs text-cream/30 tracking-widest uppercase mt-1">Admin</div>
        </div>
        <nav className="flex-1 p-4 space-y-1" aria-label="Admin navigation">
          {[
            { href: '/admin', label: 'Dashboard', icon: '◈' },
            { href: '/admin/products', label: 'Products', icon: '◇' },
            { href: '/admin/orders', label: 'Orders', icon: '✦' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm text-cream/60 hover:text-brass hover:bg-black-700 transition-colors rounded-sm"
            >
              <span className="text-brass/60">{item.icon}</span>
              <span className="tracking-wide">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-black-600">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-xs text-cream/30 hover:text-brass transition-colors tracking-widest uppercase"
          >
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
