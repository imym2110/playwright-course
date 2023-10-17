import { test, expect } from "@playwright/test";
import HomePage from "../pages/home.page";
const { faker } = require("@faker-js/faker");

test.describe("Contact", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test("Verify contact form fields", async ({ page }) => {
    // await page.pause();
    await page.goto("https://practice.sdetunicorns.com/contact/");
    // await page.locator("#evf-277-field_ys0GeZISRs-1").fill("yash");
    await homePage.fillName.fill(faker.person.fullName());
    // await page.locator("#evf-277-field_LbH5NxasXM-2").fill("gg@gmail.com");
    await homePage.fillEmail.fill(faker.internet.email());
    // await page.locator("#evf-277-field_66FR384cge-3").fill("9876543210");
    await homePage.fillPhone.fill(faker.phone.number());
    // await page.locator("#evf-277-field_yhGx3FOwr2-4").fill("hello");
    await homePage.fillTextMsg.fill(faker.lorem.sentence());
    page.locator("#evf-submit-277").click();

    // const greenLine = page.locator(
    //   '//*[@class="everest-forms-notice everest-forms-notice--success everest-forms-submission-scroll"]'
    // );
    const greenLine = homePage.greenLine;

    await expect(greenLine).toContainText(
      "Thanks for contacting us! We will be in touch with you shortly"
    );
  });
});
