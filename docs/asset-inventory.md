# Image inventory

Eight files arrived in `drive-download-20260905T131427Z-1-001`. All eight were
relocated into `public/media/`, renamed to describe their contents, and cleared
of the Chrome download quarantine flag.

## Safety check

Every file was verified before it was moved:

| Check | Result |
| --- | --- |
| `file(1)` type matches extension | Pass, all 8 |
| Magic bytes (`89504E47` PNG / `FFD8FF` JPEG) | Pass, all 8 |
| Embedded script or executable signatures (`<?php`, `<script`, `#!`, `MZ`, `eval(`, `base64_decode`, `powershell`) | None found |
| Appended archive payload (`PK\x03\x04`, `Rar!`, `7z`) — the polyglot trick | None found |
| GPS / geolocation EXIF | None present |
| `com.apple.quarantine` on the copies | Stripped |

`com.apple.provenance` remains on the copies. It is a kernel-set, SIP-owned
attribute, it is not removable by the user, and it triggers nothing.

## What each file is, and where it went

| File | Contents | Used on the site |
| --- | --- | --- |
| `brand/greencuddle-logo-roundel.png` | Circular Greencuddle logo: script wordmark, illustrated sleeping baby in a bear-eared bonnet, bunny, cotton bolls, cream ground | No |
| `brand/greencuddle-logo-dark.png` | The same logo on black with a glow, tagline "naturally dyed / softly loved", "BABY WEAR / SRI LANKA" | No |
| `brand/greencuddle-coming-soon.jpg` | Social post: stork carrying a wrapped parcel, "Something special is on its way", "Coming soon", hearts, kraft tag reading "For your little miracle" | No |
| `brand/greencuddle-packaging.jpg` | Kraft mailer box with an embroidered logo patch, green ribbon, thank-you tag, dried flowers, cream linen ground | No |
| `textiles/dye-swatches-warm.jpg` | Natural-dye swatch flat-lay: pink, orange, ochre, brown, on cream linen | No |
| `textiles/dye-swatches-cool-mattricaria.jpg` | Natural-dye swatch flat-lay: blue, sage, olive, celadon. Carries a visible credit, "Foto cedida por MATTRICARIA" | No |
| `textiles/turmeric-dye-process.jpg` | A person holding a turmeric-dyed adult tank top over a dye bath | No |
| `garments/bodysuits-tiedye-thirdparty.jpg` | Five baby bodysuits, tie-dyed, on a wooden floor, with visible **Gerber** brand labels | No |

## Why none of them is on the rendered site

None of the eight can be used as Green Cuddles product imagery without breaking a
hard rule in the brief:

- **`turmeric-dye-process.jpg`** — section 3.5 forbids photography of people. It
  also shows an adult garment.
- **`bodysuits-tiedye-thirdparty.jpg`** — the garments carry another company's
  trademark on the neck label. Presenting them as Green Cuddles product would
  misrepresent whose product it is. Separately it fails three style rules: the
  brand is undyed and these are tie-dyed; the palette includes the pastel
  baby-blue and baby-pink banned in section 4; and it is shot at an angle on a
  wooden floor rather than square on flat colour.
- **`dye-swatches-cool-mattricaria.jpg`** — carries a third-party photo credit
  burned into the image. Cropping it out would remove an attribution.
- **`dye-swatches-warm.jpg`** — warm-toned on a cream ground, against a brief
  that is explicitly cool-toned and bans cream grounds near `#F4F1EA`. It also
  depicts dyeing for a brand whose entire proposition is undyed.
- **The four brand files** — they are the cream-ground, script-face,
  illustrated-teddy, warm-kraft aesthetic that section 4 bans by name, item by
  item: script faces, teddy bears, storks, hearts, and the phrase "little
  miracle". They also carry the tagline "naturally dyed", which contradicts the
  undyed positioning the brief specifies.

Section 3.5 gives the instruction for exactly this case: *where you have no
asset, use a solid colour block with the product name in mono*. That is what
`components/GarmentBlock.tsx` renders, on every product surface.

The files are kept in the repository because they are the client's own identity
assets and they will be needed for packaging, invoices and social. They are not
referenced by any component, so Next does not serve them to visitors unless
someone requests the path directly.
