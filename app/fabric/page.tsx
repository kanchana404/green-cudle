import type { Metadata } from 'next';
import { CareStrip } from '@/components/CareSymbols';
import { FabricSpecTable } from '@/components/FabricSpecTable';
import { PageHeader } from '@/components/pages/PageHeader';
import { SITE, openGraphFor } from '@/lib/site';

const DESCRIPTION =
  'One fibre, knitted flat-seam, undyed in every colourway but two. The full fabric specification, what certificate GOTS-CU-1084219 covers, and what it does not audit.';

export const metadata: Metadata = {
  title: 'Fabric',
  description: DESCRIPTION,
  openGraph: openGraphFor({
    title: `Fabric — ${SITE.name}`,
    description: DESCRIPTION,
    path: '/fabric',
  }),
};

const COMPOSITION_HEADING = "What's actually in it";

const COMPOSITION_BODY =
  "One fibre. No dye, no softener, no optical brightener, no formaldehyde resin. The cotton is grown without synthetic pesticides, spun undyed, and knitted flat-seam so nothing sits raised against the skin. That's the entire specification, and it's on the label.";

export default function FabricPage() {
  return (
    <>
      <PageHeader title="Fabric" />

      <div className="hairline" />

      <section aria-labelledby="composition-heading" className="shell section-y">
        <div className="grid12">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="composition-heading" className="text-heading text-ink">
              {COMPOSITION_HEADING}
            </h2>
            <p className="mt-6 max-w-measure text-body-l text-ink">{COMPOSITION_BODY}</p>
          </div>

          <div className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <FabricSpecTable />
          </div>
        </div>
      </section>

      <div className="hairline" />

      <section
        id="certification"
        aria-labelledby="certification-heading"
        className="shell section-y scroll-mt-24"
      >
        <div className="grid12">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="certification-heading" className="text-heading text-ink">
              Certification
            </h2>
            <p className="label tabular mt-4 text-slate">{SITE.gotsCert}</p>
          </div>

          <div className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <p className="max-w-measure text-body text-ink">
              <span className="tabular">{SITE.gotsCert}</span> is the certificate held by the mill
              that knits the fabric and by the unit that cuts and sews it. Issued under the Global
              Organic Textile Standard, it covers fibre content, the chemical inputs permitted at
              every wet-processing stage, the treatment of the water leaving those stages, and
              social criteria taken from the core ILO conventions. Every shipment between certified
              sites travels with its own transaction certificate, which is the mechanism that ties
              one bale of cotton to one run of bodysuits.
            </p>

            <p className="mt-6 max-w-measure text-body text-ink">
              The audit behind the number is annual and on site, and it is as much a paper exercise
              as a walk through a factory: input inventories, purchase invoices, and a mass balance
              between certified fibre going in and certified goods coming out. What that produces is
              a snapshot of a building across the days an inspector stood in it, plus the records
              either side of those days.
            </p>

            <p className="mt-6 max-w-measure text-body text-ink">
              It does not inspect the farm. Cotton enters the standard already certified organic
              under a separate agricultural scheme, and the textile audit takes that certificate as
              given. It also measures nothing about the water drawn per kilogram of lint, nothing
              about the emissions of moving goods between sites, and nothing about how many washes a
              garment survives, which shifts the total further than the rest of it combined. On pay
              it requires the legal minimum and a documented move toward a living wage, not evidence
              that a living wage is reaching anyone.
            </p>
          </div>
        </div>
      </section>

      <div className="hairline" />

      <section aria-labelledby="care-heading" className="shell section-y">
        <div className="grid12">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="care-heading" className="text-heading text-ink">
              How it washes
            </h2>
            <p className="mt-6 max-w-measure text-body text-slate">
              Wash at <span className="tabular">30</span>&deg;C with a detergent carrying no optical
              brightener, tumble low or line dry, and keep bleach away from it. The natural
              colourways carry no dye at all, and Moss and Sprout are dyed low-impact and colourfast,
              so the only thing a hot wash changes is the height band you bought.
            </p>
          </div>

          <div className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <CareStrip />
          </div>
        </div>
      </section>
    </>
  );
}
