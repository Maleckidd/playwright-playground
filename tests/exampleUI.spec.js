// @ts-check
const { test, expect } = require('@playwright/test');

const DownloadFormElements = class DownloadFormElements {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('#MainContent_firstname');
    this.lastNameInput = page.locator('#MainContent_lastname');
    this.workEmailInput = page.locator('#MainContent_email');
    this.countryDropDown = page.locator('#MainContent_country');
    this.companyInput = page.locator('#MainContent_company');
    this.phoneInput = page.locator('#MainContent_phonenumber');
    this.submitButton = page.locator('#MainContent_submit');
  }

  async goto() {
    await this.page.goto('https://test.x.com/form/');
  }

  async fillFirstNameInput(firstName = 'exampleFirstName') {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastNameInput(lastName = 'exampleLastName') {
    await this.lastNameInput.fill(lastName);
  }

  async fillWorkEmailInput(workEmail = 'exampleWorkEmail@example.com') {
    await this.workEmailInput.fill(workEmail);
  }

  async selectOptionCountry(country = 'Other') {
    await this.countryDropDown.selectOption(country);
  }

  async fillCompanyInput(phone = 'exampleCompany') {
    await this.companyInput.fill(phone);
  }

  async fillPhoneInput(phone = '0000000000') {
    await this.phoneInput.fill(phone);
  }

  async clickSubmitButton(phone = '0000000000') {
    await this.submitButton.click();
  }

  async checkIsFileDownloaded() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.submitButton.click(),
    ]);
    const path = await download.path().l;
  }

  async checkDownloadRequestCodeIs200() {
    await Promise.all([
      this.page.waitForResponse(resp => resp.url().includes('/form/?key=') && resp.status() === 200),
      this.submitButton.click(),
    ]);
  }
}

test.describe('`Check downloading', () => {
  test('should allow me to start file downloading', async ({ page }) => {
    const downloadFormElements = new DownloadFormElements(page);
    await downloadFormElements.goto();
    await downloadFormElements.fillFirstNameInput();
    await downloadFormElements.fillLastNameInput();
    await downloadFormElements.fillWorkEmailInput();
    await downloadFormElements.selectOptionCountry();
    await downloadFormElements.fillCompanyInput();
    await downloadFormElements.fillPhoneInput();
    await downloadFormElements.checkDownloadRequestCodeIs200();
  });
});

