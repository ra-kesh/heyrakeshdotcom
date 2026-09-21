# heyrakesh.com

The personal portfolio of Rakesh Kumar Pradhan.

## Development

```sh
pnpm install
pnpm dev
```

The production URL defaults to `https://heyrakesh.com`. Copy `.env.example` to
`.env` only when a different origin is needed locally.

## Configuration

Site identity, biography, SEO metadata, and social links live in
`src/config/site.ts`.

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
