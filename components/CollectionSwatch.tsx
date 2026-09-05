import type { Collection } from '@/lib/collections';

/**
 * The dyed colour itself, as a flat square. No border, no radius. The colour
 * never carries the meaning on its own: the name sits beside it in text.
 */
export function CollectionSwatch({
  collection,
  size = 'sm',
}: {
  readonly collection: Collection;
  readonly size?: 'sm' | 'lg';
}) {
  return (
    <span
      aria-hidden="true"
      className={size === 'lg' ? 'block h-swatch-lg w-swatch-lg' : 'block h-swatch w-swatch'}
      style={{ backgroundColor: collection.swatch }}
    />
  );
}
