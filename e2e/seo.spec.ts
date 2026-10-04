import { expect, test } from "@playwright/test";

test.describe("SEO: home", () => {
  test("has the required head tags and a single h1", async ({
    page,
    baseURL,
  }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    await expect(page.locator("html")).toHaveAttribute("lang", "it");
    await expect(page).toHaveTitle(/\S/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /\S/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`^${baseURL}/?$`),
    );
    await expect(
      page.locator('link[rel="alternate"][hreflang="it"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('link[rel="alternate"][hreflang="x-default"]'),
    ).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(
      page.locator('meta[name="robots"][content*="noindex"]'),
    ).toHaveCount(0);
  });

  test("redirects the default-locale prefix to the canonical URL", async ({
    page,
    baseURL,
  }) => {
    await page.goto("/it");
    expect(page.url()).toBe(`${baseURL}/`);
  });
});

test.describe("SEO: crawl files", () => {
  test("robots.txt blocks admin and points to the sitemap", async ({
    request,
    baseURL,
  }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBe(true);

    const body = await res.text();
    expect(body).toContain("Disallow: /admin");
    expect(body).toContain(`Sitemap: ${baseURL}/sitemap.xml`);
  });

  test("sitemap.xml lists the home page", async ({ request, baseURL }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBe(true);
    expect(await res.text()).toContain(`<loc>${baseURL}/</loc>`);
  });
});

test.describe("SEO: not found", () => {
  test("unknown URLs return 404 with noindex", async ({ page }) => {
    const response = await page.goto("/pagina-che-non-esiste");

    expect(response?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", "it");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    await expect(page.locator("h1")).toHaveCount(1);
  });
});
