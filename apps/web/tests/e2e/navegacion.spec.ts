import { test, expect } from "@playwright/test";

test.describe("F7.3 Navegación, blog y sitemap", () => {
  for (const path of ["/", "/servicios", "/proyectos", "/blog", "/contacto", "/libro-de-reclamacion"]) {
    test(`carga ${path}`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("body")).not.toBeEmpty();
    });
  }

  test("blog lista y abre un artículo", async ({ page }) => {
    await page.goto("/blog");
    const link = page.locator('a[href^="/blog/"]').first();
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/blog\/.+/);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("sitemap.xml válido y sus URLs internas responden", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const xml = await res.text();
    expect(xml).toContain("<urlset");
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    expect(locs.length).toBeGreaterThan(5);
    for (const p of locs.slice(0, 25)) {
      const r = await request.get(p);
      expect(r.status(), p).toBe(200);
    }
  });

  test("robots.txt referencia el sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    expect(await res.text()).toMatch(/sitemap/i);
  });
});
