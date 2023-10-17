import { test, expect, APIRequestContext, APIResponse } from "@playwright/test";
import HomePage from "../pages/home.page";
const { faker } = require("@faker-js/faker");

test.describe("Contact", () => {
  let homePage: HomePage;
  let fakerApi: APIRequestContext;
  let randomPerson: APIResponse;

  test.beforeAll(async ({ playwright }) => {
    fakerApi = await playwright.request.newContext({
      baseURL: "https://jsonplaceholder.typicode.com/",
    });

    const response = await fakerApi.get("users");
    const responseBody = await response.json();
    randomPerson = responseBody[0];

    const postResponse = await fakerApi.post("/users/1/todos", {
      data: {
        title: "Learn playwright",
        completed: "false",
      },
    });

    const postResponseBody = await postResponse.json();
    console.log(postResponseBody);
  });

  test("Verify contact form fields", async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
    // await page.pause();
    await page.goto("https://practice.sdetunicorns.com/contact/");
    // await page.locator("#evf-277-field_ys0GeZISRs-1").fill("yash");
    await homePage.fillName.fill(randomPerson["name"]);
    // await page.locator("#evf-277-field_LbH5NxasXM-2").fill("gg@gmail.com");
    await homePage.fillEmail.fill(randomPerson["email"]);
    // await page.locator("#evf-277-field_66FR384cge-3").fill("9876543210");
    await homePage.fillPhone.fill(randomPerson["phone"]);
    // await page.locator("#evf-277-field_yhGx3FOwr2-4").fill("hello");
    await homePage.fillTextMsg.fill(randomPerson["website"]);
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
