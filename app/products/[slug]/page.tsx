import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { db, getProductBySlug } from '@/lib/db';
import { formatNaira } from '@/lib/format';

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const relatedProducts = await db.product.findMany({
    where: { active: true, categoryId: product.categoryId, id: { not: product.id } },
    include: { category: true },
    take: 4,
  });

  const images = product.images || [];
  const sizes = product.sizes || [];
  const colors = product.colors || [];

  return (
    <>
      <SiteHeader />
      <main className="container py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[2rem] bg-[#f7f0ee] p-3 shadow-soft">
              <Image src={images[0] || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80'} alt={product.name} width={1000} height={1200} className="h-[620px] w-full rounded-[1.5rem] object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {images.map((image: string, index: number) => (
                <div key={`${image}-${index}`} className="overflow-hidden rounded-[1.25rem] bg-[#f8f1ef] p-2">
                  <Image src={image} alt={`${product.name} ${index + 1}`} width={500} height={500} className="h-24 w-full rounded-[1rem] object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6b68]">{product.category.name}</p>
            <h1 className="mt-3 font-display text-4xl text-[#201B1A] md:text-5xl">{product.name}</h1>
            <p className="mt-4 text-3xl font-semibold text-[#201b1a]">{formatNaira(product.price)}</p>
            <p className="mt-5 text-[#584742]">{product.description}</p>

            <div className="mt-8 space-y-6">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#4d3e3b]">Size</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size: string) => (
                    <button key={size} className="rounded-full border border-[#e9d3d0] bg-white px-4 py-2 text-sm text-[#2f2524]">{size}</button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#4d3e3b]">Colour</p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color: string) => (
                    <button key={color} className="rounded-full border border-[#e9d3d0] bg-white px-4 py-2 text-sm text-[#2f2524]">{color}</button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-full border border-[#e9d3d0] bg-white px-2 py-1">
                  <button className="h-10 w-10 text-xl text-[#2f2524]">-</button>
                  <span className="w-8 text-center text-sm font-semibold">1</span>
                  <button className="h-10 w-10 text-xl text-[#2f2524]">+</button>
                </div>
                <button className="rounded-full bg-[#1f1a19] px-6 py-3 text-sm font-semibold text-white">Add to Cart</button>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2348123456789').replace(/\D/g, '')}?text=${encodeURIComponent(`Hi D UNDERTHINGS, I would like to order ${product.name}`)}`} target="_blank" rel="noreferrer" className="rounded-full border border-[#d7c1bd] bg-[#fdf7f6] px-6 py-3 text-sm font-semibold text-[#2b2322]">Order via WhatsApp</a>
                <Link href="/shop" className="rounded-full border border-[#e5d9d6] px-6 py-3 text-sm font-semibold text-[#2b2322]">Continue shopping</Link>
              </div>
            </div>

            <div className="mt-10 rounded-[1.75rem] border border-[#f1e6e2] bg-[#fffaf8] p-5">
              <h2 className="mb-3 text-lg font-semibold text-[#201b1a]">Stock availability</h2>
              <p className="text-[#4f3c3b]">{product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}</p>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6b68]">Related products</p>
            <h2 className="mt-1 font-display text-4xl text-[#201b1a]">You may also like</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((related) => (
              <Link href={`/products/${related.slug}`} key={related.id} className="group rounded-[2rem] border border-[#f0e5e3] bg-white p-3 shadow-soft transition hover:-translate-y-1">
                <div className="overflow-hidden rounded-[1.5rem]">
                  <Image src={JSON.parse(related.images || '[]')[0] || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'} alt={related.name} width={700} height={800} className="h-72 w-full rounded-[1.25rem] object-cover transition group-hover:scale-105" />
                </div>
                <div className="p-3">
                  <p className="mt-3 text-sm uppercase tracking-[0.12em] text-[#8d6d6c]">{related.category.name}</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#201b1a]">{related.name}</h3>
                  <p className="mt-2 text-[#2f2524]">{formatNaira(related.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
