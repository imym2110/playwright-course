import { test, expect } from "@playwright/test";
import HomePage from "../pages/home.page";
import { faker } from "@faker-js/faker";

test.describe("Home", () => {
  let homePage: HomePage;

  //BEFORE HOOK ----> Just to avoid duplication of code
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test("Open Home Page And Verify Title", async ({ page }) => {
    // open url
    await page.goto("https://sdetunicorns.com/");

    //verify title
    await expect(page).toHaveTitle(
      "Master Software Testing and Automation | SDET Unicorns"
    );
  });

  test("Open Community Page And Verify Title", async ({ page }) => {
    //open url
    await page.goto("https://sdetunicorns.com/community/");

    //verify title
    await expect(page).toHaveTitle("Community | SDET Unicorns");
  });

  test("Click Learn More Button Using CSS selector", async ({ page }) => {
    //open url
    await page.goto("https://dxc.com/us/en");

    // click the button
    // await page.locator("#cta-17ed3cfc4c").click();
    await homePage.learnMoreBtn.click();

    //verify url has #cta-17ed3cfc4c
    await expect(page).toHaveURL(
      "https://dxc.com/us/en/insights/perspectives/article/is-your-ai-and-ml-strategy-too-siloed"
    );
  });

  test.skip("Click Courses Button Using CSS selectors", async ({ page }) => {
    //open url
    await page.goto("https://automationbro.com/courses/");

    // click the button
    // await page.locator("#menu-item-1383").click();
    await homePage.coursesBtn.click();

    //verify url has #menu-item-1383
    await expect(page).toHaveURL("https://automationbro.com/blog/");
  });

  test("Verify heading text is visible using text selector", async ({
    page,
  }) => {
    //open url
    await page.goto("https://www.v2solutions.com/");

    // find the text locator
    // const headingText = page.locator("text=Build and Strengthen");
    const headingText = homePage.headingText;

    //verify that the heading text is visible
    await expect(headingText).toBeVisible();
  });

  test("Verify contact us link is enabled using text and css selector", async ({
    page,
  }) => {
    //open url
    await page.goto("https://dxc.com/us/en");

    // find the Contact Us text locator
    // const contactUsText = page.locator("#contact-us-link >> text=Contact Us");
    const contactUsText = homePage.contactUsText;

    //verify that the Contact Us text is visible
    await expect(contactUsText).toBeEnabled(); //It will check whether the link is enabled or not
  });

  test("Verify search icon is visible using Xpath selector", async ({
    page,
  }) => {
    //open url
    await page.goto("https://dxc.com/us/en");

    //find searchIcon
    // const searchIcon = page.locator(
    //   "//*[@id='mega-menu-wrapper']//*[@class='cmp-button']"
    // );
    const searchIcon = homePage.searchIcon;

    //verify that the Search icon is visible
    await expect(searchIcon).toBeDisabled();
  });

  test("Verify text for all nav links", async ({ page }) => {
    const expectedLinksText = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];
    //open url
    // await page.goto("https://practice.sdetunicorns.com/");

    //find the nav links
    // const navLinks = page.locator("#zak-primary-menu li[id*=menu]");
    // const navLinks = page.locator("#zak-primary-menu li[id*=menu]").nth(3);
    // const navLinks = homePage.navLinks;

    //print out all the links
    // for (const el of await navLinks.elementHandles()) {
    //   console.log(await el.textContent());
    // }

    //verify nav links text
    // expect(await navLinks.allTextContents()).toEqual(expectedLinksText);
    expect(await homePage.getNavLinksText()).toEqual(expectedLinksText);
    // expect(await navLinks.textContent()).toEqual(expectedLinksText[3]);
  });

  // Test some links Using Map
  test("Verify using test", async ({ page }) => {
    homePage = new HomePage(page);
    await page.goto("https://practice.sdetunicorns.com/");
    const expectedLinksText = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];

    let promises = expectedLinksText.slice(2, 4).map(async (el, index) => {
      const navLinks = page
        .locator("#zak-primary-menu li[id*=menu]")
        .nth(expectedLinksText.indexOf(el) * 1);
      expect(await navLinks.textContent()).toEqual(el);
    });

    await Promise.all(promises);
  });

  test("Verify input fields", async ({ page }) => {
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

  test("Verify blog length", async ({ page }) => {
    await page.goto("https://practice.sdetunicorns.com/blog");

    const recentPostList = homePage.recentPostList;

    for (const el of await recentPostList.elementHandles()) {
      expect((await el.textContent()).trim().length).toBeGreaterThan(10); //.trim() is used to remove whitespaces that were present
    }

    expect(await recentPostList.count()).toEqual(5);
  });
});
