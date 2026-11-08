import { test, expect } from "@playwright/test";

test.describe("Site Smoke Tests", () => {
  test("homepage loads successfully and displays title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/CODEBOOK/i);
  });

  test("projects page loads and showcases cards", async ({ page }) => {
    await page.goto("/products");
    const header = page.locator(".projects-header__title");
    await expect(header).toBeVisible();
    await expect(header).toHaveText(/PROJECTS/i);
  });
});

