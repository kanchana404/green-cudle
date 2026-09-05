'use client';

import type { FilterGroup, FilterGroupKey, FilterOption } from '@/components/shop/filters';

/**
 * A control affordance, not decoration: the tick is the non-colour carrier of
 * the checked state, so the box reads as checked without relying on the fill.
 */
function Tick() {
  return (
    <svg viewBox="0 0 14 14" className="block h-checkbox w-checkbox" aria-hidden="true" focusable="false">
      <path
        d="m3.1 7.2 2.6 2.6 5.2-5.7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The real input is present and native — keyboard, screen reader and form
 * semantics all come free. It is only visually hidden; the 14px square is drawn
 * from it with `peer-checked:` and `peer-focus-visible:`.
 *
 * The box boundary is `slate`, not `rule`: `rule` measures 1.44:1 on the page
 * ground and fails the 3:1 gate for a control boundary.
 */
export function FilterCheckbox({
  group,
  option,
  checked,
  onToggle,
}: {
  readonly group: FilterGroup;
  readonly option: FilterOption;
  readonly checked: boolean;
  readonly onToggle: (key: FilterGroupKey, value: string) => void;
}) {
  return (
    <label className="group flex min-h-touch cursor-pointer select-none items-center gap-3">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={() => onToggle(group.key, option.value)}
      />

      <span
        aria-hidden="true"
        className="flex h-checkbox w-checkbox shrink-0 items-center justify-center rounded-none border border-slate bg-chalk text-transparent transition-colors duration-micro ease-gc peer-checked:border-moss peer-checked:bg-moss peer-checked:text-field peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sprout"
      >
        <Tick />
      </span>

      {option.fill === undefined ? null : (
        <span
          aria-hidden="true"
          className="block h-swatch w-swatch shrink-0"
          style={{ backgroundColor: option.fill }}
        />
      )}

      <span
        className={`text-body text-ink transition-colors duration-micro ease-gc group-hover:text-moss${
          group.numeric ? ' tabular' : ''
        }`}
      >
        {option.label}
      </span>
    </label>
  );
}
