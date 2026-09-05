/**
 * The top of every interior route: h1 left on cols 1-7, optional lead beneath.
 * Never centred, never an eyebrow above the title.
 */
export function PageHeader({
  title,
  lead,
}: {
  readonly title: string;
  readonly lead?: string;
}) {
  return (
    <header className="shell pt-24 pb-16">
      <div className="grid12">
        <div className="col-span-12 lg:col-span-7">
          <h1 className="text-display-l text-ink">{title}</h1>
          {lead === undefined ? null : (
            <p className="mt-6 max-w-measure text-body-l text-ink">{lead}</p>
          )}
        </div>
      </div>
    </header>
  );
}
