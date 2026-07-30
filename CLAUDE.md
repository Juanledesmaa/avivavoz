# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Documentation

Deeper documentation lives in `docs/`. This file stays the quick orientation; those go into detail.

| Doc | Covers |
|---|---|
| `docs/tutorial-getting-started.md` | Install, run, first content change, production build |
| `docs/howto-update-content.md` | Which file holds which copy, swapping assets, adding a page |
| `docs/howto-registration-form.md` | Netlify Forms setup, adding fields, testing, spam troubleshooting |
| `docs/reference-project-structure.md` | Directories, scripts, design tokens, breakpoints, known asset issues |
| `docs/reference-components.md` | Every route, component, and prop |
| `docs/explanation-architecture.md` | Why the hero sizing, CTA placement, form, and photo crop work as they do |

Read `docs/explanation-architecture.md` before modifying the hero, the CTA, or the registration form. Each of those carries a decision that has already been broken once by a reasonable looking simplification.

## Project Overview

"A Viva Voz Coaching" — a React marketing site for a vocal coaching business in Puerto Rico (voice, singing and oratory workshops taught by Omayra Martínez). Built with Create React App, React Bootstrap and custom SCSS. All user-facing content is in Spanish.

Production domain: `https://avivavozcoaching.com/`. Deployed as an SPA — `public/_redirects` (`/* /index.html 200`) rewrites all paths to the app so client-side routes survive a refresh.

## Common Commands

- `npm start` — dev server on localhost:3000
- `npm run build` — production bundle to `/build`
- `npm test` — Jest in interactive watch mode. Only `src/App.test.js` exists (smoke test: renders `App`, asserts the nav logo is present)

## Architecture & Structure

### Routing

`src/components/App.jsx` is the shell: `BrowserRouter` → persistent `NavigationBar`, a `<main className="main-content">` wrapping `<Routes>`, then `Footer`.

| Route | Component |
|---|---|
| `/` | `HomePage` |
| `/consejos` | `ConsejosPage` |

Adding a page means: create the component folder, add a `<Route>` in `App.jsx`, and add nav links in **both** the desktop `<Nav>` and the mobile `Navbar.Collapse` blocks of `NavigationBar.jsx` — the two layouts are separate markup, not one responsive tree.

### Page composition

`HomePage` loads `data.json` into `useState` and renders, in order:

1. `Banner` — the "The Vocal Journey" event hero: a single piece of artwork (`vocal_journey_2027.jpeg`, 2048×1024) plus the CTA overlaid on it at 768px and up. See "The hero" below
2. `ProgramPDF` — the "SOBRE NOSOTROS" copy block, plus the same CTA relocated to the top of this section below 768px. Despite the name it no longer renders a PDF; its `.pdf-container` is empty
3. `Introduction` — "SERVICIOS" and "COACHING KIDS" sections, and a download button for `politicas_a_viva_voz_final_compressed.pdf`
4. `Services` — the coach bio card; the only component driven by `data.json`
5. `IntroductionV2` — group and individual sessions, vocal technique, download button for `Temas_Talleres.pdf`
6. `Contact` — carries `id="formSection"`, the Banner's scroll target. **Not a form**: phone link, a Gmail compose deep link for `avivavozcanta@gmail.com`, plus Facebook and Instagram links

### The hero

`Banner` is sized so the whole banner and its CTA are always on screen without scrolling:

- `.vj-hero` is `height: min(calc(100dvh - var(--vj-nav-h)), 50vw)` — never taller than the space under the navbar, and never taller than the art needs at full width.
- `.vj-frame` inside it carries `aspect-ratio: 2048 / 1024` with `max-width/max-height: 100%` and `margin: auto`. It therefore shrinks to fit whichever axis runs out first and stays centred, so **the artwork is always whole — never cropped**.
- A single fixed-ratio image cannot fill a viewport of a different ratio without either cropping or leaving empty space. Whole-art visibility won, so the leftover is filled by `.vj-backdrop` — the same image, `cover`, blurred and dimmed, scaled 1.12 so the blur's soft edge never exposes the hero background. That reads as depth instead of flat bars.
- `--vj-nav-h` is **measured at runtime** by `Banner.jsx` with a `ResizeObserver` on `.navigationBar`, not hardcoded. The navbar is 76px on desktop and taller on mobile (the phone button wraps), and it reflows with zoom and font size — an assumed constant put the CTA below the fold.
- The CTA is **always horizontally centred** in the frame (`left: 50%`). Its `width: 47%` is what lets a centred button fully cover the `VIAJA · CANTA · APRENDE · TRANSFÓRMATE` tagline, which spans x 30–56% of the art — i.e. centred on 43%, not 50%. There is deliberately **no px `max-width`**: a cap binds on wide screens and lets the tagline poke out past the button.
- `bottom: 12.5%` places it over the tagline (y 82–86%) while clearing the website/phone pill below (y 88.5–94%), so contact details stay readable. All these percentages are relative to the frame, so the button holds its position on the art at every size.
- Contrast: teal and the red art sit at similar luminance, so hue alone didn't separate the button. The white keyline does the work; the gradient, glow pulse, and shine sweep signal that it's pressable. All motion is disabled under `prefers-reduced-motion`.

