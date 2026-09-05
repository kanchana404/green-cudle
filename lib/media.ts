/**
 * Every image on the site, with its intrinsic size, so `next/image` always has
 * explicit dimensions and nothing shifts while it loads.
 */
export type Media = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
};

/** Brand marks and photography supplied by Green Cuddles. */
export const MEDIA = {
  logo: {
    src: '/media/brand/greencuddle-logo-roundel.png',
    width: 1254,
    height: 1254,
    alt: 'Green Cuddles roundel: a sleeping baby, a cotton boll and laurel leaves',
  },
  logoDark: {
    src: '/media/brand/greencuddle-logo-dark.png',
    width: 1536,
    height: 1024,
    alt: 'Green Cuddles wordmark and roundel, baby wear made in Sri Lanka',
  },
  announcement: {
    src: '/media/brand/greencuddle-coming-soon.jpg',
    width: 1254,
    height: 1254,
    alt: 'Green Cuddles launch announcement: a wrapped cotton parcel with a kraft gift tag',
  },
  packaging: {
    src: '/media/brand/greencuddle-packaging.jpg',
    width: 1080,
    height: 1179,
    alt: 'A Green Cuddles order: kraft mailer box, embroidered patch, cotton ribbon and a recycled-paper tag',
  },
  dyeCool: {
    src: '/media/textiles/dye-swatches-cool-mattricaria.jpg',
    width: 1200,
    height: 1754,
    alt: 'Cotton swatches dyed with plant material in sage, indigo, olive and celadon, laid out in a grid',
  },
  dyeWarm: {
    src: '/media/textiles/dye-swatches-warm.jpg',
    width: 1167,
    height: 1500,
    alt: 'Cotton swatches dyed with onion skin, marigold and walnut, laid out with the plants that made them',
  },
  dyeProcess: {
    src: '/media/textiles/turmeric-dye-process.jpg',
    width: 966,
    height: 1305,
    alt: 'Freshly dyed cotton lifted from a turmeric bath and hung to drip dry',
  },
} as const satisfies Record<string, Media>;

/** The square garment shot for a product, plus its detail crop. */
export function productImage(slug: string, alt: string): Media {
  return { src: `/media/products/${slug}.jpg`, width: 1000, height: 1000, alt };
}

export function productDetailImage(slug: string, alt: string): Media {
  return { src: `/media/products/${slug}-detail.jpg`, width: 800, height: 800, alt };
}
