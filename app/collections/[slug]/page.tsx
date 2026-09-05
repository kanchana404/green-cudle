import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BoxContents } from '@/components/BoxContents';
import { CareStrip } from '@/components/CareSymbols';
import { CollectionTile } from '@/components/CollectionTile';
import { Price } from '@/components/Price';
import { BuyPanel } from '@/components/collection/BuyPanel';
import { CollectionViews } from '@/components/collection/CollectionViews';
import { FabricSpecTable } from '@/components/FabricSpecTable';
import {
  BOX_PRICE,
  BOX_WAS_PRICE,
  COLLECTIONS,
  PIECE_COUNT,
  collectionBySlug,
  type Collection,
} from '@/lib/collections';
import { SITE, openGraphFor } from '@/lib/site';

export function generateStaticParams() {
  return COLLECTIONS.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = collectionBySlug(slug);

  if (!collection) {
    const missing = 'That collection is not one of the five. The collections page lists them all.';
    return {
      title: 'Collection not found',
      description: missing,
      openGraph: openGraphFor({
        title: `Collection not found — ${SITE.name}`,
        description: missing,
        path: '/collections',
      }),
    };
  }

  const description = collection.description[0];
  return {
    title: collection.name,
    description,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: openGraphFor({
      title: `${collection.name} — ${SITE.name}`,
      description,
      path: `/collections/${collection.slug}`,
    }),
  };
}

/** The other four, in order from the one after this. */
function others(slug: string): readonly Collection[] {
  const start = COLLECTIONS.findIndex((c) => c.slug === slug);
  const rest: Collection[] = [];
  for (let step = 1; step < COLLECTIONS.length; step += 1) {
    const candidate = COLLECTIONS[(start + step) % COLLECTIONS.length];
    if (candidate && candidate.slug !== slug) rest.push(candidate);
  }
  return rest;
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  if (!collection) notFound();

  return (
    <>
      <div className="shell section-y">
        <div className="grid12">
          {/* Cols 1-7: the cloth, stacked and scrolled. */}
          <div className="col-span-12 lg:col-span-7">
            <CollectionViews collection={collection} />
          </div>

          {/* Cols 8-12: sticky, clearing the 64px header. */}
          <div className="col-span-12 mt-16 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <p className="label text-slate">{collection.dyeSource}</p>
              <h1 className="mt-4 font-display text-display-l text-ink">{collection.name}</h1>
              <Price price={BOX_PRICE} wasPrice={BOX_WAS_PRICE} className="mt-6 text-body-l" />
              <p className="label mt-3 text-slate">
                <span className="tabular">{PIECE_COUNT}</span> pieces / One box
              </p>

              {collection.description.map((sentence) => (
                <p key={sentence} className="mt-6 max-w-measure text-body text-slate">
                  {sentence}
                </p>
              ))}

              <div className="mt-12">
                <BuyPanel collection={collection} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hairline" />

      <section aria-labelledby="contents-heading" className="shell section-y">
        <h2 id="contents-heading" className="label text-slate">
          In this box
        </h2>
        <div className="mt-12 grid12">
          <div className="col-span-12 lg:col-span-6">
            <BoxContents caption={`${collection.name} — ${PIECE_COUNT} pieces`} />
          </div>
          <div className="col-span-12 mt-16 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <FabricSpecTable />
          </div>
        </div>
      </section>

      <div className="hairline" />

      <section aria-labelledby="care-heading" className="shell section-y">
        <h2 id="care-heading" className="label text-slate">
          Care
        </h2>
        <div className="mt-12">
          <CareStrip />
        </div>
      </section>

      <div className="hairline" />

      <section aria-labelledby="rest-heading" className="shell section-y">
        <h2 id="rest-heading" className="text-heading text-ink">
          The other four
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {others(collection.slug).map((other) => (
            <CollectionTile
              key={other.slug}
              collection={other}
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          ))}
        </div>
      </section>
    </>
  );
}
