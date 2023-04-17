import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const password = process.env.MY_PASSWORD;
const wrongpassword = process.env.MY_WRONGPASSWORD;
const username = process.env.MY_USERNAME;

test.describe('login tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });


  test('has title of Buggy Cars Rating', async ({ page }) => {
    // Expect title "to contain"  Buggy Cars Rating.
    await expect(page).toHaveTitle(/Buggy Cars Rating/);
  });

  test('login with correct credential', async ({ page }) => {
    // fill in correct username and password.
    await page.getByPlaceholder("Login").fill(username||'');
    await page.locator('input[name="password"]').fill(password||'');
    await page.getByRole('button', { name: 'Login' }).click()
    // Expects the page to contain Profile.
    await expect(page.locator('a[href="/profile"]')).toContainText("Profile")
    console.log("(number 2) login user test with 5 different browsers");
  });

  test('login with wrong credential', async ({ page }) => {
    // fill in correct username and password.
    await page.getByPlaceholder("Login").fill(username||'');
    await page.locator('input[name="password"]').fill(wrongpassword||'');
    await page.getByRole('button', { name: 'Login' }).click()
    // Expects the page to contain Invalid username/password.
    await expect(page.getByText('Invalid username/password')).toBeVisible();
  });
})