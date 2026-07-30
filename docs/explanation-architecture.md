# Explanation: Why the hero and the form are built this way

This document covers the decisions that are not obvious from reading the code, and that have already been broken once by a "simplification". If you are about to change the hero sizing, the CTA placement, or anything about the registration form, read the relevant section first.

For factual API listings see [reference-components.md](reference-components.md).

---

## The hero must show the whole artwork without scrolling

### The problem

The hero is a single piece of supplied artwork, `vocal_journey_2027.jpeg`, at 2048x1024, so exactly 2:1. Three requirements applied at once:

1. The whole banner is visible without scrolling.
2. Nothing is cropped. The logo sits at the far left and the date badge at the far right, so cropping the sides removes the two most important elements.
3. The call to action is on screen in the first frame, without the user scrolling.

A browser viewport is almost never 2:1. **With one fixed ratio image you cannot satisfy both "no crop" and "no empty space" unless the viewport happens to match the image ratio.** No CSS avoids that. Something has to give, and which one you sacrifice is a product decision, not a technical one.

Two earlier attempts failed, both instructively:

- **`object-fit: contain` in a full viewport box.** Nothing cropped, but on a phone the art rendered about 190px tall floating in a large empty field. Correct and ugly.
- **`object-fit: cover` with a `max-height` cap.** Filled the space, but when the cap engaged (a short, wide window) `cover` paid for it by cutting the top and bottom. That is exactly what happened on a 1920x812 window: the logo and both presenter name tags were sliced off. This was dismissed during design as a rare viewport. It was the reviewer's actual window. Do not assume a viewport shape is rare.

### The approach

Whole artwork visibility won. The leftover space is filled rather than eliminated.

```
.vj-hero        height: min(100dvh - var(--vj-nav-h), 50vw)
  .vj-backdrop  the same image, cover, blurred 30px, brightness 0.72, scale 1.12
  .vj-frame     aspect-ratio: 2048/1024; max-width/height: 100%; margin: auto
    .vj-art     width/height 100%, object-fit: contain
    .vj-cta     absolutely positioned inside the frame
```

- `.vj-frame` carries the artwork's own ratio with `max-width` and `max-height` of 100%, so it shrinks to fit whichever axis runs out first and stays centred. The artwork is therefore always complete.
- The hero is never taller than the space under the navbar, and never taller than the art needs at full width. That second clamp matters: without it, a tall viewport would leave dead space above and below on a phone.
- Leftover space is filled by `.vj-backdrop`, a blurred and dimmed copy of the same image, scaled to 1.12 so the blur's soft edge never reveals the hero background behind it. That reads as depth rather than as flat coloured bars, which is what the reviewer rejected.

### Trade-offs

The blurred backdrop is a second decode of a 362KB image. It is the same file, so it is one network request and a warm cache hit, but it is not free. The alternative, a flat colour, was explicitly rejected on looks.

On a phone the artwork is inherently small, roughly 190px tall at 375px wide, because it is a 2:1 image in a portrait viewport. The real fix is a portrait crop of the art as a second source, the way the old dual video hero worked. That asset does not exist yet, and until it does no CSS improves this.

### The navbar height is measured, not hardcoded

`Banner.jsx` measures `.navigationBar` with a `ResizeObserver` and writes it to `--vj-nav-h`. This looks like over engineering for one number. It is not.

The first version hardcoded 56px. The navbar is actually **76px** on desktop, and taller on narrow screens where the phone button wraps to two lines. The hero therefore overflowed the viewport by 20px and the button cleared the fold by 4px, which was luck rather than design. The height also changes with browser zoom and with a larger default font size.

The stylesheet keeps `76px` as a fallback for the frame before the effect runs. If you change the navbar's padding or logo size, nothing needs updating here.

---

## The CTA has two placements

### The problem

At 768px and up, the artwork is tall enough that a button can sit on it without hiding much. Below that, the art is only about half the viewport width tall, so a legible button covers a large share of it, including the tagline and the contact pill.

### The approach

Two placements, one visible at a time, switched at exactly `767.98px`:

| Viewport | Placement | Component |
|---|---|---|
| 768px and up | Overlaid on the artwork, centred | `Banner` |
| Below 768px | Top of the "Sobre nosotros" section | `ProgramPDF` |

Because the CTA now lives in two different components, the modal state moved up to `HomePage`, which renders `RequestInfoModal` **once** and passes the same `onRequestInfo` callback to both. That avoids two modal instances, and since only one button is ever visible, there is still a single control in the accessibility tree.

Two consequences worth knowing:

- The `767.98px` value appears in both `banner.scss` and `ProgramPDF.scss`. They must match, or the button appears twice or not at all.
- The relocated button defines its own `riPulse` and `riShine` keyframes rather than reusing the banner's `vjPulse` and `vjShine`. That is deliberate: a component should not depend on another component's stylesheet being loaded. When the CTA was first relocated it had no idle animation at all, because the animation lived in `banner.scss` and did not travel with it.

### Why the overlaid button sits where it does

The artwork's lower band is already type: a tagline at roughly y 82 to 86 percent, and a website and phone pill at y 88.5 to 94 percent. There is no empty band, so any overlaid button covers artwork. The button is placed over the **tagline** and clears the pill below it, so the contact details stay readable.

Its width is 47 percent, and that number is load bearing. The tagline spans x 30 to 56 percent of the art, so it is centred on 43 percent, not on 50 percent. A centred button must therefore be wide enough to reach past it. There is deliberately **no pixel `max-width`**: a cap binds on wide screens and lets the tagline poke out from behind the button again.

