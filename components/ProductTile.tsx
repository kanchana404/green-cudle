import Link from 'next/link';
import { GarmentBlock } from '@/components/GarmentBlock';
import { Price } from '@/components/Price';
import { Swatches } from '@/components/Swatches';
import type { Product } from '@/lib/products';

export function ProductTile({ product }: { readonly product: Product }) {
  return (
    <article className="group">
      <Link href={`/shop/${product.slug}`} className="block">
        <GarmentBlock name={product.name} detail={product.weight} hoverable />
        <h3 className="mt-4 text-body font-medium text-ink transition-colors duration-micro ease-gc group-hover:text-moss">
          {product.name}
        </h3>
      </Link>
      <Price price={product.price} wasPrice={product.wasPrice} className="mt-1 text-body" />
      <p className="label mt-3 text-slate">
        {product.weight} <span aria-hidden="true">/</span> {product.sizeRange}
      </p>
      <Swatches colourways={product.colourways} />
    </article>
  );
}

export function ProductGrid({
  products,
  columns = 4,
}: {
  readonly products: readonly Product[];
  readonly columns?: 3 | 4;
}) {
  const cols = columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4';
  return (
    <div className={`grid grid-cols-2 gap-6 ${cols}`}>
      {products.map((product) => (
        <ProductTile key={product.slug} product={product} />
      ))}
    </div>
  );
}
