import { expect, test, type Page } from "@playwright/test";
import { staticPathnames } from "../src/i18n/routing";

// Slugs from the temporary fixtures in src/features/*/fixtures.ts.
const detailPages = ["/escursioni/sentiero-degli-dei", "/viaggi/cilento"];

async function expectIndexablePage(page: Page, path: string, baseURL: string) {
  const response = await page.goto(path);
  expect(response?.status()).toBe(200);

  await expect(page.locator("html")).toHaveAttribute("lang", "it");
  await expect(page).toHaveTitle(/\S/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /\S/,
  );
  const canonical = path === "/" ? `${baseURL}/?` : `${baseURL}${path}`;
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    new RegExp(`^${canonical}$`),
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
}

test.describe("SEO: public pages", () => {
  for (const path of [...staticPathnames, ...detailPages]) {
    test(`${path} has the required head tags and a single h1`, async ({
      page,
      baseURL,
    }) => {
      await expectIndexablePage(page, path, baseURL!);
    });
  }

  for (const path of detailPages) {
    test(`${path} has valid TouristTrip and BreadcrumbList JSON-LD`, async ({
      page,
    }) => {
      await page.goto(path);
      const types = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((nodes) =>
          nodes.map((n) => JSON.parse(n.textContent ?? "")["@type"]),
        );
      expect(types).toEqual(
        expect.arrayContaining(["TouristTrip", "BreadcrumbList"]),
      );
    });
  }

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

  test("sitemap.xml lists static and detail pages", async ({
    request,
    baseURL,
  }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBe(true);

    const body = await res.text();
    for (const path of [...staticPathnames, ...detailPages]) {
      const url = path === "/" ? `${baseURL}/` : `${baseURL}${path}`;
      expect(body).toContain(`<loc>${url}</loc>`);
    }
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

  for (const path of ["/escursioni/non-esiste", "/viaggi/non-esiste"]) {
    test(`unknown slug ${path} returns 404 with noindex`, async ({ page }) => {
      const response = await page.goto(path);

      expect(response?.status()).toBe(404);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
      await expect(page.locator("h1")).toHaveCount(1);
    });
  }
});
