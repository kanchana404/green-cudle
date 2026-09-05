/**
 * One deep-linkable block on /help. Heading on cols 1-5, answer on cols 7-12.
 * Scroll margin clears the 64px sticky header when the footer links land here.
 */
export function HelpSection({
  id,
  title,
  meta,
  children,
}: {
  readonly id: string;
  readonly title: string;
  /** Mono micro-label under the heading. The one-line version of the answer. */
  readonly meta: string;
  readonly children: React.ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-24">
      <div className="shell section-y">
        <div className="grid12">
          <div className="col-span-12 lg:col-span-5">
            <h2 id={headingId} className="text-heading text-ink">
              {title}
            </h2>
            <p className="label mt-4 text-slate">{meta}</p>
          </div>
          <div className="col-span-12 mt-8 lg:col-span-6 lg:col-start-7 lg:mt-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
