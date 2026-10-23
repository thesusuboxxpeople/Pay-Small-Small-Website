import test from "node:test";
import assert from "node:assert/strict";
import { publicEndpoint } from "../lib/site-config.ts";

test("unconfigured or blank uploads stay disabled; waitlist may use its explicit fallback", () => {
  assert.equal(publicEndpoint(undefined), undefined);
  assert.equal(publicEndpoint("  "), undefined);
  assert.equal(publicEndpoint(undefined, "https://api.example.com/waitlist"), "https://api.example.com/waitlist");
  assert.equal(publicEndpoint("", "https://api.example.com/waitlist"), undefined);
});
test("public URLs reject insecure protocols, credentials and confusing paths", () => {
  assert.equal(publicEndpoint("/api/applications"), "/api/applications");
  assert.equal(publicEndpoint(" https://api.example.com/applications "), "https://api.example.com/applications");
  for (const value of ["http://api.example.com", "javascript:alert(1)", "//other.example.com", "/\\other.example.com", "https://user:secret@example.com", "https://example.com/#fragment", "/api/path with spaces"]) assert.throws(() => publicEndpoint(value));
});
