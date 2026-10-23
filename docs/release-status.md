# Release status — 23 October 2026

Scope: the complete Pay Small Small public website (Home, Founder’s Club and Builders Club). Prepared for deployment to the existing Node/Forge hosting setup. Not deployed or pushed to Git by this preparation.

## Verified locally

- `npm run check`: passed ESLint, all 8 automated tests and the optimized production build, including TypeScript.
- Dependency audit after compatible fixes: **0 vulnerabilities** across the installed dependency tree at preparation time.
- Production server smoke check: passed all three routes, internal links and fragments, 12 rendered image URLs, security headers, sitemap, robots, health and custom 404.
- Builders Club is explicitly closed for online submission without an endpoint; the closed state passed the smoke check.
- Waitlist API CORS preflight from `https://paysmallsmall.app`: HTTP 204, allowed origin `*`, method `POST`. This verifies preflight only, not persistence.
- Source ZIP packaging verifies archive integrity and excludes local environment files, dependencies, build output, Git history, planning prototypes and unrelated workspace files.

Versions verified: Node 22.23.2, Next.js 16.4.3, Sharp 0.35.5 and PostCSS 8.5.31. The lockfile includes the Linux Next.js native package for the deployment host.

Owner-provided hosting checks: the production server reports Node 22.21.0 (compatible). PM2 `site-3002037` points to the active `current` release and serves Next.js on port 3001 in cluster mode. The owner reports saving the prepared Forge deployment script. The local source was synchronized with remote `main` at `94882b0` before preparing the release commit. None of these checks constitutes a live deployment of the new code.

## Release changes

Added Builders Club content and application review/attachments; connected navigation and footer; separated public API configuration; added health and error/404 handling; improved keyboard menu behaviour, skip links and reduced motion; fixed an inactive shopping button and loading-button behaviour; marked iOS as coming soon; removed unsupported homepage counts/ratings; strengthened waitlist request handling; updated vulnerable packages; added CI, tests, a read-only smoke script, deployment/rollback instructions and portable source packaging.

## Acceptance still required

- Desktop/mobile visual and interaction review. No browser automation surface was available, so no visual pass is claimed.
- Authorised real waitlist test and staff verification of receipt; no production form submissions or messages were sent.
- Confirmation of public programme prices, delivery/maintenance commitments, partner responsibilities and applicant disclosures by the owner.
- Builders Club backend, private document storage, staff review, retention/privacy information and end-to-end submission test before enabling the endpoint.
- CI execution on Linux after pushing, followed by checks on the actual staging/production host. The workflow exists but has not been run remotely in this session.

Deployable state: **public information website with Builders Club submission clearly closed**. Do not represent the document-submission service as live yet. See `deployment.md` for release steps and rollback.
