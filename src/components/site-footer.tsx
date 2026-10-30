import Link from 'next/link';
import { Search, ShoppingBag, Settings } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#f0e8e5] bg-[#fffdfb]/90 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between gap-5">
        <Link href="/" className="text-lg font-black uppercase tracking-[0.18em] text-[#1d1918]">D UNDERTHINGS</Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-[#352d2b] transition hover:text-[#1d1918]">{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button className="rounded-full border border-[#ead9d5] bg-white p-2 text-[#2f2524]"><Search size={18} /></button>
          <Link href="/cart" className="rounded-full border border-[#ead9d5] bg-white p-2 text-[#2f2524]"><ShoppingBag size={18} /></Link>
          <Link href="/admin/login" className="rounded-full border border-[#ead9d5] bg-white p-2 text-[#2f2524]" aria-label="Admin login"><Settings size={18} /></Link>
        </div>
      </div>
    </header>
  );
}
















































