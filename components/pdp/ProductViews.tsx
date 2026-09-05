import { GarmentBlock } from '@/components/GarmentBlock';
import { MEDIA, productDetailImage, productImage } from '@/lib/media';

/**
 * Three square surfaces, stacked and scrolled with the page. Not a carousel:
 * there is nothing to page through and nothing hidden behind a control.
 *
 * The captions name what is actually in each frame rather than promising a
 * front/back/seam set we do not photograph.
 */
export function ProductViews({ name, slug }: { readonly name: string; readonly slug: string }) {
  const views = [
    { caption: 'GARMENT', image: productImage(slug, `${name}, full view`) },
    { caption: 'FABRIC DETAIL', image: productDetailImage(slug, `${name}, close detail of the knit`) },
    { caption: 'AS IT ARRIVES', image: MEDIA.packaging },
  ];

  return (
    <ul aria-label={`${name}, three views`} className="flex flex-col gap-6">
      {views.map((view, index) => (
        <li key={view.caption}>
          <GarmentBlock
            name={name}
            detail={view.caption}
            image={view.image}
            sizes="(min-width: 1024px) 55vw, 100vw"
            quality={index === 0 ? 65 : undefined}
            priority={index === 0}
          />
        </li>
      ))}
    </ul>
  );
}
