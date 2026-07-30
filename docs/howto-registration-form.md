# How to work with the registration form

The "Solicitar información" form collects sign ups for The Vocal Journey and delivers them through Netlify Forms. This covers the dashboard setup, changing fields, testing, and the failure modes that look like bugs but are not.

For why it is built this way, see [explanation-architecture.md](explanation-architecture.md#the-registration-form-runs-on-netlify-forms).

## Prerequisites

- Access to the Netlify dashboard for this site, for anything involving delivery
- The repo checked out and `npm install` run, for anything involving fields

## The three pieces that must agree

| Piece | File | Role |
|---|---|---|
| Hidden static form | `public/index.html` | Registers the form and its fields with Netlify at **build** time |
| React form | `src/components/RequestInfoModal/RequestInfoModal.jsx` | What users actually fill in |
| The POST | same file | `POST /` as `application/x-www-form-urlencoded` |

Form name: `vocal-journey-2027`. Fields: `nombre`, `edades`, `email`, `telefono`, `experiencia`, `conoce-registro`, `registro`, `expectativas`, plus the `bot-field` honeypot.

**A field name that exists in one place but not the other is accepted by Netlify and arrives blank.** It fails silently, so nothing tells you except the missing data.

---

## How to enable delivery (first time setup)

Do this once. Until it is done, submissions are silently discarded while the browser still shows a success message.

1. Netlify dashboard, select the site, open **Forms**.
2. Enable **automatic form detection** in the site settings.
3. **Trigger a redeploy.** Detection runs at build time by parsing the built HTML, so enabling the toggle is not retroactive. The deploy that happened before you flipped it did not register the form.
4. Once the form appears as `vocal-journey-2027`, open it and add a **form notification** of type email, pointing at `avivavozcanta@gmail.com`.

**Verification:** submit the form on the live site, then check **Forms → `vocal-journey-2027` → Verified submissions** for the entry. Judge it by that list, not by the email, because capture and notification are two separate settings.

If the modal reports success but nothing appears in that list, step 2 did not take effect. Re-check the toggle and redeploy.

## How to change who receives submissions

The recipient is **not** in this repository and cannot be set from `netlify.toml`. It is dashboard only.

1. Netlify dashboard, site, **Forms**, select `vocal-journey-2027`.
2. **Form notifications**, edit the email notification, change the address, save.

Safer sequence when swapping: add the new recipient first, confirm a submission arrives, then remove the old one. That avoids a window where nobody is notified.

**Verification:** submit once with realistic data and confirm the email lands. A saved but wrong address fails silently.

## How to add or rename a field

Every step is required. Skipping step 2 is the classic silent failure.

1. **Add it to the React form** in `RequestInfoModal.jsx`:
   - add the key to `EMPTY_FORM`
   - add a validation rule in `validate()` if it is required, with a Spanish message
   - render the control, reusing `fieldProps('yourfield')` for text inputs or `renderRadioPills` for radio groups

2. **Add it to the hidden static form** in `public/index.html`, with the **exact same `name`**:

   ```html
   <input type="text" name="yourfield" />
   ```

3. Rebuild and redeploy. Netlify re-parses the built HTML on each deploy, so a new field only registers after a deploy.

**Verification:** submit on a deploy preview and confirm the new field appears, with its value, in the Netlify submission detail. A field present but empty means the names do not match.

To make a field conditional, follow the `registro` pattern: render it only when its trigger answer is set, require it in `validate()` only under the same condition, and clear its value when the trigger changes so a stale answer cannot be submitted.

## How to test the form

`npm start` **cannot** complete a real submission. `POST /` is not handled by the CRA dev server, so the request fails and the modal shows its error state. That is expected locally and not a bug.

Options, in order of fidelity:

1. **A Netlify deploy preview.** Full behaviour, real capture. Best.
2. **`netlify dev`** locally, which proxies form handling.
3. **Client only check** with `npm start`, which validates everything except delivery: field validation, the conditional `registro` group, focus movement on invalid submit, and the success and error states.

For option 3, to confirm the payload without a server, stub `fetch` in the browser console before submitting:

```js
window.fetch = (url, opts) => {
  console.log(url, opts.headers['Content-Type'], Object.fromEntries(new URLSearchParams(opts.body)));
  return Promise.resolve({ ok: true, status: 200 });
};
```

A correct payload has `form-name: "vocal-journey-2027"`, all eight fields, and Content-Type `application/x-www-form-urlencoded`. If you see `application/json`, delivery will produce empty submissions, because **Netlify does not parse JSON**.

## Troubleshooting

### The first submission arrived, later ones vanished

This is almost always **spam filtering, not a bug**.

Every submission passes through Akismet. Netlify flags submissions that contain test data or that arrive repeatedly from the same IP, which is exactly what testing looks like. Flagged submissions:

- go to the **Spam submissions** tab, not Verified
- send **no notification**, because notifications only fire for verified submissions

Meanwhile the POST still returns `200` with Netlify's "Thank you!" page, so the UI reports success.

**What to do:** open **Forms → `vocal-journey-2027` → Spam submissions**. The missing entries are usually sitting there. Mark the real ones as verified. When testing further, use realistic looking data rather than `test` or `asdf`, space attempts out, or submit from a different network such as a phone on cellular.

No code change fixes this. Netlify returns `200` for spam flagged submissions and no response field distinguishes them, so the client cannot detect it.

### The response is an HTML page saying "Thank you!"

That is Netlify's form success response. It means the submission **was accepted**. It is not an error.

### The modal says success but nothing is captured

Automatic form detection is off, or the site has not been redeployed since it was switched on. See [How to enable delivery](#how-to-enable-delivery-first-time-setup).

### A field arrives blank

The `name` in `RequestInfoModal.jsx` does not match the one in `public/index.html`, or the field was added without a redeploy.

### Submissions stopped entirely, mid month

The free tier allows **100 submissions per month**. Past that they are blocked, not queued. Check usage in the Forms section.

### The form cannot be scrolled or submitted on a laptop

Should be fixed, but if it returns: the `<form>` wraps `.modal-body` and `.modal-footer`, so it must stay a column flex container with `flex: 1 1 auto` and `min-height: 0`. Without that, `.modal-body` gets no bounded height, `overflow-y: auto` has nothing to scroll, and `.modal-content`'s `overflow: hidden` clips the footer and its submit button out of reach. Details in [explanation-architecture.md](explanation-architecture.md#the-modal-body-is-the-scroll-container).

## Related

- [reference-components.md](reference-components.md#requestinfomodal) for the full field and validation table
- [explanation-architecture.md](explanation-architecture.md#the-registration-form-runs-on-netlify-forms) for the design rationale
- [howto-update-content.md](howto-update-content.md) for editing copy elsewhere on the site
