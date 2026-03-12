# TikTok Customer Feed

TikTok-style desktop feed for customer demo scenarios.

## Local setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

1. Create a GitHub repo and upload these files.
2. Update `base` in `vite.config.js` to match your repo name.
3. In GitHub, go to **Settings > Pages** and set **Source** to **GitHub Actions**.
4. Push to `main`.

## Customer switching

Edit the `CUSTOMER_AD` object at the top of `src/App.jsx` to change:

- image URL
- title
- description
- CTA label
- CTA URL
- landing page content
