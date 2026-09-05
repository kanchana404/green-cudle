import Link from 'next/link';
import { GarmentBlock } from '@/components/GarmentBlock';
import { CollectionSwatch } from '@/components/CollectionSwatch';
import { Price } from '@/components/Price';
import { BOX_PRICE, BOX_WAS_PRICE, PIECE_COUNT, type Collection } from '@/lib/collections';
import { collectionImage } from '@/lib/media';

export function CollectionTile({
  collection,
  sizes = '(min-width: 1024px) 33vw, 50vw',
  priority = false,
}: {
  readonly collection: Collection;
  readonly sizes?: string;
  readonly priority?: boolean;
}) {
  return (
    <article className="group">
      <Link href={`/collections/${collection.slug}`} className="block">
        <GarmentBlock
          name={collection.name}
          detail={collection.colourName}
          image={collectionImage(
            collection.slug,
            `${collection.name}: cotton dyed with ${collection.dyeSource.toLowerCase()}`
          )}
          sizes={sizes}
          priority={priority}
          hoverable
        />
        <h3 className="mt-4 text-body font-medium text-ink transition-colors duration-micro ease-gc group-hover:text-moss">
          {collection.name}
        </h3>
      </Link>
      <Price price={BOX_PRICE} wasPrice={BOX_WAS_PRICE} className="mt-1 text-body" />
      <p className="label mt-3 text-slate">
        <span className="tabular">{PIECE_COUNT}</span> pieces <span aria-hidden="true">/</span>{' '}
        {collection.dyeSource}
      </p>
      <div className="mt-3 flex items-center gap-2">
        <CollectionSwatch collection={collection} />
        <span className="label text-slate">{collection.colourName}</span>
      </div>
    </article>
  );
}

export function CollectionGrid({ collections }: { readonly collections: readonly Collection[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
      {collections.map((collection, index) => (
        <CollectionTile key={collection.slug} collection={collection} priority={index === 0} />
      ))}
    </div>
  );
}
