# Kyrin Landing

Landing page for **Kyrin Research OS** — a personal AI research operating system.

Built with React + Vite + TypeScript. Serves at [kyrin.dev](https://kyrin.dev) via a Cloudflare Worker with static assets.

## Features

- 🌗 Dark / light theme toggle (persisted, defaults to system preference)
- 🌐 Thai / English language toggle (persisted)
- ✨ Scroll-reveal animations, animated research-loop cards, typewriter chat mock, tech marquee
- 🎨 `lucide-react` icons; Kyrin logo used in its single dark variant on both themes
- 🚀 Deployed as a Cloudflare Worker with static assets (`wrangler.toml` + `src/worker.js`)

## Local development

```bash
npm install
npm run dev      # dev server
npm run build    # production build -> dist/
```

## Deploy

```bash
wrangler deploy          # uploads ./dist as static assets to the kyrin-landing Worker
```

The Worker route `kyrin.dev/*` is attached on the `kyrin.dev` zone.

## Content

Copy lives in `src/i18n.ts` (Thai + English dictionaries). Sections: hero, research workflow, vision, capabilities, tech stack, status, footer.

## License

MIT © 2026 Kyrin Labs
