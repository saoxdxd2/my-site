# Defense-in-Depth and Firewall Blueprint

This template includes defense-in-depth defaults in code and provides deployment-ready firewall/WAF guidance. Use this as a checklist when deploying to Netlify, Vercel, or behind Cloudflare.

## Implemented in this repo

- CSP + Security headers (`static-template/nuxt.config.ts`)
  - `default-src 'self'`
  - `script-src 'self' 'unsafe-inline'` (Nuxt hydration; see hardening below)
  - `style-src 'self' 'unsafe-inline' 'sha256-<critical.css hash>` (inline critical CSS permitted by hash)
  - `script-src-attr 'none'`, `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`
  - HSTS (prod), Referrer-Policy, COOP/CORP, Permissions-Policy minimal
  - Cache split: HTML revalidated, assets immutable
- Safe Links (`static-template/plugins/safe-links.client.ts`)
  - Ensures `rel="noopener noreferrer"` on `target="_blank"` links
- Service Worker tightened (`static-template/public/sw.js`)
  - Network-first for HTML (no caching of navigations)
  - Cache-first only for static assets
- ESLint policy (`static-template/.eslintrc.cjs`)
  - `vue/no-v-html` enforced
- Security contact (`public/.well-known/security.txt`)
- Sitemap (`public/sitemap.xml`) and Robots (`public/robots.txt`)

## Optional: stricter CSP (recommended)
- Replace `script-src 'unsafe-inline'` with nonce-based scripts. This requires wiring Nuxt to inject a nonce in script tags and CSP header. See future task: "Switch to nonce-based CSP".

## Firewall / WAF guidance

### Cloudflare (recommended in front of any host)

1. Proxy your apex and `www` through Cloudflare (orange cloud).
2. Turn on WAF managed rules (OWASP Core Ruleset) in "High" sensitivity.
3. Create custom rules:

- Block unknown write methods outside known paths
  - Expression:
    ```
    (http.request.method in {"POST" "PUT" "PATCH" "DELETE"}) and not starts_with(http.request.uri.path, "/api/")
    ```
  - Action: Block

- Rate limit contact form POSTs
  - Rate limiting rule (per IP): Path equals `/contact`, Method `POST`, Threshold: 10/minute, Action: Challenge or Block

- Challenge suspicious user agents
  - Expression (example, tune cautiously):
    ```
    lower(http.user_agent) contains "python-requests" or lower(http.user_agent) contains "curl"
    ```
  - Action: Managed Challenge

- Geo throttle (optional)
  - Expression:
    ```
    not ip.geoip.country in {"US" "GB" "CA" "EU"}
    ```
  - Action: Managed Challenge (avoid blocking search engine crawlers)

- Block excessive query length (basic input hardening)
  - Expression:
    ```
    strlen(http.request.uri.query) > 2048
    ```
  - Action: Block

4. Bot Fight Mode: enable (if not breaking legitimate bots).
5. Always Use HTTPS + HSTS: enabled (mirrors our server headers).

### Netlify

- Prefer Cloudflare in front of Netlify for WAF. If not using Cloudflare:
  - Use `deploy/netlify.toml` headers as a fallback.
  - Consider Netlify Edge Functions to add additional checks (rate-limit form posts, block bad UAs).

### Vercel

- Prefer Cloudflare in front of Vercel for WAF. If not using Cloudflare:
  - Use `deploy/vercel.json` headers as a fallback.
  - Add a `middleware.ts` in the project root to implement basic IP/UAs checks if you later add a serverless API.

## Operational security

- Enable dependency alerts/Dependabot in your repo.
- CI: run `npm ci && npm audit --omit=dev` on production builds, fail on high/critical.
- Monitor CSP violations by adding a `report-uri`/`report-to` endpoint (self-hosted or third-party) once you adopt nonce-based CSP.

## Incident response

- Keep `security.txt` email current.
- Document a takedown and rollback plan for your host. Ensure you can revoke CDN cache and keys quickly.

## Next steps in this repo

- Switch to nonce-based CSP and remove `'unsafe-inline'` from `script-src`.
- Add optional `report-to` for CSP reporting in production.
- If an API is added later, add rate limiting, input validation, and CSRF tokens.
