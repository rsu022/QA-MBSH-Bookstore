const { test, expect } = require('@playwright/test');
const testData = require('../../fixtures/loginFixture.json');
import { LoginPage } from '../../pageObjects/login.po.js';
//import { ContactPage } from "../pageObjects/contactFill.po.js";

test.describe("Go to Page and Login", { timeout: 120000 }, () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    console.log('Navigating to the homepage...');
    
    await page.goto("https://mbshbookstore.com/", { waitUntil: 'domcontentloaded', timeout: 120000 });
    console.log('Page loaded successfully');
  
    // Wait for a specific element to ensure the page is ready for interaction
    await page.waitForSelector('#menu-extra-login'); // Wait for login menu button
    
    await login.userButton();
  });

  test("Login using all valid credentials", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.validUser.email, testData.validUser.password);
    await login.loginButton();
  });

  test("Login using invalid email and invalid password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.invalidUser.invalidEmail, testData.invalidUser.invalidPassword);
    await login.loginButton();
  });

  test("Login using valid email and invalid password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.invalidUser.email, testData.invalidUser.invalidPassword);
    await login.loginButton();
  });

  test("Login using invalid email and valid password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.invalidUser.invalidEmail, testData.invalidUser.password);
    await login.loginButton();
  });

  test("Login using empty email and empty password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.invalidUser.emptyEmail, testData.invalidUser.emptyPassword);
    await login.loginButton();
  });

  test("Login using valid email and empty password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.invalidUser.email, testData.invalidUser.emptyPassword);
    await login.loginButton();
  });
});