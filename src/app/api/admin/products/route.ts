import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

function isAdmin(req: NextRequest) {
  const auth = req.headers.get('x-admin-secret');
  return auth === process.env.ADMIN_SECRET;
}

const ProductSchema = z.object({
  slug: z.string().min(1),
  nameEn: z.string().min(1),
  nameFr: z.string().min(1),
  nameAr: z.string().min(1),
  descEn: z.string().min(1),
  descFr: z.string().min(1),
  descAr: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  stock: z.number().int().min(0),
  images: z.array(z.string()),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const data = ProductSchema.parse(body);
  const product = await prisma.product.create({ data });
  return NextResponse.json(product, { status: 201 });
}
