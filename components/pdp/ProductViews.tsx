import { GarmentBlock } from '@/components/GarmentBlock';

/**
 * Three square surfaces, stacked and scrolled with the page. Not a carousel:
 * there is nothing to page through and nothing hidden behind a control.
 */
const VIEWS = ['FRONT', 'BACK', 'SEAM DETAIL'] as const;

export function ProductViews({ name }: { readonly name: string }) {
  return (
    <ul aria-label={`${name}, three views`} className="flex flex-col gap-6">
      {VIEWS.map((view) => (
        <li key={view}>
          <GarmentBlock name={name} detail={view} />
        </li>
      ))}
    </ul>
  );
}
