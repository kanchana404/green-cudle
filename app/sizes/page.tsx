import type { Metadata } from 'next';
import { GrowRuler } from '@/components/GrowRuler';
import { PageHeader } from '@/components/pages/PageHeader';
import { SITE, openGraphFor } from '@/lib/site';

const DESCRIPTION =
  'Green Cuddles sizes by height in centimetres, not by age. The seven bands from 44cm to 96cm, and how to measure a baby lying down.';

export const metadata: Metadata = {
  title: 'Sizes',
  description: DESCRIPTION,
  openGraph: openGraphFor({
    title: `Sizes — ${SITE.name}`,
    description: DESCRIPTION,
    path: '/sizes',
  }),
};

const LEAD =
  'Sizes here are height bands in centimetres, because two babies of the same height take the same garment whether one reached it in four months and the other in nine. The age printed beside each band is a convenience for people buying gifts; the centimetre range is what the pattern was drafted from.';

const MEASURE_STEPS: readonly string[] = [
  'Lay the baby flat on their back on a firm surface, with the crown of the head touching a wall or a hardback book stood on its edge.',
  'Mark the surface at the crown, then straighten one leg fully, flex the foot to a right angle, and mark again at the heel.',
  'Lift the baby off and measure between the two marks with a tape. Round to the nearest centimetre and read that number off the rule above.',
];

export default function SizesPage() {
  return (
    <>
      <PageHeader title="Sizes" lead={LEAD} />

      <div className="hairline" />

      <div className="section-y">
        <GrowRuler fallback="always" />
      </div>

      <div className="hairline" />

      <section aria-labelledby="measure-heading" className="shell section-y">
        <div className="grid12">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="measure-heading" className="text-heading text-ink">
              How to measure
            </h2>
            <p className="mt-6 max-w-measure text-body text-slate">
              Measure lying down until the child can stand still with their heels against a wall,
              which is usually somewhere in the second year. A standing measurement taken before
              then reads short, because the knees are never quite straight.
            </p>
          </div>

          <ol className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
            {MEASURE_STEPS.map((step, index) => (
              <li key={step} className="flex gap-6 border-b border-rule py-6 first:border-t">
                <span className="label tabular shrink-0 pt-1 text-slate" aria-hidden="true">
                  {`0${index + 1}`}
                </span>
                <p className="text-body text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
