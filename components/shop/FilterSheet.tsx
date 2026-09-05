'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { FilterGroups } from '@/components/shop/FilterGroups';
import type { FilterGroupKey, Selection } from '@/components/shop/filters';

/**
 * Below `lg` the rail is replaced by this. It traps nothing: focus can leave,
 * and it closes on the Close button or Escape, returning focus to the trigger.
 * Motion is opacity plus a 16px translate, the same pair `.reveal` uses.
 */
export function FilterSheet({
  selection,
  activeCount,
  onToggle,
}: {
  readonly selection: Selection;
  readonly activeCount: number;
  readonly onToggle: (key: FilterGroupKey, value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  /*
   * Mounted first, moved on the next frame, so the transition has a start.
   * The timer is the backstop: a backgrounded tab never runs an animation
   * frame, and the sheet must not be left sitting at zero opacity.
   */
  useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    const frame = requestAnimationFrame(() => setEntered(true));
    const backstop = setTimeout(() => setEntered(true), 60);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(backstop);
    };
  }, [open]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /* At lg the rail takes over and the sheet is hidden, so close it rather than
     leave an open dialog and a locked page behind a media query. */
  useEffect(() => {
    if (!open) return;
    const wide = window.matchMedia('(min-width: 1024px)');
    if (wide.matches) {
      setOpen(false);
      return;
    }
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    wide.addEventListener('change', onChange);
    return () => wide.removeEventListener('change', onChange);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex h-cta w-full items-center justify-center rounded-control border border-slate bg-chalk text-body text-ink transition-colors duration-micro ease-gc hover:text-moss"
      >
        <span>Filter</span>
        {/* Non-breaking, so the accessible name reads "Filter (2)" not "Filter(2)". */}
        {activeCount > 0 ? <span className="tabular">&nbsp;({activeCount})</span> : null}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-field transition duration-entrance ease-gc motion-reduce:transform-none ${
            entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between gap-6 border-b border-rule px-4 py-2 md:px-6">
            <h2 id={titleId} className="label text-slate">
              Filter
            </h2>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="flex min-h-touch items-center rounded-control text-body text-ink transition-colors duration-micro ease-gc hover:text-moss"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-8 md:px-6">
            <FilterGroups selection={selection} onToggle={onToggle} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
