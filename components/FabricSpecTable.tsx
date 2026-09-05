import { FABRIC_SPEC } from '@/lib/fabric';

/**
 * Mono labels left, General Sans values right, one 1px rule under every row.
 * Shared by the homepage fabric section and /fabric.
 */
export function FabricSpecTable({
  caption = 'Fabric specification',
  className,
}: {
  /** Table name. Read out, not drawn — the section heading carries it visually. */
  readonly caption?: string;
  readonly className?: string;
}) {
  return (
    <table className={`w-full border-collapse text-left ${className ?? ''}`}>
      <caption className="sr-only">{caption}</caption>
      <tbody>
        {FABRIC_SPEC.map((row) => (
          <tr key={row.label} className="border-b border-rule">
            <th scope="row" className="label w-32 py-4 pr-6 align-top font-medium text-slate">
              {row.label}
            </th>
            <td className={`py-4 align-top text-body text-ink ${row.tabular ? 'tabular' : ''}`}>
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
