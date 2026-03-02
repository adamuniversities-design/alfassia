import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProductForm } from '../../ProductForm';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) notFound();

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="font-display text-3xl">Edit Product</h1>
        <p className="text-cream/40 text-sm mt-1">{product.nameEn}</p>
      </div>
      <ProductForm product={product} />
    </div>
  );
}
