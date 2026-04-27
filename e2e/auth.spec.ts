import { expect, test } from "@playwright/test";

function attachConsoleGuard(page: import("@playwright/test").Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (text.includes("favicon.ico")) return;
    if (text.includes("Failed to load resource")) return;
    errors.push(text);
  });
  return errors;
}

test("donor register then login redirects to donor dashboard", async ({ page }) => {
  const consoleErrors = attachConsoleGuard(page);
  const ts = Date.now();
  const email = `donor.ui.${ts}@pantiku.test`;
  const password = "Password123!";

  await page.goto("/register");
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Donatur" }).click();
  const donorNameInput = page.locator('input[placeholder="Nama lengkap"]').first();
  await donorNameInput.fill("Donor UI Test");
  await expect(donorNameInput).toHaveValue("Donor UI Test");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Daftar Sekarang" }).click();

  await expect(page).toHaveURL(/\/(dashboard\/donor|profile)/, { timeout: 20_000 });
  await page.goto("/login");
  await page.waitForTimeout(500);
  await page.getByPlaceholder("Masukkan email").fill(email);
  await page.getByPlaceholder("Masukkan password").fill(password);
  await page.getByRole("button", { name: "Masuk" }).click();

  await expect(page).toHaveURL(/\/dashboard\/donor/);
  await expect(page.getByRole("heading", { name: "Selamat Datang di Pantiku" })).toBeVisible();
  expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
});

test("orphanage manager register shows pending verification dashboard", async ({ page }) => {
  const consoleErrors = attachConsoleGuard(page);
  const ts = Date.now();
  const email = `manager.ui.${ts}@pantiku.test`;

  await page.goto("/register");
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: /Pengelola Panti/i }).click();
  await expect(page.getByPlaceholder("Nama Pengelola")).toBeVisible({ timeout: 15_000 });

  await page.getByPlaceholder("Nama Pengelola").fill("Manager UI Test");
  await page.getByPlaceholder("No Telepon Pengelola").fill("08123456789");
  await page.getByPlaceholder("Nama Panti").fill(`Panti UI ${ts}`);
  await page.getByPlaceholder("Alamat").fill("Jl. Pantiku Test No. 7");
  await page.getByPlaceholder("Kota").fill("Jakarta");
  await page.getByPlaceholder("Provinsi").fill("DKI Jakarta");
  await page.getByPlaceholder("No Telepon Panti").fill("08123456780");
  await page.getByPlaceholder("Jumlah Anak (Estimasi)").fill("12");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").fill("Password123!");
  await page.getByRole("button", { name: "Daftar Sekarang" }).click();

  await page.waitForTimeout(500);
  await page.getByRole("banner").getByRole("link", { name: "Dashboard" }).click();
  await expect(page).toHaveURL(/\/dashboard\/panti/);

  await expect(page.getByText("Menunggu Verifikasi")).toBeVisible();
  await expect(page.getByRole("link", { name: "Lengkapi Profil Panti" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Buat Campaign" })).toHaveCount(0);
  expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
});
