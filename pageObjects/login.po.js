const { expect } = require('@playwright/test');
const testData = require("../fixtures/loginFixture.json");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('//*[@id="username"]');
    this.passwordInput = page.locator('//*[@id="password"]');
    this.userLogin = page.locator('#menu-extra-login');
    this.loginBtn = page.locator('//*[@id="post-11"]/div/div/div[2]/div/div[1]/div/div/div[1]/form/p[3]/button'); // Corrected selector
    
    this.searchInput = page.locator('//*[@id="dgwt-wcas-search-input-1"]'); // Locator for the search input field
    this.searchButton = page.locator('//*[@id="dgwt-wcas-search-input-1"]'); // Locator for the search button (if applicable)
    
    this.addToCart = page.locator('button:has-text("Add to cart")');
    this.headerCartIcon = page.locator('//*[@id="site-header"]/div[1]/div/div/div/div[2]/ul/li[2]');
    this.cartQtyLocator = page.locator('//*[@id="post-9"]/div/div/form/table/tbody/tr[1]/td[4]/div[1]/div/span[2]');
    
    this.town = testData.checkout.Town;
    this.postcode = testData.checkout.Postcode;
    this.updateBtn = page.locator('//*[@id="post-9"]/div/div/div[2]/div/div[2]/form/section/p[5]/button');
    this.checkoutBtn = page.locator('//*[@id="post-9"]/div/div/div[2]/div/div[3]/div/div/a');

    //ADD TO CART FROM CATEGORY
    this.bestseller = page.locator('//*[@id="menu-new-menu"]/li[3]/a');
    this.bookPoster = page.locator('//*[@id="mf-shop-content"]/ul/li[6]/div/div[1]/a/img');
    this.categoryAddToCart = page.locator('//*[@id="product-12103"]/div[1]/div[2]/form/button');
    this.cartContentsIcon = page.locator('//*[@id="icon-cart-contents"]');
    
    // CHECKOUT PAGE
    this.city = testData.billing.City;
    this.phone = testData.billing.Phone;
    this.street = testData.billing.Street;
    this.fname = testData.billing.Firstname;
    this.lname = testData.billing.Lastname;
    this.houseno = testData.billing.HouseNo;

    //LOGOUT
    this.logoutPage = page.locator('//*[@id="site-header"]/div[1]/div/div/div/div[2]/ul/li[3]/a');
    this.logoutBtn = page.locator('//*[@id="post-11"]/div/div/nav/ul/li[6]/a');
  }
  
  async userButton() {
    await this.userLogin.click();
  }


  async loginButton(){
    await this.loginBtn.click();
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    //  await this.loginBtn.click();
  }
  // async selectPoster() {
  //   await this.posterImage.click();
  //   //await this.page.waitForLoadState("domcontentloaded"); // Wait for the page to load
  // }
  async search(term) {
    // Navigate to homepage and perform search via input
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
    // Wait for search results or no-results
    await this.page.waitForSelector('ul.products li, p.woocommerce-info', { timeout: 60000 });
  }
  async addCart() {
    // wait for the first "Add to cart" button and click it
    await this.page.waitForSelector('button:has-text("Add to cart")', { timeout: 60000 });
    await this.addToCart.first().click();
    await this.page.waitForTimeout(2000);
  }
  async cartPage() {

    await this.headerCartIcon.click();
    await this.page.waitForTimeout(2000);
    
  }
  async cartQty(){
    await this.cartQtyLocator.click();
    await this.page.waitForTimeout(1000);
  }

  async checkoutFill(){
    await this.page.locator('//*[@id="calc_shipping_city"]').fill(this.town);
    await this.page.locator('//*[@id="calc_shipping_postcode"]').fill(this.postcode);

  }
  async updateButton() {
    await this.updateBtn.click();
  }
  async checkoutButton() {
    await this.checkoutBtn.click();
  }

  async billingDetails() {
    await this.page.locator('//*[@id="billing_address_1"]').fill(this.street);
    await this.page.locator('//*[@id="billing_city"]').fill(this.city);
    await this.page.locator('//*[@id="billing_phone"]').fill(this.phone);
    await this.page.locator('//*[@id="shipping_first_name"]').fill(this.fname);
    await this.page.locator('//*[@id="shipping_last_name"]').fill(this.lname);
    await this.page.locator('//*[@id="shipping_address_1"]').fill(this.houseno);

  }

  async addCartFromCategory() {
    await this.bestseller.click();
    await this.bookPoster.click();
    await this.categoryAddToCart.click();
    await this.cartContentsIcon.click();
   
  }

  async logout(){
    await this.logoutPage.click();
    await this.logoutBtn.click();

  }
};