import { test, expect } from '@playwright/test';

test.describe('Shopping App - Authentication Automation Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the shopping application root
    await page.goto('/');
  });

  // Chapter 2: Check heading visibility
  test('Test 1: Login heading is visible', async ({ page }) => {
    const loginHeading = page.getByRole('heading', { name: 'Login' });
    await expect(loginHeading).toBeVisible();
  });

  // Chapter 1 & 6: Valid login works
  test('Test 2: Valid login works and displays dashboard', async ({ page }) => {
    // Enter valid credentials provided by developer Rahul
    await page.fill('#email-input', 'rahul@company.com');
    await page.fill('#password-input', 'Password123!');
    await page.click('#login-button');

    // Assertion: Expect dashboard welcome message to be visible
    const welcomeMessage = page.locator('#welcome-message');
    await expect(welcomeMessage).toBeVisible();
    await expect(welcomeMessage).toContainText('Welcome back, Rahul Sharma');

    // Assertion: Check that login card is hidden and dashboard is shown
    await expect(page.locator('#dashboard-section')).toBeVisible();
    await expect(page.locator('#login-section')).toBeHidden();
  });

  // Chapter 1: Incorrect password should be rejected
  test('Test 3: Incorrect password should be rejected with error alert', async ({ page }) => {
    await page.fill('#email-input', 'rahul@company.com');
    await page.fill('#password-input', 'WrongPasswordXYZ999');
    await page.click('#login-button');

    // Assertion: Error banner should appear with appropriate rejection message
    const alertBanner = page.locator('#alert-banner');
    await expect(alertBanner).toBeVisible();
    await expect(alertBanner).toContainText('Invalid username or password');

    // Assertion: Still on login screen, not dashboard
    await expect(page.locator('#login-section')).toBeVisible();
    await expect(page.locator('#dashboard-section')).toBeHidden();
  });

  // Chapter 1 & 6: Empty form validation
  test('Test 4: Empty form validation displays warning message', async ({ page }) => {
    // Leave inputs empty and submit
    await page.click('#login-button');

    // Assertion: Expect validation warning message to be displayed
    const alertBanner = page.locator('#alert-banner');
    await expect(alertBanner).toBeVisible();
    await expect(alertBanner).toContainText('Please enter both email and password.');
  });

});
