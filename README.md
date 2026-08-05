# Kyrin Landing

Demo web for **Kyrin Research OS** — a personal AI research operating system.
Serves at [kyrin.dev](https://kyrin.dev).

A chat-first demo: a simulated Kyrin assistant that greets you, answers keyword
questions, and replies to research prompts with typing animations — in Thai and
English.

## Example questions

- สวัสดีครับ / Hello
- ใครเป็นคนพัฒนาระบบนี้ / Who developed this?
- kyrin เดิมคืออะไร / What is the legacy kyrin?
- ทดสอบ / Test

## Tech

React 19 + Vite + TypeScript, `lucide-react` icons. Deployed as a Cloudflare
Worker with static assets.

## Development

```bash
npm install
npm run dev      # dev server
npm run build    # production build -> dist/
npm run lint
```

## License

MIT © 2026 Kyrin Labs
