# Reference: Project structure, scripts, and design tokens

Complete factual description of how this repository is laid out, what each command does, and which style tokens exist. For what the components are and what props they take, see [reference-components.md](reference-components.md).

## Project type

Create React App (`react-scripts` 5.0.1), not Vite and not Next.js. There is no server side rendering and no API layer. The output is a static single page application.

| Dependency | Version | Used for |
|---|---|---|
| `react`, `react-dom` | 18.3.1 | Functional components and hooks |
| `react-router-dom` | 6.30.1 | Client side routing (2 routes) |
| `react-bootstrap` | 2.10.3 | `Container`, `Row`, `Col`, `Navbar`, `Modal`, `Button` |
| `bootstrap` | 5.3.3 | Grid and utility classes, imported through SCSS |
| `sass` | 1.77.6 | All styling |
| `@fortawesome/*` | 6.5.2 | Icons (phone, bars) |
| `react-parallax` | 3.5.1 | Parallax backgrounds in `Introduction`, `IntroductionV2`, `Contact`, `ConsejosPage` |
| `react-scroll` | 1.9.0 | Smooth scroll to `#formSection` |

Installed but **not used by anything that renders**: `@emailjs/browser`, `react-pdf`, `@fileforge/pdfreader`, `react-image-gallery`, `react-fast-marquee`, `web-vitals`. EmailJS is left over from a contact form that no longer exists. The registration form uses Netlify Forms instead, so do not reach for EmailJS when adding form behaviour.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Installs dependencies |
| `npm start` | Dev server with hot reload on http://localhost:3000 |
| `npm run build` | Production bundle into `build/` |
| `npm test` | Jest in interactive watch mode |
| `npm run eject` | One way CRA eject. Avoid. |

`npm test` runs a single file, `src/App.test.js`, which renders `App` and asserts the nav logo is present. That is the only automated test in the repo. Treat a passing `npm test` as "the app mounts", not as feature coverage.

To fail the build on lint warnings rather than printing them, run `CI=true npm run build`.

## Directory layout

```
.claude/launch.json      Dev server config used by Claude Code's browser preview
public/
  index.html             Page shell, meta tags, AND the hidden Netlify form
  _redirects             /*  /index.html  200   (SPA routing on Netlify)
  manifest.json          PWA manifest, linked from index.html
  site.webmanifest       A second manifest, NOT linked from anywhere
  robots.txt             Allows everything
  *.png                  Favicons and app icons
src/
  index.js               React root, registers the FontAwesome solid icon set
  App.test.js            The only test
  reportWebVitals.js     Wired up but called with no callback, so it is inert
  setupTests.js          jest-dom matchers
  components/            One folder per component: Name.jsx + Name.scss
  data/data.json         Content data (see caveat below)
  styles/                Shared SCSS: _colors, _fonts, _imports, index, App
  img/                   Images, videos, and the downloadable PDFs
  fonts/                 Brutal Type family
build/                   Build output, gitignored
```

Each component lives in its own folder holding `ComponentName.jsx` and `ComponentName.scss`, with the stylesheet imported at the top of the JSX and scoped under the component's root class name. One exception: `Banner/banner.scss` is lowercase while every other stylesheet matches its component name.

`generate-react-cli.json` is configured to scaffold that shape (scss, no test, no story).

## Assets

`src/img/` contains:

| File | Used by |
|---|---|
| `vocal_journey_2027.jpeg` (2048x1024) | `Banner`, the event hero art |
| `omayra_profile.jpeg` (2048x1365) | `Services`, the coach photo |
| `avivavoz_logo_white.png` | `NavigationBar`, `Footer` |
| `avivavoz_color_logo.png` | Nothing currently |
| `parallax_red.jpg` | `Introduction`, `IntroductionV2`, `ConsejosPage` |
| `parallax_yellow.jpg` | `Contact` |
| `politicas_a_viva_voz_final_compressed.pdf` | `Introduction` download button |
| `Temas_Talleres.pdf` | `IntroductionV2` download button |
| `Consejos-para-seguimiento-en-casa.pdf` | `ConsejosPage` download button |
| `jose_profile.jpeg` | Nothing (replaced by `omayra_profile.jpeg`) |
| `viva_voz_mobile.mp4`, `viva_voz_desktop.mp4` | `ProgramPDF`, the "Sobre nosotros" video card (portrait file below 768px, landscape from 768px up) |
| `overlay-bg.png` | Nothing |

