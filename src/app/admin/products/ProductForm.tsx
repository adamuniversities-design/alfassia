'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@prisma/client';

type Props = { product?: Product };

function getAdminSecret() {
  return document.cookie
    .split('; ')
    .find((r) => r.startsWith('admin_auth='))
    ?.split('=')[1] ?? '';
}

export function ProductForm({ product }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    slug: product?.slug ?? '',
    nameEn: product?.nameEn ?? '',
    nameFr: product?.nameFr ?? '',
    nameAr: product?.nameAr ?? '',
    descEn: product?.descEn ?? '',
    descFr: product?.descFr ?? '',
    descAr: product?.descAr ?? '',
    price: product?.price ?? 0,
    category: product?.category ?? '',
    stock: product?.stock ?? 0,
    images: product?.images.join('\n') ?? '',
    featured: product?.featured ?? false,
    active: product?.active ?? true,
  });

  function update(key: string, val: string | number | boolean) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const body = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images: form.images.split('\n').filter(Boolean),
    };
    const method = product ? 'PATCH' : 'POST';
    const url = product ? `/api/admin/products/${product.id}` : '/api/admin/products';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': getAdminSecret() },
      body: JSON.stringify(body),
    });
    router.push('/admin/products');
    router.refresh();
  }

  const inputCls = 'w-full bg-black-700 border border-black-500 focus:border-brass px-4 py-3 text-cream text-sm outline-none transition-colors';
  const labelCls = 'block text-xs tracking-widest uppercase text-cream/40 mb-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Slug</label>
          <input className={inputCls} value={form.slug} onChange={(e) => update('slug', e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Category</label>
          <input className={inputCls} value={form.category} onChange={(e) => update('category', e.target.value)} required />
        </div>
      </div>

      {(['En', 'Fr', 'Ar'] as const).map((lang) => (
        <div key={lang} className="space-y-4 p-4 border border-black-600">
          <p className="text-xs tracking-widest uppercase text-brass/60">{lang === 'En' ? 'English' : lang === 'Fr' ? 'Français' : 'العربية'}</p>
          <div>
            <label className={labelCls}>Name</label>
            <input className={inputCls} value={(form as any)[`name${lang}`]} onChange={(e) => update(`name${lang}`, e.target.value)} required />
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea className={inputCls} rows={3} value={(form as any)[`desc${lang}`]} onChange={(e) => update(`desc${lang}`, e.target.value)} required />
          </div>
        </div>
      ))}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Price (MAD)</label>
          <input type="number" className={inputCls} value={form.price} onChange={(e) => update('price', e.target.value)} min={0} step={0.01} required />
        </div>
        <div>
          <label className={labelCls}>Stock</label>
          <input type="number" className={inputCls} value={form.stock} onChange={(e) => update('stock', e.target.value)} min={0} required />
        </div>
      </div>

      <div>
        <label className={labelCls}>Images (one URL per line)</label>
        <textarea className={inputCls} rows={3} value={form.images} onChange={(e) => update('images', e.target.value)} placeholder="/images/products/my-product.jpg" />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} className="accent-brass" />
          <span className="text-sm text-cream/60">Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.active} onChange={(e) => update('active', e.target.checked)} className="accent-brass" />
          <span className="text-sm text-cream/60">Active</span>
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={saving} className="btn-brass px-10 py-4 text-xs tracking-widest uppercase">
          {saving ? 'Saving…' : product ? 'Update Product' : 'Create Product'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-outline-brass px-8 py-4 text-xs tracking-widest uppercase">
          Cancel
        </button>
      </div>
    </form>
  );
}
