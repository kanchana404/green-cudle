import { FabricSpecTable } from '@/components/FabricSpecTable';
import { Reveal } from '@/components/Reveal';

export function Fabric() {
  return (
    <section aria-labelledby="fabric-heading" className="section-y">
      <Reveal className="shell">
        <div className="grid12">
          {/* Cols 1-5. */}
          <div className="col-span-12 lg:col-span-5">
            <h2 id="fabric-heading" className="text-display-l text-ink">
              {"What's actually in it"}
            </h2>
            <p className="mt-8 max-w-measure text-body-l text-ink">
              {
                "One fibre. No dye, no softener, no optical brightener, no formaldehyde resin. The cotton is grown without synthetic pesticides, spun undyed, and knitted flat-seam so nothing sits raised against the skin. That's the entire specification, and it's on the label."
              }
            </p>
          </div>

          {/* Cols 7-12. */}
          <div className="col-span-12 mt-16 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <FabricSpecTable />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
