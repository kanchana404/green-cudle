import { ProductGrid } from '@/components/ProductTile';
import { Reveal } from '@/components/Reveal';
import { PRODUCTS } from '@/lib/products';

export function Products() {
  return (
    <section aria-labelledby="products-heading" className="section-y">
      <Reveal className="shell">
        <p className="label text-slate">THE FULL RANGE</p>

        <h2 id="products-heading" className="mt-6 max-w-measure text-display-l text-ink">
          {"Eight things. That's the whole shop."}
        </h2>

        <p className="mt-6 max-w-measure text-body-l text-slate">
          {
            "We make one good version of each garment a baby actually needs, and we don't discontinue it."
          }
        </p>

        <div className="mt-16">
          <ProductGrid products={PRODUCTS} columns={4} />
        </div>
      </Reveal>
    </section>
  );
}
