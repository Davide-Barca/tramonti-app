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

const footerExplore = [
  "Chi siamo",
  "Escursioni",
  "Escursioni su misura",
  "Viaggi",
  "Apprendimento",
  "Contatti",
  "Lavora con noi",
];
const footerLegal = ["Privacy policy", "Cookie policy", "Termini e condizioni"];

test.describe("Footer", () => {
  for (const path of staticPathnames) {
    test(`${path} renders one footer with page and legal links`, async ({
      page,
    }) => {
      await page.goto(path);

      const footer = page.getByRole("contentinfo");
      await expect(footer).toHaveCount(1);
      await expect(
        footer.getByRole("navigation", { name: "Esplora" }).getByRole("link"),
      ).toHaveText(footerExplore);
      await expect(
        footer
          .getByRole("navigation", { name: "Informazioni legali" })
          .getByRole("link"),
      ).toHaveText(footerLegal);
      await expect(footer.getByText(/P\.IVA \d{11}/)).toBeVisible();
    });
  }

  test("legal links reach their pages", async ({ page, baseURL }) => {
    await page.goto("/");
    await page
      .getByRole("contentinfo")
      .getByRole("link", { name: "Privacy policy" })
      .click();
    await expect(page).toHaveURL(`${baseURL}/privacy-policy`);
  });

  test("social links open in a new tab safely", async ({ page }) => {
    await page.goto("/");
    for (const name of ["Instagram", "Facebook"]) {
      const link = page.getByRole("contentinfo").getByRole("link", { name });
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });
});
