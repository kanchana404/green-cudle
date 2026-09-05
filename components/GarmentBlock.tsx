import Image from 'next/image';
import { collectionDetailImage, collectionImage, type Media } from '@/lib/media';

/**
 * The product surface. Square, flat, no radius, no border, no shadow.
 * Given a photograph it renders one; without one it falls back to a solid
 * colour block carrying the product name in mono, per section 3.5.
 */
export function GarmentBlock({
  name,
  detail,
  image,
  className,
  hoverable = false,
  priority = false,
  quality,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
}: {
  readonly name: string;
  readonly detail?: string;
  readonly image?: Media | undefined;
  readonly className?: string;
  readonly hoverable?: boolean;
  readonly priority?: boolean;
  readonly quality?: number | undefined;
  readonly sizes?: string;
}) {
  return (
    <div className={`relative aspect-square overflow-hidden bg-chalk ${className ?? ''}`}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          className={
            hoverable
              ? 'object-cover transition-transform duration-image ease-gc group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none'
              : 'object-cover'
          }
        />
      ) : (
        <div
          className={
            hoverable
              ? 'absolute inset-0 bg-chalk transition-transform duration-image ease-gc group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none'
              : 'absolute inset-0 bg-chalk'
          }
        />
      )}

      {/* The mono caption sits on a hairline-topped bar so it stays legible
          over photography without tinting the image or adding a gradient. */}
      <div className="absolute inset-x-0 top-0 flex justify-start p-4">
        {detail ? (
          <span className="label bg-chalk px-2 py-1 text-slate">{detail}</span>
        ) : null}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-start p-4">
        <span className="label bg-chalk px-2 py-1 text-ink">{name}</span>
      </div>
    </div>
  );
}

export { collectionImage, collectionDetailImage };
