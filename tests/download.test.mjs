import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import nextConfig from "../next.config.ts";

const html = readFileSync(new URL("../public/download/index.html", import.meta.url), "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const ios = "https://apps.apple.com/gh/app/pay-small-small-app/id6783919355";
const android = "https://play.google.com/store/apps/details?id=com.thesusuboxpeople.paysmallsmall";

for (const [device, userAgent, maxTouchPoints, expected] of [
  ["iPhone", "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)", 5, ios],
  ["iPad", "Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)", 5, ios],
  ["desktop-mode iPad", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)", 5, ios],
  ["Android", "Mozilla/5.0 (Linux; Android 15; Pixel 9)", 5, android],
  ["Mac desktop", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)", 0, null],
  ["Windows desktop", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", 0, null],
  ["unknown device", "", 0, null],
]) {
  test(`download destination for ${device}`, () => {
    let destination = null;
    runInNewContext(script, {
      navigator: { userAgent, maxTouchPoints },
      window: { location: { replace: (url) => { destination = url; } } },
    });
    assert.equal(destination, expected);
  });
}

test("both stores remain available without automatic redirection", () => {
  assert.ok(html.includes(`href="${ios}"`));
  assert.ok(html.includes(`href="${android}"`));
});

test("the shared download URL serves the download page", async () => {
  assert.deepEqual(await nextConfig.rewrites(), [
    { source: "/download", destination: "/download/index.html" },
  ]);
});
