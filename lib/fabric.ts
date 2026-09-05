/**
 * The fabric specification, stated once. The homepage summary and /fabric both
 * read from this list, so the two can never drift apart.
 */
export type FabricSpecRow = {
  /** Mono micro-label. Uppercased by the `.label` class, not by the string. */
  readonly label: string;
  /** Set in General Sans. Whole sentences where the answer needs one. */
  readonly value: string;
  /** True where the value carries a figure or a code and must set tabular. */
  readonly tabular: boolean;
};

export const FABRIC_SPEC: readonly FabricSpecRow[] = [
  { label: 'FIBRE', value: '100% organic cotton', tabular: true },
  { label: 'CERTIFICATION', value: 'GOTS, Global Organic Textile Standard', tabular: false },
  {
    label: 'DYE',
    value:
      'None. Undyed across every colourway except Moss and Sprout, which use GOTS-approved low-impact dye.',
    tabular: false,
  },
  { label: 'FINISH', value: 'No softener, no brightener, no resin', tabular: false },
  { label: 'SEAMS', value: 'Flatlock throughout. Envelope necks on all pullovers.', tabular: false },
  { label: 'CLOSURES', value: 'Nickel-free snaps, YKK', tabular: false },
  { label: 'WASH', value: '30°C, tumble low, no bleach, no iron on print', tabular: true },
  { label: 'SHRINKAGE', value: 'Pre-washed. Under 3% after ten cycles.', tabular: true },
] as const;
