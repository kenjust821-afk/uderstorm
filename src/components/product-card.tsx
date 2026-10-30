import Link from 'next/link';
import Image from 'next/image';
import { formatNaira } from '@/lib/format';

export function ProductCard({ product }: { product: any }) {
  const images = Array.isArray(product.images) ? product.images : JSON.parse(product.images || '[]');

  return (
    <Link href={`/products/${product.slug}`} className="group rounded-[2rem] border border-[#f0e5e3] bg-white p-3 shadow-soft transition hover:-translate-y-1">
      <div className="overflow-hidden rounded-[1.5rem]">
        <Image
          src={images[0] || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          width={700}
          height={800}
          className="h-72 w-full rounded-[1.25rem] object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6b68]">{product.category?.name}</p>
        <h3 className="mt-2 text-xl font-semibold text-[#201b1a]">{product.name}</h3>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-lg font-semibold text-[#201b1a]">{formatNaira(product.price)}</p>
          <span className="rounded-full bg-[#f7e7e6] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#5d453f]">
            {product.stock > 0 ? 'In stock' : 'Sold out'}
          </span>
        </div>
      </div>
    </Link>
  );
}
