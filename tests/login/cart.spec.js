const { test, expect } = require('@playwright/test');
const testData = require('../../fixtures/loginFixture.json');
const { LoginPage } =require('../../pageObjects/login.po.js');

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/MBSH Bookstore/);
    await login.userButton();
    await login.login(testData.validUser.email, testData.validUser.password);
    await login.loginButton();
  });

test.describe("Search and Cart", () => {
    test("Add to cart from category", async ({ page }) => {
        const login = new LoginPage(page);
        await login.addCartFromCategory();
    });
    test("Add item to cart after search", async ({ page }) => {
        //page.setDefaultTimeout(60000);
        // this.timeout(60000);
        const login = new LoginPage(page);
        await login.search(testData.search.searchTerm); // Use the search term from loginFixture.json
        await login.addCart();
        await login.cartPage();
        await login.cartQty();
        await login.checkoutFill();
        await login.updateButton();
        await login.checkoutButton();
        await login.billingDetails();
        
        await page.goto('https://mbshbookstore.com/');
       // await page.pause();
      },
      
        {
          timeout: 60000
        }
      );
});