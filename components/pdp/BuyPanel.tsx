'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { Chevron } from '@/components/CareSymbols';
import { useCart } from '@/components/CartProvider';
import { COLOURWAY_FILL, type Colourway, type Product } from '@/lib/products';
import { SIZE_BANDS } from '@/lib/sizes';

/**
 * The only client component on the page: colourway, size, add to bag. The toast
 * belongs to CartProvider, so nothing here reports success on its own.
 */
export function BuyPanel({ product }: { readonly product: Product }) {
  const { add } = useCart();
  const ids = useId();
  const colourLabelId = `${ids}-colourway`;
  const sizeLabelId = `${ids}-size`;
  const hintId = `${ids}-hint`;

  const [colourway, setColourway] = useState<Colourway>(() => product.colourways[0] ?? 'Undyed');
  const [size, setSize] = useState<string | null>(null);

  const bands = SIZE_BANDS.slice(product.bands[0], product.bands[1] + 1);
  const ready = size !== null;

  return (
    <div>
      <div role="group" aria-labelledby={colourLabelId}>
        <p id={colourLabelId} className="label text-slate">
          Colourway
        </p>
        {/* The name is the answer; the square is only the illustration of it. */}
        <p className="mt-2 text-body text-ink">{colourway}</p>
        <ul className="mt-2 flex flex-wrap items-center gap-2">
          {product.colourways.map((option) => {
            const selected = option === colourway;
            return (
              <li key={option} className="flex">
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setColourway(option)}
                  className="flex min-h-touch min-w-touch items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className={
                      selected
                        ? 'block h-swatch-lg w-swatch-lg rounded-none outline outline-1 outline-ink outline-offset-4'
                        : 'block h-swatch-lg w-swatch-lg rounded-none'
                    }
                    style={{ backgroundColor: COLOURWAY_FILL[option] }}
                  />
                  <span className="sr-only">{option}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div role="group" aria-labelledby={sizeLabelId} className="mt-8">
        <p id={sizeLabelId} className="label text-slate">
          Size
        </p>
        <ul className="mt-3 flex flex-wrap gap-3">
          {bands.map((band) => {
            const selected = band.name === size;
            return (
              <li key={band.name} className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  aria-pressed={selected}
                  aria-label={`${band.name}, ${band.range}`}
                  onClick={() => setSize(band.name)}
                  className={`flex min-h-touch min-w-touch items-center justify-center rounded-chip border px-4 text-body transition-colors duration-micro ease-gc ${
                    selected
                      ? 'border-moss bg-moss text-field'
                      : 'border-rule bg-chalk text-ink hover:border-ink'
                  }`}
                >
                  {band.name}
                </button>
                <span
                  aria-hidden="true"
                  className="tabular font-mono font-medium uppercase text-label-sm text-slate"
                >
                  {band.range}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* sprout fails as a text colour on field, so it carries the rule instead. */}
      <Link
        href="/sizes"
        className="mt-3 inline-flex min-h-touch items-center gap-2 text-body text-moss"
      >
        <span className="border-b-2 border-sprout">Not sure? Measure instead</span>
        <Chevron className="block h-4 w-4" />
      </Link>

      <div className="mt-6">
        <button
          type="button"
          disabled={!ready}
          aria-describedby={ready ? undefined : hintId}
          onClick={() => {
            if (size === null) return;
            add({ slug: product.slug, size, colourway });
          }}
          className={`h-cta w-full rounded-control text-body transition-colors duration-micro ease-gc ${
            ready
              ? 'bg-moss text-field hover:bg-ink'
              : 'cursor-not-allowed border border-rule bg-chalk text-slate'
          }`}
        >
          Add to bag
        </button>
        {ready ? null : (
          <p id={hintId} className="label mt-3 text-slate">
            Choose a size to continue.
          </p>
        )}
      </div>
    </div>
  );
}
