import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CareStrip } from '@/components/CareSymbols';
import { Price } from '@/components/Price';
import { ProductGrid } from '@/components/ProductTile';
import { Reveal } from '@/components/Reveal';
import { BuyPanel } from '@/components/pdp/BuyPanel';
import { ProductViews } from '@/components/pdp/ProductViews';
import { SpecTable } from '@/components/pdp/SpecTable';
import { PRODUCTS, productBySlug, type Product } from '@/lib/products';
import { SITE, openGraphFor } from '@/lib/site';

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams(): { slug: string }[] {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);

  if (!product) {
    const missing = 'That slug is not in the catalogue. The shop lists every piece we cut.';
    return {
      title: 'Product not found',
      description: missing,
      openGraph: openGraphFor({
        title: `Product not found — ${SITE.name}`,
        description: missing,
        path: '/shop',
      }),
    };
  }

  const description = product.description[0];

  return {
    title: product.name,
    description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: openGraphFor({
      title: `${product.name} — ${SITE.name}`,
      description,
      path: `/shop/${product.slug}`,
    }),
  };
}

/** Four others, taken in catalogue order from the one after this. Never this one. */
function otherProducts(slug: string): readonly Product[] {
  const start = PRODUCTS.findIndex((product) => product.slug === slug);
  const rest: Product[] = [];
  for (let step = 1; step < PRODUCTS.length && rest.length < 4; step += 1) {
    const candidate = PRODUCTS[(start + step) % PRODUCTS.length];
    if (candidate && candidate.slug !== slug) rest.push(candidate);
  }
  return rest;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const rest = otherProducts(product.slug);

  return (
    <>
      <div className="shell pb-24 pt-12">
        <div className="grid12">
          <div className="col-span-12 lg:col-span-7">
            <ProductViews name={product.name} slug={product.slug} />
          </div>

          {/* 96px clears the 64px sticky header and leaves 32px of air above it. */}
          <div className="col-span-12 mt-12 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:sticky lg:top-24 lg:self-start">
            <p className="label text-slate">{product.category}</p>
            <h1 className="mt-3 text-display-l text-ink">{product.name}</h1>
            <Price
              price={product.price}
              wasPrice={product.wasPrice}
              className="mt-4 text-body-l"
            />
            <p className="label mt-3 text-slate">
              {product.weight} <span aria-hidden="true">/</span> {product.sizeRange}
            </p>

            <div className="mt-6 max-w-measure">
              {product.description.map((sentence) => (
                <p key={sentence} className="mt-3 text-body text-ink first:mt-0">
                  {sentence}
                </p>
              ))}
            </div>

            <div className="mt-8">
              <BuyPanel product={product} />
            </div>

            <SpecTable rows={product.spec} className="mt-12" />

            <div className="mt-12">
              <h2 className="label text-slate">Care</h2>
              <CareStrip className="mt-6" />
            </div>
          </div>
        </div>
      </div>

      <hr className="hairline" />

      <Reveal as="section" className="shell section-y">
        <h2 className="text-heading text-ink">The rest of it</h2>
        <div className="mt-12">
          <ProductGrid products={rest} columns={4} />
        </div>
      </Reveal>
    </>
  );
}