### Why the button looks the way it does

Teal on the red and orange artwork failed a first review as hard to see. The cause was not hue, it was luminance: brand teal and the mid tone red behind it sit at similar brightness, so the shape did not separate. Hue alone does not create contrast.

The fix is the **white keyline**. The gradient, the glow pulse, and the shine sweep signal that it is pressable, but the border is what makes the shape read. The relocated button below 768px drops that keyline, because on the light `#f6f6f6` section background a white border reads as a stray outline instead of a separator.

Both animations scale **up only, never below 1**. Scaling below 1 would briefly expose the artwork's pill underneath the overlaid button.

---

## The registration form runs on Netlify Forms

### The problem

The site needs to collect sign ups and email them to the owner. There is no backend, no server, and no budget for one.

### The approach

Netlify Forms, which captures submissions from a static site with no server code. Three pieces must agree:

1. **A hidden static form in `public/index.html`**, carrying `data-netlify="true"`, a `name`, and every field. Netlify detects forms by parsing the **built** HTML, and the real form only exists at runtime as React output. This static copy is what registers the form and its fields at deploy time.
2. **The React form** in `RequestInfoModal.jsx`, including a hidden `form-name` input.
3. **A urlencoded `POST /`** using `URLSearchParams`.

That third point is a hard constraint: **Netlify does not parse JSON.** Sending `application/json` produces accepted-but-empty submissions.

### Trade-offs

The obvious cost is duplication. Field names exist in two places, and there is no mechanism that keeps them honest. **A mismatch is accepted by Netlify but arrives with that field blank.** It fails silently, not loudly. If you add or rename a field, change it in both.

Two settings live in the Netlify dashboard and cannot be moved into this repository, not even via `netlify.toml`:

- **Automatic form detection**, which must be enabled and then followed by a redeploy. Detection runs at build time, so enabling it is not retroactive. If it is off, submissions are silently discarded while the UI still reports success. This is the single most common way this setup appears broken.
- **The notification recipient.** Changing who gets the email is always a manual dashboard step.

### Spam filtering will look like a bug

Every submission passes through Akismet. Per Netlify's own troubleshooting docs, submissions are flagged when they **contain test data or come repeatedly from the same IP**, which is an exact description of testing the form. Flagged submissions go to the **Spam** tab, not Verified, and send **no notification**, because notifications only fire for verified submissions.

The symptom is "the first one arrived and the rest vanished", while the POST still returns `200` with Netlify's "Thank you!" page. Nothing is broken and no code change helps. That "Thank you!" HTML is the success response, not an error.

Netlify returns `200` for spam flagged submissions too, and no response field distinguishes them, so the client always shows success. That is not detectable in the browser and not fixable in code.

A honeypot field (`netlify-honeypot="bot-field"`) is declared and rendered off screen. It is never included in the submitted payload, so an empty honeypot is what Netlify sees.

The free tier allows 100 submissions per month. Past that, submissions are blocked rather than queued.

---

## The modal body is the scroll container

### The problem

The form is taller than the viewport on a laptop. Bootstrap's `modal-dialog-scrollable` normally handles that by giving `.modal-body` `overflow-y: auto`.

It did not work here, and the failure was worse than a missing scrollbar. Because the `<form>` wraps `.modal-body` **and** `.modal-footer`, the form became the flex child of `.modal-content` instead of them. A plain block element there breaks the chain: `.modal-body` never receives a bounded height, so its `overflow-y: auto` had nothing to scroll against, and `.modal-content`'s `overflow: hidden` then clipped the excess outright.

Measured on a 1280x700 window: 1023px of content inside a 644px shell, with **379px unreachable, including the footer holding the submit button**. At that window size the form could not be submitted at all.

### The approach

Re-establish the flex chain through the form:

```scss
.modal-content > form { display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0; overflow: hidden; }
.modal-body   { flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain; }
.modal-header,
.modal-footer { flex: 0 0 auto; }
```

`min-height: 0` is the load bearing part. Without it a flex item refuses to shrink below its content, so nothing scrolls. `overscroll-behavior: contain` stops the page behind the modal from scrolling when the form reaches its end.

If you ever move the `<form>` element to wrap the whole `Modal` instead, revisit this. The bug is a property of where the form sits in the flex tree.

---

## The coach photo is cropped in CSS

`Services` renders a square 200px to 300px circular frame. The original photo was exactly 719x719, so it fit without any `object-fit` rule and nobody noticed one was missing.

The replacement photo is 2048x1365, a 3:2 studio shot framed head to waist. Two problems appeared at once: the browser's default `object-fit: fill` **stretched** it to fit the square, and even unstretched, a plain square crop of a head to waist shot leaves the face small.

The fix puts the circular frame on `.icon-container` so it can crop, and positions the photo inside so that the point at 49 percent across and 28 percent down, the centre of her head and shoulders, lands at the centre of the circle, scaled to 195.3 percent of the frame height. The visible region is x 32 to 66 percent, y 2 to 54 percent.

Those numbers are specific to this photograph. `width: auto` is kept so the aspect ratio can never be stretched at any frame size. **If the photo is replaced, these offsets need recalculating**, or the crop will land somewhere arbitrary. The alternative, and the more durable option, is to supply a pre-cropped square headshot and delete the offsets entirely.

## Related

- [reference-components.md](reference-components.md) for props and field listings
- [howto-registration-form.md](howto-registration-form.md) for the dashboard steps and adding a field
- [reference-project-structure.md](reference-project-structure.md) for tokens and breakpoints
