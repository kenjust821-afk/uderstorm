import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const db = prisma;

export async function getSettings() {
  const settings = await prisma.setting.findMany();
  return Object.fromEntries(settings.map((item) => [item.key, item.value]));
}

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: 'asc' } });
}

export async function getProducts() {
  return prisma.product.findMany({
    where: { active: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getReviews() {
  return prisma.review.findMany({ where: { approved: true }, orderBy: { createdAt: 'desc' } });
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!product) return null;
  return {
    ...product,
    images: typeof product.images === 'string' ? JSON.parse(product.images || '[]') : product.images,
    sizes: typeof product.sizes === 'string' ? JSON.parse(product.sizes || '[]') : product.sizes,
    colors: typeof product.colors === 'string' ? JSON.parse(product.colors || '[]') : product.colors,
  };
}

export default prisma;















