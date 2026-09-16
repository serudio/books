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

- Books live in Supabase and are edited in the hidden admin panel (below).
  `src/data/books.ts` only holds the fallback list shown when Supabase is unreachable.
- Contacts, location, hours: `src/data/contact.ts`
- Colours and fonts: `src/theme.ts`

## Admin panel

The panel is at **`/books/#admin`** — it is not linked from anywhere in the UI.

Sign in with Google. Anyone can *sign in*, but only `cestserg@gmail.com` can change anything:
row-level security in Postgres checks the email on the signed JWT
(`public.is_admin()`, see `supabase/migrations/0003_admin_write_access.sql`). The anon key in the
bundle grants read-only access, so the hidden URL is convenience, not the security boundary.

To change the admin address, update it in **both** that migration and `src/auth/admin.ts`.

### Trash

Deleting a book sets `deleted_at` instead of dropping the row. Trashed books are invisible to
visitors — the read policy hides them from anyone who is not the admin, so it is not just a
client-side filter. In the **Trash** tab a book can be restored, deleted forever, or the whole
trash emptied; those two are real deletes and cannot be undone.

### One-time Supabase setup

1. **Authentication → Providers → Google**: enable it, paste the Google OAuth client ID and secret
   from Google Cloud Console, and register Supabase's callback
   (`https://<project>.supabase.co/auth/v1/callback`) as an authorised redirect URI there.
2. **Authentication → URL Configuration**: set the Site URL to `https://serudio.github.io/books/`
   and add `http://localhost:5173/` to the redirect allow-list for local work.
3. Apply the migrations: `npm run db:migrate` (needs `SUPABASE_DB_URL` in `.env`).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/`.

One-time setup: in the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.

The site is served from a subpath, so `base: '/books/'` is set in `vite.config.ts`. If the repo is
ever renamed or moved to a custom domain, update that value.
