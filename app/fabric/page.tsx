import { COMPOSITION_BODY, COMPOSITION_HEADING } from '@/lib/fabric';
import type { Metadata } from 'next';
import Image from 'next/image';
import { CareStrip } from '@/components/CareSymbols';
import { MEDIA } from '@/lib/media';
import { FabricSpecTable } from '@/components/FabricSpecTable';
import { PageHeader } from '@/components/pages/PageHeader';
import { SITE, openGraphFor } from '@/lib/site';

const DESCRIPTION =
  'One fibre, knitted flat-seam, dyed with root and leaf. The full fabric specification, what certificate GOTS-CU-1084219 covers, and what it does not audit.';

export const metadata: Metadata = {
  title: 'Fabric',
  description: DESCRIPTION,
  openGraph: openGraphFor({
    title: `Fabric — ${SITE.name}`,
    description: DESCRIPTION,
    path: '/fabric',
  }),
};



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

      <section aria-labelledby="dye-heading" className="shell section-y">
        <div className="grid12">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="dye-heading" className="text-heading text-ink">
              Where the five colours come from
            </h2>
            <p className="mt-6 max-w-measure text-body text-slate">
              Turmeric root, madder root, logwood, indigo and walnut hull. Every colour we sell is
              pulled out of a plant, to a GOTS-approved recipe, and the cloth is washed until the
              water runs clear before it is cut. These are the baths and the swatch cards each batch
              is matched against.
            </p>
          </div>

          <div className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <figure>
              <Image
                src={MEDIA.dyeCool.src}
                alt={MEDIA.dyeCool.alt}
                width={MEDIA.dyeCool.width}
                height={MEDIA.dyeCool.height}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-auto w-full"
              />
              <figcaption className="label mt-3 text-slate">
                Swatch card, cool range. Photograph by Mattricaria
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="grid12 mt-16">
          <div className="col-span-12 sm:col-span-6 lg:col-span-5">
            <figure>
              <Image
                src={MEDIA.dyeWarm.src}
                alt={MEDIA.dyeWarm.alt}
                width={MEDIA.dyeWarm.width}
                height={MEDIA.dyeWarm.height}
                sizes="(min-width: 1024px) 40vw, 50vw"
                className="h-auto w-full"
              />
              <figcaption className="label mt-3 text-slate">
                Swatch card, warm range
              </figcaption>
            </figure>
          </div>
          <div className="col-span-12 mt-12 sm:col-span-6 sm:mt-0 lg:col-span-5 lg:col-start-7">
            <figure>
              <Image
                src={MEDIA.dyeProcess.src}
                alt={MEDIA.dyeProcess.alt}
                width={MEDIA.dyeProcess.width}
                height={MEDIA.dyeProcess.height}
                sizes="(min-width: 1024px) 40vw, 50vw"
                className="h-auto w-full"
              />
              <figcaption className="label mt-3 text-slate">
                Lifted from the bath, before the rinse
              </figcaption>
            </figure>
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
              brightener, tumble low or line dry, and keep bleach away from it. Plant dye is fixed
              before the cloth leaves us and will not run onto anything else, though the darker
              collections settle a shade over the first few washes and then hold.
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
