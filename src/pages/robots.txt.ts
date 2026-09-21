import type { APIRoute } from 'astro';
import siteConfig from '@/config/site';

export const GET: APIRoute = ({ site }) => {
  const root = site ?? new URL(siteConfig.url);
  const sitemap = new URL('sitemap-index.xml', root);

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
