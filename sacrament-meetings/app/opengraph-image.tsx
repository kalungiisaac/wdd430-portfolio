import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// File convention: app/opengraph-image.tsx
// See node_modules/next/dist/docs/.../opengraph-image.md — "Generate images
// using code" lets us render the preview image at build time instead of
// shipping a binary .png we'd otherwise have to design externally.

export const alt = 'Sacrament Meeting Planner — Riverside Ward';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// ImageResponse needs an explicit font: without one it tries to fetch a
// default from the network at build time, which fails offline. Read it once
// at module scope (the docs' "Predictable values" guidance).
const geistRegular = await readFile(
  join(process.cwd(), 'assets', 'Geist-Regular.ttf')
);

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a8c 100%)',
          color: '#ffffff',
          fontFamily: 'Geist',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
            }}
          >
            ⛪
          </div>
          <div
            style={{
              fontSize: '30px',
              opacity: 0.85,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Riverside Ward
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '76px',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '24px',
          }}
        >
          Sacrament Meeting
          <br />
          Planner
        </div>

        <div style={{ fontSize: '30px', opacity: 0.8 }}>
          Agendas, speakers, hymns &amp; ward business — ready to print.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Geist',
          data: geistRegular,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
