import { Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

/**
 * Display. Bricolage Grotesque at weight 500 with the optical-size axis pinned
 * to its maximum of 48.
 *
 * This is a single pinned instance rather than the full variable face: the
 * variable file ships every axis and costs 75KB, where the one instance we
 * actually draw with is 21KB. Same rendering, 54KB less on the critical path.
 */
export const display = localFont({
  src: [{ path: '../public/fonts/BricolageGrotesque-opsz48-500.woff2', weight: '500', style: 'normal' }],
  display: 'swap',
  variable: '--font-display',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
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
