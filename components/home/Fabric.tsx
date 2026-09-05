import { FabricSpecTable } from '@/components/FabricSpecTable';
import { COMPOSITION_BODY, COMPOSITION_HEADING } from '@/lib/fabric';
import { Reveal } from '@/components/Reveal';

export function Fabric() {
  return (
    <section aria-labelledby="fabric-heading" className="section-y">
      <Reveal className="shell">
        <div className="grid12">
          {/* Cols 1-5. */}
          <div className="col-span-12 lg:col-span-5">
            <h2 id="fabric-heading" className="text-display-l text-ink">
              {COMPOSITION_HEADING}
            </h2>
            <p className="mt-8 max-w-measure text-body-l text-ink">{COMPOSITION_BODY}</p>
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
