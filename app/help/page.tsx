import type { Metadata } from 'next';
import { Price } from '@/components/Price';
import { FactList, type Fact } from '@/components/pages/FactList';
import { HelpSection } from '@/components/pages/HelpSection';
import { PageHeader } from '@/components/pages/PageHeader';
import { SITE, openGraphFor } from '@/lib/site';

const DESCRIPTION =
  'Shipping times and costs, the returns window and its conditions, wash instructions for organic cotton, and the address to write to.';

export const metadata: Metadata = {
  title: 'Help',
  description: DESCRIPTION,
  openGraph: openGraphFor({
    title: `Help — ${SITE.name}`,
    description: DESCRIPTION,
    path: '/help',
  }),
};

const LEAD =
  'The four things people write in about, answered here in full. The address for everything else is at the bottom of this page.';

const CONTACT_EMAIL = 'help@greencuddles.com';

type DeliveryOption = {
  readonly service: string;
  readonly arrives: React.ReactNode;
  readonly cost: number;
};

const DELIVERY: readonly DeliveryOption[] = [
  {
    service: 'Standard',
    arrives: (
      <>
        <span className="tabular">3-5</span> working days, anywhere in India
      </>
    ),
    cost: 90,
  },
  {
    service: 'Express',
    arrives: <>Next working day, metro pin codes only</>,
    cost: 250,
  },
];

const RETURNS: readonly Fact[] = [
  {
    label: 'Window',
    value: (
      <>
        <span className="tabular">30</span> days from the delivery scan
      </>
    ),
  },
  {
    label: 'Condition',
    value: 'Unworn, unwashed, with the woven care code still at the side seam',
  },
  {
    label: 'Refund',
    value:
      'The full amount to the original payment method, within five working days of the parcel reaching the warehouse',
  },
  {
    label: 'Postage',
    value: 'Free. The courier collects from the delivery address on a slot you pick',
  },
  {
    label: 'Excluded',
    value: 'Underwear and sock packs once the pack seal is broken. That is a hygiene rule',
  },
];

const CARE: readonly Fact[] = [
  {
    label: 'Wash',
    value: (
      <>
        <span className="tabular">30</span>&deg;C, normal cycle, no bleach
      </>
    ),
  },
  {
    label: 'Detergent',
    value:
      'No optical brightener and no fabric softener. Softener leaves a film on the fibre and cuts how much it absorbs, which is the one property that matters here',
  },
  { label: 'Dry', value: 'Line dry, or tumble on low' },
  { label: 'Iron', value: 'Low heat, and never over a print or the snap tape' },
  { label: 'Dry clean', value: 'No. The solvents undo the point of a plain organic fibre' },
];

export default function HelpPage() {
  return (
    <>
      <PageHeader title="Help" lead={LEAD} />

      <div className="hairline" />

      <HelpSection id="shipping" title="Shipping" meta="India only">
        <p className="max-w-measure text-body text-ink">
          Orders picked before <span className="tabular">14:00</span> IST on a working day leave the
          same day, from one warehouse in Bengaluru. Everything ships within India.
        </p>

        <table className="mt-8 w-full border-collapse text-left">
          <caption className="label pb-6 text-left text-slate">Delivery options</caption>
          <thead>
            <tr className="border-b border-rule">
              <th scope="col" className="label py-3 text-slate">
                Service
              </th>
              <th scope="col" className="label py-3 text-slate">
                Arrives
              </th>
              <th scope="col" className="label py-3 text-slate">
                Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {DELIVERY.map((option) => (
              <tr key={option.service} className="border-b border-rule">
                <td className="py-4 text-body text-ink">{option.service}</td>
                <td className="py-4 text-body text-ink">{option.arrives}</td>
                <td className="py-4">
                  <Price price={option.cost} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-8 max-w-measure text-body text-slate">
          Tracking is emailed when the courier scans the parcel, not when the label is printed, so
          the first scan is the first message. A pin code outside the express network ships standard
          instead, and the difference goes back to the card within two working days.
        </p>
      </HelpSection>

      <div className="hairline" />

      <HelpSection id="returns" title="Returns" meta="Thirty days, unworn">
        <p className="max-w-measure text-body text-ink">
          Send back anything that does not fit or does not suit, in the state it arrived in. Sizes
          are height bands, so a return is usually an exchange one band up.
        </p>
        <FactList facts={RETURNS} className="mt-8" />
        <p className="mt-8 max-w-measure text-body text-slate">
          A fault is a different route. Email a photograph with the order number and we replace the
          garment or refund it, whichever you ask for, and the original stays with you.
        </p>
      </HelpSection>

      <div className="hairline" />

      <HelpSection id="care" title="Care" meta="Organic cotton">
        <p className="max-w-measure text-body text-ink">
          The natural colourways have no dye to protect, and Moss and Sprout are dyed colourfast, so a
          wash is only ever about the fibre. Wash it often and wash it cool.
        </p>
        <FactList facts={CARE} className="mt-8" />
        <p className="mt-8 max-w-measure text-body text-slate">
          Every piece is washed before it is cut, so the specification puts further shrinkage under{' '}
          <span className="tabular">3</span>% across ten cycles at{' '}
          <span className="tabular">30</span>&deg;C. Wash hotter than that and it will be more, and
          the height band printed on the label stops being true.
        </p>
      </HelpSection>

      <div className="hairline" />

      <HelpSection id="contact" title="Contact" meta="Monday to Friday">
        <p className="max-w-measure text-body text-ink">
          One inbox, read between <span className="tabular">09:00</span> and{' '}
          <span className="tabular">18:00</span> IST on working days. Replies go out within one
          working day.
        </p>
        <p className="mt-6">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex min-h-touch items-center text-body-l text-moss underline decoration-1 underline-offset-4 transition-colors duration-micro ease-gc hover:text-ink"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="mt-6 max-w-measure text-body text-slate">
          Put the order number in the subject line when the question is about a parcel already
          moving; those are read first. There is no phone line and no chat window, because a written
          answer can be checked later and a spoken one cannot.
        </p>
      </HelpSection>
    </>
  );
}
