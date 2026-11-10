# "Look up" — hand-off brief for the next session

You are continuing a design-led rebuild of Hamza Lachkar's portfolio (`hlachkar.mooo.com`).
Use the **frontend-design** skill. Read this whole file first, then look at the five mock-ups
in `docs/look-up/boards/*.jpg` (the `.dc.html` next to each one holds the exact CSS values).

## 0. Ground rules (from the owner, keep them)

- Branch: develop on `claude/amazing-keller-yxrz2k`, commit, push. **Do not open a PR** unless asked; the owner opens and merges PRs from the GitHub UI.
- **Before rewriting a file, explain how it changes the *feel*** of the site, not just the Lighthouse score. The owner cares about the artistic, slightly inconsistent layout; do not sand it into a template.
- Keep pop / fade-in motion. Use aspect-ratio placeholders, skeletons and micro-animations rather than a static instant-load page.
- Layout changes are allowed. Prefer `aria-hidden` / visually-hidden text / ARIA over swapping HTML tags when split lettering or decorative layers are involved.
- Respect `prefers-reduced-motion` (no continuous motion; keep the blue plate as a still offset).
- Contact email / CV / project links: the owner said "forget about those links". Do not add them.
- Pronouns: use "they" for the owner; never guess.

## 1. The project

React 18 + MUI 5 + Three.js + Vite 6 + Vitest 3, deployed to GitHub Pages by Actions. Scripts: `npm run dev|build|lint|test|format`.
Before every push: `npm run lint && npx vitest run && npm run build` (and `npx prettier --check src`). 12 tests currently.

Identity (do not change): colours cobalt `#2E05D1`, yellow `#FFFF00`, lime `#E1FF00`, charcoal `#1D1B1B`, white. Fonts: **DeliriumNcv** (condensed display, uppercase) and **PPFuji** (Bold/Light, labels and body) from `public/fonts`. Painting: `public/background2.webp` (baroque ceiling). 3D: `public/david/scene.glb` (sculpted head with vine crown) rendered in `src/About.jsx`. Star: `public/star.png`.

## 2. What already exists in the repo (commits up to `1bf31b9`)

- Scroll reveal (`useInView`, `.develop`, `.rise`), blue-plate text-shadow slip (`.misreg`), Skills ink/type-on, footer letter pop, chaser light on the sculpture, mobile Projects ordering, no overlap in Skills.
- **A3 backdrop** (`src/Backdrop.jsx`, `src/hooks/useBackgroundTransition.jsx`, CSS `.backdrop*` in `src/App.css`): five fixed layers (full painting, baked two-ink print `public/background-print.webp`, charcoal veil, cobalt ghost `public/background-ghost.webp`, footer print) whose opacity is driven by `layerOpacities(s, b)`; phones (<600px) get the body gradient only and load none of the images. Unit-tested.
- Section titles use `src/Title.jsx`: spinning star + Delirium + blue plate.
- Nav: frosted white (`rgba(255,255,255,.72)` + blur), charcoal text, cobalt active underline and focus ring.
- Verified earlier: axe 0 violations, CLS about 0.0003, no horizontal overflow at 390 and 1280.

## 3. The new concept: "Look up" (this is what to build)

The site is one painted ceiling and **the sculpted head is the single figure that stays through the whole page**. Colours, fonts, painting and 3D are all the owner's own. The owner picked this direction from five boards (see `boards/`); an earlier round that felt "too museum" (frames, plinths, labels) was rejected, so avoid placards, captions in frames, gallery-wall vibes.

Per section (exact values are in the `.dc.html` boards; boards are 1280x820):

