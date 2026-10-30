'use client';

import { useEffect, useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { formatNaira } from '@/lib/format';

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dunderthings_cart') || '[]');
    setItems(stored);
  }, []);

  const updateQty = (id: string, delta: number) => {
    const next = items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item);
    setItems(next);
    localStorage.setItem('dunderthings_cart', JSON.stringify(next));
  };

  const removeItem = (id: string) => {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    localStorage.setItem('dunderthings_cart', JSON.stringify(next));
  };

  const total = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);

  return (
    <>
      <SiteHeader />
      <main className="container py-12 md:py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6b68]">Your bag</p>
          <h1 className="mt-3 font-display text-5xl text-[#201b1a]">Shopping cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[#e7d7d2] bg-[#fffaf9] p-10 text-center text-[#5a4847]">Your cart is empty. Start by adding a few essentials.</div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-[2rem] border border-[#f2e6e3] bg-white p-4 shadow-soft">
                  <img src={item.image} alt={item.name} className="h-28 w-28 rounded-[1.25rem] object-cover" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-semibold text-[#201b1a]">{item.name}</h2>
                        <p className="mt-1 text-sm text-[#584742]">Size: {item.size} • Colour: {item.color}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-sm text-[#7c5048]">Remove</button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-[#e7d1ce] bg-[#fffaf8] px-2 py-1">
                        <button onClick={() => updateQty(item.id, -1)} className="h-8 w-8 text-lg text-[#2f2524]">-</button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="h-8 w-8 text-lg text-[#2f2524]">+</button>
                      </div>
                      <p className="text-lg font-semibold text-[#201b1a]">{formatNaira(Number(item.price) * Number(item.quantity))}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="rounded-[2rem] bg-[#1f1a19] p-6 text-white shadow-soft">
              <h2 className="text-2xl font-display">Summary</h2>
              <div className="mt-6 space-y-3 text-[#efdbd8]">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatNaira(total)}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>₦3,500</span></div>
                <div className="flex justify-between border-t border-[#393331] pt-3 text-lg font-semibold"><span>Total</span><span>{formatNaira(total + 3500)}</span></div>
              </div>
              <a href="/contact" className="mt-7 block rounded-full bg-[#f5dfe5] px-5 py-3 text-center text-sm font-semibold text-[#1d1918]">Proceed to checkout</a>
            </aside>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
































