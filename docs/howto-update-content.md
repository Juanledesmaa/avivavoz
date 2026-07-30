# How to update content, assets, and pages

Task oriented recipes for changing what the site says and shows. Assumes you can run `npm start`. If you cannot, start with [tutorial-getting-started.md](tutorial-getting-started.md).

## Prerequisites

- Node and npm installed, `npm install` already run
- The dev server running: `npm start`

## Where each piece of copy lives

Most text is hardcoded in JSX, not in a data file. This is the first thing to get right, because searching `data.json` for a string you can see on the page will usually fail.

| What you want to change | Where |
|---|---|
| Coach bio card (name and paragraph) | `src/data/data.json`, `Services[0]` |
| "SOBRE NOSOTROS" and "Nuestra Experiencia" | `src/components/ProgramPDF/ProgramPDF.jsx` |
| "SERVICIOS", "COACHING KIDS" | `src/components/Introduction/Introduction.jsx` |
| Group and individual sessions, "Técnica vocal" | `src/components/IntroductionV2/IntroductionV2.jsx` |
| Contact details block | `src/components/Contact/Contact.jsx` |
| Phone number in the header | `src/components/NavigationBar/NavigationBar.jsx` (two places) |
| Footer line | `src/components/Footer/Footer.jsx` |
| The `/consejos` guide | `src/components/ConsejosPage/ConsejosPage.jsx` |
| Registration form labels and validation messages | `src/components/RequestInfoModal/RequestInfoModal.jsx` |
| Page title, description, social preview | `public/index.html` |

**Do not use the rest of `data.json`.** Only the `Services` array is read by the app. The other keys (`Header`, `About`, `Gallery`, `Testimonials`, `Team`, `Contact`, `Features`) are untouched Create React App template placeholders containing lorem ipsum and a fake San Francisco address, phone, and email. Never surface them in the UI.

## How to change the coach bio

1. Open `src/data/data.json` and edit the `Services` array:

   ```json
   "Services": [
     {
       "icon": "fa fa-wordpress",
       "title": "Omayra Martinez Cruz",
       "text": "Soprano profesional graduada del Conservatorio…",
       "image": "image1"
     }
   ]
   ```

   `title` renders as the heading and as the image `alt` text. `text` renders as one paragraph. `icon` is ignored.

2. Save. The browser reloads on its own.

**Verification:** the "Conoce a tu futura coach" section shows the new text.

**Note on line breaks:** `\n` in `text` does **not** render as a line break, because it renders inside a single `<p>`. To get real paragraphs you must change `Services.jsx` to split on newlines.

## How to replace the coach photo

1. Put the new file in `src/img/`.
2. Update the import in `src/components/About/Services.jsx`:

   ```jsx
   import profile from '../../img/your_new_photo.jpeg';
   ```

