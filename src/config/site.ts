import { z } from 'zod';
import { isSafeHref } from '../lib/urls';

const href = z.string().trim().min(1).refine(isSafeHref, 'Unsafe URL');

const siteSchema = z.object({
  url: z.url(),
  name: z.string().min(1),
  title: z.string().min(1),
  seoDescription: z.string().min(1),
  intro: z.string().min(1),
  agency: z.object({
    name: z.string().min(1),
    url: z.url(),
  }),
  author: z.object({
    name: z.string().min(1),
    role: z.string().min(1),
    email: z.email().optional(),
    links: z.array(z.object({ label: z.string().min(1), href })).default([]),
  }),
  experience: z.array(
    z.object({
      role: z.string().min(1),
      company: z.string().min(1),
      start: z.string().min(1),
      end: z.string().min(1),
      href,
    }),
  ),
  language: z.string().min(2),
  locale: z.string().min(2),
  navigation: z.array(z.object({ label: z.string().min(1), href })),
});

const site = siteSchema.parse({
  url: 'https://heyrakesh.com',
  name: 'Rakesh Kumar Pradhan',
  title: 'Rakesh Kumar Pradhan — Product Engineer',
  seoDescription:
    'Rakesh Kumar Pradhan is the founder of heydevteam, a product engineering studio crafting thoughtful, intuitive products with AI.',
  intro:
    'Hi, I am a product engineer from India. I love making thoughtful, intuitive products for my personal use and for my clients. I believe we can never have enough tasteful products that perform as well as they look.',
  agency: {
    name: 'heydevteam',
    url: 'https://heydevteam.com',
  },
  author: {
    name: 'Rakesh Kumar Pradhan',
    role: 'Product Engineer',
    email: 'mail@heyrakesh.com',
    links: [
      { label: 'GitHub', href: 'https://github.com/ra-kesh' },
      { label: 'X', href: 'https://x.com/heyrakeshdotcom' },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/heyrakeshdotcom/',
      },
      { label: 'Contra', href: 'https://contra.com/heyrakesh' },
    ],
  },
  experience: [],
  language: 'en',
  locale: 'en_US',
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about/' },
  ],
});

export default site;
