# Bersach Tradingfloor

Landingpage für den Inner Circle – die Futures-Trading-Community von Bersach.

## Stack

React · TanStack Router (file-based) · Tailwind CSS v4 · Vite

## Entwicklung

```bash
npm install
npm run dev      # lokaler Dev-Server
npm run build    # Produktions-Build nach dist/
```

## Struktur

- `src/routes/index.tsx` – Startseite
- `src/routes/rechtliches/$slug.tsx` – Impressum, Datenschutz, AGB, Widerruf
- `src/styles/app.css` – Farben, Schriften, Buttons, Animationen
- `src/assets/` – Logos

## Deployment

Jeder Push auf `main` wird per GitHub Actions auf GitHub Pages veröffentlicht.
