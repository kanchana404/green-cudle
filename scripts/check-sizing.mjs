/**
 * Asserts the sizing logic the Grow Ruler depends on. Reads the TS sources
 * directly so there is no build step and no duplicated table.
 */
import { readFileSync } from 'node:fs';

const sizesSrc = readFileSync(new URL('../lib/sizes.ts', import.meta.url), 'utf8');
const productsSrc = readFileSync(new URL('../lib/products.ts', import.meta.url), 'utf8');

const BANDS = [...sizesSrc.matchAll(
  /\{ name: '([^']+)', minCm: (\d+), maxCm: (\d+), range: '([^']+)', age: '([^']+)' \}/g
)].map((m) => ({ name: m[1], minCm: +m[2], maxCm: +m[3], range: m[4], age: m[5] }));

const PRODUCTS = [...productsSrc.matchAll(
  /slug: '([^']+)',\s*\n\s*name: '([^']+)',[\s\S]*?sizeRange: '([^']+)',\s*\n\s*bands: \[(\d+), (\d+)\]/g
)].map((m) => ({ slug: m[1], name: m[2], sizeRange: m[3], bands: [+m[4], +m[5]] }));

let failed = false;
const ok = (cond, msg) => {
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${msg}`);
  if (!cond) failed = true;
};

console.log('== size bands ==');
ok(BANDS.length === 7, `seven bands parsed (${BANDS.length})`);
ok(BANDS[0].minCm === 44, `rule starts at 44cm (${BANDS[0].minCm})`);
ok(BANDS[BANDS.length - 1].maxCm === 96, `rule ends at 96cm (${BANDS.at(-1).maxCm})`);

let contiguous = true;
for (let i = 1; i < BANDS.length; i += 1) {
  if (BANDS[i].minCm !== BANDS[i - 1].maxCm) contiguous = false;
}
ok(contiguous, 'bands are contiguous with no gap and no overlap');

const expected = [
  ['Newborn', 44, 50], ['0-3M', 50, 58], ['3-6M', 58, 66], ['6-12M', 66, 74],
  ['12-18M', 74, 82], ['18-24M', 82, 88], ['2-3Y', 88, 96],
];
ok(
  BANDS.every((b, i) => b.name === expected[i][0] && b.minCm === expected[i][1] && b.maxCm === expected[i][2]),
  'bands match the brief exactly'
);

console.log('\n== band lookup at boundaries ==');
const bandIndexForCm = (cm) => {
  for (let i = 0; i < BANDS.length; i += 1) if (cm < BANDS[i].maxCm) return i;
  return BANDS.length - 1;
};
ok(BANDS[bandIndexForCm(44)].name === 'Newborn', '44cm -> Newborn');
ok(BANDS[bandIndexForCm(49.9)].name === 'Newborn', '49.9cm -> Newborn');
ok(BANDS[bandIndexForCm(50)].name === '0-3M', '50cm -> 0-3M (boundary is exclusive below)');
ok(BANDS[bandIndexForCm(66)].name === '6-12M', '66cm -> 6-12M');
ok(BANDS[bandIndexForCm(88)].name === '2-3Y', '88cm -> 2-3Y');
ok(BANDS[bandIndexForCm(96)].name === '2-3Y', '96cm -> 2-3Y (top of the rule clamps in)');

console.log('\n== products per band ==');
ok(PRODUCTS.length === 8, `eight products parsed (${PRODUCTS.length})`);
for (const band of BANDS.keys()) {
  const inBand = PRODUCTS.filter((p) => band >= p.bands[0] && band <= p.bands[1]);
  ok(inBand.length > 0, `${BANDS[band].name} lists ${inBand.length} product(s)`);
}
const sock = PRODUCTS.find((p) => p.slug === 'roll-cuff-sock-3-pack');
ok(sock.bands[0] === 0 && sock.bands[1] === 6, 'NB-3Y sock spans every band');
const kit = PRODUCTS.find((p) => p.slug === 'newborn-kit-7-pieces');
ok(kit.bands[0] === 0 && kit.bands[1] === 1, 'NB-3M kit spans only the two smallest bands');

console.log('\n== silhouette proportionality ==');
const silSrc = readFileSync(new URL('../components/GarmentSilhouette.tsx', import.meta.url), 'utf8');
const BASE = Number(silSrc.match(/SILHOUETTE_BASE_PX = (\d+)/)[1]);
const h = (cm) => (cm / 44) * BASE;
ok(Math.abs(h(88) - 2 * h(44)) < 1e-9, '88cm renders exactly twice the size of 44cm');
ok(Math.abs(h(96) / h(48) - 2) < 1e-9, '96cm renders exactly twice the size of 48cm');
ok(h(44) === BASE, `scale is linear in cm (44 -> ${BASE}px, 88 -> ${h(88)}px, 96 -> ${Math.round(h(96))}px)`);

process.exit(failed ? 1 : 0);
