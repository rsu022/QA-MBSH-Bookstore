const { test, expect } = require('@playwright/test');
const testData = require('../../fixtures/loginFixture.json');
import { LoginPage } from '../../pageObjects/login.po.js';

test.describe("Search Functionality", { timeout: 120000 }, () => {
  test("Valid search returns results", async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 120000 });
    await login.search(testData.search.searchTerm);
    const products = page.locator('ul.products li');
    await expect(products.first()).toBeVisible();
  });

  test("Invalid search shows no results", async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 120000 });
    await login.search(testData.search.randomSearch);
    const info = page.locator('p.woocommerce-info');
    await expect(info).toBeVisible();
    await expect(info).toContainText('No products were found');
  });
});