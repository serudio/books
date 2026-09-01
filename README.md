# Book Rent

A small static site listing books available to rent: cover photo, author, weekly price and
refundable pledge, plus a contact/location section.

Live: https://serudio.github.io/books/

## Stack

- **Vite** + **React 19** + **TypeScript**
- **MUI** (Material UI) for components and theming
- **oxlint** for linting
- **GitHub Actions** → **GitHub Pages** for deployment

## Local development

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Editing content

Everything is plain data, no backend:

- Books: `src/data/books.ts` (also `currency`)
- Contacts, location, hours: `src/data/contact.ts`
- Colours and fonts: `src/theme.ts`

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/`.

One-time setup: in the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.

The site is served from a subpath, so `base: '/books/'` is set in `vite.config.ts`. If the repo is
ever renamed or moved to a custom domain, update that value.
