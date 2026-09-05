export const SITE = {
  name: 'Green Cuddles',
  wordmark: 'GREEN CUDDLES',
  gotsCert: 'GOTS-CU-1084219',
  url: 'https://greencuddles.com',
  description:
    'A naturally dyed GOTS-certified organic cotton gift box for newborn to three years. Seven pieces, five collections, sized by centimetres.',
} as const;

export const NAV = [
  { href: '/collections', label: 'Collections' },
  { href: '/sizes', label: 'Sizes' },
  { href: '/fabric', label: 'Fabric' },
  { href: '/journal', label: 'Journal' },
] as const;

/**
 * Help has no page in the route list, and four links that go nowhere is worse
 * than one more page. /help carries the four sections as real anchors.
 */
export const FOOTER_HELP = [
  { href: '/help#shipping', label: 'Shipping' },
  { href: '/help#returns', label: 'Returns' },
  { href: '/help#care', label: 'Care' },
  { href: '/help#contact', label: 'Contact' },
] as const;

export const FOOTER_ABOUT = [
  { href: '/fabric', label: 'Fabric' },
  { href: '/fabric#certification', label: 'Certification' },
  { href: '/journal', label: 'Journal' },
] as const;

/**
 * Per-page openGraph. A page that declares its own `openGraph` replaces the
 * root object rather than merging into it, so every page builds from here and
 * keeps type, siteName, locale, url and the shared image.
 */
export function openGraphFor(input: { title: string; description: string; path: string }) {
  return {
    type: 'website' as const,
    siteName: SITE.name,
    locale: 'en_GB',
    url: `${SITE.url}${input.path}`,
    title: input.title,
    description: input.description,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — naturally dyed organic cotton, newborn to 3 years`,
      },
    ],
  };
}
