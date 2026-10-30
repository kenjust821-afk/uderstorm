import { NextRequest, NextResponse } from 'next/server';
import db, { getCategories, getSettings } from '@/lib/db';
import { verifySessionRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = verifySessionRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const category = await db.category.findUnique({ where: { slug: body.category } });
  if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 400 });

  const product = await db.product.create({
    data: {
      name: body.name,
      slug,
      description: body.description,
      price: Number(body.price),
      categoryId: category.id,
      images: JSON.stringify(body.images || []),
      sizes: JSON.stringify(body.sizes || []),
      colors: JSON.stringify(body.colors || []),
      stock: Number(body.stock || 0),
      featured: Boolean(body.featured),
      newArrival: Boolean(body.newArrival),
      bestSeller: Boolean(body.bestSeller),
      soldOut: Number(body.stock || 0) <= 0,
      active: true,
      rating: 4.8,
      reviewCount: 0,
    },
    include: { category: true },
  });

  return NextResponse.json({ product });
}

export async function GET(req: NextRequest) {
  const session = verifySessionRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const products = await db.product.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(products);
}











