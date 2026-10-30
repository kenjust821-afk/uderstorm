const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function getSettings() {
  const settings = await prisma.setting.findMany();
  return Object.fromEntries(settings.map((item) => [item.key, item.value]));
}

export async function getProducts() {
  const products = await prisma.product.findMany({
    where: { active: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return products.map((product) => ({
    ...product,
    images: JSON.parse(product.images || "[]"),
    sizes: JSON.parse(product.sizes || "[]"),
    colors: JSON.parse(product.colors || "[]"),
  }));
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) return null;

  return {
    ...product,
    images: JSON.parse(product.images || "[]"),
    sizes: JSON.parse(product.sizes || "[]"),
    colors: JSON.parse(product.colors || "[]"),
  };
}

export async function getReviews() {
  return prisma.review.findMany({ where: { approved: true }, orderBy: { createdAt: "desc" } });
}

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export { prisma };
