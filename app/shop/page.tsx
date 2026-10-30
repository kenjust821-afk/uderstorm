import Link from 'next/link';
import Image from 'next/image';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ProductCard } from '@/components/product-card';
import { db, getCategories, getSettings } from '@/lib/db';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string; size?: string; color?: string; minPrice?: string; maxPrice?: string; newArrival?: string; bestSeller?: string; q?: string };
}) {
  const settings = await getSettings();
  const categories = await getCategories();

  const filters: any = { active: true };
  if (searchParams.category) filters.category = { slug: searchParams.category };
  if (searchParams.q) {
    filters.OR = [
      { name: { contains: searchParams.q } },
      { description: { contains: searchParams.q } },
    ];
  }
  if (searchParams.newArrival === 'true') filters.newArrival = true;
  if (searchParams.bestSeller === 'true') filters.bestSeller = true;

  const products = await db.product.findMany({
    where: filters,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  const visibleProducts = products.filter((product) => {
    const min = Number(searchParams.minPrice || 0);
    const max = Number(searchParams.maxPrice || Number.MAX_SAFE_INTEGER);
    const hasPrice = product.price >= min && product.price <= max;
    const hasSize = !searchParams.size || JSON.parse(product.sizes || '[]').includes(searchParams.size);
    const hasColor = !searchParams.color || JSON.parse(product.colors || '[]').map((value: string) => value.toLowerCase()).includes(searchParams.color.toLowerCase());
    return hasPrice && hasSize && hasColor;
  });

  return (
    <>
      <SiteHeader />
      <main className="bg-[#fffdfb]">
        <section className="bg-[#f8f0ee] py-14">
          <div className="container">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#806565]">Shop</p>
            <h1 className="mt-3 font-display text-5xl text-[#201a19]">Curated for your confidence</h1>
          </div>
        </section>

        <section className="container py-10">
          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="rounded-[2rem] border border-[#f0e6e3] bg-white p-6 shadow-soft">
              <form className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#2f2524]">Search</label>
                  <input name="q" defaultValue={searchParams.q || ''} placeholder="Search products" className="w-full rounded-xl border border-[#e8d4d2] px-3 py-2.5" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#2f2524]">Category</label>
                  <select name="category" defaultValue={searchParams.category || ''} className="w-full rounded-xl border border-[#e8d4d2] px-3 py-2.5">
                    <option value="">All categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.slug}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#2f2524]">Size</label>
                  <select name="size" defaultValue={searchParams.size || ''} className="w-full rounded-xl border border-[#e8d4d2] px-3 py-2.5">
                    <option value="">All sizes</option>
                    {['XS','S','M','L','XL','XXL'].map((size) => <option key={size} value={size}>{size}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#2f2524]">Colour</label>
                  <select name="color" defaultValue={searchParams.color || ''} className="w-full rounded-xl border border-[#e8d4d2] px-3 py-2.5">
                    <option value="">All colours</option>
                    {['Black','Nude','Blush','Ivory','Rose','Champagne','Cream','Warm White','Ash'].map((color) => <option key={color} value={color}>{color}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#2f2524]">Min</label>
                    <input name="minPrice" defaultValue={searchParams.minPrice || ''} placeholder="₦5000" className="w-full rounded-xl border border-[#e8d4d2] px-3 py-2.5" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#2f2524]">Max</label>
                    <input name="maxPrice" defaultValue={searchParams.maxPrice || ''} placeholder="₦50000" className="w-full rounded-xl border border-[#e8d4d2] px-3 py-2.5" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="newArrival" defaultChecked={searchParams.newArrival === 'true'} /> New arrivals</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="bestSeller" defaultChecked={searchParams.bestSeller === 'true'} /> Best sellers</label>
                </div>
                <button type="submit" className="w-full rounded-full bg-[#1d1918] px-5 py-3 text-sm font-semibold text-white">Apply filters</button>
              </form>
            </aside>

            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-[#5e4a48]">{visibleProducts.length} products available</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.length > 0 ? (
                  visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)
                ) : (
                  <div className="col-span-full rounded-[2rem] border border-dashed border-[#e7d7d2] bg-[#fffaf9] p-10 text-center text-[#5e4a48]">
                    No products match your filters.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
