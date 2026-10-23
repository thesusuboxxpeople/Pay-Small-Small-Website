import assert from "node:assert/strict";

const origin = new URL(process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000");
const routes = ["/", "/founders-club", "/builders-club"];
const pages = new Map();
const checkHeader = (response, name, expected, route) => {
  const values = response.headers.get(name)?.split(",").map(value => value.trim().toLowerCase());
  assert.ok(values?.length, `${route}: missing ${name}`);
  assert.ok(values.every(value => value === expected.toLowerCase()), `${route}: conflicting or unexpected ${name}: ${values.join(", ")}`);
};
const get = async path => {
  const url = new URL(path, origin);
  assert.equal(url.origin, origin.origin, "Smoke tests must not fetch external links");
  return fetch(url, { signal: AbortSignal.timeout(30000) });
};
for (const route of routes) {
  const response = await get(route);
  assert.equal(response.status, 200, route);
  checkHeader(response, "x-content-type-options", "nosniff", route);
  checkHeader(response, "x-frame-options", "SAMEORIGIN", route);
  assert.equal(response.headers.get("x-powered-by"), null, route);
  const html = await response.text();
  assert.match(html, /Skip to content/);
  assert.match(html, /<h1\b/);
  assert.match(html, /href="\/builders-club"/);
  assert.match(html, /href="\/founders-club"/);
  assert.doesNotMatch(html, /10k\+|4\.9\/5|2,000\+|98%|500\+/);
  pages.set(route, { html, ids: new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])) });
}
const checkedAssets = new Set();
for (const [route, { html }] of pages) {
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll("&amp;", "&"), new URL(route, origin));
    if (url.origin !== origin.origin) continue;
    const target = pages.get(url.pathname.replace(/\/$/, "") || "/");
    assert.ok(target, `Unexpected internal link: ${route} → ${url.pathname}`);
    if (url.hash) assert.ok(target.ids.has(decodeURIComponent(url.hash.slice(1))), `Missing anchor: ${route} → ${url.pathname}${url.hash}`);
  }
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
    const src = match[1].replaceAll("&amp;", "&");
    if (!src.startsWith("/") || checkedAssets.has(src)) continue;
    assert.equal((await get(src)).status, 200, `Image: ${src}`);
    checkedAssets.add(src);
  }
  console.log(`PASS ${route}: headers, navigation, anchors and rendered images`);
}
const health = await get("/api/health");
assert.equal(health.status, 200);
assert.equal(health.headers.get("cache-control"), "no-store");
assert.deepEqual(await health.json(), { status: "ok", service: "paysmallsmall-web" });
const sitemap = await get("/sitemap.xml");
assert.equal(sitemap.status, 200);
const xml = await sitemap.text();
for (const route of routes) assert.ok(xml.includes(`https://paysmallsmall.app${route}`));
const robots = await get("/robots.txt");
assert.equal(robots.status, 200);
assert.match(await robots.text(), /Sitemap: https:\/\/paysmallsmall.app\/sitemap.xml/);
assert.equal((await get("/this-page-does-not-exist")).status, 404);
const builders = pages.get("/builders-club").html;
assert.match(builders, /Builders Club application/);
if (process.env.EXPECT_BUILDERS_CLOSED === "1") assert.match(builders, /Applications are not open for online submission yet/);
console.log(`PASS health, sitemap, robots, 404 and application presence. ${checkedAssets.size} image URLs checked. No external requests or form submissions made.`);
