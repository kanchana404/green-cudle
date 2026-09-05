import { GarmentBlock } from '@/components/GarmentBlock';
import type { Collection } from '@/lib/collections';
import { MEDIA, collectionDetailImage, collectionImage } from '@/lib/media';

/**
 * Three square surfaces, stacked and scrolled with the page. Not a carousel:
 * there is nothing to page through and nothing hidden behind a control.
 * Each caption names what is actually in the frame.
 */
export function CollectionViews({ collection }: { readonly collection: Collection }) {
  const views = [
    {
      caption: 'THE CLOTH',
      image: collectionImage(
        collection.slug,
        `${collection.name}: cotton dyed with ${collection.dyeSource.toLowerCase()}`
      ),
    },
    {
      caption: 'DYE DETAIL',
      image: collectionDetailImage(
        collection.slug,
        `${collection.name}: close detail of the dye and the resist pattern`
      ),
    },
    { caption: 'AS IT ARRIVES', image: MEDIA.packaging },
  ];

  return (
    <ul aria-label={`${collection.name}, three views`} className="flex flex-col gap-6">
      {views.map((view, index) => (
        <li key={view.caption}>
          <GarmentBlock
            name={collection.name}
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
