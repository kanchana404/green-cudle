import type { Metadata } from 'next';
import { GrowRuler } from '@/components/GrowRuler';
import { Categories } from '@/components/home/Categories';
import { Fabric } from '@/components/home/Fabric';
import { Hero } from '@/components/home/Hero';
import { Journal } from '@/components/home/Journal';
import { Newsletter } from '@/components/home/Newsletter';
import { Products } from '@/components/home/Products';
import { SITE } from '@/lib/site';

const TITLE = 'Undyed organic cotton, newborn to 3 years';

export const metadata: Metadata = {
  title: `${SITE.name} — ${TITLE}`,
  description: SITE.description,
  openGraph: {
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${TITLE}`,
    description: SITE.description,
  },
};

export default function Home() {
  return (
    <>
      <Hero />

      <div className="hairline" />

      {/* The rule reads a measurement. Nothing beside it moves or reveals. */}
      <div className="section-y">
        <GrowRuler fallback="noscript" />
      </div>

      <div className="hairline" />

      <Categories />

      <div className="hairline" />

      <Products />

      <div className="hairline" />

      <Fabric />

      <div className="hairline" />

      <Journal />

      <Newsletter />
    </>
  );
}
