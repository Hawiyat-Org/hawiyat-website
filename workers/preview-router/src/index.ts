/**
 * Hawiyat preview router.
 *
 * Maps `<slug>.preview.hawiyat.org` -> `hawiyat-preview-<slug>.<subdomain>.workers.dev`
 * so per-branch preview workers get branded URLs with zero per-branch DNS work.
 *
 * The proxied target is ALWAYS derived from the hostname slug against the fixed
 * workers.dev subdomain — never from any client-supplied input.
 */

// `@cloudflare/workers-types` is not installed and this worker is
// dependency-free, so the minimal `ExportedHandler` shape is declared locally.
type ExportedHandler<Env = unknown> = {
  fetch(request: Request, env: Env, ctx: unknown): Promise<Response> | Response;
};

interface Env {
  WORKERS_SUBDOMAIN: string;
}

const BASE_DOMAIN = "preview.hawiyat.org";

const LANDING_PAGE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hawiyat Preview Router</title>
    <style>
      body { font-family: system-ui, sans-serif; max-width: 36rem; margin: 4rem auto; padding: 0 1rem; color: #111; }
      pre, code { background: #f4f4f5; border-radius: 6px; }
      pre { padding: 0.75rem 1rem; }
      code { padding: 0.1rem 0.3rem; }
    </style>
  </head>
  <body>
    <h1>Branch previews</h1>
    <p>Every branch of the Hawiyat website gets its own preview deployment, reachable at a branded URL:</p>
    <pre>&lt;branch&gt;.preview.hawiyat.org</pre>
    <p>For example, the <code>main</code> branch preview lives at <code>main.preview.hawiyat.org</code>.</p>
  </body>
</html>`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const hostname = url.hostname.toLowerCase();

    // Only proxy for our branded host. Anything else gets the landing page —
    // never a proxied request derived from an untrusted hostname.
    const isPreviewHost =
      hostname === BASE_DOMAIN || hostname.endsWith(`.${BASE_DOMAIN}`);
    if (!isPreviewHost) {
      return landing();
    }

    const labels = hostname.split(".");
    // Bare host (`preview.hawiyat.org`, 3 labels) or `www` -> landing page.
    // Otherwise the first label is the branch slug.
    const slug = labels.length > 3 ? labels[0] : null;
    if (!slug || slug === "www") {
      return landing();
    }

    // Target is derived only from the hostname slug + fixed workers.dev subdomain.
    const target = `https://hawiyat-preview-${slug}.${env.WORKERS_SUBDOMAIN}.workers.dev${url.pathname}${url.search}`;

    // Forward the ORIGINAL request: same method, headers minus `host`,
    // opaque body passthrough for non-GET/HEAD, full path + query.
    const headers = new Headers(request.headers);
    headers.delete("host");

    const init: RequestInit = {
      method: request.method,
      headers,
      redirect: "manual",
    };
    if (request.method !== "GET" && request.method !== "HEAD") {
      init.body = request.body;
    }

    try {
      // Return the upstream response with its status and headers as-is.
      return await fetch(new Request(target, init));
    } catch {
      // The branded hostname resolves, but the per-branch worker does not
      // exist (its workers.dev hostname fails to resolve).
      return new Response(`Preview not found for branch: ${slug}`, {
        status: 404,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }
  },
} satisfies ExportedHandler<Env>;

function landing(): Response {
  return new Response(LANDING_PAGE, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
