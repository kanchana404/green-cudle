import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/pages/PageHeader';
import { JOURNAL } from '@/lib/journal';
import { MEDIA } from '@/lib/media';
import { SITE, openGraphFor } from '@/lib/site';

const DESCRIPTION =
  'Working notes from Green Cuddles on construction, certification and sizing, published when a decision is made rather than on a schedule.';

export const metadata: Metadata = {
  title: 'Journal',
  description: DESCRIPTION,
  openGraph: openGraphFor({
    title: `Journal — ${SITE.name}`,
    description: DESCRIPTION,
    path: '/journal',
  }),
};

const LEAD =
  'Notes on construction, certification and sizing, written up when a decision gets made rather than on a publishing schedule.';

export default function JournalPage() {
  return (
    <>
      <PageHeader title="Journal" lead={LEAD} />

      <div className="hairline" />

      <div className="shell section-y">
        <ul className="border-t border-rule">
          {JOURNAL.map((entry) => (
            <li key={entry.slug} className="border-b border-rule">
              <article className="grid12 items-baseline py-8">
                <p className="label tabular col-span-12 text-slate md:col-span-2">{entry.date}</p>
                <h2 className="col-span-12 mt-3 text-heading text-ink md:col-span-9 md:col-start-4 md:mt-0">
                  {entry.title}
                </h2>
              </article>
            </li>
          ))}
        </ul>

        <figure className="mt-16 grid12">
          <div className="col-span-12 md:col-span-5">
            <Image
              src={MEDIA.announcement.src}
              alt={MEDIA.announcement.alt}
              width={MEDIA.announcement.width}
              height={MEDIA.announcement.height}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="col-span-12 mt-6 self-end md:col-span-6 md:col-start-7 md:mt-0">
            <p className="label text-slate">From the archive</p>
            <p className="mt-3 max-w-measure text-body text-ink">
              The card that went out the month before the first run shipped. We kept it because it
              is the last thing we published before there was anything to sell.
            </p>
          </figcaption>
        </figure>
      </div>
    </>
  );
}
