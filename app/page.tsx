import db, { getCategories, getProducts, getSettings, getReviews } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/components/product-card';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export default async function HomePage() {
  const settings = await getSettings();
  const featured = await db.product.findMany({
    where: { active: true, featured: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });
  const newArrivals = await db.product.findMany({
    where: { active: true, newArrival: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });
  const bestSellers = await db.product.findMany({
    where: { active: true, bestSeller: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });
  const reviews = await getReviews();

  const heroImages = [
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-cream py-8 md:py-12">
          <div className="container grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] items-center">
            <div>
              <p className="mb-5 inline-block rounded-full border border-[#e9d3d0] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b4e4d]">
                Premium lingerie & essentials
              </p>
              <h1 className="font-display text-5xl leading-none text-[#221b1a] md:text-7xl">
                {settings.homepage_headline || 'Feel Beautiful. Feel Confident. Feel You.'}
              </h1>
              <p className="mt-6 max-w-xl text-lg text-[#5a463f]">
                {settings.homepage_description || 'Luxury intimate wear designed for comfort, confidence, and everyday beauty.'}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/shop" className="rounded-full bg-[#1f1a19] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#352b2a]">
                  Shop Now
                </Link>
                <Link href="/about" className="rounded-full border border-[#d7c1bd] bg-white px-7 py-3 text-sm font-semibold text-[#2c2321] transition hover:border-[#b78e8a]">
                  Learn More
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-8 text-sm text-[#4d3b39]">
                <div><span className="block text-2xl font-bold text-[#221b1a]">10k+</span> happy customers</div>
                <div><span className="block text-2xl font-bold text-[#221b1a]">4.9/5</span> average rating</div>
                <div><span className="block text-2xl font-bold text-[#221b1a]">24h</span> dispatch</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-[2rem] bg-[#f6e6e2] p-3 shadow-soft">
                <Image src={heroImages[0]} alt="Hero product" width={800} height={1000} className="h-[420px] w-full rounded-[1.5rem] object-cover" />
              </div>
              <div className="mt-8 space-y-4">
                <div className="overflow-hidden rounded-[2rem] bg-[#efe5df] p-3 shadow-soft">
                  <Image src={heroImages[1]} alt="Hero product detail" width={700} height={850} className="h-[240px] w-full rounded-[1.5rem] object-cover" />
                </div>
                <div className="rounded-[2rem] bg-[#1d1918] p-6 text-white shadow-soft">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#f0dfe2]">New Season</p>
                  <p className="mt-3 text-2xl font-display">Soft lines. Strong confidence.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8a6b68]">Featured collection</p>
                <h2 className="section-title">Best loved essentials</h2>
              </div>
              <Link href="/shop" className="text-sm font-semibold text-[#2b2322] underline underline-offset-8">View all</Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf8] py-16 md:py-20">
          <div className="container">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8a6b68]">Fresh drop</p>
                <h2 className="section-title">New arrivals</h2>
              </div>
              <Link href="/shop?newArrival=true" className="text-sm font-semibold text-[#2b2322] underline underline-offset-8">See more</Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8a6b68]">Top picks</p>
                <h2 className="section-title">Best sellers</h2>
              </div>
              <Link href="/shop?bestSeller=true" className="text-sm font-semibold text-[#2b2322] underline underline-offset-8">Shop best sellers</Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f8f0ee] py-16 md:py-20">
          <div className="container grid gap-6 lg:grid-cols-3">
            {['Free Shipping', 'Secure Checkout', 'Easy Returns'].map((item, index) => (
              <div key={item} className="rounded-[2rem] border border-[#f3dfe2] bg-white p-8 text-center shadow-soft">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f7e3e8] text-lg font-bold text-[#3d2a2a]">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-display text-[#201b1a]">{item}</h3>
                <p className="mt-3 text-[#584742]">Thoughtful service for confident shopping across Nigeria and beyond.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6b68]">Customer love</p>
              <h2 className="section-title">Testimonials</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {reviews.slice(0, 3).map((review) => (
                <article key={review.id} className="rounded-[2rem] border border-[#f0e3e1] bg-white p-7 shadow-soft">
                  <div className="mb-4 text-[#d98e56]">{'★'.repeat(review.rating)}</div>
                  <p className="mb-5 text-[#4f3c3b]">“{review.comment}”</p>
                  <div className="flex items-center justify-between border-t border-[#f2e6e2] pt-4">
                    <div>
                      <p className="font-semibold text-[#1f1a19]">{review.name}</p>
                      <p className="text-xs text-[#76615d]">{review.date}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1f1a19] py-16 text-white md:py-20">
          <div className="container grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f5cfcd]">Stay in the loop</p>
              <h2 className="section-title text-white">Join our newsletter</h2>
              <p className="max-w-xl text-[#e7d7d1]">Get fresh arrivals, styling inspiration, and limited-time sale alerts straight to your inbox.</p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row">
              <input type="email" placeholder="Email address" className="h-14 flex-1 rounded-full border border-[#4f4745] bg-[#312b2a] px-5 text-white placeholder:text-[#d2b4b2]" />
              <button type="button" className="h-14 rounded-full bg-[#f5dfe5] px-6 text-sm font-semibold text-[#1d1918] transition hover:bg-[#f0d0d7]">Subscribe</button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}










































































































































































































































































































































































































































































