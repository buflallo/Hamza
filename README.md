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

- `src/data/content.js` – nav sections, projects, skills, tags and social links. Edit content here. Set `CONTACT_EMAIL` / `CV_URL` to show those links in the footer, and add `repo` / `demo` URLs to a project to show its links.
- `src/About.jsx` – Three.js scene; loads and animates only while on screen. The model is `public/david/scene.glb` (meshopt-compressed, UVs and textures stripped).
- `src/hooks/` – scroll-driven background/colour effects (one update per frame).
- `public/projects/` – project previews (`.mp4` + `.webp` poster). Convert new GIFs to video instead of committing them.
- `public/fonts/` – only the font weights the theme uses, as `woff2`.

## Deployment

`.github/workflows/main.yml` runs lint, tests and the build on every push and pull request to `main`; pushes to `main` also publish `dist/` to GitHub Pages.