1. **Hero (`L1_Hero`)** Full-colour painting with a cobalt radial vignette (transparent centre, `rgba(46,5,209,.62)` at the edges) and a warm yellow glow (`radial-gradient`, `mix-blend-mode: screen`) behind the head. "SOFTWARE" is Delirium ~360px white with the blue plate, **behind** the head (head covers the last letter). "& WEB DEVELOPER" ~210px, **in front of** the head's lower part. Small paragraph at left, star top right. This is a z-order trick: text layer, then 3D layer, then front text layer.
2. **About (`L2_About`)** The head is flipped to face the text (left), larger, lit by a yellow glow; painting becomes the two-ink print (masked 200deg) under a charcoal gradient so the white text stays readable. Heading "Hello I am Hamza." Delirium ~128px with plate on the right.
3. **Projects (`L3_Projects`)** Cobalt ghost of the painting on charcoal. Each project is a **circular opening** (border-radius 50%, 4px lime ring, hard cobalt shadow `12px 12px 0`) with its video/poster inside (different diameters 300 to 420, staggered). Huge Delirium titles (~120px, plate) spill over the circle edge; category in lime PPFuji. Keep `.develop` aspect-ratio/skeleton behaviour, `ratio` data, play/pause button, mobile title-first ordering (adapt to circles: on phones use a squarer crop or keep rectangles if circles hurt the videos, ask the owner).
4. **Skills (`L4_Skills`)** No cards. Three giant Delirium lines (Software / Frontend / Backend, ~200px) with the ink underline colours already in the repo (`#FFD100`, `#61DAFB`, `#E0234E`), a thin rule between rows, description on the right, small lime "Development" label. Keep the ink-in / type-on reveal ideas where they still fit.
5. **Footer (`L5_Footer`)** Print dissolves into plain yellow (mask 180deg). "Let's connect" as **one** giant ~236px charcoal line with plate, floating star, pills, social links row. Keep the existing split-letter accessibility (visually-hidden text + aria-hidden letters).

Page story: full-colour painting -> print turning -> cobalt ghost -> yellow. The existing `layerOpacities` mapping already does this and probably only needs retuning.

## 4. Technical plan

1. **Persistent 3D.** Move the Three.js scene out of `About.jsx` into one fixed, pointer-events-none canvas (`position: fixed; inset: 0; z-index` between the back text and front text layers). Transparent renderer (`alpha: true`) so the painting shows through. Drive the head's **screen position, scale, rotation y (flip) and light colour from scroll** (use `useScrollFrame` or one shared rAF): hero right-centre, About left larger and mirrored, Projects/Skills small/parked or hidden, Footer hidden. Keep the chaser light, breathing rotation and scroll "surge" from `About.jsx`; keep Meshopt-compressed `scene.glb` and lazy loading (the 3D chunk must stay lazy so first paint is not blocked).
2. **Behind/in-front headline.** Hero heading split into two DOM layers around the canvas. Make sure screen readers get one `<h1>` ("Software & web developer"); mark the duplicate layer `aria-hidden`.
3. **Pause when off screen / hidden tab; no 3D on phones (<600px) or reduced motion** (static render of one frame is fine). Measure scroll smoothness; the old rule was that heavy layers must degrade on weak devices.
4. Restyle Projects (circles), Skills (lines), Footer (one line), Title keep the star. Reuse `.misreg`, `.rise`, `.develop`, `useInView`.
5. Re-tune `layerOpacities` and the print mask (hero currently masks `160deg, transparent 30% to #000 80%`).
6. Tests: update `src/*.test.jsx` where structure changes; keep the `layerOpacities` test meaningful. Add a test for any new hook.
7. Verify with Playwright screenshots at 1280x800 and 390x800 at several scroll depths, axe-core (`node_modules/axe-core/axe.min.js`), and check `document.documentElement.scrollWidth` equals the viewport width.

## 5. Questions to ask the owner before or while building

- Phones: keep the head at all (static image?) or none? Circles vs rectangles for project media on phones?
- The head appears in **two** places at once in some scroll positions during transitions; ok to cross-fade or must it stay one continuous object?
- Nav: the frosted white bar stays? (The owner asked for it back; it is in.)
- Any change of the hero copy? Keep text as is unless told.
- Performance budget: is it acceptable that WebGL runs while scrolling Hero and About only, and is parked elsewhere?

## 6. Design canvas (reference only, private)

`https://claude.ai/artifact/3UXCGhiEvRRL5amXsRoCex` ("Look up", five boards). The owner's account can open it; sessions may not be able to. Everything needed is already copied here: JPG previews, board HTML with exact CSS, and `head-cutout.png` (the sculpture with a transparent background, used only in the mock-ups; the real build uses the live WebGL model).

## 7. Environment notes from the previous session

- Playwright is at `/opt/node22/lib/node_modules/playwright`; the Chromium path changes between containers (check `ls /opt/pw-browsers/`; recently `chromium-1243/chrome-linux64/chrome`).
- `pkill -f "[v]ite preview"` (the bracket trick avoids killing your own shell); `vite preview` and long Playwright commands sometimes exit 144 but their output is valid.
- Python Pillow may be broken in the container; do image work in a Playwright canvas instead.
- Prettier reformats source: when patching with scripts, verify the edit really applied (grep or computed styles) before trusting a screenshot.
- The previous session's local-only helper scripts are not in the repo; recreate as needed.
