import { BoxContents } from '@/components/BoxContents';
import { Price } from '@/components/Price';
import { Reveal } from '@/components/Reveal';
import { BOX_PRICE, BOX_WAS_PRICE, PIECE_COUNT } from '@/lib/collections';

export function InTheBox() {
  return (
    <section aria-labelledby="box-heading" className="section-y">
      <Reveal className="shell">
        <div className="grid12">
          {/* Cols 1-5. */}
          <div className="col-span-12 lg:col-span-5">
            <p className="label text-slate">What is inside</p>
            <h2 id="box-heading" className="mt-6 text-display-l text-ink">
              <span className="tabular">{PIECE_COUNT}</span> pieces. Enough for the first month.
            </h2>
            <p className="mt-8 max-w-measure text-body text-slate">
              Two bodysuits because one is always in the wash, a sleepsuit that opens from throat to
              ankle, and the four things that turn out to matter in the first weeks. Nothing in the
              box is filler.
            </p>
            <Price price={BOX_PRICE} wasPrice={BOX_WAS_PRICE} className="mt-8 text-body-l" />
          </div>

          {/* Cols 7-12. */}
          <div className="col-span-12 mt-16 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <BoxContents />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