3. Decide about the crop. The current CSS crop in `Services.scss` is tuned to `omayra_profile.jpeg` specifically: it places the point at 49% across and 28% down at the centre of the circle. A different photo will crop to an arbitrary place.

   - **Easiest and most durable:** supply a pre-cropped **square** photo, then delete the `top`, `left`, and `height` offsets from `.icon-container img` and replace them with `width: 100%; height: 100%; object-fit: cover;`.
   - **Otherwise:** recalculate the offsets. The maths is in [explanation-architecture.md](explanation-architecture.md#the-coach-photo-is-cropped-in-css).

**Verification:** the circle shows the face, centred, not stretched. Check that the rendered aspect ratio matches the source, since a stretched face is the failure mode here.

## How to replace the banner artwork

1. Put the new file in `src/img/`.
2. Update the import in `src/components/Banner/Banner.jsx`:

   ```jsx
   import heroArt from "../../img/your_new_art.jpeg";
   ```

3. Update the `alt` text in the same file. It currently describes the event, the dates, and both presenters, which is what screen readers and search engines read.
4. **If the new art is not 2:1**, update the ratio in `src/components/Banner/banner.scss`:

   ```scss
   .vj-frame { aspect-ratio: 2048 / 1024; }   // change to the new dimensions
   ```

   Leaving a stale ratio here reintroduces cropping, which is the exact bug this frame exists to prevent.

5. Check the overlaid CTA. Its position (`bottom: 12.5%`, `width: 47%`) is tuned to the current art's tagline and pill positions. New art means re-checking those percentages.

**Verification:** at 1920x1080 and at 1920x812 the whole image is visible with nothing cut off, and the button is on screen without scrolling.

## How to swap a downloadable PDF

The three PDFs are imported directly, so replacing one is a two step change.

| PDF | Imported by |
|---|---|
| `politicas_a_viva_voz_final_compressed.pdf` | `Introduction.jsx` |
| `Temas_Talleres.pdf` | `IntroductionV2.jsx` |
| `Consejos-para-seguimiento-en-casa.pdf` | `ConsejosPage.jsx` |

1. Add the new PDF to `src/img/`.
2. Update the `import samplePDF from '../../img/…'` line in the component above.

Keeping the same filename means step 2 is unnecessary, which is the lower risk path.

**Verification:** click the download button and confirm the new file downloads.

## How to change contact details

Contact information is hardcoded in several files, so change all of them together.

| Detail | Files |
|---|---|
| Phone `787-379-9456` | `NavigationBar.jsx` (2 places), `Contact.jsx` |
| Phone `939-390-5475` | `RequestInfoModal.jsx` (confirmation message only) |
| Email `avivavozcanta@gmail.com` | `Contact.jsx`, `RequestInfoModal.jsx` (error fallback link) |
| Facebook, Instagram | `Contact.jsx` |

The email addresses appear as Gmail compose deep links, not `mailto:` links. Keep the `to=` query parameter in sync if you change the address.

Changing the address that receives **form submissions** is a different task, and it is not in this repository. See [howto-registration-form.md](howto-registration-form.md#how-to-change-who-receives-submissions).

## Adding a new page

1. Create the component folder and its stylesheet:

   ```
   src/components/MyPage/MyPage.jsx
   src/components/MyPage/MyPage.scss
   ```

   Import the stylesheet at the top of the JSX and scope every rule under a `.my-page` root class.

2. Register the route in `src/components/App.jsx`:

   ```jsx
   import MyPage from './MyPage/MyPage';
   …
   <Route path="/mi-pagina" element={<MyPage />} />
   ```

3. Add the nav link in **three** places in `src/components/NavigationBar/NavigationBar.jsx`. The desktop and mobile layouts are separate markup, not one responsive tree:

   - the desktop `<Nav>` block, inside `d-none d-lg-flex`
   - the mobile `Navbar.Collapse` block, inside `d-lg-none`

   Copy an existing `Nav.Link` so you inherit the `location.pathname` active state and the `onClick={handleClose}` that closes the mobile menu.

4. Nothing needs adding for deep links. `public/_redirects` already rewrites every path to `index.html`, so `/mi-pagina` resolves on a direct hit and on refresh.

**Verification:** visit the new path, then **refresh the page**. If a refresh 404s in production, `_redirects` did not ship. Also click the link from both the desktop and the mobile menu, since forgetting one of the three insertion points is the usual mistake.

## Troubleshooting

**My style change does nothing.** Check whether the element uses `class=` instead of `className=`. `Introduction.jsx` and `IntroductionV2.jsx` mix both. React ignores `class=`, so those elements never receive the class and your selector never matches.

**My image does not appear.** Images must be `import`ed to be bundled. A path string in `data.json` or in an inline `src="img/foo.png"` will not resolve. Use the `imageMap` pattern from `Services.jsx`.

**Text with `\n` renders on one line.** Expected. Newlines in JSON strings are not line breaks in HTML.

**The heading is uppercase and I did not ask for it.** `src/styles/index.scss` sets `h2 { text-transform: uppercase }` globally.

**My bullet list has no bullets.** `index.scss` sets `ul, ol { list-style: none }` globally. Existing lists work around this by putting a literal `•` character in the `<li>` text.

**Console shows `Invalid DOM property 'class'`.** Pre-existing, from the two `Introduction` files. Not caused by your change.

## Related

- [howto-registration-form.md](howto-registration-form.md) for the sign up form
- [reference-components.md](reference-components.md) for props and the component list
- [reference-project-structure.md](reference-project-structure.md) for tokens and asset inventory
