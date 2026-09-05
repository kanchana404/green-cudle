/**
 * The product surface. We hold no photograph of a Green Cuddles garment, so
 * section 3.5 applies: a solid colour block carrying the product name in mono.
 * Square, flat, no radius, no border, no shadow.
 */
export function GarmentBlock({
  name,
  detail,
  className,
  hoverable = false,
}: {
  readonly name: string;
  readonly detail?: string;
  readonly className?: string;
  readonly hoverable?: boolean;
}) {
  return (
    <div className={`relative aspect-square overflow-hidden bg-chalk ${className ?? ''}`}>
      <div
        className={
          hoverable
            ? 'absolute inset-0 bg-chalk transition-transform duration-image ease-gc group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none'
            : 'absolute inset-0 bg-chalk'
        }
      />
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <span className="label text-slate">{detail ?? ''}</span>
        <span className="label text-ink">{name}</span>
      </div>
    </div>
  );
}
