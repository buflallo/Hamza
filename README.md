# Hamza Lachkar – Portfolio

Personal portfolio built with React, MUI and Three.js, bundled with Vite and deployed to GitHub Pages.

## Scripts

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm start`       | Dev server on http://localhost:3000  |
| `npm run build`   | Production build into `dist/`        |
| `npm run preview` | Serve the production build locally   |
| `npm test`        | Run the Vitest suite once            |
| `npm run lint`    | ESLint (React, hooks and a11y rules) |
| `npm run format`  | Prettier over `src/`                 |

## Structure

- `src/data/content.js` – nav sections, projects, tags and social links. Edit content here.
- `src/About.jsx` – Three.js scene; loads and animates only while on screen.
- `src/hooks/` – scroll-driven background/colour effects (one update per frame).
- `public/projects/` – project previews (`.mp4` + `.webp` poster). Convert new GIFs to video instead of committing them.
- `public/fonts/` – only the font weights the theme uses, as `woff2`.

## Deployment

Pushing to `main` runs `.github/workflows/main.yml` (lint, test, build, publish `dist/` to GitHub Pages).
