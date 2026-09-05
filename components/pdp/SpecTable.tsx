import type { SpecRow } from '@/lib/products';

/**
 * Mono label left, value right, one hairline per row. A real table, because the
 * rows are label/value pairs and a screen reader should be told so.
 */
export function SpecTable({
  rows,
  className,
}: {
  readonly rows: readonly SpecRow[];
  readonly className?: string;
}) {
  return (
    <table className={`w-full border-collapse ${className ?? ''}`}>
      <caption className="label pb-4 text-left text-slate">Specification</caption>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-b border-rule">
            <th scope="row" className="label w-1/3 py-3 text-left align-top text-slate">
              {row.label}
            </th>
            <td className="py-3 pl-6 text-right align-top text-caption text-ink">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
