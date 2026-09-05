import type { Metadata } from 'next';
import { GrowRuler } from '@/components/GrowRuler';
import { Collections } from '@/components/home/Collections';
import { Fabric } from '@/components/home/Fabric';
import { Hero } from '@/components/home/Hero';
import { InTheBox } from '@/components/home/InTheBox';
import { Journal } from '@/components/home/Journal';
import { Newsletter } from '@/components/home/Newsletter';
import { SITE, openGraphFor } from '@/lib/site';

const TITLE = 'A naturally gentle welcome gift';

export const metadata: Metadata = {
  title: `${SITE.name} — ${TITLE}`,
  description: SITE.description,
  openGraph: openGraphFor({
    title: `${SITE.name} — ${TITLE}`,
    description: SITE.description,
    path: '',
  }),
};

export default function Home() {
  return (
    <>
      <Hero />

      <div className="hairline" />

      <Collections />

      <div className="hairline" />

      {/* The rule reads a measurement. Nothing beside it moves or reveals. */}
      <div className="section-y">
        <GrowRuler fallback="noscript" />
      </div>

      <div className="hairline" />

      <InTheBox />

      <div className="hairline" />

      <Fabric />

      <div className="hairline" />

      <Journal />

      <Newsletter />
    </>
  );
}
