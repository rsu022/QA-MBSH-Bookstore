const { test, expect } = require('@playwright/test');
const testData = require('../../fixtures/loginFixture.json');
const { LoginPage } =require('../../pageObjects/login.po.js');

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 120000 });

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/MBSH Bookstore/);
    await login.userButton();
    await login.login(testData.validUser.email, testData.validUser.password);
    await login.loginButton();
  });

test.describe("Logout Functionality", () => {
    test("Logout", async ({ page }) => {
        const login = new LoginPage(page);
        await login.logout();
    })
})
