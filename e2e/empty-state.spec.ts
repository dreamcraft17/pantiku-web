import { expect, test } from "@playwright/test";

function attachConsoleGuard(page: import("@playwright/test").Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (text.includes("favicon.ico")) return;
    errors.push(text);
  });
  return errors;
}

test("campaign page shows empty state or demo badge/cards safely", async ({ page }) => {
  const consoleErrors = attachConsoleGuard(page);
  await page.goto("/campaigns");
  await expect(page.getByRole("heading", { name: "Jelajahi Campaign" })).toBeVisible();
  await expect.poll(async () => await page.locator("text=Memuat").count(), { timeout: 15_000 }).toBe(0);

  const emptyState = page.getByRole("heading", { name: "Campaign pertama sedang disiapkan" });
  const demoBadge = page.getByText("Mode Demo");
  const campaignCardLink = page.locator('a[href^="/campaigns/"]');
  await expect
    .poll(async () => (await emptyState.count()) + (await demoBadge.count()) + (await campaignCardLink.count()), { timeout: 15_000 })
    .toBeGreaterThan(0);

  if ((await emptyState.count()) > 0) {
    await expect(emptyState.first()).toBeVisible();
  } else {
    const hasDemoBadge = await demoBadge.isVisible().catch(() => false);
    const hasAnyCard = (await campaignCardLink.count()) > 0;
    expect(hasDemoBadge || hasAnyCard).toBeTruthy();
  }

  expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
});

test("marketplace page shows empty state or demo badge/cards safely", async ({ page }) => {
  const consoleErrors = attachConsoleGuard(page);
  await page.goto("/marketplace");
  await expect(page.getByRole("heading", { name: "Produk Karya Panti" })).toBeVisible();
  await expect.poll(async () => await page.locator("text=Memuat").count(), { timeout: 15_000 }).toBe(0);

  const emptyState = page.getByRole("heading", { name: "Produk karya panti segera hadir" });
  const demoBadge = page.getByText("Mode Demo");
  const productCardLink = page.locator('a[href^="/marketplace/"]');
  await expect
    .poll(async () => (await emptyState.count()) + (await demoBadge.count()) + (await productCardLink.count()), { timeout: 15_000 })
    .toBeGreaterThan(0);

  if ((await emptyState.count()) > 0) {
    await expect(emptyState.first()).toBeVisible();
  } else {
    const hasDemoBadge = await demoBadge.isVisible().catch(() => false);
    const hasAnyCard = (await productCardLink.count()) > 0;
    expect(hasDemoBadge || hasAnyCard).toBeTruthy();
  }

  expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
});
