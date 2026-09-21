import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import siteConfig from '@/config/site';

export const GET: APIRoute = ({ site }) =>
  rss({
    title: `${siteConfig.name} — Posts`,
    description: siteConfig.seoDescription,
    site: site ?? new URL(siteConfig.url),
    items: [],
    customData: `<language>${siteConfig.language}</language>`,
  });
