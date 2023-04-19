import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();
// define variable from env file
const password = process.env.MY_PASSWORD;
const wrongpassword = process.env.MY_WRONGPASSWORD;
const username = process.env.MY_USERNAME;
const myfirstname = process.env.MY_FIRSTNAME;
const mylastname = process.env.MY_LASTNAME;
const timestamp: number = Date.now();
const filePath = 'register_user_log.txt';

test.describe('register tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });


  test('has title of Buggy Cars Rating', async ({ page }) => {
    // Expect register page url "to contain" register.
    await expect(page).toHaveURL(/register/);
  });

  test('register with user info with timestamp suffix', async ({ page }) => {
    // fill in everything corrently.

    await page.locator('input[id="username"]').fill(username+'_'+timestamp||''); 
    await page.locator('input[id="firstName"]').fill(myfirstname||'');
    await page.locator('input[id="lastName"]').fill(mylastname||'');
    await page.locator('input[id="password"]').fill(password||'');
    await page.locator('input[id="confirmPassword"]').fill(password||'');
    await page.getByRole('button', { name: 'Register' }).click()


    // Assert register sucessful
    await expect(page.getByText(/Registration is successful/)).toBeVisible();

    const usernameWithTimestamp = `${username}_${timestamp}`;
    // Append username and timestamp to txt file
    console.log("(number 1) register user test with 5 different browsers");
    fs.appendFileSync(filePath, usernameWithTimestamp + '\n');
    
    // Read txt file to confirm the content has been added to the file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain(usernameWithTimestamp);
  });

  test('register with different password', async ({ page }) => {
    // fill in 2 different password at password and confirm password input field.
    await page.locator('input[id="username"]').fill(username+'_'+timestamp||''); 
    await page.locator('input[id="firstName"]').fill(myfirstname||'');
    await page.locator('input[id="lastName"]').fill(mylastname||'');
    await page.locator('input[id="password"]').fill(password||'');
    await page.locator('input[id="confirmPassword"]').fill(wrongpassword||'');
    
    // assert confirm password does not match the first input as this appears immediately so did not involve click event
    await expect(page.getByText(/Passwords do not match/)).toBeVisible();

  });

  test('register the same username again', async ({ page }) => {
    // fill in the useranme which had been registered successfully before.
    await page.locator('input[id="username"]').fill(username||''); 
    await page.locator('input[id="firstName"]').fill(myfirstname||'');
    await page.locator('input[id="lastName"]').fill(mylastname||'');
    await page.locator('input[id="password"]').fill(password||'');
    await page.locator('input[id="confirmPassword"]').fill(password||'');
    await page.getByRole('button', { name: 'Register' }).click()
    // assert the user aleady exists
    await expect(page.getByText(/User already exists/)).toBeVisible();

  });

  
})