# Xinhuaxi — Multi-page Personal Care Site (EN + ES)

What this includes
- English pages: `index.html`, `products.html`, `about.html`, `contact.html`
- Spanish pages in `es/`: `es/index.html`, `es/products.html`, `es/about.html`, `es/contact.html`
- Shared styles: `styles.css`
- Shared behavior: `script.js` (language switcher, small UI helpers)

How the language switching works
- Each page includes a small language menu. When you click a language:
  - If the button has a `data-target`, we go directly to that path (used for cross-folder links).
  - Otherwise the script attempts to find a counterpart page (same page in the other language).
- The script stores the chosen language in `localStorage` as `preferredLang` and will redirect users to their preferred language counterpart on subsequent visits.
- Each page includes a `<link rel="alternate" hreflang="...">` pointing to its counterpart to help search engines.

Deploying
- Drop all files into a static host (GitHub Pages, Vercel, Netlify).
- Keep the `es/` folder intact for Spanish pages.
- If deploying to a subpath (e.g., `username.github.io/repo/`) update links or use absolute paths.

Adding another language
- Create another folder (e.g., `fr/`) and copy the same pages into it with translations.
- Update `pageMap` in `script.js` to add mapping pairs (e.g., `"index.html": "fr/index.html"`).
- Add `data-target` values in the language menus to point to the new language paths.
- Add `<link rel="alternate" hreflang="fr" href="fr/index.html">` in the head of each page.

Customizing
- Update `--primary` color in `styles.css` for your brand color.
- Replace the placeholder images with your product photography.
- Replace the Formspree action URL with your form endpoint or a server route. The contact mailto is set to `hello@xinhuaxi.example` as a placeholder.

Next steps I can do
- Apply a brand color palette or logo (tell me hex values or upload a logo).
- Convert the site to a single-template setup (translations JSON + build script) so you only maintain one set of content.
- Add product detail pages and a simple localStorage cart.
- Add automatic unobtrusive language-detection banner or switch behavior.

Tell me which of the above you'd like next (or give a color / logo) and I'll update the files.