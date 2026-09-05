# Deviations from the brief

Every one of these is a place where two instructions in the brief could not both
be satisfied. In each case the quieter, more precise option was taken.

## 1. `--slate` darkened from `#6E786C` to `#626C60`

Section 5 fixes `--slate` at `#6E786C`. Section 13 requires all body text to hit
4.5:1 against its ground and calls out `--slate` on `--field` specifically.

`#6E786C` on `#E9EDE4` measures **3.88:1**. It fails. Since `--slate` is
specified for captions and secondary text at 0.8125rem, the large-text
exemption does not apply.

`#626C60` is the same hue, darkened until it clears the gate: **4.62:1** on
`--field`, **5.14:1** on `--chalk`. The original value is retained in
`app/globals.css` as `--slate-spec` for reference. Asserted by
`scripts/contrast.mjs`.

## 2. `--sprout` is never a text colour

Section 5 says `--sprout` never sits behind text. The `/shop/[slug]` spec then
asks for a `--sprout` link reading "Not sure? Measure instead".

`--sprout` on `--field` measures **1.49:1**. As link text it would be
unreadable.

The link text renders in `--moss` (6.37:1) with a 2px `--sprout` underline, so
`--sprout` remains the high-signal marker without carrying the glyphs. The
trailing arrow is the sanctioned chevron rather than a literal character.

## 3. Checkbox and input borders use `--slate`, not `--rule`

Section 9 specifies checkboxes with a 1px `--rule` border. `--rule` on `--chalk`
measures **1.44:1**, below the 3:1 WCAG requirement for the boundary of a UI
control.

Pure dividers and section hairlines keep `--rule` exactly as specified — a
decorative divider has no contrast requirement. Only the boundaries of
interactive controls take `--slate` (4.31:1 and up).

## 4. A `/help` route was added

Section 8 lists six routes and requires that none 404. The footer specification
then requires a Help column naming Shipping, Returns, Care and Contact, none of
which has a page.

`/help` carries all four as real anchored sections. One extra page is better
than four dead links, and it keeps the no-404 rule intact.

## 5. No photograph appears on the site

Section 3.5 requires a solid colour block with the product name in mono where no
asset exists. None of the eight supplied images can serve as Green Cuddles
product imagery without breaking a hard rule — one shows a person, one shows
another company's trademarked garments, one carries a third-party photo credit,
and the rest are the exact cream-ground, script-face, illustrated-teddy
aesthetic section 4 bans by name.

The full file-by-file reasoning is in `docs/asset-inventory.md`. Every product
surface renders `components/GarmentBlock.tsx`.

Because nothing renders a raster image, `next/image` is not imported anywhere.
The rule it exists to enforce — zero CLS from images — holds trivially.

## 6. 80px and 40px sit outside the spacing scale

Section 7 fixes the spacing scale at 4/8/12/16/24/32/48/64/96/128/176, then
specifies a mobile section rhythm of 80px and a desktop page margin of 40px.
Neither is a step on that scale.

Both are implemented as layout constants (`--section-y`, `--page-margin`) rather
than being added to the Tailwind spacing scale, so the rhythm available to
components stays exactly as specified.

## 7. TypeScript pinned to 5.x

TypeScript 6 rejects the side-effect CSS import in `app/layout.tsx`, because
Next 15's shipped type declarations predate the check. Pinned to 5.9 — the
version Next 15 targets — rather than adding a shim declaration file to work
around it. Strict mode is on, plus `noUncheckedIndexedAccess`.

## 8. `postcss` overridden

`npm audit` reports four advisories against the `postcss` copy bundled inside
Next 15. `npm audit fix --force` resolves them by installing Next 16, which
breaks the locked stack. An `overrides` entry pins `postcss` to `^8.5.28`
everywhere instead: zero vulnerabilities, Next stays on 15.

## 9. `--sprout` fills the newsletter "Join" button

Section 5 says `--sprout` never fills a button. The newsletter specification in
section 9 then asks for exactly that: *inline field + "Join" in `--sprout` with
`--ink` text*, inside the full-bleed `--moss` band.

The specific instruction wins over the general one here, because the general
rule exists to protect legibility and this particular use does not threaten it:
`--ink` on `--sprout` measures **9.22:1**, and the band is the only place on
that viewport where `--sprout` appears. Asserted by `scripts/contrast.mjs`.

Everywhere else the rule holds: `--sprout` is the ruler marker and the focus
ring, and nothing else.

## 10. The verbatim fabric paragraph contradicts the spec table

Two strings the brief supplies verbatim disagree with each other.

The fabric paragraph (section 9) states: *One fibre. No dye, no softener, no
optical brightener, no formaldehyde resin.*

The spec table row in the same section states: *DYE — None. Undyed across every
colourway except Moss and Sprout, which use GOTS-approved low-impact dye.*

Five of the eight products ship a Moss colourway and one ships Sprout, so the
exception covers most of the catalogue rather than an edge case.

Both strings are reproduced exactly as given, because section 9 forbids
rewriting them. Every other piece of copy on `/fabric` and `/help` was written
to match the spec table rather than the paragraph — the natural colourways carry
no dye, and Moss and Sprout are dyed low-impact. **This one clash needs the
client to decide which of their two sentences is true**; it is the only
unresolved contradiction in the build.

## 11. Scroll-reveal delay is per-section, not page-monotonic

Section 11 asks for a 70ms stagger on scroll reveals. Applied as a running index
down the page, that is not a stagger: sections never enter the viewport
together, so the fifth section simply waits 280ms after it is already 30%
visible before starting to fade.

`<Reveal>` still takes `delayIndex` and still staggers, but the homepage passes
nothing, so each section reveals on its own arrival. The stagger is reserved for
siblings that appear in the same intersection, which is what it is for.

## 12. `ring-*` utilities are banned alongside `box-shadow`

Tailwind compiles `ring-1` to a `box-shadow` declaration, so a ring silently
breaks hard rule 1 while passing any grep for "shadow". The selected colourway
swatch on `/shop/[slug]` originally used `ring-1`; it now uses
`outline outline-1 outline-ink outline-offset-4`, which renders identically and
emits no shadow.

`scripts/check-css.mjs` compiles the real stylesheet and asserts on the CSS that
actually ships, which is the only reliable way to catch this class of problem.
