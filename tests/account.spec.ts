import { test, expect } from "@playwright/test";

test.describe("My Account", () => {
  test("Account Order", async ({ page }) => {
    await page.goto("/my-account");
    await page.locator(`li a[href*='orders']`).click();
    await expect(page).toHaveURL("/my-account/orders/");
  });
  //comment
  test("Account Downloads", async ({ page }) => {
    await page.goto("/my-account");
    await page.locator(`li a[href*='downloads']`).click();
    await expect(page).toHaveURL("/my-account/downloads/");
  });
});

test.describe("Account Page", () => {
  test.use({ storageState: "notLoggedInState.json" });
  test("Verify login and register is visible", async ({ page }) => {
    await page.goto("/my-account");
    await expect(page.locator('form[class*="login"]')).toBeVisible();
    await expect(page.locator('form[class*="register"]')).toBeVisible();
  });
});
