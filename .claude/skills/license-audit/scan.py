#!/usr/bin/env python3
"""License audit scanner: lists every font, PDF, image and external asset the
site ships, with the licensing evidence found inside each one.

Usage: python3 -I .claude/skills/license-audit/scan.py [repo_root]

It reports evidence, not verdicts. Read SKILL.md for how to judge the output.
Optional tools: fontTools + Pillow (pip), pdffonts (poppler-utils), exiftool.
"""
import json
import os
import re
import shutil
import subprocess
import sys

ROOT = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else ".")
SKIP_DIRS = {"node_modules", ".git", "build", ".cache"}
FONT_EXT = {".ttf", ".otf", ".woff", ".woff2", ".eot"}
IMG_EXT = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".mp4", ".mov", ".webm"}
CODE_EXT = {".scss", ".css", ".js", ".jsx", ".ts", ".tsx", ".html", ".json"}

# Hosts whose fonts are all open licensed (OFL / Apache / UFL).
OPEN_FONT_HOSTS = ("fonts.googleapis.com", "fonts.gstatic.com", "fonts.bunny.net")
# Hosts whose fonts need a paid account or licence on file.
PAID_FONT_HOSTS = ("use.typekit.net", "p.typekit.net", "fast.fonts.net", "cloud.typography.com",
                   "myfonts.net", "fontspring.com", "webfonts.fontslive.com")
OPEN_LICENSE_HINTS = re.compile(r"open font license|\bOFL\b|apache license|ubuntu font licen|public domain|CC0", re.I)
STOCK_HINTS = re.compile(r"shutterstock|getty|istock|adobe ?stock|depositphotos|123rf|dreamstime|alamy|envato|freepik|canva", re.I)


def walk():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for f in filenames:
            yield os.path.join(dirpath, f)


def rel(p):
    return os.path.relpath(p, ROOT)


def section(title):
    print(f"\n## {title}\n")


def font_files(files):
    section("Font files in the repo")
    fonts = [f for f in files if os.path.splitext(f)[1].lower() in FONT_EXT]
    if not fonts:
        print("None. (Good: nothing self-hosted to license.)")
        return
    try:
        from fontTools.ttLib import TTFont
    except ImportError:
        TTFont = None
        print("fontTools not installed (pip install fonttools brotli) - names only.\n")
    for f in sorted(fonts):
        print(f"- `{rel(f)}`")
        if not TTFont or f.lower().endswith(".eot"):
            continue
        try:
            t = TTFont(f, lazy=True)
            n = t["name"]
            info = {k: n.getDebugName(i) for k, i in
                    [("family", 1), ("copyright", 0), ("manufacturer", 8), ("vendor_url", 11),
                     ("license", 13), ("license_url", 14), ("unique_id", 3)]}
            for k, v in info.items():
                if v:
                    print(f"    - {k}: {v[:160]}")
            blob = " ".join(v or "" for v in info.values())
            if OPEN_LICENSE_HINTS.search(blob):
                print("    - verdict hint: OPEN LICENSE text present - still keep the licence file")
            else:
                print("    - verdict hint: NO open licence text - treat as COMMERCIAL until a receipt is found")
            if re.search(r"wfkit|myfonts|fontspring|monotype|linotype", blob, re.I):
                print("    - note: reseller webfont kit ID - check that reseller's order history for a receipt")
        except Exception as e:  # noqa: BLE001
            print(f"    - could not read: {e}")


def font_references(files):
    section("Font references in code (@font-face, font-family, font CDNs)")
    families, hosts, faces = {}, {}, []
    for f in files:
        if os.path.splitext(f)[1].lower() not in CODE_EXT or f.endswith("package-lock.json"):
            continue
        try:
            text = open(f, encoding="utf-8", errors="ignore").read()
        except OSError:
            continue
        for m in re.finditer(r"font-family\s*:\s*([^;}{]+)", text):
            first = m.group(1).split(",")[0].strip().strip("'\"")
            if first and not first.startswith(("var(", "$", "inherit", "-apple-system", "system-ui")):
                families.setdefault(first, set()).add(rel(f))
        for m in re.finditer(r"https?://([a-z0-9.-]+)[^\s'\")]*", text):
            h = m.group(1)
            if any(x in h for x in ("font", "typekit", "typography")):
                hosts.setdefault(h, set()).add(rel(f))
        if "@font-face" in text:
            faces.append(rel(f))
    print("Families named:")
    for fam, where in sorted(families.items()):
        print(f"- **{fam}** - {', '.join(sorted(where))}")
    print("\nFont hosts:")
    for h, where in sorted(hosts.items()):
        tag = "open (OFL/Apache)" if h.endswith(OPEN_FONT_HOSTS) else \
              "PAID - licence/account required" if h.endswith(PAID_FONT_HOSTS) else "UNKNOWN - check"
        print(f"- `{h}` [{tag}] - {', '.join(sorted(where))}")
    if faces:
        print("\n@font-face declared in (self-hosted fonts - every one needs a licence):")
        for f in faces:
            print(f"- `{f}`")


