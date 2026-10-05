import { expect, test } from "@playwright/test";
import { staticPathnames } from "../src/i18n/routing";

const mainNav = [
  { name: "Chi siamo", path: "/chi-siamo" },
  { name: "Escursioni", path: "/escursioni" },
  { name: "Viaggi", path: "/viaggi" },
  { name: "Contatti", path: "/contatti" },
];

test.describe("Header navigation", () => {
  for (const path of staticPathnames) {
    test(`${path} renders one header with the main navigation`, async ({
      page,
    }) => {
      await page.goto(path);

      await expect(page.locator("header")).toHaveCount(1);
      const nav = page.getByRole("navigation", {
        name: "Navigazione principale",
      });
      await expect(nav).toHaveCount(1);
      await expect(nav.getByRole("link")).toHaveText(
        mainNav.map((l) => l.name),
      );
    });
  }

  test("brand link goes to home", async ({ page, baseURL }) => {
    await page.goto("/contatti");
    await page
      .locator("header")
      .getByRole("link", { name: "Tramonti" })
      .click();
    await expect(page).toHaveURL(`${baseURL}/`);
  });

  for (const { name, path } of mainNav) {
    test(`"${name}" navigates to ${path} and is marked current`, async ({
      page,
      baseURL,
    }) => {
      await page.goto("/");
      const nav = page.getByRole("navigation", {
        name: "Navigazione principale",
      });
      await nav.getByRole("link", { name }).click();

      await expect(page).toHaveURL(`${baseURL}${path}`);
      await expect(nav.getByRole("link", { name })).toHaveAttribute(
        "aria-current",
        "page",
      );
      await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
    });
  }

  test("section stays current on detail pages", async ({ page }) => {
    await page.goto("/escursioni/sentiero-degli-dei");
    const nav = page.getByRole("navigation", {
      name: "Navigazione principale",
    });

    await expect(nav.getByRole("link", { name: "Escursioni" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
