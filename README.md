# A Viva Voz Coaching

Marketing site for **A Viva Voz Coaching LLC** — vocal coaching, singing and oratory workshops in Puerto Rico, taught by Omayra Martínez.

Live at [avivavozcoaching.com](https://avivavozcoaching.com/).

## Documentation

Full docs live in [`docs/`](docs/), organised by what you are trying to do:

| Doc | Read it when |
|---|---|
| [Tutorial: run the site and make your first change](docs/tutorial-getting-started.md) | You are new here and want it running in ten minutes |
| [How to update content, assets, and pages](docs/howto-update-content.md) | You need to change copy, swap a photo or PDF, or add a page |
| [How to work with the registration form](docs/howto-registration-form.md) | You are touching the sign up form, its fields, or its email delivery |
| [Reference: project structure, scripts, design tokens](docs/reference-project-structure.md) | You need to look up a command, a color, a breakpoint, or an asset |
| [Reference: routes, components, and props](docs/reference-components.md) | You need a component's props or what it renders |
| [Explanation: why the hero and form are built this way](docs/explanation-architecture.md) | **Before** changing the hero sizing, the CTA, or the form |

That last one is not optional reading if you plan to touch the banner or the form. Both contain decisions that look like over engineering and are not.

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
2. **Add a form notification** for the `vocal-journey-2027` form, pointing at `avivavozcanta@gmail.com`.

The notification recipient is a dashboard setting. It is not stored in this repo and cannot be set from `netlify.toml`.

Submissions also appear under **Forms** in the Netlify dashboard. The free tier covers 100 per month.

A real submission cannot be tested with `npm start` — use a deploy preview or `netlify dev`. See [CLAUDE.md](CLAUDE.md) for how the hidden static form in `public/index.html` ties into this.

**If the first submission arrives and later ones seem to disappear**, they are almost certainly in the **Spam submissions** tab. Netlify's Akismet filter flags submissions containing test data or repeating from the same IP, and spam-flagged submissions send no notification. Test with realistic data and check that tab before assuming the form is broken.

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
