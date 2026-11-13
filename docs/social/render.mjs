// Renders the social preview card and the home-screen icon with Playwright.
// Usage: node docs/social/render.mjs   (needs @playwright/test or playwright installed locally)
import { chromium } from "@playwright/test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync } from "node:fs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const out = join(root, "assets", "social");
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(pathToFileURL(join(root, "docs", "social", "card.html")).href);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(out, "jetstream89-og.jpg"), type: "jpeg", quality: 85 });

await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<body style="margin:0;background:#05070d;display:grid;place-items:center;width:180px;height:180px">
  <img src="${pathToFileURL(join(root, "assets", "logo.svg")).href}" style="width:150px;height:150px"></body>`);
await page.waitForLoadState("networkidle");
await page.screenshot({ path: join(out, "apple-touch-icon.png") });

await browser.close();
console.log("Rendered assets/social/jetstream89-og.jpg and assets/social/apple-touch-icon.png");
