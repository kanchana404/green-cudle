import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';
import { TOKENS } from '@/lib/tokens';

export const runtime = 'nodejs';
export const alt = `${SITE.name} — undyed organic cotton, newborn to 3 years`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const dir = join(process.cwd(), 'lib', 'og');
  const [sans, geistMono] = await Promise.all([
    readFile(join(dir, 'GeneralSans-Medium.woff')),
    readFile(join(dir, 'GeistMono-Medium.ttf')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: TOKENS.field,
          color: TOKENS.ink,
          padding: 64,
          fontFamily: 'General Sans',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Geist Mono',
            fontSize: 22,
            letterSpacing: '0.12em',
            color: TOKENS.moss,
          }}
        >
          {SITE.wordmark}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: 76, lineHeight: 1.02, letterSpacing: '-0.03em', maxWidth: 900 }}>
            Clothes for skin that&#39;s four days old.
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Geist Mono',
              fontSize: 20,
              letterSpacing: '0.12em',
              color: TOKENS.slate,
            }}
          >
            NEWBORN — 3 YEARS / UNDYED GOTS COTTON
          </div>
        </div>
        <div style={{ display: 'flex', height: 1, width: '100%', backgroundColor: TOKENS.rule }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'General Sans', data: sans, style: 'normal', weight: 500 },
        { name: 'Geist Mono', data: geistMono, style: 'normal', weight: 500 },
      ],
    }
  );
}
