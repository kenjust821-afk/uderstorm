import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  const product = await db.product.findUnique({ where: { slug: params.slug }, include: { category: true } });
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  return NextResponse.json({
    ...product,
    images: JSON.parse(product.images || '[]'),
    sizes: JSON.parse(product.sizes || '[]'),
    colors: JSON.parse(product.colors || '[]'),
  });
}










