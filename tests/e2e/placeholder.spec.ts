/**
 * E2E placeholder - 실제 테스트 추가 전 기본 구조 유지
 * playwright.config.ts의 testDir 경로 존재 확인용
 */
import { test, expect } from '@playwright/test';

test.describe('placeholder', () => {
  test('placeholder - e2e 디렉터리 구조 확인', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/ForwardMax|B2B/);
  });
});
