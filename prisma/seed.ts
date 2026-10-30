import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function main() {
  const categories = [
    "Women's Underwear",
    "Bras",
    "Panties",
    "Bra and Panty Sets",
    "Lingerie",
    "Nightwear",
    "Men's Underwear",
    "Boxers",
    "Sleepwear",
    "Other Intimate Clothing",
  ];

  for (const categoryName of categories) {
    const slug = slugify(categoryName);
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { name: categoryName, slug },
    });
  }

  const adminPassword = await hash("Dunderthings@2024", 10);
  await prisma.adminUser.upsert({
    where: { username: "admin" },
    update: { password: adminPassword },
    create: { username: "admin", password: adminPassword },
  });

  const defaults = [
    ["site_name", "D UNDERTHINGS"],
    ["homepage_headline", "Feel Beautiful. Feel Confident. Feel You."],
    ["homepage_description", "D UNDERTHINGS is a premium intimate fashion brand built for confidence, comfort and everyday beauty."],
    ["whatsapp_number", "+2348123456789"],
    ["business_email", "hello@dunderthings.com"],
    ["instagram", "https://instagram.com/dunderthings"],
    ["facebook", "https://facebook.com/dunderthings"],
    ["tiktok", "https://tiktok.com/@dunderthings"],
    ["address", "12 Victoria Island, Lagos, Nigeria"],
    ["opening_hours", "Mon-Sat: 9:00 AM - 7:00 PM"],
    ["phone", "+2348123456789"],
    ["footer_text", "Luxury essentials for everyday confidence."],
    ["about_intro", "D UNDERTHINGS creates elevated essentials that fit the rhythm of modern life."],
    ["about_mission", "To celebrate femininity and confidence through thoughtfully designed, premium intimatewear."],
    ["about_values", "Comfort, quality, self-love and confidence."],
    ["hero_image_1", "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"],
    ["hero_image_2", "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"],
  ] as const;

  for (const [key, value] of defaults) {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  const productSeeds = [
    { name: "Velvet Lace Demi Bra", category: "Bras", price: 18900, description: "A softly structured demi bra with elegant lace trim and supportive shaping for all-day wear.", images: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"], sizes: ["XS","S","M","L"], colors: ["Nude","Blush","Black"], stock: 18, featured: true, newArrival: true, bestSeller: true },
    { name: "Rose Silk Bralette", category: "Bras", price: 21400, description: "Silky smooth and feather-light, designed with a feminine silhouette and breathable comfort.", images: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"], sizes: ["S","M","L"], colors: ["Rose","Ivory"], stock: 12, featured: true, newArrival: false, bestSeller: true },
    { name: "Everyday Lace Panty", category: "Panties", price: 8500, description: "Lightweight everyday essential with a soft feel and elegant lace finish.", images: ["https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"], sizes: ["XS","S","M","L","XL"], colors: ["Blush","Cream","Black"], stock: 30, featured: true, newArrival: false, bestSeller: true },
    { name: "Midnight Satin Set", category: "Bra and Panty Sets", price: 31800, description: "A coordinated set with a whisper-soft satin finish for intimate evenings and romantic moments.", images: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"], sizes: ["S","M","L"], colors: ["Black","Rose"], stock: 16, featured: true, newArrival: true, bestSeller: true },
    { name: "Flora Lace Bodysuit", category: "Lingerie", price: 43000, description: "Sculpting, elegant and effortlessly romantic for evenings out or slow nights in.", images: ["https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"], sizes: ["S","M","L","XL"], colors: ["Black","Champagne","Rose"], stock: 11, featured: true, newArrival: true, bestSeller: true },
    { name: "Moonlight Pajama Set", category: "Nightwear", price: 33000, description: "A relaxed set combining premium softness with a polished yet easy bedtime feel.", images: ["https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"], sizes: ["S","M","L","XL"], colors: ["Ivory","Pale Pink","Lavender"], stock: 12, featured: true, newArrival: true, bestSeller: true },
    { name: "Pure Comfort Boxer", category: "Men's Underwear", price: 11000, description: "An ultra-soft boxer built for everyday ease, breathability and modern comfort.", images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"], sizes: ["S","M","L","XL","XXL"], colors: ["Black","Ash","White"], stock: 35, featured: true, newArrival: false, bestSeller: true },
    { name: "Classic Boxers 3-Pack", category: "Boxers", price: 25000, description: "Premium everyday boxers with soft stretch and modern cut for everyday confidence.", images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"], sizes: ["M","L","XL","XXL"], colors: ["White","Charcoal","Navy"], stock: 20, featured: true, newArrival: true, bestSeller: true },
    { name: "Night Ritual Sleepwear", category: "Sleepwear", price: 32600, description: "A cozy, elevated sleepwear option with soft texture and a relaxed, elegant silhouette.", images: ["https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"], sizes: ["S","M","L","XL"], colors: ["Ivory","Rose","Clay"], stock: 16, featured: true, newArrival: true, bestSeller: true },
    { name: "Euphoria Satin Robe", category: "Other Intimate Clothing", price: 48000, description: "Luxury satin robe with a flattering drape, embellished waist tie and polished finish.", images: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"], sizes: ["S","M","L","XL"], colors: ["Champagne","Blush","Black"], stock: 9, featured: true, newArrival: true, bestSeller: true },
    { name: "Barely There Thong", category: "Women's Underwear", price: 9200, description: "A clean, barely-there design with a soft cotton feel and invisible profile.", images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"], sizes: ["XS","S","M","L"], colors: ["Nude","Black","Pearl"], stock: 22, featured: true, newArrival: false, bestSeller: true },
  ];

  for (const seed of productSeeds) {
    const category = await prisma.category.findUnique({ where: { name: seed.category } });
    if (!category) continue;

    const slug = slugify(seed.name);
    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        name: seed.name,
        slug,
        description: seed.description,
        price: seed.price,
        categoryId: category.id,
        images: JSON.stringify(seed.images),
        sizes: JSON.stringify(seed.sizes),
        colors: JSON.stringify(seed.colors),
        stock: seed.stock,
        stockByVariant: JSON.stringify({}),
        featured: seed.featured,
        newArrival: seed.newArrival,
        bestSeller: seed.bestSeller,
        soldOut: seed.stock <= 0,
        active: true,
        rating: 4.8,
        reviewCount: 12,
      },
    });
  }

  const sizeGuides = [
    { category: "Bras", content: JSON.stringify({ title: "Bra Size Guide", rows: [{ size: "XS", bust: "32-34", underbust: "24-26" }, { size: "S", bust: "34-36", underbust: "26-28" }, { size: "M", bust: "36-38", underbust: "28-30" }, { size: "L", bust: "38-40", underbust: "30-32" }, { size: "XL", bust: "40-42", underbust: "32-34" }] }) },
    { category: "Panties", content: JSON.stringify({ title: "Panty Size Guide", rows: [{ size: "XS", waist: "24-26", hip: "34-36" }, { size: "S", waist: "26-28", hip: "36-38" }, { size: "M", waist: "28-30", hip: "38-40" }, { size: "L", waist: "30-32", hip: "40-42" }, { size: "XL", waist: "32-34", hip: "42-44" }] }) },
    { category: "Men's Underwear", content: JSON.stringify({ title: "Men's Underwear Size Guide", rows: [{ size: "S", waist: "28-30", hip: "34-36" }, { size: "M", waist: "30-32", hip: "36-38" }, { size: "L", waist: "32-34", hip: "38-40" }, { size: "XL", waist: "34-36", hip: "40-42" }, { size: "XXL", waist: "36-38", hip: "42-44" }] }) },
  ];

  for (const guide of sizeGuides) {
    await prisma.sizeGuide.upsert({
      where: { category: guide.category },
      update: { content: guide.content },
      create: { category: guide.category, content: guide.content },
    });
  }

  const reviews = [
    { name: "Ada U", rating: 5, comment: "The quality is premium and the fit is amazing. I feel confident every day.", date: "2024-09-12", approved: true },
    { name: "Mira O", rating: 5, comment: "Beautiful packaging and the bras fit perfectly. I will order again.", date: "2024-10-02", approved: true },
    { name: "Faith I", rating: 4, comment: "Comfortable materials and lovely designs. Customer care was excellent.", date: "2024-10-19", approved: true },
  ];

  for (const review of reviews) {
    await prisma.review.create({ data: review });
  }

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
