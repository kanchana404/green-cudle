/**
 * Babies are sized by height, not by age. Bands are centimetre spans; the age
 * name is the label people recognise, not the measurement.
 */
export type SizeBand = {
  /** Label shown above the rule. */
  readonly name: string;
  /** Inclusive lower bound in centimetres. */
  readonly minCm: number;
  /** Exclusive upper bound in centimetres. */
  readonly maxCm: number;
  /** Printed range, exactly as the size chart states it. */
  readonly range: string;
  /** Age equivalence, where the brand publishes one. */
  readonly age: string;
};

export const RULER_MIN_CM = 44;
export const RULER_MAX_CM = 96;

export const SIZE_BANDS: readonly SizeBand[] = [
  { name: 'Newborn', minCm: 44, maxCm: 50, range: 'up to 50cm', age: '0-1 month' },
  { name: '0-3M', minCm: 50, maxCm: 58, range: '50-58cm', age: '0-3 months' },
  { name: '3-6M', minCm: 58, maxCm: 66, range: '58-66cm', age: '3-6 months' },
  { name: '6-12M', minCm: 66, maxCm: 74, range: '66-74cm', age: '6-12 months' },
  { name: '12-18M', minCm: 74, maxCm: 82, range: '74-82cm', age: '12-18 months' },
  { name: '18-24M', minCm: 82, maxCm: 88, range: '82-88cm', age: '18-24 months' },
  { name: '2-3Y', minCm: 88, maxCm: 96, range: '88-96cm', age: '2-3 years' },
] as const;

/** Index of the band a height falls in. Clamped at both ends of the rule. */
export function bandIndexForCm(cm: number): number {
  for (let i = 0; i < SIZE_BANDS.length; i += 1) {
    const band = SIZE_BANDS[i];
    if (band && cm < band.maxCm) return i;
  }
  return SIZE_BANDS.length - 1;
}

export function bandForCm(cm: number): SizeBand {
  const band = SIZE_BANDS[bandIndexForCm(cm)];
  // SIZE_BANDS is non-empty and bandIndexForCm always returns a valid index.
  if (!band) throw new Error('Size band table is empty');
  return band;
}

export function clampCm(cm: number): number {
  return Math.min(RULER_MAX_CM, Math.max(RULER_MIN_CM, cm));
}
