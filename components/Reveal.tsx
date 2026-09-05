'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Sections only, never words. Fires once at 30% visibility, 70ms stagger.
 * Content is present in the DOM regardless; only opacity and offset change.
 */
export function Reveal({
  children,
  delayIndex = 0,
  className,
  as: Tag = 'div',
}: {
  readonly children: React.ReactNode;
  readonly delayIndex?: number;
  readonly className?: string;
  readonly as?: 'div' | 'section' | 'li';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-shown={shown ? 'true' : 'false'}
      style={{ ['--reveal-delay' as string]: `${delayIndex * 70}ms` }}
      className={`reveal ${className ?? ''}`}
    >
      {children}
    </Tag>
  );
}
