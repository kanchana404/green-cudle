/**
 * Green Cuddles sells one gift box. What changes between collections is the
 * colour the cotton is dyed; the seven pieces inside are the same every time.
 */

export type Collection = {
  readonly slug: string;
  /** Full name as printed on the box. */
  readonly name: string;
  /** The colour, in plain words, for anyone who cannot see the swatch. */
  readonly colourName: string;
  /**
   * The dyed colour itself. These sit outside the site palette on purpose:
   * they are the product, not the interface.
   */
  readonly swatch: string;
  /** What the dye is drawn from. */
  readonly dyeSource: string;
  /** Two sentences. Names the dye and what it does to the cloth. */
  readonly description: readonly [string, string];
};

export const COLLECTIONS: readonly Collection[] = [
  {
    slug: 'golden-root',
    name: 'Golden Root',
    colourName: 'Yellow',
    swatch: '#d1a847',
    dyeSource: 'Turmeric root',
    description: [
      'Turmeric root, simmered and strained, which is where the yellow comes from and why no two boxes are quite the same depth.',
      'The resist is tied by hand before the bath, so the pale rings are the places the dye could not reach.',
    ],
  },
  {
    slug: 'lavender-whisper',
    name: 'Lavender Whisper',
    colourName: 'Lavender',
    swatch: '#b6a3c7',
    dyeSource: 'Logwood and madder',
    description: [
      'Logwood pulled towards violet with a little madder, at the lightest concentration we can hold evenly across a batch.',
      'It is the palest dye we run, so the cloth keeps most of the softness it had undyed.',
    ],
  },
  {
    slug: 'pinky-cloudy',
    name: 'Pinky Cloudy',
    colourName: 'Light pink',
    swatch: '#d6a29a',
    dyeSource: 'Madder root',
    description: [
      'Madder root at a short steep, which gives a warm pink rather than the brick red a long bath would.',
      'The clouded pattern is a loose fold rather than a tie, so the edges stay soft instead of ringed.',
    ],
  },
  {
    slug: 'vintage-bloom',
    name: 'Vintage Bloom',
    colourName: 'Brown',
    swatch: '#8b694b',
    dyeSource: 'Walnut hull and myrobalan',
    description: [
      'Walnut hull over a myrobalan base, the darkest of the five, and the only one that deepens slightly with the first wash.',
      'Petals are folded and clamped before dyeing, which is why the pale shapes sit in rows rather than scattered.',
    ],
  },
  {
    slug: 'bluebell',
    name: 'Bluebell',
    colourName: 'Light blue',
    swatch: '#9fc1c6',
    dyeSource: 'Indigo',
    description: [
      'A single short dip in indigo, lifted before the vat can take it past a pale blue.',
      'Indigo oxidises in air rather than in the bath, so the colour arrives in the minute after the cloth comes out.',
    ],
  },
] as const;

export function collectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

/** One piece in the box. */
export type BoxPiece = {
  readonly name: string;
  readonly quantity: number;
  readonly weight: string;
  readonly detail: string;
};

/** Identical in every collection. Seven pieces. */
export const BOX_CONTENTS: readonly BoxPiece[] = [
  { name: 'Second Skin Bodysuit', quantity: 2, weight: '180 GSM RIB', detail: 'Envelope neck, snaps down the full inseam' },
  { name: 'All-Night Sleepsuit', quantity: 1, weight: '200 GSM INTERLOCK', detail: 'Integrated foot, snaps from throat to ankle' },
  { name: 'Featherweight Tee', quantity: 1, weight: '140 GSM JERSEY', detail: 'Twin-needle hem, envelope neck' },
  { name: 'Wide-Leg Play Short', quantity: 1, weight: '200 GSM TWILL', detail: 'Covered elastic in a folded casing' },
  { name: 'First Vest', quantity: 1, weight: '160 GSM JERSEY', detail: 'Wrapped front, opens flat' },
  { name: 'Roll-Cuff Socks', quantity: 1, weight: '220 GSM KNIT', detail: 'Hand-linked toe, one pair' },
] as const;

export const PIECE_COUNT = BOX_CONTENTS.reduce((total, piece) => total + piece.quantity, 0);

/** One box, one price, whichever collection you choose. */
export const BOX_PRICE = 11900;
export const BOX_WAS_PRICE = 14300;

/** Rs 11,900 - grouped, no decimals, rendered tabular at the element. */
export function formatPrice(rupees: number): string {
  return `Rs ${rupees.toLocaleString('en-IN')}`;
}
