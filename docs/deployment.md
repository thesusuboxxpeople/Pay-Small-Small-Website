# Production deployment — whole website

Target: the existing `paysmallsmall.app` Next.js Node service behind Laravel Forge / Nginx, not the separate planning studio. No external deployment or Git push is performed by local verification.

## Confirmed Forge settings

The owner supplied the running PM2 process settings: name `site-3002037`, working directory `/home/forge/paysmallsmall.app/current`, Next executable `/home/forge/paysmallsmall.app/current/node_modules/next/dist/bin/next`, arguments `start --hostname 0.0.0.0 --port 3001`, and `cluster_mode`. The server reports Node `v22.21.0`, which satisfies the repository minimum. Keep the existing port **3001** and Nginx upstream unchanged. The commands using port 3000 below are local examples, not changes to the production port.

The owner has saved the script reproduced in `forge-deployment.txt`. Its build/check step runs before activation, then PM2 reloads the configured application and smoke-checks `http://127.0.0.1:3001`. That post-activation check reports failure but does not automatically roll back; restore the previous Forge release and reload PM2 if it fails. Push-to-deploy is configured on `main`, so pushing or merging to that branch can immediately publish the site.

## Release scope

- `/`: shopping information, Android download and existing waitlist API.
- `/founders-club`: programme content and WhatsApp handoff. Applicant must review and send; opening WhatsApp is not a saved application.
- `/builders-club`: brief-based information, model selector, details/documents/review form. With no backend URL, the form cannot submit and clearly says so.
- `/api/health`: website process liveness only; does not claim any external API or storage is available.
- `/sitemap.xml`, `/robots.txt`, custom 404 and route error screen.

## Build and environment

Use Node 22.23.2 (or compatible Node >=22.18), npm and the committed lockfile. The server must reach npm and Google Fonts during the build because `next/font/google` downloads the fonts. Install build dependencies before building; this is not a static export.

Copy `.env.example` to server-managed environment configuration. Do not copy local `.env` files into releases or commit credentials. Public endpoint URLs below are rendered into pages and must not contain tokens.

| Variable | Default / behaviour |
|---|---|
| `WAITLIST_ENDPOINT` | Defaults to `https://admin.paysmallsmall.app/api/waitlist`. Blank explicitly disables registration. Same-origin path or HTTPS URL. |
| `BUILDERS_APPLICATION_ENDPOINT` | Blank/unset keeps online submission closed. Only configure once the actual backend and document storage satisfy `builders-application-api.md`. |
| `NEXT_TELEMETRY_DISABLED` | Optional `1` on builds. |

Set endpoint variables **before `npm run build`**. These pages are prerendered; changing variables and only restarting does not refresh the rendered endpoint configuration. Build again after changes. Do not configure `/api/builders-club/applications` unless you have actually implemented or proxied that endpoint.

## Verify the release

```bash
npm ci --include=dev
npm run check
npm audit --omit=dev --audit-level=high
```

`check` runs ESLint, automated application/config tests and a production build. Start the built server in another terminal:

```bash
npm run start -- --hostname 127.0.0.1 --port 3000
```

Then run `npm run smoke`. To target staging or production, use `SMOKE_BASE_URL=https://YOUR-HOST npm run smoke`. To explicitly require closed Builders Club submissions, use `EXPECT_BUILDERS_CLOSED=1 npm run smoke`.

The smoke script only makes GET requests: routes, navigation fragments, initial rendered images, metadata routes, health and 404. It never submits a form or contacts the waitlist backend. CI runs the same checks on Linux; an actual CI result only exists after pushing the code.

To produce a portable source archive after checks pass (Python is only required on the packaging machine):

```bash
python scripts/package-release.py /ABSOLUTE/PATH/OUTSIDE-CHECKOUT/paysmallsmall-deployment.zip
```

The archive includes all three website sections, their assets, lockfile and deployment documents. It excludes `.env`, dependencies, `.next`, Git history and unrelated workspace folders. A SHA-256 sidecar accompanies it. This is source for a server-side `npm ci` and build, not a prebuilt Linux runtime bundle.

## Forge deployment

Prefer a new release directory so installing/building cannot corrupt the running release. Keep the previous release for rollback. Populate the release from the verified source archive or the exact Git commit you intend to deploy, configure its environment, and run the checks above. Do not run a new build over a running server's `.next` directory.

Start a candidate on an unused loopback port (for example 3001), smoke-test it with `SMOKE_BASE_URL=http://127.0.0.1:3001 npm run smoke`, then switch the existing Nginx upstream/Forge daemon to that tested release and reload it. Use the real site's Forge-generated daemon restart operation; do not invent a service name. A simpler single-directory deployment needs a maintenance window while the process is stopped and rebuilt.

Daemon command (working directory must be the selected release):

```bash
npm run start -- --hostname 127.0.0.1 --port 3000
```

Run Nginx in front of Node with TLS. Preserve the existing site's proxy configuration and forward `Host`, `X-Forwarded-For` and `X-Forwarded-Proto`. Serve the application through Node; do not set the web root to `public/` and expect Next routes to work. Allow the service account to write Next image/cache files. Review Nginx body/time limits when a same-origin document upload proxy is eventually added (30 MiB of files plus multipart overhead); don't enable a document proxy now.

Next.js emits `nosniff`, frame denial, referrer policy and browser-permission headers. TLS/HSTS and network access remain hosting responsibilities. Do not expose a development server publicly.

After switching, run `SMOKE_BASE_URL=https://paysmallsmall.app npm run smoke` and inspect real service logs. Roll back by restoring the previous release/upstream and restarting its daemon if health or smoke checks fail. Re-run production checks after rollback.

## Outstanding acceptance checks

Before public launch, a human must inspect desktop/mobile layouts and keyboard use; this environment has no browser automation surface. Exercise model selection, mobile menu focus/Escape, FAQs, details → documents → review, file removal, refresh behaviour and the closed-submission notice. Use dummy documents, never real financial records in a test.

Confirm the waitlist POST with an authorised test identity and verify staff can see the record; preflight/GET checks alone do not prove storage. Confirm Android listing availability and the Founder’s Club WhatsApp number. No production test submissions or messages have been sent during preparation.

Programme owners must confirm advertised pricing, delivery/maintenance commitments, partner responsibilities and applicable disclosures. Builders Club upload storage, review workflow, retention/privacy information and actual receipt confirmation remain backend work. You can deploy the information site with submissions explicitly closed; do not describe document submission as live until that integration is tested.

Reference: https://nextjs.org/docs/app/guides/self-hosting
