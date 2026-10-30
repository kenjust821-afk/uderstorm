import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-12 md:py-16">
        <section className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-[2rem] bg-[#f8f1ee] p-7 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6b68]">Contact</p>
            <h1 className="mt-3 font-display text-5xl text-[#201b1a]">Let’s connect</h1>
            <div className="mt-7 space-y-5 text-[#4f3d3d]">
              <p><span className="font-semibold text-[#201b1a]">WhatsApp:</span> +2348123456789</p>
              <p><span className="font-semibold text-[#201b1a]">Email:</span> hello@dunderthings.com</p>
              <p><span className="font-semibold text-[#201b1a]">Instagram:</span> @dunderthings</p>
              <p><span className="font-semibold text-[#201b1a]">Facebook:</span> D UNDERTHINGS</p>
              <p><span className="font-semibold text-[#201b1a]">Address:</span> 12 Victoria Island, Lagos, Nigeria</p>
              <p><span className="font-semibold text-[#201b1a]">Business hours:</span> Mon-Sat: 9:00 AM - 7:00 PM</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://wa.me/2348123456789" target="_blank" rel="noreferrer" className="rounded-full bg-[#1d1918] px-6 py-3 text-sm font-semibold text-white">WhatsApp us</a>
              <a href="mailto:hello@dunderthings.com" className="rounded-full border border-[#e3d3d0] bg-white px-6 py-3 text-sm font-semibold text-[#2b2322]">Email us</a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-[#f1e6e3] bg-white p-2 shadow-soft">
            <iframe
              title="D UNDERTHINGS map"
              src="https://www.google.com/maps?q=Victoria%20Island%20Lagos&output=embed"
              className="h-[560px] w-full rounded-[1.5rem] border-0"
              loading="lazy"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
