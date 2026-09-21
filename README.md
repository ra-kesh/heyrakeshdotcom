# heyrakesh.com

The personal portfolio and publishing site of Rakesh Kumar Pradhan.

## Development

```sh
pnpm install
pnpm dev
```

The production URL defaults to `https://heyrakesh.com`. Copy `.env.example` to
`.env` only when a different origin is needed locally.

## Content

- Site identity, biography, navigation, and social links: `src/config/site.ts`
- Posts: `src/content/posts`
- Projects: `src/content/projects`

Draft posts and projects are excluded from generated pages, feeds, and the
homepage.

## Commands

```sh
pnpm dev
pnpm format
pnpm lint
pnpm check
pnpm build
pnpm validate
```

`pnpm validate` runs formatting, linting, type checks, and the production build.
