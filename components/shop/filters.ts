/**
 * Everything the shop filters know is derived from the product data at module
 * load. Nothing here is a hand-kept list, so a new product, colourway or fabric
 * weight shows up in the rail without an edit.
 */

import { CATEGORIES } from '@/lib/categories';
import { COLOURWAY_FILL, PRODUCTS, type Colourway, type Product } from '@/lib/products';
import { SIZE_BANDS } from '@/lib/sizes';

export type FilterGroupKey = 'category' | 'size' | 'colour' | 'weight';

export type FilterOption = {
  /** The value carried in the query string. */
  readonly value: string;
  /** The visible, accessible label. Written sentence case; `.label` uppercases. */
  readonly label: string;
  /** Supporting swatch fill, colourways only. The label carries the meaning. */
  readonly fill?: string;
};

export type FilterGroup = {
  readonly key: FilterGroupKey;
  readonly legend: string;
  /** True where the label is a measurement and must render tabular. */
  readonly numeric: boolean;
  readonly options: readonly FilterOption[];
};

export type Selection = Readonly<Record<FilterGroupKey, readonly string[]>>;

export const FILTER_KEYS: readonly FilterGroupKey[] = ['category', 'size', 'colour', 'weight'];

export const EMPTY_SELECTION: Selection = { category: [], size: [], colour: [], weight: [] };

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/* -- Category ------------------------------------------------------------- */

const CATEGORY_SLUG_BY_NAME = new Map(CATEGORIES.map((category) => [category.name, category.slug]));

/** The published slug wins, so /shop?category=bodysuits from the footer lands. */
export function categorySlug(name: string): string {
  return CATEGORY_SLUG_BY_NAME.get(name) ?? slugify(name);
}

function distinctCategories(products: readonly Product[]): readonly string[] {
  const seen = new Set<string>();
  const names: string[] = [];
  for (const product of products) {
    if (seen.has(product.category)) continue;
    seen.add(product.category);
    names.push(product.category);
  }
  return names;
}

/* -- Colour --------------------------------------------------------------- */

function distinctColourways(products: readonly Product[]): readonly Colourway[] {
  const seen = new Set<Colourway>();
  const colourways: Colourway[] = [];
  for (const product of products) {
    for (const colourway of product.colourways) {
      if (seen.has(colourway)) continue;
      seen.add(colourway);
      colourways.push(colourway);
    }
  }
  return colourways;
}

/* -- Weight --------------------------------------------------------------- */

/**
 * Buckets are 40 gsm wide, anchored at the lightest weight in the range. That
 * is the one constant here; the edges, the labels and the number of buckets all
 * come out of the data.
 */
const GSM_BUCKET_SPAN = 40;

type WeightBucket = {
  readonly value: string;
  readonly label: string;
  readonly min: number;
  readonly max: number;
};

/**
 * The gsm span stated in a weight line. `180 GSM RIB` is [180, 180];
 * `MIXED 140-220 GSM` is [140, 220], because that kit really does contain both.
 */
export function gsmRange(weight: string): readonly [number, number] | null {
  const found = weight.match(/\d+/g);
  if (!found) return null;
  const numbers = found.map((digits) => Number.parseInt(digits, 10)).filter((n) => n > 0);
  if (numbers.length === 0) return null;
  return [Math.min(...numbers), Math.max(...numbers)];
}

function buildWeightBuckets(products: readonly Product[]): readonly WeightBucket[] {
  const values = new Set<number>();
  for (const product of products) {
    const range = gsmRange(product.weight);
    if (!range) continue;
    values.add(range[0]);
    values.add(range[1]);
  }

  const sorted = [...values].sort((a, b) => a - b);
  const base = sorted[0];
  if (base === undefined) return [];

  const grouped = new Map<number, number[]>();
  for (const value of sorted) {
    const index = Math.floor((value - base) / GSM_BUCKET_SPAN);
    const members = grouped.get(index);
    if (members) members.push(value);
    else grouped.set(index, [value]);
  }

  return [...grouped.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, members]) => {
      const min = members[0] ?? base;
      const max = members[members.length - 1] ?? min;
      const label = min === max ? `${min} gsm` : `${min}-${max} gsm`;
      return { value: slugify(label), label, min, max };
    });
}

const WEIGHT_BUCKETS = buildWeightBuckets(PRODUCTS);
const WEIGHT_BUCKET_BY_VALUE = new Map(WEIGHT_BUCKETS.map((bucket) => [bucket.value, bucket]));

/* -- Size ----------------------------------------------------------------- */

const BAND_INDEX_BY_VALUE = new Map(SIZE_BANDS.map((band, index) => [slugify(band.name), index]));

/* -- The groups ----------------------------------------------------------- */

