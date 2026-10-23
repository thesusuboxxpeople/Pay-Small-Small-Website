import test from "node:test";
import assert from "node:assert/strict";
import { unformatGhanaPhone, handleGhanaPhoneChange } from "../lib/phone.ts";

test("Ghana numbers normalise local and international forms without dropping extra digits", () => {
  for (const input of ["0241234567", "233241234567", "+233 (241) 234-567", "241234567"]) assert.equal(unformatGhanaPhone(input), "233241234567");
  assert.equal(unformatGhanaPhone("2332412345678"), "");
  assert.notEqual(unformatGhanaPhone("024123"), "233241234567");
  assert.equal(unformatGhanaPhone(""), "");
});
test("mask punctuation does not trap backspace", () => {
  const previous = "+233 (241)";
  assert.notEqual(handleGhanaPhoneChange(previous, "+233 (241"), previous);
});
