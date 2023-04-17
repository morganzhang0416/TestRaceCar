export async function login(page, user, password) {
    await page.goto('/');
    await page.locator('input[name="login"]').fill(user);
    console.log(user);
    await page.locator('input[name="password"]').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    
  }
  