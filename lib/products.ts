export type Colourway = 'Undyed' | 'Moss' | 'Ash' | 'Slate' | 'Sprout';

/** Every colourway resolves inside the closed palette. No second hue. */
export const COLOURWAY_FILL: Readonly<Record<Colourway, string>> = {
  Undyed: 'var(--chalk)',
  Moss: 'var(--moss)',
  Ash: 'var(--rule)',
  Slate: 'var(--slate)',
  Sprout: 'var(--sprout)',
};

export type SpecRow = { readonly label: string; readonly value: string };

export type Product = {
  readonly slug: string;
  readonly name: string;
  /** Rupees, unformatted. Rendered tabular. */
  readonly price: number;
  /** Set only where the price was reduced. */
  readonly wasPrice?: number;
  /** Mono metadata line, left half. */
  readonly weight: string;
  /** Mono metadata line, right half. */
  readonly sizeRange: string;
  /** Inclusive band indices into SIZE_BANDS. */
  readonly bands: readonly [number, number];
  readonly colourways: readonly Colourway[];
  readonly category: string;
  /** Three sentences. Names the construction. */
  readonly description: readonly [string, string, string];
  readonly spec: readonly SpecRow[];
};

export const PRODUCTS: readonly Product[] = [
  {
    slug: 'second-skin-bodysuit',
    name: 'Second Skin Bodysuit',
    price: 2400,
    weight: '180 GSM RIB',
    sizeRange: 'NB-24M',
    bands: [0, 5],
    colourways: ['Undyed', 'Moss', 'Ash'],
    category: 'Bodysuits',
    description: [
      'A 180 gsm rib bodysuit with an envelope neck, so it comes off downwards on a bad day instead of over the face.',
      'Every seam is flatlock, which means the join lies flat against the skin rather than standing proud of it.',
      'Nickel-free YKK snaps run the full inseam, and the fabric is pre-washed, so the fit you get is the fit you keep.',
    ],
    spec: [
      { label: 'FABRIC', value: '100% organic cotton rib' },
      { label: 'WEIGHT', value: '180 gsm' },
      { label: 'NECK', value: 'Envelope shoulder' },
      { label: 'SEAMS', value: 'Flatlock throughout' },
      { label: 'CLOSURES', value: 'Nickel-free snaps, YKK, full inseam' },
      { label: 'CERT', value: 'GOTS-CU-1084219' },
    ],
  },
  {
    slug: 'all-night-sleepsuit',
    name: 'All-Night Sleepsuit',
    price: 3900,
    weight: '200 GSM INTERLOCK',
    sizeRange: 'NB-24M',
    bands: [0, 5],
    colourways: ['Undyed', 'Moss', 'Slate'],
    category: 'Sleepsuits',
    description: [
      'A 200 gsm interlock sleepsuit cut with an integrated foot, so nothing works loose between one feed and the next.',
      'The snap line runs from the throat down one leg, which is the difference between a change that takes forty seconds and one that takes four minutes.',
      'Flatlock seams and an envelope neck, in a knit dense enough to hold shape through a nightly wash cycle.',
    ],
    spec: [
      { label: 'FABRIC', value: '100% organic cotton interlock' },
      { label: 'WEIGHT', value: '200 gsm' },
      { label: 'NECK', value: 'Envelope shoulder' },
      { label: 'SEAMS', value: 'Flatlock throughout' },
      { label: 'CLOSURES', value: 'Nickel-free snaps, YKK, throat to ankle' },
      { label: 'CERT', value: 'GOTS-CU-1084219' },
    ],
  },
  {
    slug: 'featherweight-tee',
    name: 'Featherweight Tee',
    price: 2100,
    weight: '140 GSM JERSEY',
    sizeRange: '3M-3Y',
    bands: [2, 6],
    colourways: ['Undyed', 'Moss', 'Sprout'],
    category: 'Tees & tops',
    description: [
      'A 140 gsm single jersey, which is the lightest weight we will knit and still call it durable.',
      'The envelope neck stretches to twice its resting width and returns, so it goes on without a struggle at the shoulders.',
      'Side seams are flatlock and the hem is twin-needled, which stops the curl that lighter jerseys are prone to.',
    ],
    spec: [
      { label: 'FABRIC', value: '100% organic cotton single jersey' },
      { label: 'WEIGHT', value: '140 gsm' },
      { label: 'NECK', value: 'Envelope shoulder' },
      { label: 'SEAMS', value: 'Flatlock sides, twin-needle hem' },
      { label: 'CLOSURES', value: 'None' },
      { label: 'CERT', value: 'GOTS-CU-1084219' },
    ],
  },
  {
    slug: 'wide-leg-play-short',
    name: 'Wide-Leg Play Short',
    price: 2600,
    weight: '200 GSM TWILL',
    sizeRange: '6M-3Y',
    bands: [3, 6],
    colourways: ['Undyed', 'Slate'],
    category: 'Shorts & bottoms',
    description: [
      'A 200 gsm woven twill short, cut wide through the leg so a nappy fits underneath without altering the line.',
      'The waist is a covered elastic inside a folded casing, so no elastic edge meets skin at any point.',
      'Seams are flat-felled rather than flatlock here, because a woven needs the extra strength at the crotch.',
    ],
    spec: [
      { label: 'FABRIC', value: '100% organic cotton twill' },
      { label: 'WEIGHT', value: '200 gsm' },
      { label: 'WAIST', value: 'Covered elastic, folded casing' },
      { label: 'SEAMS', value: 'Flat-felled' },
      { label: 'CLOSURES', value: 'None' },
      { label: 'CERT', value: 'GOTS-CU-1084219' },
    ],
  },
  {
    slug: 'first-vest-3-pack',
    name: 'First Vest, 3-pack',
    price: 4200,
    weight: '160 GSM JERSEY',
    sizeRange: 'NB-18M',
    bands: [0, 4],
    colourways: ['Undyed'],
    category: 'Vests',
    description: [
      'Three 160 gsm jersey vests, undyed, sold together because nobody has ever needed exactly one.',
      'The envelope neck and the wrapped front both open fully, which matters in the first fortnight when the cord stump is still healing.',
      'Flatlock seams throughout and no printed label, only a woven care code at the side seam.',
    ],
    spec: [
      { label: 'FABRIC', value: '100% organic cotton jersey' },
      { label: 'WEIGHT', value: '160 gsm' },
      { label: 'PACK', value: 'Three vests, identical' },
      { label: 'SEAMS', value: 'Flatlock throughout' },
      { label: 'CLOSURES', value: 'Nickel-free snaps, YKK, shoulder and crotch' },
      { label: 'CERT', value: 'GOTS-CU-1084219' },
    ],
  },
  {
    slug: 'flat-seam-underwear-5-pack',
    name: 'Flat-Seam Underwear, 5-pack',
    price: 3400,
    weight: '150 GSM JERSEY',
    sizeRange: '12M-4Y',
    bands: [4, 6],
    colourways: ['Undyed', 'Moss'],
    category: 'Underwear',
    description: [
      'Five pairs in 150 gsm jersey, cut on the same block regardless of who is wearing them.',
      'The waistband is a folded self-fabric casing over covered elastic, so the only thing touching skin is cotton.',
      'Leg openings are bound rather than hemmed, which keeps the edge soft and stops it rolling in the wash.',
    ],
    spec: [
      { label: 'FABRIC', value: '100% organic cotton jersey' },
      { label: 'WEIGHT', value: '150 gsm' },
      { label: 'PACK', value: 'Five pairs, identical' },
      { label: 'SEAMS', value: 'Flatlock, bound leg openings' },
      { label: 'CLOSURES', value: 'None' },
      { label: 'CERT', value: 'GOTS-CU-1084219' },
    ],
  },
  {
    slug: 'roll-cuff-sock-3-pack',
    name: 'Roll-Cuff Sock, 3-pack',
    price: 1800,
    weight: '220 GSM KNIT',
    sizeRange: 'NB-3Y',
    bands: [0, 6],
    colourways: ['Undyed', 'Moss', 'Ash'],
    category: 'Socks & mittens',
    description: [
      'A 220 gsm knit sock with a roll cuff that grips at the calf instead of the ankle, which is why it stays on.',
      'The toe is hand-linked, so there is no ridge across the toes where a machine seam would sit.',
      'Three pairs per pack, and the heel is reinforced with the same undyed yarn rather than a synthetic.',
    ],
    spec: [
      { label: 'FABRIC', value: '100% organic cotton knit' },
      { label: 'WEIGHT', value: '220 gsm' },
      { label: 'PACK', value: 'Three pairs, identical' },
      { label: 'SEAMS', value: 'Hand-linked toe' },
      { label: 'CLOSURES', value: 'None' },
      { label: 'CERT', value: 'GOTS-CU-1084219' },
    ],
  },
  {
    slug: 'newborn-kit-7-pieces',
    name: 'Newborn Kit, 7 pieces',
    price: 11900,
    wasPrice: 14300,
    weight: 'MIXED 140-220 GSM',
    sizeRange: 'NB-3M',
    bands: [0, 1],
    colourways: ['Undyed'],
    category: 'Bodysuits',
    description: [
      'Seven pieces in the two smallest bands: two bodysuits, two vests, one sleepsuit, one tee and one pack of socks.',
      'It is the same construction as the individual garments, flatlock and envelope-necked, bought together at a lower total.',
      'Everything in it is undyed, and everything in it is sized to a baby under 58 centimetres.',
    ],
    spec: [
      { label: 'CONTENTS', value: '2 bodysuits, 2 vests, 1 sleepsuit, 1 tee, 1 sock 3-pack' },
      { label: 'FABRIC', value: '100% organic cotton' },
      { label: 'WEIGHT', value: '140-220 gsm across the seven pieces' },
      { label: 'SEAMS', value: 'Flatlock throughout' },
      { label: 'CLOSURES', value: 'Nickel-free snaps, YKK' },
      { label: 'CERT', value: 'GOTS-CU-1084219' },
    ],
  },
] as const;

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Products cut in the band at this index. */
export function productsInBand(bandIndex: number): readonly Product[] {
  return PRODUCTS.filter((p) => bandIndex >= p.bands[0] && bandIndex <= p.bands[1]);
}

/** Rs 2,400 - grouped, no decimals, rendered with tabular-nums at the element. */
export function formatPrice(rupees: number): string {
  return `Rs ${rupees.toLocaleString('en-IN')}`;
}
