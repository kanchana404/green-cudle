'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { GarmentSilhouette } from '@/components/GarmentSilhouette';
import { productsInBand } from '@/lib/products';
import { RULER_MAX_CM, RULER_MIN_CM, SIZE_BANDS, bandIndexForCm, clampCm } from '@/lib/sizes';

const SPAN = RULER_MAX_CM - RULER_MIN_CM;
const DEFAULT_CM = 62;

/** Baseline sits 48px up, leaving room for the decade values beneath it. */
const BASELINE_OFFSET = 48;
const MINOR_TICK = 8;
const MAJOR_TICK = 20;
const BOUNDARY_TICK = 28;

const pct = (cm: number) => ((cm - RULER_MIN_CM) / SPAN) * 100;
const isMajor = (cm: number) => cm % 10 === 0;
const BOUNDARIES = new Set(SIZE_BANDS.map((band) => band.maxCm));

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function GrowRuler({ fallback = 'noscript' }: { readonly fallback?: 'noscript' | 'always' }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  /** The value the marker is drawn at. Continuous while dragging. */
  const [displayCm, setDisplayCm] = useState(DEFAULT_CM);
  /** The settled, whole-centimetre value. */
  const [targetCm, setTargetCm] = useState(DEFAULT_CM);

  const frame = useRef<number | null>(null);
  const velocity = useRef(0);
  /** The animated position. Owned by the loop and the pointer handlers, never
      by render, so a frame never reads a value React has not committed yet. */
  const positionRef = useRef(DEFAULT_CM);
  const draggingRef = useRef(false);

  const setPosition = useCallback((cm: number) => {
    positionRef.current = cm;
    setDisplayCm(cm);
  }, []);

  /** stiffness 240, damping 28, mass 0.9 */
  const runSpring = useCallback((to: number) => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    if (prefersReducedMotion()) {
      velocity.current = 0;
      setPosition(to);
      return;
    }
    let last = performance.now();
    let x = positionRef.current;
    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const acceleration = (-240 * (x - to) - 28 * velocity.current) / 0.9;
      velocity.current += acceleration * dt;
      x += velocity.current * dt;
      if (Math.abs(x - to) < 0.002 && Math.abs(velocity.current) < 0.02) {
        velocity.current = 0;
        setPosition(to);
        frame.current = null;
        return;
      }
      setPosition(x);
      frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  }, [setPosition]);

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const cmFromClientX = useCallback((clientX: number): number => {
    const track = trackRef.current;
    if (!track) return positionRef.current;
    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return positionRef.current;
    const ratio = (clientX - rect.left) / rect.width;
    return clampCm(RULER_MIN_CM + ratio * SPAN);
  }, []);

  /** 1:1 with the pointer. No lag, no easing on the drag itself. */
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    velocity.current = 0;
    draggingRef.current = true;
    setPosition(cmFromClientX(event.clientX));
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    setPosition(cmFromClientX(event.clientX));
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    const settled = clampCm(Math.round(cmFromClientX(event.clientX)));
    setTargetCm(settled);
    runSpring(settled);
  };

  const nudge = useCallback(
    (delta: number) => {
      const next = clampCm(Math.round(targetCm + delta));
      setTargetCm(next);
      runSpring(next);
    },
    [targetCm, runSpring]
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const big = event.shiftKey ? 10 : 1;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        nudge(big);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        nudge(-big);
        break;
      case 'PageUp':
        event.preventDefault();
        nudge(10);
        break;
      case 'PageDown':
        event.preventDefault();
        nudge(-10);
        break;
      case 'Home':
        event.preventDefault();
        setTargetCm(RULER_MIN_CM);
        runSpring(RULER_MIN_CM);
        break;
      case 'End':
        event.preventDefault();
        setTargetCm(RULER_MAX_CM);
        runSpring(RULER_MAX_CM);
        break;
      default:
        break;
    }
  };

  const bandIndex = bandIndexForCm(displayCm);
  const band = SIZE_BANDS[bandIndex];
  const inBand = productsInBand(bandIndex);
  const markerCm = Math.round(displayCm);

  return (
    <section aria-labelledby="grow-ruler-heading" className="bg-field">
      <div className="shell">
        <h2 id="grow-ruler-heading" className="label text-slate">
          Sized by height
        </h2>

        <div className="mt-8 grid12">
          <div className="col-span-7 lg:col-span-6">
            <CrossfadeName name={band?.name ?? ''} />
            <p className="label mt-4 text-slate">
              <span className="tabular">{band?.range ?? ''}</span>
              <span aria-hidden="true"> / </span>
              {band?.age ?? ''}
            </p>
          </div>

          <div className="col-span-5 flex items-end justify-end lg:col-span-5 lg:col-start-8 lg:min-h-[256px]">
            <GarmentSilhouette cm={displayCm} />
          </div>

          <p className="label col-span-12 mt-6 text-ink lg:col-span-6">
            In this size: {inBand.map((product) => product.name).join(', ')}
          </p>
        </div>
      </div>

      {/* Full-bleed. The rule itself is the widest thing on the page. */}
      <div
        className="relative mt-12 select-none"
        style={{ height: 320, touchAction: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* Baseline: 1px --ink hairline across the full bleed. */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 bg-ink"
          style={{ bottom: BASELINE_OFFSET, height: 1 }}
        />

        <div ref={trackRef} className="absolute inset-x-8 bottom-0 top-0">
          {/* Ticks. */}
          <div aria-hidden="true">
            {Array.from({ length: SPAN + 1 }, (_, i) => RULER_MIN_CM + i).map((cm) => {
              const boundary = BOUNDARIES.has(cm);
              const major = isMajor(cm);
              const height = boundary ? BOUNDARY_TICK : major ? MAJOR_TICK : MINOR_TICK;
              return (
                <div
                  key={cm}
                  className={major || boundary ? 'absolute bg-ink' : 'absolute bg-rule'}
                  style={{
                    left: `${pct(cm)}%`,
                    bottom: BASELINE_OFFSET,
                    width: 1,
                    height,
                    transform: 'translateX(-0.5px)',
                  }}
                />
              );
            })}
          </div>

          {/* Decade values, beneath the baseline. */}
          <div aria-hidden="true">
            {Array.from({ length: SPAN + 1 }, (_, i) => RULER_MIN_CM + i)
              .filter(isMajor)
              .map((cm) => (
                <span
                  key={cm}
                  className="label tabular absolute text-ink"
                  style={{
                    left: `${pct(cm)}%`,
                    bottom: BASELINE_OFFSET - 28,
                    transform: 'translateX(-50%)',
                  }}
                >
                  {cm}
                </span>
              ))}
          </div>

          {/* Band names, above the baseline. */}
          <div aria-hidden="true">
            {SIZE_BANDS.map((b, i) => (
              <span
                key={b.name}
                className={`label absolute whitespace-nowrap text-slate ${
                  i === bandIndex ? '' : 'hidden sm:inline'
                }`}
                style={{
                  left: `${pct((b.minCm + b.maxCm) / 2)}%`,
                  bottom: BASELINE_OFFSET + BOUNDARY_TICK + 12,
                  transform: 'translateX(-50%)',
                }}
              >
                {b.name}
              </span>
            ))}
          </div>

          {/* The marker. 44px hit area around a 2px line. */}
          <div
            role="slider"
            tabIndex={0}
            aria-label="Height in centimetres"
            aria-valuemin={RULER_MIN_CM}
            aria-valuemax={RULER_MAX_CM}
            aria-valuenow={markerCm}
            aria-valuetext={`${markerCm} centimetres, size ${band?.name ?? ''}`}
            onKeyDown={onKeyDown}
            className="absolute top-0 cursor-ew-resize"
            style={{
              left: `${pct(displayCm)}%`,
              height: '100%',
              width: 44,
              transform: 'translateX(-22px)',
              touchAction: 'none',
            }}
          >
            <div
              className="absolute bg-sprout"
              style={{ left: 21, top: 0, width: 2, height: '100%' }}
              aria-hidden="true"
            />
            <span
              className="label tabular absolute flex items-center justify-center bg-sprout text-ink"
              style={{ left: 22, top: 0, transform: 'translateX(-50%)', minWidth: 44, height: 24 }}
              aria-hidden="true"
            >
              {markerCm}
            </span>
          </div>
        </div>
      </div>

      {fallback === 'always' ? (
        <div className="shell pt-16">
          <BandTable />
        </div>
      ) : (
        <noscript>
          <div className="shell pt-16">
            <BandTable />
          </div>
        </noscript>
      )}
    </section>
  );
}

/** True crossfade: two stacked layers, 180ms opacity, no movement. */
function CrossfadeName({ name }: { readonly name: string }) {
  const [layers, setLayers] = useState({ a: name, b: '', showA: true });

  useEffect(() => {
    setLayers((prev) => {
      const visible = prev.showA ? prev.a : prev.b;
      if (visible === name) return prev;
      return prev.showA ? { ...prev, b: name, showA: false } : { ...prev, a: name, showA: true };
    });
  }, [name]);

  return (
    <div className="relative" style={{ minHeight: '1.05em' }} aria-live="polite">
      <span className="sr-only">Size {name}</span>
      <span
        aria-hidden="true"
        className="font-display text-display-l text-ink transition-opacity duration-swap ease-gc"
        style={{ opacity: layers.showA ? 1 : 0, position: 'absolute', inset: 0 }}
      >
        {layers.a}
      </span>
      <span
        aria-hidden="true"
        className="font-display text-display-l text-ink transition-opacity duration-swap ease-gc"
        style={{ opacity: layers.showA ? 0 : 1, position: 'absolute', inset: 0 }}
      >
        {layers.b}
      </span>
      {/* Reserves the line box without painting twice. */}
      <span aria-hidden="true" className="font-display text-display-l" style={{ visibility: 'hidden' }}>
        {name}
      </span>
    </div>
  );
}

/** The fallback, and the size table on /sizes. */
export function BandTable() {
  return (
    <table className="w-full border-collapse text-left">
      <caption className="label pb-6 text-left text-slate">Every size, by height</caption>
      <thead>
        <tr className="border-b border-rule">
          <th scope="col" className="label py-3 text-slate">
            Size
          </th>
          <th scope="col" className="label py-3 text-slate">
            Height
          </th>
          <th scope="col" className="label py-3 text-slate">
            Age
          </th>
        </tr>
      </thead>
      <tbody>
        {SIZE_BANDS.map((band) => (
          <tr key={band.name} className="border-b border-rule">
            <td className="label py-4 text-ink">{band.name}</td>
            <td className="label tabular py-4 text-ink">{band.range}</td>
            <td className="py-4 text-caption text-slate">{band.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
