/**
 * Kyrin Research OS landing — static assets worker.
 * All content is served from ./dist via the assets binding.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const asset = await env.ASSETS.fetch(request);
    if (asset.status === 404 && url.pathname === "/") {
      return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
    }
    return asset;
  },
};
