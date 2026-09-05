import Link from 'next/link';
import { CollectionGrid } from '@/components/CollectionTile';
import { Reveal } from '@/components/Reveal';
import { COLLECTIONS } from '@/lib/collections';

export function Collections() {
  return (
    <section aria-labelledby="collections-heading" className="section-y">
      <Reveal className="shell">
        <p className="label text-slate">Choose a colour</p>
        <h2 id="collections-heading" className="mt-6 text-display-l text-ink">
          Five collections. One box.
        </h2>
        <p className="mt-8 max-w-measure text-body text-slate">
          Every collection holds the same seven pieces. What changes is what the cotton was dyed
          with, and none of it is synthetic.
        </p>

        <div className="mt-16">
          <CollectionGrid collections={COLLECTIONS} />
        </div>

        <p className="mt-12">
          <Link
            href="/collections"
            className="inline-flex min-h-touch items-center text-body text-ink underline decoration-1 underline-offset-4 transition-colors duration-micro ease-gc hover:text-moss"
          >
            Compare all five
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
