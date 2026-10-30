import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export default function AdminLoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-12 md:py-16">
        <div className="mx-auto max-w-lg rounded-[2rem] border border-[#f1e4e0] bg-white p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6b68]">Admin access</p>
          <h1 className="mt-3 font-display text-4xl text-[#201b1a]">Secure login</h1>
          <form action="/api/admin/login" method="post" className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2f2524]">Username</label>
              <input name="username" defaultValue="admin" className="w-full rounded-xl border border-[#ead8d4] px-4 py-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2f2524]">Password</label>
              <input type="password" name="password" className="w-full rounded-xl border border-[#ead8d4] px-4 py-3" />
            </div>
            <button type="submit" className="w-full rounded-full bg-[#1d1918] px-5 py-3 text-sm font-semibold text-white">Log in</button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
