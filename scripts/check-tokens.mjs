import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
const ts = readFileSync(new URL('../lib/tokens.ts', import.meta.url), 'utf8');

const fromCss = Object.fromEntries(
  [...css.matchAll(/--(field|chalk|ink|slate|moss|sprout|rule):\s*(#[0-9a-fA-F]{6})/g)].map(
    (m) => [m[1], m[2].toLowerCase()]
  )
);
const fromTs = Object.fromEntries(
  [...ts.matchAll(/(field|chalk|ink|slate|moss|sprout|rule):\s*'(#[0-9a-fA-F]{6})'/g)].map(
    (m) => [m[1], m[2].toLowerCase()]
  )
);

// The favicon is a static SVG and cannot read a custom property either.
const icon = readFileSync(new URL('../app/icon.svg', import.meta.url), 'utf8');
const iconHexes = [...icon.matchAll(/#[0-9a-fA-F]{6}/g)].map((m) => m[0].toLowerCase());
const allowed = new Set(Object.values(fromTs));

let failed = false;
for (const hex of new Set(iconHexes)) {
  if (allowed.has(hex)) {
    console.log(`  PASS  icon.svg ${hex} is a palette token`);
  } else {
    console.log(`  FAIL  icon.svg ${hex} is not in the palette`);
    failed = true;
  }
}

for (const name of ['field', 'chalk', 'ink', 'slate', 'moss', 'sprout', 'rule']) {
  const a = fromCss[name];
  const b = fromTs[name];
  if (a !== b) {
    console.log(`  FAIL  --${name}: globals.css ${a} vs lib/tokens.ts ${b}`);
    failed = true;
  } else {
    console.log(`  PASS  --${name} ${a}`);
  }
}
process.exit(failed ? 1 : 0);
