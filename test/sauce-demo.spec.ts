import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('homepage', () => { // 2
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('https://your-site.com/'); // 3

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });

test.describe('Sauce Demo Website', () => {
  test('should navigate to Log In page', async ({ page }) => {
    await page.goto('https://sauce-demo.myshopify.com/');
    await page.getByRole('link', { name: 'Log In' }).click();

    await expect(page).toHaveURL('https://sauce-demo.myshopify.com/account/login');
    await expect(page).toHaveTitle('Account – Sauce Demo');
  });

  test('should navigate to Search page', async ({ page }) => {
    await page.goto('https://sauce-demo.myshopify.com/');
    await page.getByRole('banner').getByRole('link', { name: 'Search' }).click();

    await expect(page).toHaveURL('https://sauce-demo.myshopify.com/search');
    await expect(page).toHaveTitle('Search – Sauce Demo');
  });

  test('should navigate to About Us page', async ({ page }) => {
    await page.goto('https://sauce-demo.myshopify.com/');
    await page.getByRole('banner').getByRole('link', { name: 'About Us' }).click();

    await expect(page).toHaveURL('https://sauce-demo.myshopify.com/pages/about-us');
    await expect(page).toHaveTitle('About Us – Sauce Demo');
  });

  test('should navigate to Grey Jacket product page', async ({ page }) => {
    await page.goto('https://sauce-demo.myshopify.com/');
    await page.locator('a:has-text("Grey jacket Grey jacket £55.00")').click();

    await expect(page).toHaveURL('https://sauce-demo.myshopify.com/collections/frontpage/products/grey-jacket');
    await expect(page).toHaveTitle(/Grey jacket/);
  });

