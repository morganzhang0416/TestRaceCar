import { login } from '../utils/f_login';
import { test, expect } from '@playwright/test';
import { ElementHandle } from 'puppeteer';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const logFile = 'register_user_log.txt';
const password = process.env.MY_PASSWORD;
const users = fs.readFileSync(logFile, 'utf-8').trim().split('\n');
const lastThreeUsers = users.slice(-2);
test.describe('vote tests', () => {
// use different browser to login different username from preivous register test
  test('only for chromium and Mobile Chrome', async ({browserName, page }) => {
    test.skip(browserName.toLowerCase() !== 'chromium', 
    `Test only for chromium and Mobile Chrome!`);
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width > 768) {

      await login(page, lastThreeUsers[0], password);
      await page.locator('a[href="/overall"]').click();
      await page.locator('td.thumbnail a:first-child').nth(2).click();
      if(!(await page.getByText('Thank you for your vote!').isVisible()))
      {
        //await page.getByRole('textbox').fill("from dc morgan"+lastThreeUsers[0].substring(16));
        try {
          const commentTextarea = await Promise.race([
              page.waitForSelector('textarea[id="comment"]'),
              new Promise(resolve => setTimeout(resolve, 5000)) // 5 second timeout
          ]) as ElementHandle<HTMLInputElement>; // type assertion here
          await commentTextarea.type("from mc morgan" + lastThreeUsers[0].substring(16)); 
          } catch (error) {
              console.error(error);
          }
      
      
        await page.getByRole('button', { name: 'Vote!' }).click();
        await expect(page.getByText('Thank you for your vote!')).toBeVisible();
      }
      console.log("(number 3) voted by desk chrome")
    } 
    else if(viewportSize && viewportSize.width <= 768) {
      await login(page, lastThreeUsers[1], password);
      await page.locator('a[href="/overall"]').click();
      await page.locator('td.thumbnail a:first-child').nth(2).click();
      if(!(await page.getByText('Thank you for your vote!').isVisible()))
      {
        // await page.getByRole('textbox').fill("from mc morgan"+lastThreeUsers[1].substring(16));
        try {
          const commentTextarea = await Promise.race([
              page.waitForSelector('textarea[id="comment"]'),
              new Promise(resolve => setTimeout(resolve, 5000)) // 5 second timeout
          ]) as ElementHandle<HTMLInputElement>; // type assertion here
          await commentTextarea.type("from mc morgan" + lastThreeUsers[1].substring(16)); 
          } catch (error) {
              console.error(error);
          }
        await page.getByRole('button', { name: 'Vote!' }).click();
        await expect(page.getByText('Thank you for your vote!')).toBeVisible();
      }
      console.log("(number 3) voted by mobile chrome")
    }
    else{
      console.log("viewportSize is NULL")
    }
    
  });
})
  

  