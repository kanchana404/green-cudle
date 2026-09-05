'use client';

import { useId, useState } from 'react';

type Status = { readonly kind: 'idle' } | { readonly kind: 'error'; readonly message: string } | { readonly kind: 'done' };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * `tone` picks the submit fill: moss in the footer, sprout in the full-bleed
 * band, where the ground is already moss.
 */
export function NewsletterForm({ tone }: { readonly tone: 'moss' | 'sprout' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const id = useId();
  const messageId = `${id}-message`;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = email.trim();
    if (value === '') {
      setStatus({ kind: 'error', message: 'Enter an email address to join.' });
      return;
    }
    if (!EMAIL.test(value)) {
      setStatus({ kind: 'error', message: 'That address is missing an @ or a domain. Check it and send again.' });
      return;
    }
    setStatus({ kind: 'done' });
    setEmail('');
  }

  const onMoss = tone === 'sprout';
  const labelTone = onMoss ? 'text-field' : 'text-slate';
  const fieldTone = onMoss
    ? 'border-field bg-moss text-field placeholder:text-field/70'
    : 'border-slate bg-chalk text-ink placeholder:text-slate';
  const buttonTone = onMoss
    ? 'bg-sprout text-ink hover:bg-field'
    : 'bg-moss text-field hover:bg-ink';

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor={id} className={`label block ${labelTone}`}>
        One email a month
      </label>
      <div className="mt-3 flex gap-2">
        <input
          id={id}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status.kind !== 'idle') setStatus({ kind: 'idle' });
          }}
          placeholder="you@example.com"
          aria-describedby={status.kind === 'idle' ? undefined : messageId}
          aria-invalid={status.kind === 'error'}
          className={`h-touch min-w-0 flex-1 rounded-control border px-3 text-body ${fieldTone}`}
        />
        <button
          type="submit"
          className={`h-touch shrink-0 rounded-control px-4 text-body transition-colors duration-micro ease-gc ${buttonTone}`}
        >
          Join
        </button>
      </div>
      <p
        id={messageId}
        role="status"
        aria-live="polite"
        className={`mt-3 text-caption ${onMoss ? 'text-field' : 'text-slate'}`}
      >
        {status.kind === 'error' ? status.message : null}
        {status.kind === 'done' ? 'Joined. The next one goes out at the start of the month.' : null}
      </p>
    </form>
  );
}