def pdfs(files):
    section("Fonts embedded in PDFs")
    pdf_list = [f for f in files if f.lower().endswith(".pdf")]
    if not pdf_list:
        print("No PDFs.")
        return
    if not shutil.which("pdffonts"):
        print("pdffonts not installed (apt install poppler-utils). PDFs found:")
        for f in pdf_list:
            print(f"- `{rel(f)}`")
        return
    for f in sorted(pdf_list):
        print(f"- `{rel(f)}`")
        out = subprocess.run(["pdffonts", f], capture_output=True, text=True).stdout.splitlines()[2:]
        names = sorted({line.split()[0].split("+")[-1] for line in out if line.strip()})
        print(f"    - fonts: {', '.join(names) or 'none'}")
        if any(re.match(r"CIDFont|F\d+$", n) for n in names):
            print("    - note: font names stripped - compare glyphs against suspect fonts (see SKILL.md)")


def media(files):
    section("Images and video: embedded copyright / source metadata")
    items = [f for f in files if os.path.splitext(f)[1].lower() in IMG_EXT]
    exiftool = shutil.which("exiftool")
    for f in sorted(items):
        tags = {}
        if exiftool:
            out = subprocess.run([exiftool, "-j", "-Copyright", "-Artist", "-Creator", "-Credit",
                                  "-Source", "-Rights", "-UsageTerms", "-WebStatement", "-Software",
                                  "-CreatorTool", "-Description", f], capture_output=True, text=True).stdout
            try:
                tags = {k: v for k, v in json.loads(out)[0].items() if k != "SourceFile"}
            except (ValueError, IndexError):
                pass
        else:
            try:
                from PIL import Image
                with Image.open(f) as im:
                    exif = im.getexif()
                    for tid, name in ((33432, "Copyright"), (315, "Artist"), (305, "Software"), (270, "Description")):
                        if exif.get(tid):
                            tags[name] = exif.get(tid)
                    for k, v in (im.info or {}).items():
                        if isinstance(v, str) and len(v) < 300:
                            tags[k] = v
            except Exception:  # noqa: BLE001
                pass
        flag = ""
        blob = json.dumps(tags)
        if STOCK_HINTS.search(blob):
            flag = "  <- STOCK/PLATFORM SOURCE: confirm licence terms"
        summary = "; ".join(f"{k}={str(v)[:80]}" for k, v in tags.items()) or "no metadata"
        print(f"- `{rel(f)}` - {summary}{flag}")
    if not exiftool:
        print("\n(exiftool not installed - only basic EXIF read. apt install libimage-exiftool-perl for XMP/IPTC.)")


def external_assets(files):
    section("Other external assets loaded at runtime")
    seen = {}
    for f in files:
        if os.path.splitext(f)[1].lower() not in CODE_EXT or f.endswith("package-lock.json"):
            continue
        text = open(f, encoding="utf-8", errors="ignore").read()
        for m in re.finditer(r"""(?:src|href|url)\s*[=(]\s*['"]?(https?://[^'")\s]+)""", text):
            u = m.group(1)
            if "font" in u:
                continue
            seen.setdefault(re.sub(r"^(https?://[^/]+).*", r"\1", u), set()).add(rel(f))
    for host, where in sorted(seen.items()):
        print(f"- {host} - {', '.join(sorted(where))}")
    if not seen:
        print("None.")


def main():
    files = list(walk())
    print(f"# License audit evidence for `{ROOT}`")
    font_files(files)
    font_references(files)
    pdfs(files)
    media(files)
    external_assets(files)
    print("\n## npm dependencies\n\nRun: `npx --yes license-checker --production --summary` "
          "(flag anything not MIT/BSD/ISC/Apache/OFL/CC0).")


if __name__ == "__main__":
    main()
