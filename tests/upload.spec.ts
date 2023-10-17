import { test, expect } from "@playwright/test";
import CartPage from "../pages/cart.page";

const path = require("path");

test.describe("Upload File", () => {
  let cartPage: CartPage;

  const fileName = ["thk.png", "6mb-file.jpg"];
  for (const name of fileName) {
    test(`Should upload a ${name} file`, async ({ page }) => {
      cartPage = new CartPage(page);
      //open url
      // await page.goto("https://practice.sdetunicorns.com/cart/");
      await cartPage.uploadComponent().navigate();

      //provide test file path
      const filePath = path.join(__dirname, `../data/${name}`);

      //upload test file
      // await page.setInputFiles("input#upfile_1", filePath);
      //click submit button
      // await page.locator("#upload_1").click();
      cartPage.uploadComponent().uploadFile(filePath);

      //assertion
      await expect(cartPage.uploadComponent().successTxt).toContainText(
        "uploaded successfully",
        { timeout: 40000 }
      );
    });
  }
  test.skip("Should upload a test file", async ({ page }) => {
    cartPage = new CartPage(page);
    //open url
    // await page.goto("https://practice.sdetunicorns.com/cart/");
    await cartPage.uploadComponent().navigate();

    //provide test file path
    const filePath = path.join(__dirname, "../data/chess.jpg");

    //upload test file
    // await page.setInputFiles("input#upfile_1", filePath);
    //click submit button
    // await page.locator("#upload_1").click();
    cartPage.uploadComponent().uploadFile(filePath);

    //assertion
    await expect(cartPage.uploadComponent().successTxt).toContainText(
      "uploaded successfully"
    );
  });

  test.skip("Should upload a test file on hidden input", async ({ page }) => {
    cartPage = new CartPage(page);
    //open url
    await cartPage.uploadComponent().navigate();

    //provide test file path
    const filePath = path.join(__dirname, "../data/chess.jpg");

    //DOM manipulation
    await page.evaluate(() => {
      // const selector = document.querySelector('input#upfile_1')  // Method--1
      const selector = document.getElementById("upfile_1"); // Method--2
      if (selector) {
        selector.className = "";
      }
    });

    //upload test file
    await page.setInputFiles("input#upfile_1", filePath);

    //click submit button
    await page.locator("#upload_1").click();

    //assertion
    await expect(
      page.locator("#wfu_messageblock_header_1_label_1")
    ).toContainText("uploaded successfully");
  });

  // WAIT for Timeout
  test.skip("Should upload a test file while waiting for timeout -- Hardcoded", async ({
    page,
  }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com/cart/");

    //provide test file path
    const filePath = path.join(__dirname, "../data/6mb-file.jpg");

    //upload test file
    await page.setInputFiles("input#upfile_1", filePath);

    //click submit button
    await page.locator("#upload_1").click();

    //hardcoded sleep --- WRONG WAY
    await page.waitForTimeout(5000);

    //assertion
    await expect(
      page.locator("#wfu_messageblock_header_1_label_1")
    ).toContainText("uploaded successfully");
  });

  // CONDITIONAL wait for Timeout
  test.skip("Should upload a test file while wating conditionally for timeout", async ({
    page,
  }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com/cart/");

    //provide test file path
    const filePath = path.join(__dirname, "../data/6mb-file.jpg");

    //upload test file
    await page.setInputFiles("input#upfile_1", filePath);

    //click submit button
    await page.locator("#upload_1").click();

    //Wait for condition
    await page
      .locator("#wfu_messageblock_header_1_label_1")
      .waitFor({ state: "visible", timeout: 10000 });

    //assertion
    await expect(
      page.locator("#wfu_messageblock_header_1_label_1")
    ).toContainText("uploaded successfully");
  });

  //ASSERTION wait for timeout
  test.skip("Should upload a test file using assertion wait for timeout", async ({
    page,
  }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com/cart/");

    //provide test file path
    const filePath = path.join(__dirname, "../data/6mb-file.jpg");

    //upload test file
    await page.setInputFiles("input#upfile_1", filePath);

    //click submit button
    await page.locator("#upload_1").click();

    //assertion
    await expect(
      page.locator("#wfu_messageblock_header_1_label_1")
    ).toContainText("uploaded successfully", { timeout: 10000 });
  });
});
