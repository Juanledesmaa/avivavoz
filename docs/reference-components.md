# Reference: Routes, components, and props

Complete listing of every component in `src/components/`, what it renders, and what it accepts. For directories, scripts, and style tokens see [reference-project-structure.md](reference-project-structure.md).

## Routes

`src/components/App.jsx` is the shell. It renders a `BrowserRouter` containing a persistent `NavigationBar`, a `<main className="main-content">` wrapping `<Routes>`, and a `Footer`.

| Path | Component |
|---|---|
| `/` | `HomePage` |
| `/consejos` | `ConsejosPage` |

There is no 404 route. An unknown path renders the shell with an empty `<main>`.

## Page composition

`HomePage` renders, in order: `Banner`, `ProgramPDF`, `Introduction`, `Services`, `IntroductionV2`, `Contact`. It also renders `RequestInfoModal` once, at the end.

## Component table

| Component | Props | Renders |
|---|---|---|
| `App` | none | Router shell: nav, routes, footer |
| `NavigationBar` | none | Sticky header, logo, phone link, 2 nav links |
| `HomePage` | none | The 6 homepage sections plus the shared modal |
| `Banner` | `onRequestInfo` | Event hero art, plus the overlaid CTA at 768px and up |
| `ProgramPDF` | `onRequestInfo` | "SOBRE NOSOTROS" title, autoplaying promo video card, copy, plus the relocated CTA below 768px |
| `Introduction` | none | "SERVICIOS" and "COACHING KIDS", policies PDF download |
| `Services` | `data` | The coach bio card |
| `IntroductionV2` | none | Group and individual sessions, workshops PDF download |
| `Contact` | none | Contact details block, anchored at `#formSection` |
| `Footer` | none | Logo and one line of copy |
| `ConsejosPage` | none | Long form parent guide, PDF download |
| `RequestInfoModal` | `show`, `onHide` | The registration form and its success state |
| `Gallery` | none | **Unused.** Placeholder images |
| `Modal` (`CustomModal`) | `modalShow`, `setModalShow` | **Unused.** Old ticket confirmation |
| `MarqueeBanner` | none | **Unused.** Scrolling text |

`Gallery`, `Modal`, and `MarqueeBanner` are not imported anywhere. `Gallery` still points at picsum.photos placeholder URLs and `Modal` is an ATH Movil ticket reservation confirmation from a previous campaign. Treat all three as dead code; they do not reflect current requirements.

## Details

### NavigationBar

No props. Sticky (`position: sticky; top: 0; z-index: 1000`) with a teal background. Rendered height is **76px on desktop** and taller on narrow screens where the phone button wraps to two lines. That height is measured at runtime by `Banner`; see [explanation-architecture.md](explanation-architecture.md).

Holds two entirely separate markup blocks, one shown with `d-lg-none` and one with `d-none d-lg-flex`. Adding a nav link means editing **both**, plus the mobile `Navbar.Collapse` block. Active state comes from `useLocation()` compared against `location.pathname`.

Phone number `787-379-9456` is hardcoded here in two places (mobile and desktop).

### Banner

```jsx
<Banner onRequestInfo={() => void} />
```

| Prop | Type | Required | Purpose |
|---|---|---|---|
| `onRequestInfo` | function | yes | Called on CTA click. Opens the modal owned by `HomePage`. |

Presentational. It does not own modal state. Renders:

- `.vj-backdrop`, a blurred copy of the art that fills leftover space
- `.vj-frame`, which holds the art at its true 2:1 ratio
- `.vj-art`, the artwork
- `.vj-cta`, the overlaid button, hidden below 768px

Runs one effect, `useNavHeightVar`, which measures `.navigationBar` with a `ResizeObserver` and writes the result to the `--vj-nav-h` custom property on `document.documentElement`. The stylesheet falls back to `76px` if the effect has not run.

### ProgramPDF

```jsx
<ProgramPDF onRequestInfo={() => void} />
```

| Prop | Type | Required | Purpose |
|---|---|---|---|
| `onRequestInfo` | function | yes | Called on CTA click. Same handler as `Banner`. |

