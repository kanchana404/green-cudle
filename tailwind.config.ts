import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    // Replaced, not extended: the palette is closed. No greys, no warm second hue.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      field: 'var(--field)',
      chalk: 'var(--chalk)',
      ink: 'var(--ink)',
      slate: 'var(--slate)',
      moss: 'var(--moss)',
      sprout: 'var(--sprout)',
      rule: 'var(--rule)',
    },
    // Replaced, not extended: only the sanctioned rhythm survives, plus
    // explicitly named component dimensions.
    spacing: {
      0: '0px',
      px: '1px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      6: '24px',
      8: '32px',
      12: '48px',
      16: '64px',
      24: '96px',
      32: '128px',
      44: '176px',
      swatch: '12px',
      checkbox: '14px',
      'swatch-lg': '20px',
      touch: '44px',
      cta: '52px',
      ruler: '320px',
    },
    borderRadius: {
      none: '0px',
      // 2px on buttons and inputs. 999px on size chips. Nothing else.
      control: '2px',
      chip: '999px',
    },
    // No shadow scale exists, so no shadow can be reached for.
    boxShadow: { none: 'none' },
    dropShadow: { none: 'none' },
    // No gradient utilities exist either.
    backgroundImage: {},
    fontFamily: {
      display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
    },
    extend: {
      fontSize: {
        // The hero headline is a sentence, not three words, so the top of the
        // clamp is pulled in to keep it and the body copy on the first screen.
        'display-xl': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '0.96', letterSpacing: '-0.035em' }],
        'display-l': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        heading: ['1.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'body-l': ['1.125rem', { lineHeight: '1.55' }],
        body: ['1rem', { lineHeight: '1.6' }],
        caption: ['0.8125rem', { lineHeight: '1.4' }],
        label: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
        'label-sm': ['0.625rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
      },
      maxWidth: {
        shell: '1512px',
        measure: '46ch',
      },
      transitionTimingFunction: {
        gc: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        micro: '160ms',
        swap: '180ms',
        hover: '200ms',
        entrance: '420ms',
        image: '700ms',
      },
      gridTemplateColumns: {
        12: 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};

export default config;