Images and PDFs must be `import`ed in a component to be bundled. A bare path string in `data.json` will not resolve. See the `imageMap` pattern in [reference-components.md](reference-components.md#services).

## Fonts

`src/fonts/` holds the Brutal Type family in four formats each (`eot`, `ttf`, `woff`, `woff2`), declared in `src/styles/_fonts.scss` as a single family named `Brutal Type` across eight weights:

| Weight | File |
|---|---|
| 100 | `BrutalType-Thin` |
| 200 | `BrutalType-ExtraLight` |
| 300 | `BrutalType-Light` |
| 400 (`normal`) | `BrutalType` |
| 500 | `BrutalType-Medium` |
| 700 (`bold`) | `BrutalType-Bold` |
| 800 | `BrutalType-ExtraBold` |
| 900 | `BrutalType-Black` |

`src/styles/index.scss` sets `Brutal Type` as the family on `body`, `html`, and headings. Google Fonts (Open Sans, Lato, Raleway) are also imported in `_imports.scss` but nothing sets them as a family, so they download without being used.

## Design tokens

All colors live in `src/styles/_colors.scss`. Use these variables rather than raw hex.

| Variable | Value | Uses | Where it carries the design |
|---|---|---|---|
| `$primary-color` | `#00B3B2` | 61 | Teal. The brand color: navbar, buttons, links. |
| `$secondary-color` | `#F9B320` | 44 | Gold. Section headings and accents. |
| `$white` | `#ffffff` | 26 | Text on teal, card backgrounds. |
| `$gray-text` | `#868686` | 13 | Muted secondary text. |
| `$tertiary-color` | `#EF3E3A` | 9 | Red. Validation errors and required markers. |
| `$gray-dark` | `#343a40` | 5 | Body copy and form labels. |
| `$light-primary-color` | `#0D2D57` | 3 | Deep navy, paired with teal in `ConsejosPage` gradients. |
| `$whatsapp-green` | `#25D366` | 3 | WhatsApp buttons. |
| `$purple` | `#6D123F` | 2 | Accent in `Introduction` and `IntroductionV2`. |
| `$black` | `#000000` | 2 | Accent in `Introduction` and `IntroductionV2`. |

Declared but never referenced: `$brown`, `$new-background-blue`, `$accent-color-1`, `$accent-color-2`, `$gray-light`, `$background-color`, `$text-color`. Worth knowing before you reach for one expecting it to already be part of the system.

Two headline patterns recur, worth matching in new sections:

- A two tone heading, gold then teal: `<h2><span className="first-word">…</span> <span className="last-word">…</span></h2>`
- White card on a parallax background: `border-radius: 10px` with a soft box shadow.

Global element styles in `index.scss` set `h2` to uppercase 36px weight 800, `h3` to 20px, `h4` to 18px, and remove list bullets from `ul`/`ol`. New markup inherits those, which is why several components add explicit bullet characters in their `<li>` text.

### Breakpoints

There is no shared breakpoint variable, and the values in use are not consistent. Current values, by frequency:

| Query | Files |
|---|---|
| `max-width: 768px` | 5 |
| `max-width: 500px` | 4 |
| `max-width: 1024px` | 3 |
| `max-width: 767.98px` | 2 (`banner.scss`, `ProgramPDF.scss`) |
| `max-width: 575px` | 2 |
| `max-width: 991px`, `480px`, `min-width: 1024px`, `1200px`, `1440px` | 1 each |

The `767.98px` pair is deliberate and load bearing: it is Bootstrap's `md` boundary and it is what swaps the registration CTA between its two placements. Those two files must keep the same value or the button will appear twice or not at all. See [explanation-architecture.md](explanation-architecture.md#the-cta-has-two-placements).

Three files also honour `prefers-reduced-motion: reduce`, which disables the CTA pulse and shine.

## Deployment

Hosted on Netlify. `npm run build` output in `build/` is served as static files, and `public/_redirects` rewrites every path to `index.html` with status 200 so `/consejos` resolves on a direct hit or a refresh. Without that file those URLs return 404.

Netlify also owns two settings that are not in this repository and cannot be set from code or from `netlify.toml`:

1. Automatic form detection, which must be enabled and followed by a redeploy.
2. The form notification recipient, currently `avivavozcanta@gmail.com`.

Both are covered in [howto-registration-form.md](howto-registration-form.md).

## Known asset issues

These are real and verifiable. None of them break the build, which is why they have survived.

- `public/favicon.ico` does not exist, but `index.html` links it and `manifest.json` lists it. Only `.png` variants are present.
- `manifest.json` lists `"src": "android-chrome-512x512"` with no `.png` extension, so that icon never loads.
- `public/site.webmanifest` is a second manifest with empty `name` and `short_name`. Nothing links it. `index.html` links `manifest.json` instead.
- `manifest.json` sets `theme_color` to `#000000` while `index.html` sets `<meta name="theme-color">` to `#00B3B2`.
- `Introduction.jsx` and `IntroductionV2.jsx` mix `class=` with `className=`. React ignores `class=`, so those styles silently never apply. This is the source of the `Invalid DOM property` warnings in the browser console.
- `reportWebVitals()` is called with no argument in `src/index.js`, so it measures nothing.

## Related

- [reference-components.md](reference-components.md) for the component and props surface
- [explanation-architecture.md](explanation-architecture.md) for why the hero and the form are built this way
- [howto-update-content.md](howto-update-content.md) for editing copy and swapping assets
