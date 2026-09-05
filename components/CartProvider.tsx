'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

type CartLine = { readonly slug: string; readonly size: string; readonly colourway: string };

type CartValue = {
  readonly count: number;
  readonly add: (line: CartLine) => void;
};

const CartContext = createContext<CartValue | null>(null);

export function useCart(): CartValue {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside CartProvider');
  return value;
}

export function CartProvider({ children }: { readonly children: React.ReactNode }) {
  const [lines, setLines] = useState<readonly CartLine[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const add = useCallback((line: CartLine) => {
    setLines((prev) => [...prev, line]);
    setToast('Added to bag');
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const value = useMemo<CartValue>(() => ({ count: lines.length, add }), [lines.length, add]);

  return (
    <CartContext.Provider value={value}>
      {children}
      {/* Says what happened. No icon, no colour-coding, no animation. */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        {toast ? (
          <p className="label border border-rule bg-chalk px-4 py-3 text-ink">{toast}</p>
        ) : null}
      </div>
    </CartContext.Provider>
  );
}
