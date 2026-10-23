---
name: license-audit
description: Audit the site for copyright and licensing risk in fonts, PDFs, images, video and third-party assets. Use when adding or changing fonts, images, videos, PDFs or CDN assets, before a launch, or when a licensing or infringement notice arrives (e.g. Font Radar). Produces an evidence-based report, not legal advice.
---

# License audit

This site already received a font licensing claim: Brutal Type (Brownfox) was self-hosted without a web licence and flagged by Font Radar in Oct 2026. It was replaced with Work Sans (OFL). This skill exists so that doesn't happen again with fonts or anything else.

## How to run

1. Run the scanner from the repo root:
   ```
   python3 -I .claude/skills/license-audit/scan.py .
   ```
   Optional tools improve results: `pip install fonttools brotli pillow`, `apt install poppler-utils libimage-exiftool-perl`.
2. Also check what actually ships: `npm run build`, then rerun the scanner on `build/` and grep the built CSS for `@font-face` and font URLs. The bundle is what scanners like Font Radar see.
3. If the user gives a live URL and the network allows it, check the live site's CSS too. If it's blocked, say so and give manual DevTools steps (Network → Font filter, Computed → Rendered Fonts). Never claim a live check you didn't run.
4. Classify every item (below) and write the report.

## Classifying

| Status | Meaning |
|---|---|
| ✅ Open | Licence verified as OFL / Apache / CC0 / public domain / MIT-family |
| 🟢 Licensed | Commercial, and a receipt or licence file is on record (say where) |
| 🟡 Unknown | No licence evidence either way. Needs the owner to confirm the source |
| 🔴 Risk | Commercial asset with no licence found, or a licence that doesn't cover web use |

### Fonts (highest risk; automated scanners hunt for these)
- **Self-hosted font files are the main risk.** Every `.woff/.woff2/.ttf/.otf/.eot` file needs a *web* licence. A desktop licence doesn't cover a website.
- Read the font's `name` table (the scanner does): copyright, manufacturer, vendor URL, licence. Open fonts carry OFL/Apache text. No licence text means commercial until proven otherwise.
- IDs like `com.myfonts.<foundry>.<font>.wfkit2.XXXX` mean the file came from a MyFonts webfont kit. Ask the owner to search MyFonts order history: a receipt may exist.
- Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) are open licensed. Verify a specific family by reading `https://raw.githubusercontent.com/google/fonts/main/ofl/<family>/METADATA.pb` (`license: "OFL"`) rather than assuming.
- Adobe Fonts / Typekit / Monotype CDNs are fine **only while the paid account is active**. Note that dependency.
- Similar-named fonts are not the same font. A licence must match the exact family and foundry.

### PDFs
- PDFs embed fonts. `pdffonts` lists them. Office fonts (Calibri, Cambria, Arial, Times) embedded by Word are allowed for documents.
- If names are stripped (`CIDFont+F1`), extract the embedded fonts with pypdf and compare glyph outlines against any suspect font's files (this is how the policies PDF was cleared of Brutal Type). Render a page with `pdftoppm` to eyeball it.

### Images and video
- Check EXIF/XMP/IPTC for copyright, creator, stock agencies, Canva. The scanner flags stock and platform sources.
- Stock or Canva assets: confirm the licence covers web use, and that Canva-made designs follow Canva's content licence (generally fine on a site for the business itself; raw stock elements can't be redistributed standalone).
- Photos of people (coach photos, event art): record who took them and that the business has permission.
- Metadata is often stripped. "No metadata" is 🟡 Unknown, not ✅. Ask the owner where it came from. Suggest a reverse image search (Google Lens / TinEye) for anything that looks like stock.

### Code and other assets
- npm: `npx --yes license-checker --production --summary`. MIT/BSD/ISC/Apache/0BSD/CC0 are fine. Flag GPL/AGPL/unknown/UNLICENSED.
- Any CDN script, stylesheet, icon set or embed: note its source and licence.

## Report format

Lead with the verdict in one line (e.g. "No licensing risks found" / "2 risks, 3 unknowns"), then a table per category: item, source/evidence, status, action. Finish with a short "Owner to confirm" list for every 🟡 item.

## Rules

- Report evidence, not legal conclusions. Say "no licence found", never "this is illegal". Recommend a lawyer for disputes or claims.
- Don't delete or replace assets unless asked. When asked to replace a font, use an open-licence equivalent (Google Fonts), update docs, and verify the production build contains no remaining references or files.
- If a licensing notice arrives: verify the sender independently (the foundry's own site), identify the exact asset from file metadata, check for an existing receipt, and get any settlement confirmed in writing as a "full and final settlement" before paying.
- Never add new commercial fonts or stock assets without a licence on record. Keep licence files or receipts referenced in `docs/` or alongside the asset.
