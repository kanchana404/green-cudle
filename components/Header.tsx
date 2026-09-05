'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { NAV, SITE } from '@/lib/site';
import { useCart } from '@/components/CartProvider';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement | null>(null);
  const searchId = useId();
  const router = useRouter();
  const { count } = useCart();

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, searchOpen]);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : '/shop');
    setSearchOpen(false);
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-chalk">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="label flex h-touch items-center text-moss transition-colors duration-micro ease-gc hover:text-ink"
        >
          {SITE.wordmark}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex h-touch items-center text-body text-ink transition-colors duration-micro ease-gc hover:text-moss"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            aria-expanded={searchOpen}
            aria-controls={searchId}
            className="flex h-touch min-w-touch items-center justify-center text-body text-ink transition-colors duration-micro ease-gc hover:text-moss"
          >
            Search
          </button>
          <Link
            href="/shop"
            className="flex h-touch min-w-touch items-center justify-center text-body text-ink transition-colors duration-micro ease-gc hover:text-moss"
          >
            Cart <span className="tabular ml-1">({count})</span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            className="flex h-touch min-w-touch items-center justify-center text-body text-ink transition-colors duration-micro ease-gc hover:text-moss md:hidden"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div className="border-t border-rule bg-chalk">
          <form onSubmit={submitSearch} className="shell flex items-center gap-3 py-4" role="search">
            <label htmlFor={searchId} className="label text-slate">
              Search
            </label>
            <input
              ref={searchRef}
              id={searchId}
              type="search"
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Bodysuit, 180 gsm, 62cm"
              className="h-touch flex-1 rounded-control border border-slate bg-chalk px-3 text-body text-ink placeholder:text-slate"
            />
            <button
              type="submit"
              className="h-touch rounded-control bg-moss px-4 text-body text-field transition-colors duration-micro ease-gc hover:bg-ink"
            >
              Search
            </button>
          </form>
        </div>
      ) : null}

      {menuOpen ? (
        <div className="fixed inset-0 top-16 z-40 bg-field md:hidden">
          <nav aria-label="Primary, mobile" className="shell py-12">
            <ul className="flex flex-col gap-8">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-display text-display-l text-ink transition-colors duration-micro ease-gc hover:text-moss"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
