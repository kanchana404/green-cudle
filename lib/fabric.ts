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
      'Plant and root only. Turmeric, madder, logwood, indigo and walnut hull, to a GOTS-approved recipe. No synthetic dye at any stage.',
    tabular: false,
  },
  { label: 'FINISH', value: 'No softener, no brightener, no resin', tabular: false },
  { label: 'SEAMS', value: 'Flatlock throughout. Envelope necks on all pullovers.', tabular: false },
  { label: 'CLOSURES', value: 'Nickel-free snaps, YKK', tabular: false },
  { label: 'WASH', value: '30°C, tumble low, no bleach, no iron on print', tabular: true },
  { label: 'SHRINKAGE', value: 'Pre-washed. Under 3% after ten cycles.', tabular: true },
] as const;

/** The composition paragraph. Stated once so the homepage and /fabric cannot drift. */
export const COMPOSITION_HEADING = "What's actually in it";
export const COMPOSITION_BODY =
  "One fibre. No softener, no optical brightener, no formaldehyde resin. The cotton is grown without synthetic pesticides, dyed with root and leaf rather than anything synthetic, and knitted flat-seam so nothing sits raised against the skin. That's the entire specification, and it's on the label.";
