import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductGrid } from '@/components/ProductTile';
import { stylesWord } from '@/components/shop/filters';
import { ShopBrowser } from '@/components/shop/ShopBrowser';
import { PRODUCTS } from '@/lib/products';
import { SITE, openGraphFor } from '@/lib/site';

const DESCRIPTION =
  'Every Green Cuddles style in undyed GOTS-certified organic cotton. Filter by category, size band, colourway and fabric weight.';

export const metadata: Metadata = {
  title: 'Shop',
  description: DESCRIPTION,
  openGraph: openGraphFor({
    title: `Shop — ${SITE.name}`,
    description: DESCRIPTION,
    path: '/shop',
  }),
};

/**
 * Shown while the client filters read the query string. It is the honest
 * pre-filter state: the full range, counted the same way.
 */
function FullRange() {
  const count = PRODUCTS.length;
  return (
    <div className="grid12">
      <div className="hidden lg:col-span-2 lg:block" />
      <section className="col-span-12 lg:col-span-10 lg:col-start-3">
        <div className="border-b border-rule pb-4">
          <h2 className="label text-slate">
            <span className="tabular">{count}</span> {stylesWord(count)}
          </h2>
        </div>
        <div className="mt-8">
          <ProductGrid products={PRODUCTS} columns={3} />
        </div>
      </section>
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      <div className="shell grid12 pb-12 pt-16">
        <div className="col-span-12 lg:col-span-7">
          <h1 className="text-display-l text-ink">Shop</h1>
          <p className="mt-6 max-w-measure text-body-l text-slate">
            The full range, in undyed GOTS-certified organic cotton. Flatlock seams, envelope necks,
            and sizes set by height in centimetres rather than by month.
          </p>
        </div>
      </div>

      <div className="hairline" />

      <div className="shell pb-24 pt-12">
        <Suspense fallback={<FullRange />}>
          <ShopBrowser />
        </Suspense>
      </div>
    </>
  );
}