**The CTA has two placements**, switched at exactly `767.98px`, with only one visible at a time:

| Viewport | Placement | Rendered by |
|---|---|---|
| 768px and up | Overlaid on the artwork | `Banner` |
| Below 768px | Top of the "Sobre nosotros" section | `ProgramPDF` |

Below 768px the art is only ~half the viewport width tall, so an overlaid button would cover the tagline and contact pill. Because the CTA lives in two components, **modal state is owned by `HomePage`**, which renders `RequestInfoModal` once and passes the same `onRequestInfo` callback to both — `Banner` is presentational. The `767.98px` value appears in both `banner.scss` and `ProgramPDF.scss` and must match, or the button appears twice or not at all. The relocated button defines its own `riPulse`/`riShine` keyframes rather than reusing the banner's, so it doesn't depend on another component's stylesheet being loaded.

The old autoplay video hero is gone. `viva_voz_mobile.mp4` and `viva_voz_desktop.mp4` are deliberately kept in `src/img/` but are no longer referenced, in case the animated hero is wanted back after the event.

`ConsejosPage` is a standalone long-form document ("Fortaleciendo el taller A Viva Voz Coaching Kids en CASA") — a hero with a PDF download button, then hardcoded JSX sections inside a `Parallax`. Its content lives in the JSX, not in `data.json`.

### The registration form (Netlify Forms)

`RequestInfoModal` collects sign-ups for The Vocal Journey and submits them through **Netlify Forms**. There is no backend and no third-party form service.

How it fits together — all three pieces must agree:

1. **`public/index.html`** holds a hidden `<form name="vocal-journey-2027" data-netlify="true" netlify-honeypot="bot-field" hidden>` listing every field. Netlify detects forms by parsing the *built* HTML, and the real form only exists at runtime, so this static copy is what registers the form and its fields at deploy time.
2. **`RequestInfoModal.jsx`** renders the real form, including a hidden `form-name` input.
3. On submit it `fetch`es `POST /` with `Content-Type: application/x-www-form-urlencoded` (via `URLSearchParams`). **Netlify does not parse JSON** — sending JSON silently produces empty submissions.

Field names: `nombre`, `edades`, `email`, `telefono`, `experiencia`, `conoce-registro`, `registro`, `expectativas`, plus the `bot-field` honeypot. **If you add or rename a field, change it in both the modal and the hidden form in `index.html`.** A mismatch is accepted by Netlify but arrives with that field blank — it fails silently, not loudly.

Validation is client-side in the modal's `validate()`, in Spanish, all fields required — except `registro`, which is only rendered and only required when `conoce-registro` is `Sí`. Switching that answer back to `No` clears any previously picked range so a stale value can't be submitted.

Two dashboard-side settings live outside this repo and cannot be configured in code:

- **Automatic form detection** must be enabled in the Netlify site settings, followed by a redeploy. If it's off, submissions vanish silently — this is the most common failure mode.
- **Form notifications** are configured per-form in the Netlify UI, and go to `avivavozcanta@gmail.com`. The recipient is not stored in this repo and cannot be set from `netlify.toml` — it is dashboard-only, so changing it is always a manual step there.

The free tier allows 100 submissions/month; past that, submissions are blocked rather than queued. On any failure the modal keeps the entered values and offers a Gmail compose fallback.

Local `npm start` cannot complete a real submission — `POST /` isn't handled by the CRA dev server. Test against a deploy preview or `netlify dev`.

#### "It worked once, now nothing arrives"

Netlify runs every submission through Akismet. Per Netlify's troubleshooting docs, submissions are flagged as spam when they **contain test data or come repeatedly from the same IP** — exactly what testing looks like. Flagged submissions:

- go to the **Spam submissions** tab, not Verified, and
- send **no notification**, because notifications only fire for *verified* submissions.

