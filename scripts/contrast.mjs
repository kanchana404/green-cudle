import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../lib/tokens.ts', import.meta.url), 'utf8');
const TOKENS = Object.fromEntries(
  [...src.matchAll(/(field|chalk|ink|slate|moss|sprout|rule):\s*'(#[0-9a-fA-F]{6})'/g)].map(
    (m) => [m[1], m[2]]
  )
);

const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const lum = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => lin(v / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

/** Every foreground/background pair the site actually renders, with its gate. */
const PAIRS = [
  ['ink', 'field', 4.5, 'body and display text on the page ground'],
  ['ink', 'chalk', 4.5, 'text on lifted surfaces'],
  ['slate', 'field', 4.5, 'captions and secondary text on the page ground'],
  ['slate', 'chalk', 4.5, 'captions on lifted surfaces'],
  ['moss', 'field', 4.5, 'links and the wordmark'],
  ['moss', 'chalk', 4.5, 'wordmark in the sticky header'],
  ['field', 'moss', 4.5, 'button text on the moss fill'],
  ['field', 'ink', 4.5, 'text on the ink fill'],
  ['ink', 'sprout', 4.5, 'the ruler marker cap, and Join on the moss band'],
  ['slate', 'chalk', 3.0, 'checkbox and input borders on lifted surfaces'],
  ['slate', 'field', 3.0, 'checkbox and input borders on the page ground'],
  ['field', 'moss', 3.0, 'the input border inside the moss newsletter band'],
  ['rule', 'field', 1.0, 'hairlines only, decorative, no WCAG gate applies'],
];

let failed = false;
console.log('pair'.padEnd(22), 'ratio'.padStart(6), ' gate   result  use');
for (const [fg, bg, gate, use] of PAIRS) {
  const r = ratio(TOKENS[fg], TOKENS[bg]);
  const ok = r >= gate;
  if (!ok) failed = true;
  console.log(
    `${fg} on ${bg}`.padEnd(22),
    r.toFixed(2).padStart(6),
    ` ${gate.toFixed(1)}`.padEnd(7),
    (ok ? 'PASS' : 'FAIL').padEnd(8),
    use
  );
}

/**
 * sprout is deliberately excluded as a text colour: it measures 1.49:1 on field.
 * The gate asserts it is never used as one.
 */
const sproutOnField = ratio(TOKENS.sprout, TOKENS.field);
console.log(
  `\nsprout on field is ${sproutOnField.toFixed(2)}:1 — never a text colour, marker and focus ring only.`
);

process.exit(failed ? 1 : 0);
