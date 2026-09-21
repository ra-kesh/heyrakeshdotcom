import type { APIRoute } from 'astro';
import site from '@/config/site';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: site.title,
      short_name: site.name,
      description: site.seoDescription,
      start_url: '/',
      display: 'standalone',
      background_color: '#09090b',
      theme_color: '#09090b',
      icons: [
        {
          src: '/favicon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
        },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
