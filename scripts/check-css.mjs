/**
 * The source-level grep can be fooled: Tailwind's `ring-*` utilities compile to
 * `box-shadow`, and a class name never contains the string. So compile the real
 * stylesheet and assert against the CSS that actually ships.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const dir = mkdtempSync(join(tmpdir(), 'gc-css-'));
const out = join(dir, 'out.css');

try {
  execFileSync(
    'npx',
    ['tailwindcss', '-c', 'tailwind.config.ts', '-i', 'app/globals.css', '-o', out, '--minify'],
    { stdio: 'pipe' }
  );
} catch (error) {
  console.log('  FAIL  could not compile the stylesheet');
  console.log(String(error.stderr || error.message).slice(0, 500));
  process.exit(1);
}

const css = readFileSync(out, 'utf8');
rmSync(dir, { recursive: true, force: true });

let failed = false;
const check = (name, re, allow = 0) => {
  const hits = css.match(re) || [];
  const ok = hits.length <= allow;
  if (!ok) failed = true;
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(46)} ${hits.length}`);
  if (!ok) console.log('        ' + [...new Set(hits)].slice(0, 6).join(' | '));
};

// A real box-shadow declaration. `--tw-*-shadow` custom properties are Tailwind's
// unset defaults and paint nothing on their own.
check('compiled CSS has no box-shadow declaration', /[^-]box-shadow:(?!\s*(none|0 0 #0000))/g);
check('compiled CSS has no gradient function', /(linear|radial|conic)-gradient\(/g);
check('compiled CSS has no backdrop-filter', /backdrop-filter:(?!\s*none)/g);
check('compiled CSS has no filter: blur', /filter:\s*blur\(/g);

// Radius: only 2px (controls) and 999px (size chips) may exist.
const radii = [...css.matchAll(/border-radius:([^;}]+)/g)].map((m) => m[1].trim());
const allowedRadii = new Set(['0', '0px', '2px', '999px']);
const badRadii = [...new Set(radii)].filter((r) => !allowedRadii.has(r));
if (badRadii.length) {
  failed = true;
  console.log(`  FAIL  only 2px and 999px radii permitted           ${badRadii.join(' | ')}`);
} else {
  console.log(`  PASS  ${'only 2px and 999px radii permitted'.padEnd(46)} ${[...new Set(radii)].join(' ')}`);
}

// Two weights, and no Inter anywhere.
const weights = [...new Set([...css.matchAll(/font-weight:\s*(\d+)/g)].map((m) => m[1]))].sort();
const badWeights = weights.filter((w) => w !== '400' && w !== '500');
if (badWeights.length) {
  failed = true;
  console.log(`  FAIL  only weights 400 and 500                      ${weights.join(' ')}`);
} else {
  console.log(`  PASS  ${'only weights 400 and 500'.padEnd(46)} ${weights.join(' ')}`);
}
check('compiled CSS never names Inter', /\bInter\b/g);

process.exit(failed ? 1 : 0);
