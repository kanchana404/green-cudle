import Image from 'next/image';
import Link from 'next/link';
import { CARE_SYMBOLS } from '@/components/CareSymbols';
import { NewsletterForm } from '@/components/NewsletterForm';
import { MEDIA } from '@/lib/media';
import { CATEGORIES } from '@/lib/categories';
import { FOOTER_ABOUT, FOOTER_HELP, SITE } from '@/lib/site';

function Column({ heading, children }: { readonly heading: string; readonly children: React.ReactNode }) {
  return (
    <div>
      <h2 className="label text-slate">{heading}</h2>
      <ul className="mt-6 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function ColumnLink({ href, children }: { readonly href: string; readonly children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="inline-flex min-h-touch items-center text-body text-ink transition-colors duration-micro ease-gc hover:text-moss"
      >
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="shell grid gap-12 py-24 md:grid-cols-2 lg:grid-cols-4">
        <Column heading="Shop">
          {CATEGORIES.map((category) => (
            <ColumnLink key={category.slug} href={`/shop?category=${category.slug}`}>
              {category.name}
            </ColumnLink>
          ))}
        </Column>

        <Column heading="Help">
          {FOOTER_HELP.map((item) => (
            <ColumnLink key={item.label} href={item.href}>
              {item.label}
            </ColumnLink>
          ))}
        </Column>

        <Column heading="About">
          {FOOTER_ABOUT.map((item) => (
            <ColumnLink key={item.label} href={item.href}>
              {item.label}
            </ColumnLink>
          ))}
        </Column>

        <div>
          <h2 className="label text-slate">Newsletter</h2>
          <div className="mt-6">
            <NewsletterForm tone="moss" />
          </div>
        </div>
      </div>

      {/* The mark, on the one ground it was drawn for. */}
      <div className="bg-ink">
        <div className="shell flex justify-center py-16">
          <Image
            src={MEDIA.logoDark.src}
            alt={MEDIA.logoDark.alt}
            width={MEDIA.logoDark.width}
            height={MEDIA.logoDark.height}
            sizes="(min-width: 768px) 520px, 90vw"
            className="h-auto w-full max-w-[520px] object-contain"
          />
        </div>
      </div>

      <div className="hairline" />

      {/* Full-width care-symbol strip. */}
      <div className="shell py-12">
        <ul className="grid grid-cols-3 gap-8 sm:grid-cols-6">
          {CARE_SYMBOLS.map(({ Icon, caption }) => (
            <li key={caption} className="flex flex-col items-start gap-3">
              <Icon className="block h-8 w-8 text-ink" />
              <span className="label text-slate">{caption}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="hairline" />

      <div className="shell flex flex-col gap-3 py-8 md:flex-row md:items-center md:justify-between">
        <p className="label text-slate">
          &copy; <span className="tabular">2026</span> {SITE.name}
        </p>
        <p className="label text-slate">
          Cert <span className="tabular">{SITE.gotsCert}</span>
        </p>
      </div>
    </footer>
  );
}
