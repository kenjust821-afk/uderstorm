import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySessionRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = verifySessionRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const products = await db.product.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = verifySessionRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const category = await db.category.findUnique({ where: { slug: body.categorySlug } });
  if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 400 });

  const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const product = await db.product.create({
    data: {
      name: body.name,
      slug,
      description: body.description,
      price: Number(body.price),
      categoryId: category.id,
      images: JSON.stringify(Array.isArray(body.images) ? body.images : [body.images]),
      sizes: JSON.stringify(Array.isArray(body.sizes) ? body.sizes : [body.sizes]),
      colors: JSON.stringify(Array.isArray(body.colors) ? body.colors : [body.colors]),
      stock: Number(body.stock || 0),
      featured: Boolean(body.featured),
      newArrival: Boolean(body.newArrival),
      bestSeller: Boolean(body.bestSeller),
      soldOut: Number(body.stock || 0) <= 0,
      active: true,
      rating: 4.8,
      reviewCount: 0,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
















