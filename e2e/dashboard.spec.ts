import { expect, test } from "@playwright/test";

function attachConsoleGuard(page: import("@playwright/test").Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (text.includes("favicon.ico")) return;
    if (text.includes("Failed to load resource") && text.includes("401")) return;
    errors.push(text);
  });
  return errors;
}

async function registerDonor(page: import("@playwright/test").Page, email: string, password: string) {
  await page.goto("/register");
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Donatur" }).click();
  const donorNameInput = page.locator('input[placeholder="Nama lengkap"]').first();
  await donorNameInput.fill("Donor Navbar Test");
  await expect(donorNameInput).toHaveValue("Donor Navbar Test");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Daftar Sekarang" }).click();
}

test("navbar auth state changes after donor login", async ({ page }) => {
  const consoleErrors = attachConsoleGuard(page);
  const email = `donor.nav.${Date.now()}@pantiku.test`;
  const password = "Password123!";

  await page.goto("/");
  const navbar = page.getByRole("banner");
  await expect(navbar.getByRole("link", { name: "Masuk" })).toBeVisible();
  await expect(navbar.getByRole("link", { name: "Gabung Sekarang" })).toBeVisible();

  await registerDonor(page, email, password);
  if (/\/dashboard\/donor/.test(page.url()) || /\/profile/.test(page.url())) {
    await page.getByRole("button", { name: "Keluar" }).click();
  }

  await page.goto("/login");
  await page.waitForTimeout(500);
  await page.getByPlaceholder("Masukkan email").fill(email);
  await page.getByPlaceholder("Masukkan password").fill(password);
  await page.getByRole("button", { name: "Masuk" }).click();

  await expect(page).toHaveURL(/\/dashboard\/donor/);
  await expect(navbar.getByRole("link", { name: "Dashboard" })).toBeVisible();
  await expect(navbar.getByRole("button", { name: "Keluar" })).toBeVisible();
  expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
});
