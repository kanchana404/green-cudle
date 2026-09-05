import { Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

/**
 * Display. Stardom from Fontshare, self-hosted.
 *
 * One weight, no italic, and hairlines thin enough that it is only used at
 * display sizes — `app/globals.css` binds it to `text-display-xl` and
 * `text-display-l` rather than to the heading elements, so it cannot leak down
 * to 24px where it would start to break up.
 */
export const stardom = localFont({
  src: [{ path: '../public/fonts/Stardom-Regular.woff2', weight: '400', style: 'normal' }],
  display: 'swap',
  variable: '--font-display',
  fallback: ['ui-serif', 'Georgia', 'serif'],
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
