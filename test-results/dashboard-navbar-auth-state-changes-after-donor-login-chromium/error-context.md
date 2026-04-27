# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> navbar auth state changes after donor login
- Location: e2e\dashboard.spec.ts:27:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/dashboard\/donor/
Received string:  "http://localhost:3000/login"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    4 × unexpected value "http://localhost:3000/login?"
    9 × unexpected value "http://localhost:3000/login"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "Pantiku Logo Pantiku Membangun Kemandirian Panti" [ref=e4] [cursor=pointer]:
        - /url: /
        - img "Pantiku Logo" [ref=e5]
        - generic [ref=e6]:
          - generic [ref=e7]: Pantiku
          - generic [ref=e8]: Membangun Kemandirian Panti
      - navigation [ref=e9]:
        - link "Campaign" [ref=e10] [cursor=pointer]:
          - /url: /campaigns
        - link "Produk Karya Panti" [ref=e11] [cursor=pointer]:
          - /url: /marketplace
        - link "Lihat Dampak" [ref=e12] [cursor=pointer]:
          - /url: /impact
        - link "Tentang Kami" [ref=e13] [cursor=pointer]:
          - /url: /tentang-kami
      - generic [ref=e14]:
        - link "Masuk" [ref=e15] [cursor=pointer]:
          - /url: /login
        - link "Gabung Sekarang" [ref=e16] [cursor=pointer]:
          - /url: /register
  - main [ref=e17]:
    - generic [ref=e18]:
      - heading "Kembali ke Pantiku" [level=1] [ref=e19]
      - paragraph [ref=e20]: Masuk untuk melanjutkan kontribusimu dalam membangun panti yang lebih mandiri.
      - paragraph [ref=e21]: Masuk sebagai donatur, pengelola panti, atau relawan.
      - generic [ref=e22]:
        - generic [ref=e23]:
          - textbox "Masukkan email" [ref=e24]
          - textbox "Masukkan password" [ref=e25]
          - button "Masuk" [ref=e26]
        - paragraph [ref=e27]:
          - text: Belum punya akun?
          - link "Daftar di Pantiku" [ref=e28] [cursor=pointer]:
            - /url: /register
      - paragraph [ref=e29]: Pantiku membangun ekosistem yang transparan, terverifikasi, dan berkelanjutan untuk panti dan anak-anak.
  - contentinfo [ref=e30]:
    - generic [ref=e31]:
      - generic [ref=e32]:
        - generic [ref=e33]:
          - img "Pantiku Logo" [ref=e34]
          - generic [ref=e35]: Pantiku
        - paragraph [ref=e36]: Anak Bertumbuh, Panti Mandiri.
        - paragraph [ref=e37]: Pantiku membangun ekosistem digital untuk mendukung pemberdayaan panti dan masa depan anak.
      - generic [ref=e38]:
        - paragraph [ref=e39]: Platform
        - generic [ref=e40]:
          - link "Campaign" [ref=e41] [cursor=pointer]:
            - /url: /campaigns
          - link "Produk Karya Panti" [ref=e42] [cursor=pointer]:
            - /url: /marketplace
          - link "Lihat Dampak" [ref=e43] [cursor=pointer]:
            - /url: /impact
          - link "Panti Berdaya" [ref=e44] [cursor=pointer]:
            - /url: /orphanages
      - generic [ref=e45]:
        - paragraph [ref=e46]: Bergabung
        - generic [ref=e47]:
          - link "Donatur" [ref=e48] [cursor=pointer]:
            - /url: /register
          - link "Pengelola Panti" [ref=e49] [cursor=pointer]:
            - /url: /register
          - link "Relawan" [ref=e50] [cursor=pointer]:
            - /url: /register
          - link "Mitra CSR" [ref=e51] [cursor=pointer]:
            - /url: /register
      - generic [ref=e52]:
        - paragraph [ref=e53]: Kontak
        - generic [ref=e54]:
          - paragraph [ref=e55]: halo@pantiku.id
          - paragraph [ref=e56]: Indonesia
          - link "Hubungi Kami" [ref=e57] [cursor=pointer]:
            - /url: /login
    - generic [ref=e59]: © 2026 Pantiku. Semua hak dilindungi.
  - button "Open Next.js Dev Tools" [ref=e65] [cursor=pointer]:
    - img [ref=e66]
  - alert [ref=e69]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | function attachConsoleGuard(page: import("@playwright/test").Page) {
  4  |   const errors: string[] = [];
  5  |   page.on("console", (msg) => {
  6  |     if (msg.type() !== "error") return;
  7  |     const text = msg.text();
  8  |     if (text.includes("favicon.ico")) return;
  9  |     if (text.includes("Failed to load resource") && text.includes("401")) return;
  10 |     errors.push(text);
  11 |   });
  12 |   return errors;
  13 | }
  14 | 
  15 | async function registerDonor(page: import("@playwright/test").Page, email: string, password: string) {
  16 |   await page.goto("/register");
  17 |   await page.waitForTimeout(500);
  18 |   await page.getByRole("button", { name: "Donatur" }).click();
  19 |   const donorNameInput = page.locator('input[placeholder="Nama lengkap"]').first();
  20 |   await donorNameInput.fill("Donor Navbar Test");
  21 |   await expect(donorNameInput).toHaveValue("Donor Navbar Test");
  22 |   await page.getByPlaceholder("Email").fill(email);
  23 |   await page.getByPlaceholder("Password").fill(password);
  24 |   await page.getByRole("button", { name: "Daftar Sekarang" }).click();
  25 | }
  26 | 
  27 | test("navbar auth state changes after donor login", async ({ page }) => {
  28 |   const consoleErrors = attachConsoleGuard(page);
  29 |   const email = `donor.nav.${Date.now()}@pantiku.test`;
  30 |   const password = "Password123!";
  31 | 
  32 |   await page.goto("/");
  33 |   const navbar = page.getByRole("banner");
  34 |   await expect(navbar.getByRole("link", { name: "Masuk" })).toBeVisible();
  35 |   await expect(navbar.getByRole("link", { name: "Gabung Sekarang" })).toBeVisible();
  36 | 
  37 |   await registerDonor(page, email, password);
  38 |   if (/\/dashboard\/donor/.test(page.url()) || /\/profile/.test(page.url())) {
  39 |     await page.getByRole("button", { name: "Keluar" }).click();
  40 |   }
  41 | 
  42 |   await page.goto("/login");
  43 |   await page.waitForTimeout(500);
  44 |   await page.getByPlaceholder("Masukkan email").fill(email);
  45 |   await page.getByPlaceholder("Masukkan password").fill(password);
  46 |   await page.getByRole("button", { name: "Masuk" }).click();
  47 | 
> 48 |   await expect(page).toHaveURL(/\/dashboard\/donor/);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  49 |   await expect(navbar.getByRole("link", { name: "Dashboard" })).toBeVisible();
  50 |   await expect(navbar.getByRole("button", { name: "Keluar" })).toBeVisible();
  51 |   expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
  52 | });
  53 | 
```