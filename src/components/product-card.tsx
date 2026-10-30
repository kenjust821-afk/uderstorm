import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-[#f0e5e2] bg-[#fffdfb]">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-black uppercase tracking-[0.18em] text-[#1d1918]">D UNDERTHINGS</p>
          <p className="mt-4 max-w-sm text-[#5b4947]">Premium intimate essentials created to help you feel beautiful, confident, and completely yourself.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#876c69]">Quick links</h3>
          <div className="mt-4 space-y-2 text-[#432f2f]">
            <Link href="/shop" className="block">Shop</Link>
            <Link href="/about" className="block">About Us</Link>
            <Link href="/contact" className="block">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#876c69]">Contact</h3>
          <div className="mt-4 space-y-2 text-[#432f2f]">
            <p>hello@dunderthings.com</p>
            <p>+2348123456789</p>
            <p>12 Victoria Island, Lagos</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#f0e5e2] py-5 text-center text-sm text-[#665554]">© 2025 D UNDERTHINGS. All rights reserved.</div>
    </footer>
  );
}
























































































