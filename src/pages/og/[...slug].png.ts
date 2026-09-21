import type { APIRoute } from 'astro';
import site from '@/config/site';
import { renderOgImage } from '@/lib/og';

export const getStaticPaths = () => [
  {
    params: { slug: 'site-v2' },
  },
];

export const GET: APIRoute = async () => {
  const body = await renderOgImage({
    name: site.author.name,
    domain: new URL(site.url).hostname,
  });

  return new Response(body, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
