import Link from 'next/link';
import { GarmentBlock } from '@/components/GarmentBlock';
import { Price } from '@/components/Price';
import { Swatches } from '@/components/Swatches';
import { productImage } from '@/lib/media';
import type { Product } from '@/lib/products';

/**
 * The grid is two across on a phone and three or four from `lg`, so the hint
 * has to say 50vw on small screens. Saying 100vw makes Next serve an image at
 * twice the width it is painted at.
 */
export function ProductTile({
  product,
  sizes = '(min-width: 1024px) 25vw, 50vw',
}: {
  readonly product: Product;
  readonly sizes?: string;
}) {
  return (
    <article className="group">
      <Link href={`/shop/${product.slug}`} className="block">
        <GarmentBlock
          name={product.name}
          detail={product.weight}
          image={productImage(product.slug, `${product.name} in ${product.colourways[0]}`)}
          sizes={sizes}
          hoverable
        />
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
  const sizes =
    columns === 3 ? '(min-width: 1024px) 33vw, 50vw' : '(min-width: 1024px) 25vw, 50vw';
  return (
    <div className={`grid grid-cols-2 gap-6 ${cols}`}>
      {products.map((product) => (
        <ProductTile key={product.slug} product={product} sizes={sizes} />
      ))}
    </div>
  );
}
