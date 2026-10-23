import { test } from "node:test";
import assert from "node:assert/strict";
import { validateDetails, validateAttachment, validateDocuments, createApplicationPayload, MAX_FILE_BYTES } from "../lib/builders-application.ts";

const details = { fullName: "Example Applicant", phone: "+233241234567", email: "applicant@example.com", residency: "ghana", country: "", model: "two-bedroom", plotLocation: "Example plot, Accra", plotStatus: "land-title", moveIn: "standard" };
const land = { id: "land-1", group: "land", file: new File(["example"], "land.pdf", { type: "application/pdf" }) };
const funds = { id: "funds-1", group: "funds", file: new File(["example"], "funds.png", { type: "image/png" }) };

test("Ghana and diaspora applicants have different country requirements", () => {
  assert.deepEqual(validateDetails(details), {});
  assert.ok(validateDetails({ ...details, residency: "diaspora" }).country);
  assert.deepEqual(validateDetails({ ...details, residency: "diaspora", country: "Canada" }), {});
  assert.ok(validateDetails({ ...details, model: "unknown" }).model);
  assert.ok(validateDetails({ ...details, email: "invalid", phone: "letters only" }).phone);
});
test("file validation rejects empty, oversized, spoofed or unsupported selections", () => {
  assert.equal(validateAttachment(land.file), null);
  assert.equal(validateAttachment({ name: "scan.JPG", type: "", size: 10 }), null);
  assert.ok(validateAttachment({ name: "scan.pdf", type: "application/pdf", size: 0 }));
  assert.ok(validateAttachment({ name: "scan.pdf", type: "application/pdf", size: MAX_FILE_BYTES + 1 }));
  assert.ok(validateAttachment({ name: "scan.pdf", type: "image/png", size: 10 }));
  assert.ok(validateAttachment({ name: "scan.exe", type: "", size: 10 }));
});
test("both categories, count and combined size are enforced", () => {
  assert.ok(validateDocuments([]));
  assert.ok(validateDocuments([land]));
  assert.equal(validateDocuments([land, funds]), null);
  assert.ok(validateDocuments([...Array.from({ length: 6 }, (_, i) => ({ ...land, id: String(i) })), funds]));
  assert.ok(validateDocuments([land, funds, ...Array.from({ length: 4 }, (_, i) => ({ id: String(i), group: "land", file: { name: "large.pdf", type: "application/pdf", size: MAX_FILE_BYTES } }))]));
});
test("multipart request keeps categories, consent and idempotency reference intact", () => {
  const body = createApplicationPayload({ ...details, fullName: " Example Applicant " }, [land, funds], "example-request");
  assert.equal(body.get("fullName"), "Example Applicant");
  assert.equal(body.get("country"), "Ghana");
  assert.equal(body.get("cohort"), "2027");
  assert.equal(body.get("consent"), "1");
  assert.equal(body.get("clientRequestId"), "example-request");
  assert.equal(body.getAll("landDocuments[]").length, 1);
  assert.equal(body.getAll("fundsDocuments[]").length, 1);
  assert.equal(body.get("landDocuments[]").name, "land.pdf");
});