Despite the name it **does not render a PDF**. Its `.pdf-container` is empty. It renders, in order: the `.request-info-cta` button (only visible below 768px), the "SOBRE NOSOTROS" title, a `.video-card` playing the old banner promo video, then the copy block.

The video card uses the old hero's dual-source pattern — two `<video>` elements (`autoPlay loop muted playsInline`), CSS-toggled: `viva_voz_desktop.mp4` (16:9) from 768px up inside a white rounded card capped at 1020px, `viva_voz_mobile.mp4` (portrait) below 768px with no card chrome, breaking out of the Bootstrap container to full viewport width, capped at `85vh` with `object-fit: cover`. The card sits **outside** the `col-md-8` text column on purpose, so it can be wider than the text.

### Services

```jsx
<Services data={landingPageData.Services} />
```

| Prop | Type | Required | Purpose |
|---|---|---|---|
| `data` | array | no | Bio entries. Renders `Loading...` when absent. |

The only component driven by `data.json`. Each entry is read as:

| Key | Type | Rendered as |
|---|---|---|
| `title` | string | `<h2>` and the image `alt` |
| `text` | string | `<p>`. Newlines in the JSON do **not** become line breaks. |
| `image` | string | A key into the local `imageMap` |
| `icon` | string | Ignored |

Images resolve through a local map, because bundlers need a real `import`:

```jsx
import profile from '../../img/omayra_profile.jpeg';
const imageMap = { image1: profile };
```

To add a second bio, add an `import`, add a key to `imageMap`, and reference that key as `image` in `data.json`. A file path string in the JSON will not work.

The photo is cropped by CSS to a headshot. See [explanation-architecture.md](explanation-architecture.md#the-coach-photo-is-cropped-in-css).

### Contact

No props. Carries `id="formSection"`, which is the scroll target used by `react-scroll`. **It is not a form.** It renders a phone link, a Gmail compose deep link to `avivavozcanta@gmail.com`, and Facebook and Instagram links, all hardcoded.

### RequestInfoModal

```jsx
<RequestInfoModal show={boolean} onHide={() => void} />
```

| Prop | Type | Required | Purpose |
|---|---|---|---|
| `show` | boolean | yes | Controls visibility |
| `onHide` | function | yes | Called on close. Resets the form only after a successful send. |

Rendered once, by `HomePage`. Both CTAs open this single instance.

Internal state: `values`, `errors`, and `status`, where status is one of `idle`, `sending`, `sent`, `error`. On `sent` the body is replaced by a confirmation panel. On `error` the entered values are kept so nobody retypes, and a Gmail fallback link is offered.

Form name and fields, which must stay in sync with the hidden form in `public/index.html`:

| Field name | Control | Required |
|---|---|---|
| `nombre` | text | yes |
| `edades` | text (free form, plural allowed) | yes |
| `email` | email | yes, must match a basic address pattern |
| `telefono` | tel | yes, at least 10 digits after stripping non digits |
| `experiencia` | radio, `Sí` / `No` | yes |
| `conoce-registro` | radio, `Sí` / `No` | yes |
| `registro` | radio: Soprano, Alto, Tenor, Barítono, Bajo | only when `conoce-registro` is `Sí` |
| `expectativas` | textarea | yes |
| `bot-field` | honeypot | never submitted |

`form-name` is sent as `vocal-journey-2027`.

The `registro` group is only rendered when `conoce-registro` is `Sí`. Switching that answer back to `No` clears any previously picked range, so a stale value cannot be submitted.

Validation is client side, in Spanish, in the module level `validate()` function. On a failed submit, focus moves to the first invalid field.

## Adding a component

Follow the existing shape: a folder under `src/components/` holding `ComponentName.jsx` and `ComponentName.scss`, with the stylesheet imported at the top of the JSX and every rule scoped under the component's root class name. Use function components with hooks. Prefer React Bootstrap `Row`/`Col` for layout.

## Related

- [reference-project-structure.md](reference-project-structure.md) for tokens, breakpoints, and assets
- [explanation-architecture.md](explanation-architecture.md) for the hero and form design decisions
- [howto-update-content.md](howto-update-content.md#adding-a-new-page) for wiring a new route
