# Ledger — CPA Practice Platform

A modern, opinionated practice platform for solo CPAs and small tax firms. This repo hosts the Ledger preview suite — multiple connected surfaces (marketing site, practice dashboard, client portal, mobile companion, etc.) rendered as a single browseable app.

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **lucide-react** for icons
- **recharts** for data viz
- Auto-deployed to **GitHub Pages** via GitHub Actions

---

## Quick start (local)

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Adding your artifacts

Drop any `.jsx` file into `src/artifacts/`. The app auto-discovers them — no manual imports needed.

**Requirements per file:**
- Must use `export default` for the main component
- Unique filename (e.g. `ledger_cpa_dashboard.jsx`)
- Components should be self-contained (own state, no required props)

The sidebar label is generated from the filename:
- `ledger_marketing_site.jsx` → **Marketing Site**
- `client_portal.jsx` → **Client Portal**

---

## Deploying to GitHub Pages

### One-time setup

1. **Create a new GitHub repo** named `ledger` (or whatever you prefer — keep it consistent).

2. **Update `vite.config.js`** — change `base: '/ledger/'` to match your repo name. If you use a custom domain or this is a user/org page, set `base: '/'`.

3. **Push the code:**

   ```bash
   git init
   git add .
   git commit -m "Initial Ledger commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ledger.git
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Repo → **Settings** → **Pages**
   - Source: **GitHub Actions**

5. The workflow runs automatically on push. Wait ~2 minutes, then check the **Actions** tab for the deploy URL.

Your site will be live at:
`https://<your-username>.github.io/ledger/`

### Updating

Every push to `main` redeploys automatically. Just:
```bash
git add .
git commit -m "your message"
git push
```

---

## Deploying to Vercel (recommended for client-facing demos)

GitHub Pages is fine for previews, but `<your>.vercel.app` looks more credible to prospective buyers (CPAs).

1. Sign in at [vercel.com](https://vercel.com) with your GitHub account.
2. **Import Project** → pick the `ledger` repo.
3. Framework preset: **Vite** (auto-detected).
4. **Important:** Before deploying, change `base: '/ledger/'` back to `base: '/'` in `vite.config.js` (Vercel serves at root). You can keep two branches: `main` for Vercel, `gh-pages` for GitHub Pages.
5. Deploy. You'll get a URL like `ledger-<hash>.vercel.app` — and you can attach a custom domain (e.g. `ledger.app`) later.

---

## Project structure

```
ledger/
├── .github/workflows/deploy.yml    # Auto-deploys to GitHub Pages
├── src/
│   ├── artifacts/                  # Drop your .jsx files here
│   ├── App.jsx                     # Auto-discovers and lists artifacts
│   ├── main.jsx                    # React entry
│   └── index.css                   # Tailwind directives
├── index.html
├── vite.config.js                  # ← Change `base` to match repo name
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## Troubleshooting

**Blank page on GitHub Pages?**
Check that `base` in `vite.config.js` matches your repo name exactly, with leading and trailing slashes. For repo `ledger` → `base: '/ledger/'`.

**Tailwind classes not applying?**
Make sure `tailwind.config.js` `content` paths cover `./src/**/*.{js,jsx,ts,tsx}`.

**An artifact crashes the whole app?**
The crashing component will take the page down because there's no error boundary. Open the browser console, find the offending file, fix the bug, refresh.

**lucide-react icon not found?**
Older artifacts may use icon names that have been renamed. Check [lucide.dev/icons](https://lucide.dev/icons) for the current name.

---

## License

Proprietary — © Suresh Suthar / HYK Tax. All rights reserved.
