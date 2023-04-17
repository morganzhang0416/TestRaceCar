import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();


test.describe('calculation tests', () => {

  test('the total votes equals individual combined', async ({ page }) => {
    await page.goto('/');
    const totalStr= await page.locator('h3>small').nth(0).textContent();
    let totalInt = 0;
    if(totalStr!=null)
    {
      totalInt = parseInt(totalStr.replace(/\D/g, ""));
      
     
    }
    await page.locator('my-home').getByRole('link').nth(0).click();
    await page.waitForSelector('div.row>table>tbody>tr>td:nth-child(4)');
  
    const elements = await page.$$('div.row>table>tbody>tr>td:nth-child(4)');

    const sum = await elements.reduce(async (accPromise, element) => {
    const acc = await accPromise;
    const elementText = await element.textContent();
    const elementNumber = Number(elementText);
    return acc + elementNumber;
    }, Promise.resolve(0));

    console.log("(number 5) calculation testing");

    expect(sum).toBe(totalInt);

  });

  
})