// Check the actual static output, including every published project and local link.
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = path.resolve("out");
const projectPages = fs.readdirSync(path.join(root, "work"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(root, "work", entry.name, "index.html"))).map((entry) => `work/${entry.name}/index.html`);
assert.equal(projectPages.length, 18, "All 18 project routes must remain published");
const pages = ["index.html", "work/index.html", "about/index.html", "approach/index.html", "contact/index.html", "privacy/index.html", "terms/index.html", "404.html", ...projectPages];
const decode = (s) => s.replaceAll("&amp;", "&");
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `${page}: one page title`);
  assert(!html.includes("picture--missing"), `${page}: missing media`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const link = decode(match[1]);
    if (/^(https?:|mailto:|data:|tel:)/.test(link)) continue;
    const [url, fragment] = link.split("#");
    const target = url ? path.resolve(root, url.startsWith("/") ? `.${url.split("?")[0]}` : path.join(path.dirname(page), url.split("?")[0])) : path.join(root, page);
    const resolved = target.endsWith(path.sep) || (fs.existsSync(target) && fs.statSync(target).isDirectory()) ? path.join(target, "index.html") : target;
    assert(fs.existsSync(resolved), `${page}: broken local link ${link}`);
    if (fragment && resolved.endsWith(".html")) assert(fs.readFileSync(resolved, "utf8").includes(`id="${fragment}"`), `${page}: missing anchor ${link}`);
  }
  if (projectPages.includes(page)) {
    const story = html.split('<nav class="editorial-next"')[0];
    const images = [...story.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(new Set(images).size, images.length, `${page}: repeated image`);
    assert(story.indexOf("project-hero__title") < story.indexOf("editorial-opening__media"), `${page}: title must precede hero`);
    assert(story.includes("Contribution and outcome"), `${page}: contribution missing`);
  }
}
const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert(projectPages.includes("work/metropolis/index.html"), "Metropolis case study must be published");
for (const page of ["index.html", "work/index.html"]) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  assert(html.includes('href="/work/metropolis/"'), `${page}: Metropolis must be featured`);
}
assert(home.includes('href="#selected-work"'), "Homepage cue must target selected work");
const tokyo = fs.readFileSync(path.join(root, "work/openai/index.html"), "utf8");
assert(tokyo.includes("Erick Lignel"), "Confirmed Tokyo photographer credit missing");
for (const [slug, related] of [["club-gemini", "napa-retreat"], ["napa-retreat", "club-gemini"]]) {
  const html = fs.readFileSync(path.join(root, `work/${slug}/index.html`), "utf8");
  assert(html.includes(`href="/work/${related}/"`), `${slug}: retreat relationship missing`);
}
// Metadata, image accessibility, privacy defaults and discovery files are release checks.
for (const page of pages.filter((p) => p !== "404.html")) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  assert(html.includes('rel="canonical"'), `${page}: canonical missing`);
  assert(html.includes('property="og:image"'), `${page}: social preview missing`);
  assert(html.includes('name="twitter:card" content="summary_large_image"'), `${page}: social card missing`);
  assert(!html.includes('src="https://www.googletagmanager.com'), `${page}: analytics must not load before consent`);
  assert(!html.includes('rel="preload" href="https://www.googletagmanager.com'), `${page}: analytics preload before consent`);
  for (const image of html.matchAll(/<img\b[^>]*>/g)) assert(/\balt="[^"]+"/.test(image[0]), `${page}: missing descriptive alt text`);
}
for (const file of ["robots.txt", "sitemap.xml", "favicon.svg", "favicon.ico", "favicon-32.png", "apple-touch-icon.png", "social-preview.png"]) assert(fs.existsSync(path.join(root, file)), `Missing ${file}`);
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
for (const page of pages.filter((p) => p !== "404.html")) {
  const pathname = `/${page.replace(/index\.html$/, "")}`;
  assert(sitemap.includes(`https://jamelwilliams.com${pathname}`), `Sitemap missing ${pathname}`);
}
assert(fs.readFileSync(path.join(root, "robots.txt"), "utf8").includes("https://jamelwilliams.com/sitemap.xml"), "Robots must reference sitemap");
console.log(`Verified ${pages.length} pages: local links, anchors, media, unique titles, project sequences and confirmed credits.`);
