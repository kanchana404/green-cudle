import type { Metadata } from 'next';
import { BoxContents } from '@/components/BoxContents';
import { CollectionGrid } from '@/components/CollectionTile';
import { PageHeader } from '@/components/pages/PageHeader';
import { COLLECTIONS, PIECE_COUNT } from '@/lib/collections';
import { SITE, openGraphFor } from '@/lib/site';

const DESCRIPTION =
  'Five naturally dyed collections of the same seven-piece gift box. Turmeric, madder, logwood, indigo and walnut hull, on GOTS-certified organic cotton.';

export const metadata: Metadata = {
  title: 'Collections',
  description: DESCRIPTION,
  openGraph: openGraphFor({
    title: `Collections — ${SITE.name}`,
    description: DESCRIPTION,
    path: '/collections',
  }),
};

const LEAD =
  'One box, five colours. The seven pieces inside are the same whichever you choose; what changes is what the cotton was dyed with.';

export default function CollectionsPage() {
  return (
    <>
      <PageHeader title="Collections" lead={LEAD} />

      <div className="hairline" />

      <section aria-labelledby="grid-heading" className="shell section-y">
        <h2 id="grid-heading" className="label text-slate">
          <span className="tabular">{COLLECTIONS.length}</span> collections
        </h2>
        <div className="mt-12">
          <CollectionGrid collections={COLLECTIONS} />
        </div>
      </section>

      <div className="hairline" />

      <section aria-labelledby="contents-heading" className="shell section-y">
        <div className="grid12">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="contents-heading" className="text-display-l text-ink">
              The same <span className="tabular">{PIECE_COUNT}</span> pieces, every time.
            </h2>
            <p className="mt-8 max-w-measure text-body text-slate">
              We do not vary the contents by collection. Choosing a colour should not mean giving up
              the sleepsuit, and comparing two boxes should be a question of dye and nothing else.
            </p>
          </div>
          <div className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <BoxContents />
          </div>
        </div>
      </section>
    </>
  );
}
