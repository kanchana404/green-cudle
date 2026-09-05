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

## What each file is, and where it goes

| File | Contents | Where it appears |
| --- | --- | --- |
| `brand/greencuddle-logo-roundel.png` | Circular Greencuddle logo | Header brand mark, every page |
| `brand/greencuddle-logo-dark.png` | The logo on black, with "BABY WEAR / SRI LANKA" | Footer brand band, on `--ink` |
| `brand/greencuddle-coming-soon.jpg` | Launch card: parcel, kraft tag, "Coming soon" | `/journal`, captioned "From the archive" |
| `brand/greencuddle-packaging.jpg` | Kraft mailer, embroidered patch, ribbon, tag | `/help#shipping`; the Newborn Kit tile; every product page as "AS IT ARRIVES" |
| `textiles/dye-swatches-warm.jpg` | Natural-dye swatch flat-lay, warm range | `/fabric`, the dye section |
| `textiles/dye-swatches-cool-mattricaria.jpg` | Natural-dye swatch flat-lay, cool range | `/fabric`, credited to Mattricaria in the caption |
| `textiles/turmeric-dye-process.jpg` | Cloth lifted from a dye bath | `/fabric`, "Lifted from the bath, before the rinse" |
| `garments/bodysuits-tiedye-thirdparty.jpg` | Five tie-dyed baby bodysuits | Cropped into seven product images, see below |

## The garment photograph, and the crops taken from it

`garments/bodysuits-tiedye-thirdparty.jpg` is the only photograph of actual baby
clothing in the set, so the product grid is built from it. Three of the five
garments in the frame carry a visible **Gerber** neck label.

Every crop in `public/media/products/` was checked against a contact sheet and
cut to exclude those labels. Six label-free regions were found and used, plus
the packaging photograph for the Newborn Kit, which is a boxed set and so is
the honest image for it. The uncropped original is kept in `garments/`.

**Two things to settle before this goes live:**

1. The neck labels are another company's trademark. The crops avoid them, but
   the garments in frame are not Green Cuddles garments. Replace this photograph
   with your own shoot before the site takes an order.
2. The garments are tie-dyed in pinks, blues and ochres. The site's copy sells
   undyed cotton in a cool green palette. The photography and the words are
   currently telling different stories.

## Safety

Nothing about the relocation changed the files: the crops are new derivatives,
the originals are byte-identical to what arrived. All eight passed the checks in
the table above before anything was moved.
