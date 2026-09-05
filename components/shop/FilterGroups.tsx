import { FilterCheckbox } from '@/components/shop/FilterCheckbox';
import { FILTER_GROUPS, type FilterGroupKey, type Selection } from '@/components/shop/filters';

/**
 * No 'use client' here on purpose: this component owns no state, ref or
 * handler. It takes `onToggle` as a prop and is only ever imported by
 * ShopBrowser and FilterSheet, both of which are client components, so it is
 * already part of the client bundle.
 *
 * The four groups, identical in the desktop rail and in the mobile sheet.
 * `<fieldset>`/`<legend>` gives the grouping to assistive technology without
 * spending a heading level.
 */
export function FilterGroups({
  selection,
  onToggle,
}: {
  readonly selection: Selection;
  readonly onToggle: (key: FilterGroupKey, value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      {FILTER_GROUPS.map((group) => (
        <fieldset key={group.key} className="min-w-0">
          <legend className="label text-slate">{group.legend}</legend>
          <div className="mt-3 flex flex-col">
            {group.options.map((option) => (
              <FilterCheckbox
                key={option.value}
                group={group}
                option={option}
                checked={selection[group.key].includes(option.value)}
                onToggle={onToggle}
              />
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
