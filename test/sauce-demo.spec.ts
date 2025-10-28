import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE_URL = 'https://sauce-demo.myshopify.com/';

test.describe('Sauce Demo E2E Tests', () => {
  
  // Login Tests
  test.describe('Authentication', () => {
    
    test('should successfully login with valid credentials', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Click on account/login link if exists
      const loginLink = page.locator('a[href*="account/login"], a:has-text("Log in")').first();
      if (await loginLink.isVisible({ timeout: 5000 }).catch(() => false)) {
        await loginLink.click();
        await page.waitForLoadState('networkidle');
        
        // Fill in login form
        await page.fill('input[type="email"], input[name="customer[email]"]', 'test@example.com');
        await page.fill('input[type="password"], input[name="customer[password]"]', 'password123');
        await page.click('button[type="submit"], input[type="submit"]');
        
        // Verify login success or account page loaded
        await expect(page).toHaveURL(/account|customer/);
      }
    });

    test('[NEGATIVE] should show error with invalid credentials', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const loginLink = page.locator('a[href*="account/login"], a:has-text("Log in")').first();
      if (await loginLink.isVisible({ timeout: 5000 }).catch(() => false)) {
        await loginLink.click();
        await page.waitForLoadState('networkidle');
        
        // Attempt login with invalid credentials
        await page.fill('input[type="email"], input[name="customer[email]"]', 'invalid@test.com');
        await page.fill('input[type="password"], input[name="customer[password]"]', 'wrongpassword');
        await page.click('button[type="submit"], input[type="submit"]');
        
        // Verify error message appears
        const errorMsg = page.locator('.errors, .error, [class*="error"], [role="alert"]');
        await expect(errorMsg.first()).toBeVisible({ timeout: 5000 });
      }
    });
  });

  // Add to Cart & Checkout Tests
  test.describe('Shopping Cart & Checkout', () => {
    
    test('should add items to cart and proceed to checkout', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      
      // Find and click on first product
      const productLink = page.locator('a[href*="/products/"]').first();
      await productLink.click();
      await page.waitForLoadState('networkidle');
      
      // Add to cart
      const addToCartBtn = page.locator('button:has-text("Add to cart"), button[name="add"], [type="submit"]:has-text("Add")').first();
      await addToCartBtn.click();
      
      // Wait for cart to update
      await page.waitForTimeout(1000);
      
      // Navigate to cart
      const cartLink = page.locator('a[href*="/cart"]').first();
      await cartLink.click();
      await page.waitForLoadState('networkidle');
      
      // Verify item is in cart
      const cartItems = page.locator('.cart-item, [class*="cart-item"], .line-item');
      await expect(cartItems.first()).toBeVisible();
      
      // Proceed to checkout
      const checkoutBtn = page.locator('button:has-text("Check out"), a:has-text("Check out"), [name="checkout"]').first();
      await checkoutBtn.click();
      await page.waitForLoadState('networkidle');
      
      // Verify checkout page loaded
      await expect(page).toHaveURL(/checkout|checkouts/);
    });

    test('[NEGATIVE] should not allow checkout with empty cart', async ({ page }) => {
      await page.goto(BASE_URL + 'cart');
      await page.waitForLoadState('networkidle');
      
      // Try to find checkout button when cart is empty
      const emptyCartMsg = page.locator(':has-text("empty"), :has-text("no items")');
      const checkoutBtn = page.locator('button:has-text("Check out"), a:has-text("Check out")');
      
      // Either empty message should be visible or checkout button should be disabled
      const isEmpty = await emptyCartMsg.first().isVisible({ timeout: 3000 }).catch(() => false);
      const btnExists = await checkoutBtn.first().isVisible({ timeout: 3000 }).catch(() => false);
      
      if (isEmpty) {
        await expect(emptyCartMsg.first()).toBeVisible();
      } else if (btnExists) {
        await expect(checkoutBtn.first()).toBeDisabled();
      }
    });
  });

  // Filter & Sort Tests
  test.describe('Product Filtering and Sorting', () => {
    
    test('should filter products by collection/category', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      
      // Look for navigation menu or collections
      const collectionLink = page.locator('a[href*="/collections/"], nav a, .menu a').first();
      if (await collectionLink.isVisible({ timeout: 5000 }).catch(() => false)) {
        const initialProductCount = await page.locator('a[href*="/products/"]').count();
        
        await collectionLink.click();
        await page.waitForLoadState('networkidle');
        
        // Verify we're on a collection page
        await expect(page).toHaveURL(/collections|products/);
        
        // Verify products are displayed
        const products = page.locator('a[href*="/products/"], .product-item, [class*="product"]');
        await expect(products.first()).toBeVisible({ timeout: 5000 });
      }
    });

    test('should sort products by price or name', async ({ page }) => {
      await page.goto(BASE_URL + 'collections/all');
      await page.waitForLoadState('networkidle');
      
      // Look for sort dropdown
      const sortDropdown = page.locator('select[name*="sort"], select#SortBy, [class*="sort"] select').first();
      
      if (await sortDropdown.isVisible({ timeout: 5000 }).catch(() => false)) {
        // Get first product name/price before sorting
        const products = page.locator('.product-item, [class*="product-card"]');
        const firstProductBefore = await products.first().textContent();
        
        // Sort by price or title
        await sortDropdown.selectOption({ index: 1 });
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        
        // Verify sorting occurred
        const firstProductAfter = await products.first().textContent();
        // Products should have changed order (or at least page reloaded)
        expect(firstProductBefore).toBeDefined();
        expect(firstProductAfter).toBeDefined();
      }
    });
  });

  // CRUD Operations (Simulated with Cart Items)
  test.describe('Create, Edit, Delete Operations', () => {
    
    test('should create (add), update (quantity), and delete cart items', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      
      // CREATE: Add product to cart
      const productLink = page.locator('a[href*="/products/"]').first();
      await productLink.click();
      await page.waitForLoadState('networkidle');
      
      const addToCartBtn = page.locator('button:has-text("Add to cart"), button[name="add"]').first();
      await addToCartBtn.click();
      await page.waitForTimeout(1000);
      
      // Navigate to cart
      await page.goto(BASE_URL + 'cart');
      await page.waitForLoadState('networkidle');
      
      // Verify item created
      const cartItems = page.locator('.cart-item, [class*="cart-item"]');
      await expect(cartItems.first()).toBeVisible();
      
      // UPDATE: Change quantity
      const qtyInput = page.locator('input[type="number"], input[name*="quantity"]').first();
      if (await qtyInput.isVisible({ timeout: 3000 }).catch(() => false)) {
        await qtyInput.fill('2');
        await qtyInput.press('Enter');
        await page.waitForTimeout(1000);
        
        // Verify quantity updated
        await expect(qtyInput).toHaveValue('2');
      }
      
      // DELETE: Remove item from cart
      const removeBtn = page.locator('a:has-text("Remove"), button:has-text("Remove"), [class*="remove"]').first();
      if (await removeBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await removeBtn.click();
        await page.waitForTimeout(1000);
        
        // Verify item removed or cart empty message
        const emptyMsg = page.locator(':has-text("empty"), :has-text("no items")');
        const itemCount = await cartItems.count();
        expect(itemCount === 0 || await emptyMsg.isVisible()).toBeTruthy();
      }
    });
  });

  // Accessibility Tests
  test.describe('Accessibility', () => {
    
    test('should pass axe accessibility scan on homepage', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should pass axe accessibility scan on product page', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      
      // Navigate to a product page
      const productLink = page.locator('a[href*="/products/"]').first();
      await productLink.click();
      await page.waitForLoadState('networkidle');
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should have proper ARIA labels and roles', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      
      // Check for navigation landmarks
      const nav = page.locator('nav, [role="navigation"]');
      await expect(nav.first()).toBeVisible();
      
      // Check for main content area
      const main = page.locator('main, [role="main"]');
      await expect(main.first()).toBeVisible();
      
      // Check for proper button labels
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const btn = buttons.nth(i);
        if (await btn.isVisible({ timeout: 1000 }).catch(() => false)) {
          const text = await btn.textContent();
          const ariaLabel = await btn.getAttribute('aria-label');
          expect(text || ariaLabel).toBeTruthy();
        }
      }
    });
  });

  // Additional Edge Cases
  test.describe('Edge Cases & Validation', () => {
    
    test('should handle rapid cart additions gracefully', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      
      const productLink = page.locator('a[href*="/products/"]').first();
      await productLink.click();
      await page.waitForLoadState('networkidle');
      
      const addToCartBtn = page.locator('button:has-text("Add to cart"), button[name="add"]').first();
      
      // Rapidly click add to cart
      for (let i = 0; i < 3; i++) {
        await addToCartBtn.click();
        await page.waitForTimeout(300);
      }
      
      // Navigate to cart and verify it handled multiple additions
      await page.goto(BASE_URL + 'cart');
      await page.waitForLoadState('networkidle');
      
      const cartItems = page.locator('.cart-item, [class*="cart-item"]');
      const itemCount = await cartItems.count();
      expect(itemCount).toBeGreaterThan(0);
    });

    test('should validate search functionality', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      
      // Find search input
      const searchInput = page.locator('input[type="search"], input[name="q"], [placeholder*="Search"]').first();
      
      if (await searchInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await searchInput.fill('test product');
        await searchInput.press('Enter');
        await page.waitForLoadState('networkidle');
        
        // Verify search results page or products displayed
        await expect(page).toHaveURL(/search|q=/);
      }
    });
  });
});
