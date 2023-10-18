import { Page, Locator } from "@playwright/test";

class HomePage {
  page: Page;
  learnMoreBtn: Locator;
  coursesBtn: Locator;
  headingText: Locator;
  contactUsText: Locator;
  searchIcon: Locator;
  navLinks: Locator;
  fillName: Locator;
  fillEmail: Locator;
  fillPhone: Locator;
  fillTextMsg: Locator;
  greenLine: Locator;
  recentPostList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.learnMoreBtn = page.locator("#cta-17ed3cfc4c");
    this.coursesBtn = page.locator("#menu-item-1383");
    this.headingText = page.locator("text=Build and Strengthenn"); //Errorified
    this.contactUsText = page.locator(
      "#contact-us-link:has-text('Contact Us')"
    );
    this.searchIcon = page.locator(
      "//*[@id='mega-menu-wrapper']//*[@class='cmp-button']"
    );
    this.navLinks = page.locator("#zak-primary-menu li[id*=menu]");
    this.fillName = page.locator("#evf-277-field_ys0GeZISRs-1");
    this.fillEmail = page.locator("#evf-277-field_LbH5NxasXM-2");
    this.fillPhone = page.locator("#evf-277-field_66FR384cge-3");
    this.fillTextMsg = page.locator("#evf-277-field_yhGx3FOwr2-4");
    this.greenLine = page.locator(
      '//*[@class="everest-forms-notice everest-forms-notice--success everest-forms-submission-scroll"]'
    );
    this.recentPostList = page.locator("#recent-posts-3 ul li");
  }

  async navigate() {
    await this.page.goto("/");
  }

  getNavLinksText() {
    return this.navLinks.allTextContents();
  }
}

export default HomePage;
