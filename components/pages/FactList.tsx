export type Fact = {
  /** Mono micro-label, uppercased by the .label class. */
  readonly label: string;
  readonly value: React.ReactNode;
};

/**
 * Hard facts as a description list: mono label left, plain value right, one
 * hairline per row. No fill, no radius, no shadow.
 */
export function FactList({
  facts,
  className,
}: {
  readonly facts: readonly Fact[];
  readonly className?: string;
}) {
  return (
    <dl className={`border-t border-rule ${className ?? ''}`}>
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="grid grid-cols-1 gap-1 border-b border-rule py-4 sm:grid-cols-3 sm:gap-6"
        >
          <dt className="label pt-1 text-slate">{fact.label}</dt>
          <dd className="text-body text-ink sm:col-span-2">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
