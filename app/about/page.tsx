import Image from 'next/image';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { getSettings } from '@/lib/db';

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <>
      <SiteHeader />
      <main className="container py-12 md:py-16">
        <section className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="overflow-hidden rounded-[2rem] bg-[#f4e9e6] p-4 shadow-soft">
            <Image src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1100&q=80" alt="D UNDERTHINGS boutique" width={1100} height={1200} className="h-[560px] w-full rounded-[1.5rem] object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6b68]">About us</p>
            <h1 className="mt-3 font-display text-5xl text-[#201b1a]">Made for confidence, comfort, and ease.</h1>
            <p className="mt-5 text-lg text-[#563f3c]">{settings.about_intro || 'D UNDERTHINGS is a premium intimate fashion brand...'}</p>
            <p className="mt-4 text-[#564843]">{settings.about_mission || 'To create premium pieces that celebrate real women and self-love through comfort and elegance.'}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[#f1e0dc] bg-[#fffaf8] p-5">
                <h2 className="text-lg font-semibold text-[#201a19]">Our mission</h2>
                <p className="mt-2 text-[#5d4945]">To offer premium intimates that lift confidence and feel effortless from day to night.</p>
              </div>
              <div className="rounded-[1.5rem] border border-[#f1e0dc] bg-[#fffaf8] p-5">
                <h2 className="text-lg font-semibold text-[#201a19]">Our values</h2>
                <p className="mt-2 text-[#5d4945]">Comfort, inclusion, quality, and confidence in every fit.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6b68]">Why shop with us</p>
            <h2 className="mt-1 font-display text-4xl text-[#201b1a]">A boutique experience you can trust</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {['Thoughtfully designed pieces', 'Responsive support', 'Premium quality fabrics'].map((item) => (
              <div key={item} className="rounded-[2rem] border border-[#f1dfdb] bg-white p-7 text-center shadow-soft">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f7e4e4] text-xl text-[#3d2b27]">✓</div>
                <h3 className="mt-5 text-2xl font-display text-[#201b1a]">{item}</h3>
                <p className="mt-3 text-[#564843]">Every piece is selected to feel elevated, comfortable, and confidence-boosting from first wear to last.</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
