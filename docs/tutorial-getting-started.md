# Tutorial: Run the site and make your first change

By the end of this you will have the A Viva Voz site running on your own machine, you will have changed text that appears on the live page, and you will have produced a production build ready to deploy. It takes about ten minutes, and you do not need to know React.

## What you'll need

- **Node.js 16 or newer** and npm. Check with `node --version`.
- A terminal and a text editor.
- Git, if you are cloning rather than working in an existing checkout.

No database, no API keys, no accounts. The site is fully static.

## Step 1: Install the dependencies

From the project root:

```bash
npm install
```

This takes a minute or two and creates `node_modules/`. You will likely see warnings about deprecated packages. They are expected and safe to ignore; Create React App pulls in a lot of older tooling.

## Step 2: Start the site

```bash
npm start
```

Your browser opens http://localhost:3000 on its own. You should see the teal header with the phone number, then the full width "The Vocal Journey" event artwork, and below it the section "SOBRE NOSOTROS".

That is the whole site running locally. It reloads on its own every time you save a file, so leave this running in its own terminal tab for the rest of the tutorial.

Scroll down and you will pass, in order: the about section, "SERVICIOS" and "COACHING KIDS", the coach bio, the session descriptions, and the contact block.

Now click **SOLICITAR INFORMACIÓN**. The registration modal opens. Fill in a field or two and answer "Sí" to "¿Conoces tu registro vocal?" to watch the vocal range options appear. Do **not** press Enviar solicitud yet; submitting does not work from the dev server, and the reason is explained in step 5.

## Step 3: Change something and watch it update

Let's change the coach's bio, which is the one piece of copy that lives in a data file rather than in code.

Open `src/data/data.json` and find the `Services` array near the middle. Edit the `title`:

```json
"Services": [
  {
    "icon": "fa fa-wordpress",
    "title": "Omayra Martinez Cruz, Soprano",
    "text": "Soprano profesional graduada del Conservatorio…",
    "image": "image1"
  }
]
```

Save the file. Watch the browser: it reloads within a second, and the heading under "Conoce a tu futura coach" now reads your new text.

You just changed live content. Change it back when you are done experimenting.

**Why this one is different:** almost all other copy on this site is written directly into the component JSX, not into `data.json`. If you go looking in `data.json` for the "SOBRE NOSOTROS" paragraph you will not find it. [howto-update-content.md](howto-update-content.md) has a table of exactly which file holds which text.

One more thing worth knowing now: the rest of `data.json` (`Header`, `About`, `Testimonials`, `Team`, `Contact`, `Features`) is unused Create React App template filler, lorem ipsum plus a fake San Francisco address. Do not treat any of it as real content.

## Step 4: Find the two versions of the main button

This surprises most people, so it is worth seeing directly.

With the site still open, make the browser window **wide** (at least 800px) and look at the artwork. The teal "SOLICITAR INFORMACIÓN" button sits **on top of** the image.

Now drag the window narrower than 768px, or open your browser's device toolbar and pick a phone. The button leaves the artwork and reappears **below it**, at the top of the "SOBRE NOSOTROS" section.

Those are two different buttons in two different components, and only one is visible at a time:

- Wide: rendered by `src/components/Banner/Banner.jsx`
- Narrow: rendered by `src/components/ProgramPDF/ProgramPDF.jsx`

Both call the same handler and open the same modal, which lives in `src/components/HomePage/HomePage.jsx`. On a phone the artwork is short, so a button on top of it would cover the tagline and the contact details. [explanation-architecture.md](explanation-architecture.md#the-cta-has-two-placements) explains the full reasoning.

## Step 5: Build for production

Stop the dev server with `Ctrl+C`, then:

```bash
npm run build
```

You will see `Compiled successfully.` and a list of bundled file sizes, roughly 396 kB of JavaScript and 41 kB of CSS after gzip. The output lands in `build/`.

To catch problems the dev server tolerates, build with warnings treated as errors:

```bash
CI=true npm run build
```

If that passes, the code is lint clean.

You can serve the build to check it exactly as deployed:

```bash
npx serve -s build
```

The `-s` flag matters. It makes every path fall back to `index.html`, which is what lets `/consejos` work. In production Netlify does this via `public/_redirects`.

**About the form:** submitting still will not work here. The form posts to `/` and expects Netlify to handle it, which no local static server does. That is by design, not a bug. To test a real submission you need a Netlify deploy preview or `netlify dev`, both covered in [howto-registration-form.md](howto-registration-form.md#how-to-test-the-form).

## What you built

You now have the site running locally, you have changed content that shows up on the page, and you have a deployable production build in `build/`.

You also know three things that are not obvious from the code:

1. Most copy lives in component JSX, not in `data.json`, and most of `data.json` is unused filler.
2. The main call to action exists twice, in two components, swapping at 768px.
3. The registration form only truly works on Netlify, because Netlify itself receives the POST.

### Next steps

- Editing copy, images, or PDFs, or adding a page: [howto-update-content.md](howto-update-content.md)
- Working on the sign up form: [howto-registration-form.md](howto-registration-form.md)
- Looking up a component, its props, or a color token: [reference-components.md](reference-components.md) and [reference-project-structure.md](reference-project-structure.md)
- Understanding why the hero and form are built the way they are, before changing them: [explanation-architecture.md](explanation-architecture.md)