export const FILTER_GROUPS: readonly FilterGroup[] = [
  {
    key: 'category',
    legend: 'Category',
    numeric: false,
    options: distinctCategories(PRODUCTS).map((name) => ({ value: categorySlug(name), label: name })),
  },
  {
    key: 'size',
    legend: 'Size',
    numeric: true,
    options: SIZE_BANDS.map((band) => ({ value: slugify(band.name), label: band.name })),
  },
  {
    key: 'colour',
    legend: 'Colour',
    numeric: false,
    options: distinctColourways(PRODUCTS).map((colourway) => ({
      value: slugify(colourway),
      label: colourway,
      fill: COLOURWAY_FILL[colourway],
    })),
  },
  {
    key: 'weight',
    legend: 'Weight',
    numeric: true,
    options: WEIGHT_BUCKETS.map((bucket) => ({ value: bucket.value, label: bucket.label })),
  },
];

const GROUP_BY_KEY = new Map(FILTER_GROUPS.map((group) => [group.key, group]));

/** Selections are held in the order the group declares them, so URLs are stable. */
function canonical(key: FilterGroupKey, values: readonly string[]): readonly string[] {
  const group = GROUP_BY_KEY.get(key);
  if (!group) return [];
  return group.options.map((option) => option.value).filter((value) => values.includes(value));
}

/* -- Reading and writing the query string --------------------------------- */

/**
 * Accepts both `?colour=moss&colour=ash` and `?colour=moss,ash`. Anything that
 * is not a real option is dropped rather than shown as a filter that matches
 * nothing.
 */
export function readSelection(params: URLSearchParams): Selection {
  const read = (key: FilterGroupKey): readonly string[] => {
    const raw = params.getAll(key).flatMap((value) => value.split(','));
    return canonical(
      key,
      raw.map((value) => value.trim().toLowerCase())
    );
  };

  return {
    category: read('category'),
    size: read('size'),
    colour: read('colour'),
    weight: read('weight'),
  };
}

export function readQuery(params: URLSearchParams): string {
  return (params.get('q') ?? '').trim();
}

export function buildQuery(selection: Selection, query: string): string {
  const params = new URLSearchParams();
  for (const key of FILTER_KEYS) {
    const values = selection[key];
    if (values.length > 0) params.set(key, values.join(','));
  }
  if (query !== '') params.set('q', query);
  const search = params.toString().replace(/%2C/g, ',');
  return search === '' ? '' : `?${search}`;
}

export function toggleSelection(
  selection: Selection,
  key: FilterGroupKey,
  value: string
): Selection {
  const current = selection[key];
  const next = current.includes(value)
    ? current.filter((entry) => entry !== value)
    : [...current, value];
  const ordered = canonical(key, next);

  return {
    category: key === 'category' ? ordered : selection.category,
    size: key === 'size' ? ordered : selection.size,
    colour: key === 'colour' ? ordered : selection.colour,
    weight: key === 'weight' ? ordered : selection.weight,
  };
}

export function selectionCount(selection: Selection): number {
  return FILTER_KEYS.reduce((total, key) => total + selection[key].length, 0);
}

/* -- Filtering ------------------------------------------------------------ */

/** Multi-select is OR inside a group and AND across groups. */
export function filterProducts(
  products: readonly Product[],
  selection: Selection,
  query: string
): readonly Product[] {
  const needle = query.trim().toLowerCase();

  return products.filter((product) => {
    if (
      selection.category.length > 0 &&
      !selection.category.includes(categorySlug(product.category))
    ) {
      return false;
    }

    if (selection.size.length > 0) {
      const inBand = selection.size.some((value) => {
        const index = BAND_INDEX_BY_VALUE.get(value);
        return index !== undefined && index >= product.bands[0] && index <= product.bands[1];
      });
      if (!inBand) return false;
    }

    if (selection.colour.length > 0) {
      const hasColourway = product.colourways.some((colourway) =>
        selection.colour.includes(slugify(colourway))
      );
      if (!hasColourway) return false;
    }

    if (selection.weight.length > 0) {
      const range = gsmRange(product.weight);
      if (!range) return false;
      const inBucket = selection.weight.some((value) => {
        const bucket = WEIGHT_BUCKET_BY_VALUE.get(value);
        return bucket !== undefined && range[0] <= bucket.max && range[1] >= bucket.min;
      });
      if (!inBucket) return false;
    }

    if (needle !== '') {
      const haystack = `${product.name} ${product.category} ${product.weight}`.toLowerCase();
      if (!haystack.includes(needle)) return false;
    }

    return true;
  });
}

/** `1 STYLE`, `8 STYLES`. */
export function stylesWord(count: number): string {
  return count === 1 ? 'style' : 'styles';
}
