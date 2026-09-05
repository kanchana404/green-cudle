'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { ProductGrid } from '@/components/ProductTile';
import { FilterGroups } from '@/components/shop/FilterGroups';
import { FilterSheet } from '@/components/shop/FilterSheet';
import {
  buildQuery,
  filterProducts,
  readQuery,
  readSelection,
  selectionCount,
  stylesWord,
  toggleSelection,
  type FilterGroupKey,
} from '@/components/shop/filters';
import { PRODUCTS } from '@/lib/products';

/**
 * The whole filter state lives in the query string, so a filtered view is
 * shareable, the back button steps through it, and /shop?category=bodysuits
 * from the footer arrives already filtered.
 */
export function ShopBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selection = useMemo(() => readSelection(params), [params]);
  const query = useMemo(() => readQuery(params), [params]);
  const products = useMemo(() => filterProducts(PRODUCTS, selection, query), [selection, query]);

  const activeCount = selectionCount(selection) + (query === '' ? 0 : 1);
  const count = products.length;

  const onToggle = useCallback(
    (key: FilterGroupKey, value: string) => {
      const next = toggleSelection(selection, key, value);
      router.push(`${pathname}${buildQuery(next, query)}`, { scroll: false });
    },
    [selection, query, router, pathname]
  );

  const onClear = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return (
    <div className="grid12">
      <aside className="hidden lg:col-span-2 lg:block" aria-labelledby="shop-filters-heading">
        {/* Sticks under the 64px header. Bounded to the viewport so the last
            group stays reachable; the 4px inset keeps focus rings unclipped. */}
        <div
          className="sticky top-16 -mx-1 overflow-y-auto px-1 pb-12"
          style={{ maxHeight: 'calc(100vh - var(--header-h))' }}
        >
          <h2 id="shop-filters-heading" className="sr-only">
            Filters
          </h2>
          <FilterGroups selection={selection} onToggle={onToggle} />
        </div>
      </aside>

      <section className="col-span-12 lg:col-span-10 lg:col-start-3" aria-labelledby="shop-count">
        <FilterSheet selection={selection} activeCount={activeCount} onToggle={onToggle} />

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-4 lg:mt-0">
          <h2 id="shop-count" className="label text-slate" aria-live="polite" aria-atomic="true">
            <span className="tabular">{count}</span> {stylesWord(count)}
          </h2>
          {activeCount > 0 && count > 0 ? (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex min-h-touch items-center rounded-control text-body text-moss transition-colors duration-micro ease-gc hover:text-ink"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {query === '' ? null : (
          <p className="mt-4 text-caption text-slate">Matching the search for “{query}”.</p>
        )}

        {count === 0 ? (
          <div className="py-24">
            <h3 className="text-heading text-ink">No styles match those filters.</h3>
            <p className="mt-4 max-w-measure text-body text-slate">
              Clear a filter to widen the search, or start again from the full range.
            </p>
            <button
              type="button"
              onClick={onClear}
              className="mt-8 inline-flex h-cta items-center rounded-control bg-moss px-6 text-body text-field transition-colors duration-micro ease-gc hover:bg-ink"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <ProductGrid products={products} columns={3} />
          </div>
        )}
      </section>
    </div>
  );
}
