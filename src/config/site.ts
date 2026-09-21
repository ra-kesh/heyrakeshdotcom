import { z } from 'zod';
import { isSafeHref } from '../lib/urls';

const href = z.string().trim().min(1).refine(isSafeHref, 'Unsafe URL');

const siteSchema = z.object({
  url: z.url(),
  name: z.string().min(1),
  title: z.string().min(1),
  seoDescription: z.string().min(1),
  intro: z.array(z.string().min(1)).min(1),
  agency: z.object({
    name: z.string().min(1),
    url: z.url(),
  }),
  author: z.object({
    name: z.string().min(1),
    role: z.string().min(1).optional(),
    email: z.email().optional(),
    links: z.array(z.object({ label: z.string().min(1), href })).default([]),
  }),
  language: z.string().min(2),
  locale: z.string().min(2),
});

const site = siteSchema.parse({
  url: 'https://heyrakesh.com',
  name: 'Rakesh Kumar Pradhan',
  title: 'Rakesh Kumar Pradhan — Designer & Developer',
  seoDescription:
    'Rakesh Kumar Pradhan is a designer and developer from India who founded HeyDevTeam, the white-label product engineering studio for businesses and agencies.',
  intro: [
    'Hi, I am a product engineer from HeyDevTeam, the white-label product engineering studio for agencies and businesses. We turn vague ideas into thoughtful, intuitive products that solve real problems.',
  ],
  agency: {
    name: 'HeyDevTeam',
    url: 'https://heydevteam.com',
  },
  author: {
    name: 'Rakesh Kumar Pradhan',
    email: 'mail@heyrakesh.com',
    links: [
      { label: 'X', href: 'https://x.com/heyrakeshdotcom' },
      { label: 'GitHub', href: 'https://github.com/ra-kesh' },
      { label: 'Contra', href: 'https://contra.com/heyrakesh' },
    ],
  },
  language: 'en',
  locale: 'en_US',
});

export default site;
