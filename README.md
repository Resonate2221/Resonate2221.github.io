# Meijun Gao · Personal homepage

A bilingual, responsive academic homepage for GitHub Pages. Plain HTML, CSS and JavaScript; no build step, package installation, external fonts, or tracking.

## Preview

Run `python3 -m http.server 8000` in this folder, then open http://localhost:8000. You can also open `index.html` directly; clipboard support may depend on your browser.

## Update content

- `index.html`: English biography, research, education, honors, and links.
- `script.js`: Chinese translations. Each `data-i18n` key maps to a Chinese entry; English remains readable without JavaScript. The language preference is saved in the visitor’s browser.
- `style.css`: Responsive layout, colors, typography, and print styles.
- `assets/meijun-gao.jpg`: Profile photo, cropped visually with CSS. Research images are extracted from the supplied manuscripts.

## Publication links

Formal Skill is linked to its verified arXiv record: https://arxiv.org/abs/2605.19604. RepresentNav and video summarization are shown as research work, with no unverified arXiv links or manuscript downloads. Add public links and full author lists when available. No conference acceptance is implied.

## GitHub Pages

Publish from the `main` branch, `/ (root)` folder, in repository **Settings → Pages**. The `.nojekyll` file keeps this as a static site. No Actions workflow is required when branch deployment is already enabled.

The existing site is https://resonate2221.github.io/. The canonical URL and social metadata use this address.

## Privacy

The first-screen email button uses gaomeijun0526@gmail.com, as requested by the owner. No email address is shown in the bottom contact section. The original CVs, phone number, student application ID, anonymous manuscripts, and source presentation are not bundled.
