/**
 * A bodysuit, drawn once. Its rendered height is directly proportional to the
 * height on the rule: at 88cm it is genuinely twice its size at 44cm. The
 * proportionality is the point, so nothing here is stepped or clamped.
 *
 * The constant of proportionality lives in CSS as `--sil-k` so the drawing can
 * be smaller on a phone without breaking the ratio: height is always
 * `cm x --sil-k`, whatever the viewport.
 */
export const SILHOUETTE_BASE_CM = 44;
/** Rendered height at 44cm, per breakpoint. Both give height = cm x k. */
export const SILHOUETTE_BASE_PX = 116;
export const SILHOUETTE_BASE_PX_SMALL = 72;

export function GarmentSilhouette({ cm }: { readonly cm: number }) {
  return (
    <svg
      viewBox="0 0 96 128"
      aria-hidden="true"
      focusable="false"
      style={{
        display: 'block',
        height: `calc(var(--sil-k) * ${cm})`,
        width: 'auto',
        aspectRatio: '96 / 128',
      }}
    >
      <path
        fill="var(--rule)"
        d="M36 6 24 10 6 26 2 42l14 8 8-12v58l-2 16h48l-2-16V38l8 12 14-8-4-16-18-16-12-4c-2 5-6 7-12 7s-10-2-12-7Z"
      />
    </svg>
  );
}
