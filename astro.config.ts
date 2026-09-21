import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import siteConfig from './src/config/site';

const site = process.env.SITE_URL ?? siteConfig.url;

new URL(site);

export default defineConfig({
  site,
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: false,
  },
  security: {
    checkOrigin: true,
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
    },
  },
});
