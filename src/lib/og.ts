import sharp from 'sharp';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export async function renderOgImage(options: {
  name: string;
  domain: string;
}): Promise<Uint8Array<ArrayBuffer>> {
  const svg = `
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="#ffffff" />

      <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
        <rect x="130" y="116" width="66" height="66" rx="15" fill="#2563eb" />
        <path
          d="M149.5 166V132h15.1c8.6 0 13.9 4.35 13.9 11.8 0 5.3-2.9 9-7.75 10.7l8.5 11.5h-10.85l-7-10.2h-2V166h-9.9Zm9.9-18.05h4.35c3.2 0 4.9-1.3 4.9-3.95 0-2.55-1.7-3.8-4.9-3.8h-4.35v7.75Z"
          fill="#ffffff"
        />
        <text x="130" y="310" fill="#09090b" font-size="70" font-weight="500" letter-spacing="-2.7">${escapeXml(options.name)}</text>
        <text x="133" y="382" fill="#52525b" font-size="31" font-weight="400" letter-spacing="-0.8">Product engineer crafting thoughtful, intuitive products.</text>
        <text x="133" y="510" fill="#2563eb" font-size="23" font-weight="500" letter-spacing="-0.35">${escapeXml(options.domain)}</text>
      </g>
    </svg>
  `;

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const body = new Uint8Array(png.byteLength);
  body.set(png);
  return body;
}
