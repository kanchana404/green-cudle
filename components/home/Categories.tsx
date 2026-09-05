import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { CATEGORIES } from '@/lib/categories';

/**
 * Seven flat chalk squares. Hover swaps the ground to moss and the type to
 * field over 200ms. No border, no icon, no lift.
 */
export function Categories() {
  return (
    <section aria-labelledby="categories-heading" className="section-y">
      <Reveal className="shell">
        <h2 id="categories-heading" className="label text-slate">
          Shop by category
        </h2>

        <ul className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/shop?category=${category.slug}`}
                aria-label={`${category.name}, ${category.pieces} pieces`}
                className="group flex aspect-square flex-col justify-between bg-chalk p-4 transition-colors duration-hover ease-gc hover:bg-moss"
              >
                <span className="label tabular self-end text-slate transition-colors duration-hover ease-gc group-hover:text-field">
                  {category.pieces}
                </span>
                <span className="font-display text-heading text-ink transition-colors duration-hover ease-gc group-hover:text-field">
                  {category.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