So the symptom is "the first one arrived and the rest vanished", with the POST still returning `200` and Netlify's "Thank you!" page. Nothing is broken and no code change helps.

What to do: check **Forms → `vocal-journey-2027` → Spam submissions**, mark the good ones as verified, and test with realistic-looking data rather than `test`/`asdf`, spacing attempts out or using a different network. A submission returning Netlify's "Thank you!" HTML means it *was* accepted — that response is not an error.

Note the client always shows success on a `200`, because Netlify returns `200` for spam-flagged submissions too. There is no response field that distinguishes them.

### Unused components

`Gallery/`, `Modal/` and `MarqueeBanner/` are not imported anywhere. `Gallery` still points at picsum placeholder URLs; `Modal` is a leftover ATH Móvil ticket-reservation confirmation. Treat all three as dead code — they don't reflect current requirements.

### Data management

`src/data/data.json` is passed down from `HomePage`, but **only the `Services` array is consumed** (by `Services.jsx`). The other keys (`Header`, `About`, `Gallery`, `Testimonials`, `Team`, `Contact`, `Features`) are unmodified Create React App template placeholders — lorem ipsum plus a fake San Francisco address, phone and email. Never treat them as real content or surface them in the UI. Real contact details are hardcoded in `Contact.jsx`, `NavigationBar.jsx` and `Footer.jsx`.

`Services.jsx` resolves images through a local `imageMap` object (`image1` → imported `jose_profile.jpeg`), because assets must be `import`ed to be bundled — a bare path string in `data.json` will not resolve.

No global state management, no context, no data fetching.

### Styling architecture

Shared SCSS in `src/styles/`:

- `_colors.scss` — `$primary-color: #00B3B2` (teal), `$secondary-color: #F9B320` (gold), `$tertiary-color: #EF3E3A`, plus neutrals and `$whatsapp-green`
- `_fonts.scss` — "Brutal Type" family, weights 100–900, in eot/ttf/woff/woff2
- `_imports.scss` — Google Fonts (Open Sans, Lato, Raleway), `react-image-gallery` styles, `_fonts`, full Bootstrap, `_colors`
- `index.scss` — global element styles (base `h2`–`h5`, `p`, `a`, list resets, `body` background set to `$primary-color`)
- `App.scss` — app shell; `.App` sets `overflow-x: hidden`, `.main-content` a `min-height`

Each component folder holds its own `.scss`, imported at the top of its `.jsx` and scoped under the component's root class. Note `Banner/banner.scss` is lowercase — every other stylesheet matches its component name.

### Assets

`src/img/` holds logos (`avivavoz_logo_white.png`, `avivavoz_color_logo.png`), parallax backgrounds (`parallax_red.jpg`, `parallax_yellow.jpg`), the coach photo, the two banner videos, and the three downloadable PDFs. Fonts in `src/fonts/`. Favicons and manifest in `public/`.

## Development Guidelines

### Component creation

Follow the existing pattern: a folder in `src/components/` containing `ComponentName.jsx` and `ComponentName.scss`, with the SCSS imported at the top of the JSX. Functional components with hooks. `generate-react-cli.json` scaffolds this shape (scss, no test, no story).

### Styling conventions

Use the variables from `_colors.scss` rather than raw hex. Lean on Bootstrap grid and utility classes for layout; several sections use responsive `Col` spans plus `d-none` / `d-lg-flex` pairs to swap between mobile and desktop markup.

### Content updates

- Coach bio card copy → `src/data/data.json` (`Services`)
- All other homepage copy → hardcoded in the respective component JSX
- `/consejos` copy → hardcoded in `ConsejosPage.jsx`
- Contact info, phone numbers, social links → hardcoded in `Contact.jsx`, `NavigationBar.jsx`, `Footer.jsx`
- New images or PDFs → add to `src/img/` and `import` them in the component

### Known rough edges

Be aware of these; don't fix them unasked:

- `Introduction.jsx` and `IntroductionV2.jsx` mix `class=` with `className=` in JSX. React ignores `class=`, so those styles silently never apply. These are the source of the `Invalid DOM property` and non-boolean `block` warnings in the browser console.
- `public/index.html` links `favicon.ico`, which does not exist in `public/` (only `.png` variants do).
- `@emailjs/browser`, `react-pdf`, `@fileforge/pdfreader`, `react-image-gallery` and `react-fast-marquee` are still dependencies, but nothing in the live render path uses them. EmailJS in particular is a leftover from a contact form that no longer exists — the registration form uses Netlify Forms, not EmailJS.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
