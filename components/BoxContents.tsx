import { BOX_CONTENTS, PIECE_COUNT } from '@/lib/collections';

/**
 * The seven pieces. Identical in every collection, so this is stated once and
 * reused wherever the box is described.
 */
export function BoxContents({ caption }: { readonly caption?: string }) {
  return (
    <table className="w-full border-collapse text-left">
      <caption className="label pb-6 text-left text-slate">
        {caption ?? `What is in the box — ${PIECE_COUNT} pieces`}
      </caption>
      <thead>
        <tr className="border-b border-rule">
          <th scope="col" className="label py-3 text-slate">
            Piece
          </th>
          <th scope="col" className="label py-3 text-slate">
            Qty
          </th>
          <th scope="col" className="label hidden py-3 text-slate sm:table-cell">
            Weight
          </th>
        </tr>
      </thead>
      <tbody>
        {BOX_CONTENTS.map((piece) => (
          <tr key={piece.name} className="border-b border-rule align-top">
            <th scope="row" className="py-4 pr-4 text-body font-medium text-ink">
              {piece.name}
              <span className="label mt-1 block font-normal text-slate">{piece.detail}</span>
            </th>
            <td className="label tabular py-4 pr-4 text-ink">{piece.quantity}</td>
            <td className="label hidden py-4 text-slate sm:table-cell">{piece.weight}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
