'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { Chevron } from '@/components/CareSymbols';
import { CollectionSwatch } from '@/components/CollectionSwatch';
import { useCart } from '@/components/CartProvider';
import { COLLECTIONS, type Collection } from '@/lib/collections';
import { SIZE_BANDS } from '@/lib/sizes';

/**
 * The only interactive part of the page: pick the collection, pick the height
 * band, add the box. Everything else on the route is a Server Component.
 */
export function BuyPanel({ collection }: { readonly collection: Collection }) {
  const [size, setSize] = useState<string | null>(null);
  const { add } = useCart();
  const noticeId = useId();

  const ready = size !== null;

  return (
    <div>
      <h2 className="label text-slate">Collection</h2>
      <p className="mt-3 flex items-center gap-3 text-body text-ink">
        <CollectionSwatch collection={collection} size="lg" />
        {collection.name} <span className="text-slate">— {collection.colourName}</span>
      </p>

      <ul className="mt-6 flex flex-wrap items-center gap-4">
        {COLLECTIONS.map((option) => {
          const selected = option.slug === collection.slug;
          return (
            <li key={option.slug}>
              <Link
                href={`/collections/${option.slug}`}
                aria-current={selected ? 'true' : undefined}
                className="flex min-h-touch items-center gap-2"
              >
                <span
                  aria-hidden="true"
                  className={
                    selected
                      ? 'block h-swatch-lg w-swatch-lg outline outline-1 outline-ink outline-offset-4'
                      : 'block h-swatch-lg w-swatch-lg'
                  }
                  style={{ backgroundColor: option.swatch }}
                />
                <span className="label text-slate">{option.colourName}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <h2 className="label mt-12 text-slate">Size</h2>
      <p className="label mt-3 text-slate">Chosen by height, not by age</p>
      <ul className="mt-4 flex flex-wrap gap-3">
        {SIZE_BANDS.map((band) => {
          const selected = size === band.name;
          return (
            <li key={band.name}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => setSize(selected ? null : band.name)}
                className={`flex min-h-touch flex-col items-center justify-center rounded-chip border border-rule px-4 py-2 transition-colors duration-micro ease-gc ${
                  selected ? 'border-moss bg-moss text-field' : 'bg-chalk text-ink hover:border-moss'
                }`}
              >
                <span className="text-body">{band.name}</span>
                <span
                  className={`tabular font-mono font-medium uppercase text-label-sm ${
                    selected ? 'text-field' : 'text-slate'
                  }`}
                >
                  {band.range}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-6">
        <Link
          href="/sizes"
          className="inline-flex min-h-touch items-center gap-2 border-b-2 border-sprout text-body text-moss transition-colors duration-micro ease-gc hover:text-ink"
        >
          Not sure? Measure instead
          <Chevron className="block h-4 w-4" />
        </Link>
      </p>

      <button
        type="button"
        disabled={!ready}
        aria-describedby={ready ? undefined : noticeId}
        onClick={() => {
          if (!size) return;
          add({ slug: collection.slug, size, collection: collection.name });
        }}
        className={`mt-12 flex h-cta w-full items-center justify-center rounded-control text-body transition-colors duration-micro ease-gc ${
          ready ? 'bg-moss text-field hover:bg-ink' : 'bg-chalk text-slate'
        }`}
      >
        Add to bag
      </button>
      {ready ? null : (
        <p id={noticeId} className="label mt-3 text-slate">
          Choose a size to continue.
        </p>
      )}
    </div>
  );
}
