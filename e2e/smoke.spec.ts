import { expect, test } from '@playwright/test';

test('home renders the main header', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Watchway', exact: true })
  ).toBeVisible();
});

test('login page renders sign-in form', async ({ page }) => {
  await page.goto('/login');

  await expect(
    page.getByRole('textbox', { name: /email or username/i })
  ).toBeVisible();
  await expect(page.getByRole('button', { name: /^sign in$/i })).toBeVisible();
});

test('guest action on protected nav opens login modal', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: /liked videos/i }).click();
  await expect(page.getByText('Sign in required')).toBeVisible();
});
