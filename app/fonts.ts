import { Bricolage_Grotesque, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

/**
 * Display. Variable across the optical-size axis so `opsz` can be pinned at
 * its maximum (48) in CSS. Weight 500 is applied at the element.
 */
export const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-display',
});

/** Data. Sizes in cm, gsm, eyebrows, product metadata, care codes. */
export const mono = Geist_Mono({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
  variable: '--font-mono',
});

/** Body. General Sans from Fontshare, self-hosted. Weights 400 and 500 only. */
export const generalSans = localFont({
  src: [
    { path: '../public/fonts/GeneralSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/GeneralSans-Medium.woff2', weight: '500', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-body',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});
