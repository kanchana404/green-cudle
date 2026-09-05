import type { Metadata, Viewport } from 'next';
import './globals.css';
import { generalSans, mono, stardom } from '@/app/fonts';
import { CartProvider } from '@/components/CartProvider';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SITE } from '@/lib/site';
import { TOKENS } from '@/lib/tokens';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — naturally dyed organic cotton, newborn to 3 years`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_GB',
    url: SITE.url,
    title: `${SITE.name} — naturally dyed organic cotton, newborn to 3 years`,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: TOKENS.field,
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${stardom.variable} ${generalSans.variable} ${mono.variable}`}>
      <head>
        {/*
          Scroll reveal starts at opacity 0 and is switched on by an observer.
          With scripting off that observer never runs, so every revealed section
          would stay invisible. This restores them before first paint.
        */}
        <noscript>
          <style>{'.reveal{opacity:1 !important;transform:none !important}'}</style>
        </noscript>
      </head>
      <body>
        <CartProvider>
          <a
            href="#main"
            className="label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-moss focus:px-4 focus:py-3 focus:text-field"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
