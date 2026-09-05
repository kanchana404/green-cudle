import { formatPrice } from '@/lib/products';

/** Every price is tabular. Reduced prices carry a 1px strike, no colour cue. */
export function Price({
  price,
  wasPrice,
  className,
}: {
  readonly price: number;
  readonly wasPrice?: number | undefined;
  readonly className?: string;
}) {
  return (
    <p className={`tabular ${className ?? 'text-body'}`}>
      {wasPrice === undefined ? null : (
        <>
          <span className="text-slate line-through decoration-slate decoration-1">
            {formatPrice(wasPrice)}
          </span>{' '}
        </>
      )}
      <span className="text-ink">{formatPrice(price)}</span>
      {wasPrice === undefined ? null : <span className="sr-only"> reduced from {formatPrice(wasPrice)}</span>}
    </p>
  );
}
