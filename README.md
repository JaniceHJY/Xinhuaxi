# Xinhuaxi — Multi-page Personal Care Site (EN + 简体中文, pretty URLs)

What this includes
- English pages (directory-based):
  - `/` -> index.html
  - `/products/` -> products/index.html
  - `/about/` -> about/index.html
  - `/contact/` -> contact/index.html
- Simplified Chinese pages under `zh/` (directory-based):
  - `/zh/` -> zh/index.html
  - `/zh/products/` -> zh/products/index.html
  - `/zh/about/` -> zh/about/index.html
  - `/zh/contact/` -> zh/contact/index.html
- Shared styles: `styles.css`
- Shared behavior: `script.js` (language switcher updated for pretty URLs)

How the language switching works
- Each page has a language menu. Buttons include `data-target` pointing to counterpart directory paths.
- The script stores the chosen language in `localStorage` as `preferredLang` and will redirect to the preferred-language counterpart on subsequent visits.
- Page mapping uses directory paths (no `.html` suffix). The script maps pages by the first or second segment (for zh/).

Note
- use jpg format and loading="lazy" mode for all image loading except for the hero picture in the main page to improve the website loading speed
- try to use picture with aspect ratio of 1:1 for aesthetic purpose

Deployment notes
- Directory-style pages work out-of-the-box on Netlify, Vercel, and GitHub Pages (static sites). Keep the folder structure as provided.
- If deploying to a subpath (for example `https://username.github.io/repo/`), update links or use absolute paths that include the repo base, or use a build step that sets a base path.
- Replace the Formspree URL in forms with your endpoint and update the contact mailto if desired.
