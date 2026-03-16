# The Gustavo Swingtet — static website rebuild

This is a first HTML/CSS/JS rebuild of the Wix site.

## Files

- `index.html` — home page
- `about.html` — about page
- `media.html` — media page
- `contact.html` — contact page
- `assets/css/style.css` — shared styling
- `assets/js/translations.js` — language-ready content map
- `assets/js/main.js` — navigation, language switch logic, placeholder link handling

## Fonts

The site uses the Adobe Fonts kit you provided:

- `blenny` for headers
- `antarctican-headline` for supporting text

The kit is loaded from:

- `https://use.typekit.net/hod4umf.css`

## Contact form setup (Formspree)

The form is prepared but not live yet.

1. Create a Formspree form.
2. Copy your endpoint, for example `https://formspree.io/f/xxxxabcd`
3. Open `contact.html`
4. Replace:

```html
https://formspree.io/f/YOUR_FORM_ID
```

with your real endpoint.

## YouTube / SoundCloud

- A featured YouTube embed is already in place.
- SoundCloud is currently a placeholder until you provide the final URL or embed.

## Future languages

The site is prepared for English, German, and French through `assets/js/translations.js`.

For now:
- English content is active.
- German and French buttons keep the layout ready and fall back to English.

Later, add `de` and `fr` text entries inside `translations.js`.

## How to preview locally

Open the folder in VS Code and use a simple static server, for example:

- VS Code Live Server extension, or
- Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`
