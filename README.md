# Pay Small Small website

One Next.js website with three public routes:

- `/`: shopping information, Android download and waitlist.
- `/founders-club`: business app packages and WhatsApp enquiry/application handoff.
- `/builders-club`: house models, programme information and application with document selection.

## Run locally

Use the Node version in `.nvmrc` (Node 22.23.2; minimum 22.18). Install from the lockfile:

```bash
npm ci --include=dev
npm run dev
```

Open `http://localhost:3000`. The site uses Google Fonts at build time. Do not place API credentials in public endpoint URLs.

## Verify and deploy

```bash
npm run check
npm audit --omit=dev --audit-level=high
npm run start -- --hostname 127.0.0.1 --port 3000
```

`check` runs ESLint, automated tests and a production build. With the server running, use another terminal to run `npm run smoke`. To check staging, set `SMOKE_BASE_URL` to its origin. Smoke tests only make read-only requests and never submit personal data.

Read [the deployment guide](docs/deployment.md) for Forge/Nginx setup, environment variables, rollout and rollback. `.github/workflows/ci.yml` runs checks on Linux after code is pushed. No CI result or production deployment is implied by a local build.

## Environment configuration

`.env.example` contains public URLs only:

- `WAITLIST_ENDPOINT`: defaults to the existing admin API. A deliberately blank value disables the connection.
- `BUILDERS_APPLICATION_ENDPOINT`: leave blank until backend submission and private storage are implemented.

Endpoint values are prerendered at build time. Changing them requires a rebuild as well as a restart.

## Builders Club architecture

- `app/builders-club/page.tsx`: brief-based public content, eligibility, process, FAQs and application.
- `components/builders-club/home-models.tsx`: keyboard-accessible model selection and payment breakdown.
- `components/builders-club/application-form.tsx`: details, documents and review steps.
- `lib/builders-club.ts`: specifications, prices, tenor and desk contact.
- `lib/builders-application.ts`: validation and multipart request creation.
- `lib/site-config.ts`: validation of public API destinations.
- `public/builders-club/`: supplied promotional artwork. The conflicting MCC scope/exclusions poster is excluded in favour of the brief.

Selected documents remain only in the open page's memory. Refreshing clears the unsent form. Limits are PDF/JPG/PNG, 10 MiB per file, 5 per category, 30 MiB combined, with at least one land document and one proof-of-funds document.

Submission is disabled without a configured endpoint. With a real backend, success requires a server-issued application reference. Interrupted/ambiguous receipts are held for staff follow-up instead of automatic retries. See [the backend integration contract](docs/builders-application-api.md).

## Current boundaries

The repository contains no application storage, staff review backend, live-camera integration or payment collection. Founder's Club opens WhatsApp for the applicant to review and send; it does not confirm a message was sent. iOS is marked coming soon. The health route checks the website process, not external services. Production claims, privacy/retention arrangements and programme delivery responsibilities require owner confirmation.
