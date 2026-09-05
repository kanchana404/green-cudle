# Green Cuddles — build contract

Read this before touching any file. Every rule here is non-negotiable.

## Stack
Next.js 15 App Router, TypeScript strict, Tailwind. Server Components by default;
`'use client'` ONLY where state, refs, or handlers genuinely exist. No component
library. No `any`, no `@ts-ignore`. Plain JS is not acceptable — everything is `.tsx`/`.ts`.

## Hard rules (verify every one)
1. Zero box-shadows. Depth is tone and 1px hairlines only. The Tailwind
   `boxShadow` scale is `{none}` — there is no shadow utility to reach for.
2. Zero gradients. `backgroundImage` is `{}` — no gradient utility exists.
3. No border-radius on images, product tiles, or cards. `rounded-control` (2px)
   on buttons and inputs. `rounded-chip` (999px) on size chips only. Nothing else.
4. No icons except the six care symbols and the chevron in `components/CareSymbols.tsx`.
5. No photography of people. Product surfaces use `<GarmentBlock>` — a flat
   colour block with the product name in mono.
6. No emoji anywhere, in code, copy or comments.
7. Every price renders through `<Price>` (already `tabular-nums`). Any other
   number that is data gets `className="tabular"`.
8. Sentence case for all headings and buttons. Never Title Case. UPPERCASE only
   on mono micro-labels (the `.label` class).
9. Max two typographic weights on any screen: 400 and 500. Nothing else exists
   in the Tailwind `fontWeight` scale.
10. Do not centre the hero.
11. Zero exclamation marks anywhere on the site.

## Banned outright
Gradients of any kind, glassmorphism, backdrop-blur, floating blobs, mesh/aurora,
centred hero with two pill buttons, feature cards as rounded icon in a tinted
square, `rounded-2xl`, grey logo rows, marquee strips.
Cream/oat grounds, display serifs, terracotta accents.
Pastel baby-blue and baby-pink, bubble typefaces, script faces, teddy bears,
storks, prams, rattles, clouds, rainbows, moons, stars, footprints, hearts,
confetti, sparkles, bouncing entrances.
Banned words: "little one", "bundle of joy", "tiny humans", "precious",
"magical", "snuggle", "cosy", "wrapped in love", "journey". No alliterative puns.

## Colour — use the Tailwind names, never raw hex
`field` page ground · `chalk` lifted surfaces · `ink` all text · `slate` secondary
text · `moss` THE accent · `sprout` scalpel · `rule` every hairline.
`sprout` never fills a button, never sits behind text, never tints a section, and
appears at most twice per viewport. It measures 1.49:1 on `field`, so it is NEVER
a text colour — where the spec asks for a sprout link, the text is `moss` with a
2px `sprout` underline.

## Type
`font-display` (Bricolage 500) · `font-body` (General Sans, default) · `font-mono`
(Geist Mono 500). Sizes: `text-display-xl`, `text-display-l`, `text-heading`,
`text-body-l`, `text-body`, `text-caption`, `text-label`, and the `.label` class
for mono micro-labels (uppercase, 0.12em, already styled).

## Layout
`.shell` = max-width 1512px + page margin 40/24/16. `.grid12` = 12 cols, 24px
gutter. `.section-y` = 128px desktop / 80px mobile. `.hairline` = full-bleed 1px
rule. Section boundaries are a hairline or nothing — never a tinted band.
Asymmetry: text on cols 1-7 or 6-12, never 3-10.
Spacing utilities exist ONLY for 4 8 12 16 24 32 48 64 96 128 176 (`p-1 p-2 p-3
p-4 p-6 p-8 p-12 p-16 p-24 p-32 p-44`) plus named component sizes
(`h-touch` 44px, `h-cta` 52px, `w-swatch` 12px, `w-swatch-lg` 20px,
`w-checkbox` 14px, `h-ruler` 320px).

## Motion — the only motion permitted
Ease `ease-gc`. `duration-micro` 160ms · `duration-hover` 200ms · `duration-swap`
180ms · `duration-entrance` 420ms · `duration-image` 700ms.
Scroll reveal via `<Reveal delayIndex={n}>` — sections only, never words.
Product image hover: `scale(1.03)` over 700ms inside `overflow-hidden` (already
in `<GarmentBlock hoverable>`). Link hover: colour to `moss` over 160ms.
Nothing else. No page transitions, parallax, counters, typewriter, carousels.
Every transform must carry `motion-reduce:transform-none`.

## Accessibility (hard gate)
- `focus-visible` is never suppressed; the global 2px sprout ring at 2px offset
  is already set. Do not add `outline-none` anywhere.
- Every touch target >= 44px (`min-h-touch`).
- One `<h1>` per page, correct heading order, no skipped levels.
- `<button>` for actions, `<a>`/`<Link>` for navigation.
- Every interactive control has an accessible name.
- Colour is never the only carrier of meaning.

## Metadata
Every route exports `metadata` with `title`, `description`, and `openGraph`
(title + description at minimum).

## Existing API — import these, do not reimplement
- `@/lib/products` — `PRODUCTS`, `Product`, `productBySlug`, `productsInBand`,
  `formatPrice`, `COLOURWAY_FILL`, `Colourway`
- `@/lib/sizes` — `SIZE_BANDS`, `SizeBand`, `bandForCm`, `bandIndexForCm`,
  `clampCm`, `RULER_MIN_CM`, `RULER_MAX_CM`
- `@/lib/categories` — `CATEGORIES`
- `@/lib/journal` — `JOURNAL`
- `@/lib/site` — `SITE`, `NAV`, `FOOTER_HELP`, `FOOTER_ABOUT`
- `@/components/ProductTile` — `<ProductTile product>`, `<ProductGrid products columns>`
- `@/components/GarmentBlock` — `<GarmentBlock name detail hoverable>`
- `@/components/Price` — `<Price price wasPrice className>`
- `@/components/Swatches` — `<Swatches colourways>`
- `@/components/Reveal` — `<Reveal delayIndex as className>`
- `@/components/CareSymbols` — `CARE_SYMBOLS`, `<CareStrip>`, `<Chevron>`
- `@/components/NewsletterForm` — `<NewsletterForm tone="moss" | "sprout">`
- `@/components/GrowRuler` — `<GrowRuler fallback="noscript" | "always">`, `<BandTable>`
- `@/components/CartProvider` — `useCart()` returns `{ count, add }`

## Voice
Plain, specific, dry. Buttons say what happens. Empty states give an
instruction, not a mood. Errors state what went wrong and what to do, and never
apologise. Every string must be real — no lorem, no placeholder, no TODO.
