import { COLOURWAY_FILL, type Colourway } from '@/lib/products';

/** 12px flat squares. No border, no radius. Names carried for screen readers. */
export function Swatches({ colourways }: { readonly colourways: readonly Colourway[] }) {
  return (
    <ul className="mt-3 flex items-center gap-2">
      {colourways.map((colourway) => (
        <li key={colourway} className="flex">
          <span
            className="block h-swatch w-swatch"
            style={{ backgroundColor: COLOURWAY_FILL[colourway] }}
          />
          <span className="sr-only">{colourway}</span>
        </li>
      ))}
    </ul>
  );
}
