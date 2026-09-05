import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { JOURNAL } from '@/lib/journal';

/** Three entries, one row, no images. The title moves 8px right on hover. */
export function Journal() {
  return (
    <section aria-labelledby="journal-heading" className="section-y">
      <Reveal className="shell">
        <h2 id="journal-heading" className="label text-slate">
          From the journal
        </h2>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {JOURNAL.slice(0, 3).map((entry) => (
            <li key={entry.slug} className="border-b border-rule">
              <Link href="/journal" className="group flex min-h-touch flex-col gap-3 pb-8">
                <span className="label tabular text-slate">{entry.date}</span>
                <h3 className="text-heading text-ink transition-transform duration-hover ease-gc group-hover:translate-x-2 motion-reduce:transform-none">
                  {entry.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
