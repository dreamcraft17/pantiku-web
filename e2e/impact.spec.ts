import { expect, test } from "@playwright/test";

function attachConsoleGuard(page: import("@playwright/test").Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (text.includes("favicon.ico")) return;
    if (text.includes("Failed to load resource") && text.includes("401")) return;
    if (text.includes("Failed to load resource") && text.includes("ERR_CONNECTION_REFUSED")) return;
    errors.push(text);
  });
  return errors;
}

test("impact page shows honest state for real or demo mode", async ({ page }) => {
  const consoleErrors = attachConsoleGuard(page);
  await page.goto("/impact");
  const impactHeadingVisible = await page
    .getByRole("heading", { name: "Dampak Nyata Bersama Pantiku" })
    .isVisible()
    .catch(() => false);
  const errorStateVisible = await page.getByText("Data dampak belum dapat dimuat.").isVisible().catch(() => false);
  expect(impactHeadingVisible || errorStateVisible).toBeTruthy();

  if (impactHeadingVisible) {
    const demoBadgeVisible = await page.getByText("Mode Demo").first().isVisible().catch(() => false);
    const emptyRealVisible = await page.getByText("Data dampak sedang disiapkan").first().isVisible().catch(() => false);
    expect(demoBadgeVisible || emptyRealVisible).toBeTruthy();
  }

  await expect(page.getByText("+17% bulan ini")).toHaveCount(0);
  expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
});

test("impact page does not show legacy hardcoded values", async ({ page }) => {
  await page.goto("/impact");
  await expect(page.getByText("Rp 45.450.000")).toHaveCount(0);
  await expect(page.getByText("+17% bulan ini")).toHaveCount(0);
  await expect(page.getByText(/\b63\b/)).toHaveCount(0);
  await expect(page.getByText(/\b182\b/)).toHaveCount(0);
});
