/**
 * A bodysuit, drawn once. Its rendered height is directly proportional to the
 * height on the rule: at 88cm it is genuinely twice its size at 44cm. The
 * proportionality is the point, so nothing here is stepped or clamped.
 */
export const SILHOUETTE_BASE_PX = 116;
export const SILHOUETTE_BASE_CM = 44;

export function silhouetteHeightPx(cm: number): number {
  return (cm / SILHOUETTE_BASE_CM) * SILHOUETTE_BASE_PX;
}

export function GarmentSilhouette({ heightPx }: { readonly heightPx: number }) {
  return (
    <svg
      viewBox="0 0 96 128"
      height={heightPx}
      width={(heightPx * 96) / 128}
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block' }}
    >
      <path
        fill="var(--rule)"
        d="M36 6 24 10 6 26 2 42l14 8 8-12v58l-2 16h48l-2-16V38l8 12 14-8-4-16-18-16-12-4c-2 5-6 7-12 7s-10-2-12-7Z"
      />
    </svg>
  );
}
