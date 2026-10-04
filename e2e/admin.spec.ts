import { expect, test } from "@playwright/test";

test.describe("Admin", () => {
  test("redirects to login when not authenticated", async ({ page }) => {
    await page.goto("/admin");

    const url = new URL(page.url());
    expect(url.pathname).toBe("/admin/login");
    expect(url.searchParams.get("from")).toBe("/admin");
  });

  test("is never indexable", async ({ page }) => {
    const response = await page.goto("/admin/login");

    expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
  });
});
