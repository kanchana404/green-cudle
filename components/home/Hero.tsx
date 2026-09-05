import Link from 'next/link';
import { GarmentBlock } from '@/components/GarmentBlock';
import { productImage } from '@/lib/media';
import { productBySlug } from '@/lib/products';
import { SITE } from '@/lib/site';

/** The garment shown beside the headline. */
const HERO_PRODUCT = productBySlug('second-skin-bodysuit');

type CareCell = {
  readonly label: string;
  readonly value: string;
  /** True where the value is a figure or a certificate code. */
  readonly tabular: boolean;
};

/** The four cells printed on the neck label of every garment we make. */
const CARE_LABEL: readonly CareCell[] = [
  { label: 'FABRIC', value: '100% ORG. COTTON', tabular: true },
  { label: 'WEIGHT', value: HERO_PRODUCT ? HERO_PRODUCT.weight.replace(' RIB', '') : '180 GSM', tabular: true },
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
  const wide = index > 0 ? 'sm:border-l sm:border-t-0' : 'sm:border-l-0 sm:border-t-0';
  return `${left} ${top} ${wide}`;
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="section-y">
      <div className="shell">
        <div className="grid12">
          {/* Cols 1-7. Never centred. */}
          <div className="col-span-12 lg:col-span-7">
            <p className="label tabular text-slate">
              NEWBORN — 3 YEARS <span aria-hidden="true">/</span> UNDYED GOTS COTTON
            </p>

            <h1 id="hero-heading" className="mt-6 text-display-xl text-ink">
              {"Clothes for skin that's four days old."}
            </h1>

            <p className="mt-8 max-w-measure text-body-l text-slate">
              Flat-seam, envelope-neck, undyed organic cotton. Sized by centimetres instead of
              guesswork, so the thing you order actually fits the baby you have.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Link
                href="/shop"
                className="inline-flex h-cta items-center rounded-control bg-moss px-6 text-body text-field transition-colors duration-micro ease-gc hover:bg-ink"
              >
                Shop everything
              </Link>
              <Link
                href="/sizes"
                className="inline-flex min-h-touch items-center text-body text-ink underline decoration-1 underline-offset-4 transition-colors duration-micro ease-gc hover:text-moss"
              >
                How sizing works
              </Link>
            </div>
          </div>

          {/* Cols 8-12. Flat chalk block, then the care label beneath it. */}
          <div className="col-span-12 mt-16 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <GarmentBlock
              name={HERO_PRODUCT ? HERO_PRODUCT.name : 'Second Skin Bodysuit'}
              detail={HERO_PRODUCT ? HERO_PRODUCT.weight : '180 GSM RIB'}
              image={
                HERO_PRODUCT
                  ? productImage(HERO_PRODUCT.slug, `${HERO_PRODUCT.name}, ${HERO_PRODUCT.weight}`)
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
      </div>
    </section>
  );
}
