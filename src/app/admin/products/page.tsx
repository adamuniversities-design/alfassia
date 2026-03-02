import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { DeleteProductButton } from './DeleteProductButton';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Products</h1>
          <p className="text-cream/40 text-sm mt-1">{products.length} total</p>
        </div>
        <Link href="/admin/products/new" className="btn-brass px-6 py-3 text-xs tracking-widest uppercase">
          + Add Product
        </Link>
      </div>

      <div className="luxury-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black-600">
                {['Name', 'Category', 'Price', 'Stock', 'Featured', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-start px-6 py-3 text-xs tracking-widest uppercase text-cream/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-black-600/50 hover:bg-black-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{product.nameEn}</p>
                      <p className="text-xs text-cream/30">{product.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-cream/60 text-xs tracking-wide capitalize">{product.category}</td>
                  <td className="px-6 py-4 text-brass">{product.price.toLocaleString()} MAD</td>
                  <td className="px-6 py-4">
                    <span className={product.stock === 0 ? 'text-red-400' : 'text-cream/60'}>{product.stock}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={product.featured ? 'text-brass' : 'text-cream/20'}>
                      {product.featured ? '✦' : '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs tracking-widest uppercase ${product.active ? 'text-green-500' : 'text-red-400'}`}>
                      {product.active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-xs text-brass hover:underline tracking-wide"
                      >
                        Edit
                      </Link>
                      <DeleteProductButton id={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
