# A Viva Voz Coaching

Marketing site for **A Viva Voz Coaching LLC** — vocal coaching, singing and oratory workshops in Puerto Rico, taught by Omayra Martínez.

Live at [avivavozcoaching.com](https://avivavozcoaching.com/).

## Stack

- React 18 + React Router 6 (client-side routing)
- React Bootstrap 5 for layout and components
- SCSS with shared variables in `src/styles/` and per-component stylesheets
- Custom "Brutal Type" webfont family
- Bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

## Getting started

```bash
npm install
npm start
```

Opens [http://localhost:3000](http://localhost:3000) with hot reload.

## Scripts

| Command | What it does |
|---|---|
| `npm start` | Dev server on port 3000 |
| `npm run build` | Production bundle into `build/` |
| `npm test` | Jest in watch mode |
| `npm run eject` | One-way CRA eject — avoid |

## Pages

| Route | Contents |
|---|---|
| `/` | "The Vocal Journey" event hero with a registration CTA, about, services, "Coaching Kids", coach bio, contact info, downloadable policy and workshop PDFs |
| `/consejos` | "Consejos para seguimiento en casa" — long-form guide for parents, with PDF download |

## Deployment

Hosted on **Netlify**. Build output in `build/` is served as a static SPA, and `public/_redirects` rewrites all paths to `index.html` (status 200) so routes like `/consejos` resolve on a direct hit or refresh.

### Registration form

The Vocal Journey sign-up form uses **Netlify Forms**. Two things must be set in the Netlify dashboard — they cannot be configured from this repo:

1. **Enable automatic form detection** in site settings, then redeploy. If it is off, submissions are silently discarded.
2. **Add a form notification** for the `vocal-journey-2027` form. Currently set to `umbranito@gmail.com` **for testing** — switch it to `avivavozcanta@gmail.com` before promoting the page.

The notification recipient is a dashboard setting. It is not stored in this repo and cannot be set from `netlify.toml`.

Submissions also appear under **Forms** in the Netlify dashboard. The free tier covers 100 per month.

A real submission cannot be tested with `npm start` — use a deploy preview or `netlify dev`. See [CLAUDE.md](CLAUDE.md) for how the hidden static form in `public/index.html` ties into this.

## Project layout

```
public/          index.html, favicons, manifest, _redirects
src/
  components/    one folder per component (ComponentName.jsx + ComponentName.scss)
  data/          data.json — copy for the coach bio card
  styles/        _colors, _fonts, _imports, index.scss, App.scss
  img/           logos, parallax backgrounds, banner videos, downloadable PDFs
  fonts/         Brutal Type family
```

See [CLAUDE.md](CLAUDE.md) for a detailed architecture breakdown and known rough edges.
