import Link from 'next/link';
import { GarmentBlock } from '@/components/GarmentBlock';
import { COLLECTIONS } from '@/lib/collections';
import { collectionImage } from '@/lib/media';
import { SITE } from '@/lib/site';

/** The collection shown beside the headline. */
const HERO_COLLECTION = COLLECTIONS[0];

type CareCell = {
  readonly label: string;
  readonly value: string;
  /** True where the value is a figure or a certificate code. */
  readonly tabular: boolean;
};

/** The four cells printed on the label of every piece in the box. */
const CARE_LABEL: readonly CareCell[] = [
  { label: 'FABRIC', value: '100% ORG. COTTON', tabular: true },
  { label: 'WEIGHT', value: '140-220 GSM', tabular: true },
  { label: 'SEAM', value: 'FLATLOCK', tabular: false },
  { label: 'CERT', value: SITE.gotsCert, tabular: true },
];

/**
 * Cell rules, drawn between cells only. Two across below 640px, four above,
 * so the divider that separates row one from row two disappears at `sm`.
 */
function cellRule(index: number): string {
  const left = index % 2 === 1 ? 'border-l border-rule' : '';
  const top = index >= 2 ? 'border-t border-rule' : '';
  return [left, top, 'sm:border-t-0', index > 0 ? 'sm:border-l' : 'sm:border-l-0'].join(' ');
}

export function Hero() {
  return (
    <section className="shell section-y">
      <div className="grid12">
        {/* Cols 1-7. Left-aligned, never centred. */}
        <div className="col-span-12 lg:col-span-7">
          <p className="label text-slate">Newborn — 3 years / Naturally dyed GOTS cotton</p>

          <h1 className="mt-6 font-display text-display-xl text-ink">
            A naturally gentle welcome gift for little miracles.
          </h1>

          <p className="mt-8 max-w-measure text-body-l text-slate">
            Thoughtfully packaged and made with pure, clean, naturally dyed organic cotton. Give the
            priceless gift of natural comfort, flat-seam smoothness, and perfect centimeter fits.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link
              href="/collections"
              className="flex h-cta items-center rounded-control bg-moss px-6 text-body text-field transition-colors duration-micro ease-gc hover:bg-ink"
            >
              See the collections
            </Link>
            <Link
              href="/sizes"
              className="flex min-h-touch items-center text-body text-ink underline decoration-1 underline-offset-4 transition-colors duration-micro ease-gc hover:text-moss"
            >
              How sizing works
            </Link>
          </div>
        </div>

        {/* Cols 8-12. The cloth, then the label beneath it. */}
        <div className="col-span-12 mt-16 lg:col-span-5 lg:col-start-8 lg:mt-0">
          <GarmentBlock
            name={HERO_COLLECTION ? HERO_COLLECTION.name : 'Golden Root'}
            detail={HERO_COLLECTION ? HERO_COLLECTION.colourName : 'Yellow'}
            image={
              HERO_COLLECTION
                ? collectionImage(
                    HERO_COLLECTION.slug,
                    `${HERO_COLLECTION.name}: cotton dyed with ${HERO_COLLECTION.dyeSource.toLowerCase()}`
                  )
                : undefined
            }
            sizes="(min-width: 1024px) 40vw, 100vw"
            quality={65}
            priority
          />

          <dl className="mt-4 grid grid-cols-2 border-t border-rule sm:grid-cols-4">
            {CARE_LABEL.map((cell, index) => (
              <div key={cell.label} className={`p-3 ${cellRule(index)}`}>
                <dt className="label text-slate">{cell.label}</dt>
                <dd className={`label mt-2 text-ink ${cell.tabular ? 'tabular' : ''}`}>
                  {cell.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
