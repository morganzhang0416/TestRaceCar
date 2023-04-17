import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const password = process.env.MY_PASSWORD;
const wrongpassword = process.env.MY_WRONGPASSWORD;
const username = process.env.MY_USERNAME;

test.describe('visit  by 5 different browsers', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('popular make testing', async ({ page }) => {
    await page.locator('my-home').getByRole('link').nth(0).click();
    await expect(page).toHaveURL(/make/) ;
    await page.locator('h3.card-header').isVisible();
    console.log("(number 4) visit car make page")
  });

  
})

test.describe('visit  by 5 different browsers', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  

  test('popular model testing', async ({ browserName,page }) => {
    test.skip(browserName.toLowerCase() == 'firefox'||browserName.toLowerCase() == 'webkit', 
    `Test only for chromium and Mobile Chrome!`);
    await page.locator('my-home').getByRole('link').nth(1).click();
    await expect(page).toHaveURL(/model/);
    await page.waitForSelector('img[class="img-fluid center-block"]', { timeout: 5000 });
    console.log("(number 4) visit car model page")
   });

})

test.describe('visit  by 5 different browsers', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

   test('overall rating testing', async ({ page }) => {
    await page.locator('my-home').getByRole('link').nth(2).click();
    await expect(page).toHaveURL(/overall/);
    await expect(page.getByText('Engine')).toBeVisible();
   });
   console.log("(number 4) visit overall page")
})

