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
npm run build
wrangler deploy          # uploads ./dist as static assets to the kyrin-landing Worker
```

The Worker route `kyrin.dev/*` is declared in `wrangler.toml` and attached on the `kyrin.dev` zone.

## CI/CD — auto-deploy on commit

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and deploys it to Cloudflare automatically.

To make CI work you need a Cloudflare API token stored as a GitHub secret:

1. Create a token at https://dash.cloudflare.com/profile/api-tokens with:
   - **Account · Workers Scripts — Edit**
   - **Account · Workers Routes — Edit**
   - **Account · Account Settings — Read**
2. Add it to the repo: `gh secret set CLOUDFLARE_API_TOKEN` (or Settings → Secrets and variables → Actions in the GitHub UI).

Deploys are sequential (no overlapping runs); a failed deploy never cancels a running one.

## Content

Copy lives in `src/i18n.ts` (Thai + English dictionaries). Sections: hero, research workflow, vision, capabilities, tech stack, status, footer.

## License

MIT © 2026 Kyrin Labs
