/**
 * The palette as literals. CSS custom properties in `app/globals.css` are the
 * source of truth for anything that renders in a browser; these exist only for
 * the two places that cannot read a custom property: the `themeColor` meta tag
 * and `ImageResponse`, which rasterises outside the DOM.
 *
 * `scripts/check-tokens.mjs` fails the build if these drift from globals.css.
 */
export const TOKENS = {
  field: '#e9ede4',
  chalk: '#f7f8f5',
  ink: '#16231a',
  slate: '#626c60',
  moss: '#2e5e3a',
  sprout: '#a8d14a',
  rule: '#cbd3c4',
} as const;

export type TokenName = keyof typeof TOKENS;
