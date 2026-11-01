# AdminKit for React

Free, MIT-licensed React admin template based on Bootstrap 5.

## Commands

- `npm run dev`: dev server on http://localhost:5173
- `npm run build`: production build into `dist/`; `npm run preview` serves it
- `npm run lint`: ESLint, Prettier, `tsc` and the stats check; must pass
- `npm test`: Playwright smoke and axe tests on `dist/` (build first; `npm run test:install` once)
- `npm run format`: Prettier write
- `npm run stats`: regenerate `src/data/stats.json` and the README counts

## Layout

- React 19, Vite 8, React Router 8 (declarative, single-page app), strict TypeScript. Mock data, no server. `BASE_PATH` sets a base path (`vite.config.ts`).
- One file per page in `src/routes`, named after its URL (`index.tsx` is `/`). Every page is listed in `src/data/pages.json` with its title, description and layout (`dashboard` or `auth`); `src/app.tsx` builds the routes from it, and `src/layouts/page-meta.tsx` sets the document title.
- Structure: `src/routes` holds only the pages; `src/layouts` the dashboard and auth layouts; `src/components` the shared parts (`bootstrap`, `plugins`, `navbar`, `sidebar`, `ui`) and, under `pages/<section>/<page>/`, what only one page uses; `src/mocks` demo data; `src/data` app data (pages, navigation, stats).
- `src/components/bootstrap` replaces Bootstrap's JavaScript with React components on Bootstrap's markup (`Alert`, `Dropdown`, `Modal`, `Offcanvas`); `src/components/plugins` wraps the plugins; `src/scss` is AdminKit's Sass, with the plugin overrides in `5-vendor`.
- The script in `index.html` runs before the first paint (color mode, the hidden state of the cards that fade in); it must not import anything.

## Rules

- Only CSS custom properties get a prefix: `--ak-*`, like Bootstrap's `--bs-*`. Classes, Sass variables, functions, mixins and data attributes never do.
- Never query or change the DOM React renders; keep it in state.
- No Bootstrap JavaScript, no react-bootstrap, no Tailwind. Plugins that need the browser load in `useEffect` with `import()`, or with `React.lazy`, and show a `Skeleton` until they draw.
- Light and dark mode: `data-bs-theme` on `<html>`. Change the mode only through `useColorMode` (`src/lib/config.ts`). Colors that follow the mode use custom properties (`var(--bs-body-color)`, `var(--ak-surface-bg)`); dark-only overrides go in `@include color-mode(dark) { ... }` at the end of the partial. Check both modes.
- Charts and maps read colors from the `theme` argument: `<ChartJs config={(theme) => ...} />`, `<VectorMap options={(theme) => ...} />`.
- Icons are `lucide-react` components (`circle-check-big` is `<CircleCheckBig />`). Images are `<img>` with `width`, `height` and `src={asset("/img/...")}`, so the base path applies.
- Counts come from `src/data/stats.json`, and AdminKit PRO's from `src/data/editions/pro.json` (a snapshot); a page description writes them as `{icons.lucide}`. Never type a count by hand. A new dependency goes in `src/data/plugins.json`, as a plugin or in `notPlugins`, or lint fails.
- Motion: write transitions with `@include transition(...)`; under reduced motion nothing moves (a fade is fine). Cards inside `.reveal-cards` and `.reveal` elements fade in on scroll without extra code (`PageEffects`, `data-revealed`).
- Layout shift stays 0: reserve the final size of anything a script draws, give images `width` and `height`.
- Accessibility: WCAG 2.2 AA in both modes, no console errors (`npm test`). Text colors come from `readable($color, $background)`, text on a fill from `text-on($background)`. Icon-only buttons get an `aria-label`; card titles are `h2.card-title`.

## Conventions

- Conventional Commits, see `CONTRIBUTING.md`; lefthook enforces them.
- A PR that changes behaviour adds a short, user-facing line under `Unreleased` in `CHANGELOG.md`, like "Add pricing page (/pages-pricing)" or "Upgrade dependencies".
