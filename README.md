# Green Cuddles

A naturally dyed GOTS-certified organic cotton gift box for newborn to three
years. One box of seven pieces, five colour collections, sized by centimetres
rather than by age.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind CSS 3.
Server Components by default. No component library — every component is
hand-built in `components/`.

## Run

```bash
npm install
npm run dev
```

```bash
npm run build && npm start
```

## Checks

```bash
npm run verify
```

Runs, in order: TypeScript strict, the static quality gate
(`scripts/quality-gate.sh` — shadows, gradients, radius, Inter, emoji,
exclamation marks, banned vocabulary, suppressed focus, `any`, raw hex,
unnecessary `'use client'`), the palette contrast assertions
(`scripts/contrast.mjs`), and the token-drift check
(`scripts/check-tokens.mjs`).

## Design system

`app/globals.css` holds the seven colour tokens and the layout constants. It is
the source of truth for anything that renders in a browser; `lib/tokens.ts`
mirrors the same values for the two places that cannot read a CSS custom
property (the `themeColor` meta tag and `ImageResponse`), and
`scripts/check-tokens.mjs` fails if the two drift.

`tailwind.config.ts` **replaces** rather than extends the colour, spacing,
radius, shadow, gradient and font-weight scales. There is no shadow utility, no
gradient utility, no colour outside the seven tokens, no spacing step outside
the sanctioned rhythm, and no font weight but 400 and 500. If a class does not
exist, that is deliberate.

The full build contract is `docs/DESIGN-CONTRACT.md`.
Notes on deviations from the brief are in `docs/DEVIATIONS.md`.
Image provenance and safety checks are in `docs/asset-inventory.md`.

## Fonts

Self-hosted and loaded through `next/font`, so there is no font `<link>` tag and
no layout shift:

- **Display** — Bricolage Grotesque (`next/font/google`), weight 500, `opsz`
  pinned to its maximum of 48.
- **Body** — General Sans from Fontshare, weights 400 and 500, served from
  `public/fonts/` via `next/font/local`.
- **Data** — Geist Mono (`next/font/google`), weight 500.

## Routes

`/` · `/collections` · `/collections/[slug]` · `/sizes` · `/fabric` · `/journal` · `/help`

`/shop` permanently redirects to `/collections`: the site was a catalogue of
eight separate garments before it was one gift box, and old links should not
404.

## The model

`lib/collections.ts` is the whole catalogue. There is one box at one price. It
holds the same seven pieces every time (`BOX_CONTENTS`); what changes between
the five collections is the plant the cotton was dyed with. The buyer picks a
collection and a height band, and that is the entire configuration.

Collection swatch colours are the only values outside the seven-token palette.
They are the product, not the interface, so they are declared on each collection
in `lib/collections.ts` and excluded from the raw-hex gate.

## Measured

Lighthouse 12.8.2 against `next start`, all seven routes:

| | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Desktop, every route | 100 | 100 | 100 | 100 |
| Mobile, `/` `/shop` `/sizes` | 96-97 | 100 | 100 | 100 |

CLS 0 and TBT 0 ms on every route measured.
# green-cudle
