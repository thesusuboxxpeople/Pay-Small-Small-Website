# Builders Club application integration

Frontend is implemented. No backend or file storage is created by this change. Leave `BUILDERS_APPLICATION_ENDPOINT` unset until the real service is ready; users can fill, attach and review but cannot submit. Attachments and details are held only in page memory, not local storage. Reloading clears them.

Set the server environment variable to a same-origin path such as `/api/builders-club/applications`, or an approved HTTPS API URL, then rebuild and restart the Next.js deployment. These pages are prerendered, so a restart alone does not update the endpoint. The URL is passed to the client; it must never contain a secret. Do not enable a public production endpoint before server validation, secure storage and operational review are ready. The form must send from HTTPS in production. A cross-origin service must allow the exact website origin, `POST`, `Content-Type`, `Accept` and `Idempotency-Key`; no cookies or credentials are sent cross-origin by this form. Use a same-origin proxy if the backend requires private credentials. No application endpoint path has been assumed to already exist.

## Request

`POST` multipart/form-data (browser supplies boundary). Headers: `Accept: application/json`, `Idempotency-Key: <UUID>`.

| Field | Values |
|---|---|
| `fullName` | Trimmed legal name, 2–120 characters |
| `phone` | Phone including country code for international applicants |
| `email` | Email address |
| `residency` | `ghana` or `diaspora` |
| `country` | `Ghana` for Ghana residents, entered country otherwise |
| `model` | `two-bedroom`, `three-bedroom`, `four-bedroom` |
| `plotLocation` | Location/landmark, 5–500 characters |
| `plotStatus` | `land-title`, `registered-indenture`, `site-plan-only` |
| `moveIn` | `standard` or `accelerated` |
| `cohort` | `2027` |
| `consent` | `1` after review confirmation |
| `clientRequestId` | Same UUID as idempotency header |
| `landDocuments[]` | At least 1, maximum 5 PDF/JPG/PNG files |
| `fundsDocuments[]` | At least 1, maximum 5 PDF/JPG/PNG files |

Frontend limits: maximum 10 MiB per file and 30 MiB combined. These are proposed implementation limits, not figures from the programme brief. Empty files and incompatible extension/MIME combinations are rejected. Browser checks are convenience only; server checks are mandatory.

## Responses and retry behaviour

- Success: HTTP 200/201 with `{ "applicationReference": "<server-issued-reference>" }`. Only then does the form confirm receipt and clear private details/files. Do not generate a fake local reference.
- HTTP 422: validation rejection, no application accepted; form retains entries for correction. Future work may map backend field errors to individual controls.
- HTTP 413: request too large, no application accepted; user can return to change files.
- HTTP 429: rate limited before acceptance, user can wait before retrying.
- Timeout after 60 seconds, network failure, other status, or success without a reference: receipt is uncertain. Prevent repeated submission and show an enquiry ID for staff reconciliation. Do not automatically retry or instruct the applicant that it definitely failed.

The service must implement idempotency atomically and return the same accepted reference for identical retries; do not create duplicate applications. Track `clientRequestId` so staff can resolve uncertain outcomes. Corrected field/file selections produce a new ID; explicit rejected requests must never create accepted records. Success must mean application and attachments are durably received together; clean up orphan uploads on failure.

## Backend work still required

Validate all fields, consent and enumerations. Derive pricing from server-owned model data. Validate byte limits, file count, real content/signatures and allowed formats; scan uploads, prevent executable content and use generated storage keys. Store privately outside public web directories, restrict staff access, and use controlled download access. Define document retention and applicant privacy information before launch. Add abuse controls, request-size limits with multipart overhead, auditable review ownership and status, and appropriate notifications. Do not log document content or sensitive fields. Verify the real review workflow before claiming that applications are open.
