# Goodoo Animal Welfare Trust

Marketing website for **Goodoo Animal Welfare Trust** (Bengaluru) — a nonprofit focused on rescue, rehabilitation, and forever homes for urban animals.

Live site (after GitHub Pages is enabled): [https://pbhatti.github.io/goodoo/](https://pbhatti.github.io/goodoo/)

## About

Goodoo gives street and community animals in Bengaluru medical care, shelter, and a second chance. This repo is the public-facing site: who we are, what we do, rescue stories, our team, and how to donate or get involved.

## Stack

Plain static site — no framework, no build step.

| File | Role |
|------|------|
| `index.html` | Markup and copy |
| `styles.css` | Design tokens, layout, and motion |
| `app.js` | Nav, scroll reveals, donate form UX |
| `assets/` | Photos, illustrations, logo, hero video |

## Site sections

1. **Hero** — brand, headline, donate CTA
2. **What we do** (`#work`) — treat-and-release, rescue, halfway home
3. **Rescue stories** (`#stories`)
4. **Our journey** (`#impact`) — timeline and impact
5. **Our team** (`#team`)
6. **Get involved** (`#help`)
7. **Donate** (`#donate`)

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
# Python
python3 -m http.server 8080

# Node (if you have npx)
npx serve .
```

Then visit `http://localhost:8080`.

## Deploy with GitHub Pages

1. Push this repo to `main` (already set up at [pbhatti/goodoo](https://github.com/pbhatti/goodoo)).
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch `main` and folder `/ (root)`, then **Save**.
5. After a minute or two, the site will be at `https://pbhatti.github.io/goodoo/`.

Optional: add a custom domain under **Pages → Custom domain**.

## Contributing notes

- Keep the donate path obvious from any UI change.
- Prefer editing existing classes (`section`, `container`, `btn`, `reveal`, etc.) over inventing new patterns.
- Media goes in `assets/`; always set meaningful `alt` text.
- Check desktop and mobile layouts after visual changes.
