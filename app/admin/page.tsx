import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export default async function AdminPage() {
  const session = await getCurrentUser();
  if (!session) redirect('/admin/login');

  const products = await db.product.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } });
  const orders = await db.order.findMany({ orderBy: { createdAt: 'desc' } });
  const settings = await db.setting.findMany();
  const reviews = await db.review.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <main className="container py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6b68]">Dashboard</p>
          <h1 className="mt-3 font-display text-5xl text-[#201b1a]">Admin overview</h1>
        </div>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="rounded-full border border-[#e8d7d4] bg-white px-5 py-3 text-sm font-semibold text-[#2f2524]">Logout</button>
        </form>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <div className="rounded-[2rem] bg-[#201b1a] p-6 text-white shadow-soft"><p className="text-sm uppercase tracking-[0.15em] text-[#efdfe2]">Products</p><p className="mt-4 text-3xl font-bold">{products.length}</p></div>
        <div className="rounded-[2rem] bg-[#fff6f4] p-6 shadow-soft"><p className="text-sm uppercase tracking-[0.15em] text-[#8a6b68]">Orders</p><p className="mt-4 text-3xl font-bold text-[#201b1a]">{orders.length}</p></div>
        <div className="rounded-[2rem] bg-[#f8efe9] p-6 shadow-soft"><p className="text-sm uppercase tracking-[0.15em] text-[#8a6b68]">Reviews</p><p className="mt-4 text-3xl font-bold text-[#201b1a]">{reviews.length}</p></div>
        <div className="rounded-[2rem] bg-[#f7e4e3] p-6 shadow-soft"><p className="text-sm uppercase tracking-[0.15em] text-[#8a6b68]">Sales</p><p className="mt-4 text-3xl font-bold text-[#201b1a]">₦{orders.reduce((sum, order) => sum + Number(order.total), 0).toLocaleString()}</p></div>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-[#f0e5e3] bg-white p-6 shadow-soft">
          <h2 className="mb-4 text-2xl font-display text-[#201b1a]">Recent products</h2>
          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between gap-4 border-b border-[#f6ece9] pb-3">
                <div>
                  <p className="font-semibold text-[#201b1a]">{product.name}</p>
                  <p className="text-sm text-[#5e4a48]">{product.category.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#201b1a]">₦{Number(product.price).toLocaleString()}</p>
                  <p className="text-sm text-[#5e4a48]">{product.stock} in stock</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#f0e5e3] bg-white p-6 shadow-soft">
          <h2 className="mb-4 text-2xl font-display text-[#201b1a]">Business settings</h2>
          <div className="space-y-3 text-sm text-[#543f3d]">
            {settings.map((setting) => (
              <div key={setting.id} className="flex justify-between gap-4 border-b border-[#f6ece9] pb-2"><span>{setting.key}</span><span>{setting.value}</span></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
