import { test, expect } from '@playwright/test';

test('пустая форма показывает ошибки email и пароля', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-marker="login-button-desktop"]').click();

  const loginForm = page.locator('[data-marker="login-form"]');
  await loginForm.locator('[data-marker="login-submit-button"]').click();

  // прогон с намеренно изменённым ожиданием завершился ошибкой
  // Playwright нашёл элемент ошибки, прочитал "Email обязателен" и сравнил строки, поэтому проверка упала
  // Expected: "Неверный email"
  // Received: "Email обязателен"
  await expect(loginForm.locator('[data-marker="email-error"]'))
    .toHaveText('Email обязателен');
  await expect(loginForm.locator('[data-marker="password-error"]'))
    .toHaveText('Пароль обязателен');
});
