import type { APIRoute } from 'astro';
import site from '@/config/site';
import { renderOgImage } from '@/lib/og';

export const getStaticPaths = () => [
  {
    params: { slug: 'site' },
    props: { title: site.title, label: 'Website' },
  },
];

export const GET: APIRoute = async ({ props }) => {
  const { title, label } = props as { title: string; label: string };
  const body = await renderOgImage({ title, label, siteName: site.name });

  return new Response(body, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
