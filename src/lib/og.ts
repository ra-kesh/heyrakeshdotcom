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

function lines(value: string, maxLength = 32): string[] {
  const words = value.trim().split(/\s+/);
  const result: string[] = [];

  for (const word of words) {
    const current = result.at(-1);
    if (!current || `${current} ${word}`.length > maxLength) {
      result.push(word);
    } else {
      result[result.length - 1] = `${current} ${word}`;
    }
  }

  return result.slice(0, 3);
}

export async function renderOgImage(options: {
  title: string;
  label: string;
  siteName: string;
}): Promise<Uint8Array<ArrayBuffer>> {
  const titleLines = lines(options.title);
  const tspans = titleLines
    .map(
      (line, index) =>
        `<tspan x="72" dy="${index === 0 ? 0 : 78}">${escapeXml(line)}</tspan>`,
    )
    .join('');

  const svg = `
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="accent" cx="100%" cy="0%" r="80%">
          <stop offset="0%" stop-color="#2563eb" stop-opacity="0.32" />
          <stop offset="100%" stop-color="#2563eb" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="630" fill="#09090b" />
      <rect width="1200" height="630" fill="url(#accent)" />
      <rect x="32" y="32" width="1136" height="566" rx="24" fill="none" stroke="#27272a" stroke-width="2" />
      <circle cx="84" cy="88" r="8" fill="#2563eb" />
      <text x="108" y="97" fill="#a1a1aa" font-family="Arial, sans-serif" font-size="24">${escapeXml(options.label)}</text>
      <text x="72" y="224" fill="#fafafa" font-family="Arial, sans-serif" font-size="64" font-weight="700">${tspans}</text>
      <text x="72" y="550" fill="#a1a1aa" font-family="Arial, sans-serif" font-size="28">${escapeXml(options.siteName)}</text>
    </svg>
  `;

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const body = new Uint8Array(png.byteLength);
  body.set(png);
  return body;
}
