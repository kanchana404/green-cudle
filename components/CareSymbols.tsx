/**
 * The six garment-care symbols, drawn to the GINETEX shapes. Inline SVG, no
 * icon library. These plus the chevron are the only icons on the site.
 */

type IconProps = { readonly className?: string };

const BASE = 'block h-6 w-6';
const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function Svg({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? BASE} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

/** Wash tub, 30 degrees. */
export function WashIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path {...STROKE} d="M2.5 8.5h19l-1.7 10.2a1.6 1.6 0 0 1-1.6 1.3H5.8a1.6 1.6 0 0 1-1.6-1.3Z" />
      <path {...STROKE} d="M4.6 8.5 7.9 5a2.4 2.4 0 0 1 3.1-.3l.6.4a2.4 2.4 0 0 0 2.8 0" />
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontSize="7"
        fill="currentColor"
        stroke="none"
        fontFamily="var(--font-mono), monospace"
      >
        30
      </text>
    </Svg>
  );
}

/** Bleach triangle, struck through: do not bleach. */
export function BleachIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path {...STROKE} d="M12 3.2 21.4 20.4H2.6Z" />
      <path {...STROKE} d="M5.5 17.5 18.5 6.5" />
    </Svg>
  );
}

/** Tumble dry, low heat: one dot. */
export function TumbleIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect {...STROKE} x="2.8" y="2.8" width="18.4" height="18.4" />
      <circle {...STROKE} cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** Iron, low heat: one dot. */
export function IronIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path {...STROKE} d="M3 17.6h18L18.4 7.4a2 2 0 0 0-1.9-1.5H9.2A4.2 4.2 0 0 0 5 10.1v1.3" />
      <circle cx="12" cy="13.4" r="1.5" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** Dry clean circle, struck through: do not dry clean. */
export function DryCleanIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle {...STROKE} cx="12" cy="12" r="9.2" />
      <path {...STROKE} d="M5.5 18.5 18.5 5.5" />
    </Svg>
  );
}

/** Line dry: square with a single vertical line. */
export function LineDryIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect {...STROKE} x="2.8" y="2.8" width="18.4" height="18.4" />
      <path {...STROKE} d="M12 5.6v12.8" />
    </Svg>
  );
}

export type CareSymbol = {
  readonly Icon: (props: IconProps) => React.JSX.Element;
  readonly caption: string;
};

export const CARE_SYMBOLS: readonly CareSymbol[] = [
  { Icon: WashIcon, caption: 'Wash 30' },
  { Icon: BleachIcon, caption: 'No bleach' },
  { Icon: TumbleIcon, caption: 'Tumble low' },
  { Icon: IronIcon, caption: 'Iron low' },
  { Icon: DryCleanIcon, caption: 'No dry clean' },
  { Icon: LineDryIcon, caption: 'Line dry' },
];

/** The strip used in the footer and on every product page. */
export function CareStrip({ className }: { readonly className?: string }) {
  return (
    <ul className={`grid grid-cols-3 gap-6 sm:grid-cols-6 ${className ?? ''}`}>
      {CARE_SYMBOLS.map(({ Icon, caption }) => (
        <li key={caption} className="flex flex-col items-start gap-2">
          <Icon />
          <span className="label text-slate">{caption}</span>
        </li>
      ))}
    </ul>
  );
}

/** The only other permitted icon. */
export function Chevron({
  className,
  direction = 'right',
}: {
  readonly className?: string;
  readonly direction?: 'right' | 'down';
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className ?? 'block h-4 w-4'}
      aria-hidden="true"
      focusable="false"
      style={direction === 'down' ? { transform: 'rotate(90deg)' } : undefined}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6 3 5 5-5 5"
      />
    </svg>
  );
}
