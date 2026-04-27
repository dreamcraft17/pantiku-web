# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> navbar auth state changes after donor login
- Location: e2e\dashboard.spec.ts:27:5

# Error details

```
Error: Unexpected console errors: Failed to load resource: net::ERR_CONNECTION_REFUSED
Failed to load resource: net::ERR_CONNECTION_REFUSED
Failed to load resource: net::ERR_CONNECTION_REFUSED

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "Failed to load resource: net::ERR_CONNECTION_REFUSED",
+   "Failed to load resource: net::ERR_CONNECTION_REFUSED",
+   "Failed to load resource: net::ERR_CONNECTION_REFUSED",
+ ]
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
        - link "Dashboard" [ref=e15] [cursor=pointer]:
          - /url: /dashboard/donor
        - button "Keluar" [ref=e16]
  - main [ref=e17]:
    - generic [ref=e18]:
      - generic [ref=e19]:
        - heading "Selamat datang kembali" [level=1] [ref=e20]
        - paragraph [ref=e21]: Lanjutkan dukunganmu untuk membangun panti yang lebih mandiri.
      - generic [ref=e22]:
        - article [ref=e23]:
          - heading "Campaign Produktif" [level=3] [ref=e24]
          - paragraph [ref=e25]: Lihat campaign yang sedang berjalan dan dukung program yang relevan.
          - link "Jelajahi Campaign" [ref=e26] [cursor=pointer]:
            - /url: /campaigns
        - article [ref=e27]:
          - heading "Produk Karya Panti" [level=3] [ref=e28]
          - paragraph [ref=e29]: Temukan produk karya panti dan bantu keberlanjutan ekonomi panti.
          - link "Lihat Marketplace" [ref=e30] [cursor=pointer]:
            - /url: /marketplace
        - article [ref=e31]:
          - heading "Dampak Dukungan" [level=3] [ref=e32]
          - paragraph [ref=e33]: Pantau arah dukungan dan perkembangan dampak yang dibangun bersama.
          - link "Lihat Dampak" [ref=e34] [cursor=pointer]:
            - /url: /impact
      - paragraph [ref=e35]: Pantiku sedang menyiapkan campaign pertama yang terverifikasi bersama panti mitra.
  - contentinfo [ref=e36]:
    - generic [ref=e37]:
      - generic [ref=e38]:
        - generic [ref=e39]:
          - img "Pantiku Logo" [ref=e40]
          - generic [ref=e41]: Pantiku
        - paragraph [ref=e42]: Anak Bertumbuh, Panti Mandiri.
        - paragraph [ref=e43]: Pantiku membangun ekosistem digital untuk mendukung pemberdayaan panti dan masa depan anak.
      - generic [ref=e44]:
        - paragraph [ref=e45]: Platform
        - generic [ref=e46]:
          - link "Campaign" [ref=e47] [cursor=pointer]:
            - /url: /campaigns
          - link "Produk Karya Panti" [ref=e48] [cursor=pointer]:
            - /url: /marketplace
          - link "Lihat Dampak" [ref=e49] [cursor=pointer]:
            - /url: /impact
          - link "Panti Berdaya" [ref=e50] [cursor=pointer]:
            - /url: /orphanages
      - generic [ref=e51]:
        - paragraph [ref=e52]: Bergabung
        - generic [ref=e53]:
          - link "Donatur" [ref=e54] [cursor=pointer]:
            - /url: /register
          - link "Pengelola Panti" [ref=e55] [cursor=pointer]:
            - /url: /register
          - link "Relawan" [ref=e56] [cursor=pointer]:
            - /url: /register
          - link "Mitra CSR" [ref=e57] [cursor=pointer]:
            - /url: /register
      - generic [ref=e58]:
        - paragraph [ref=e59]: Kontak
        - generic [ref=e60]:
          - paragraph [ref=e61]: halo@pantiku.id
          - paragraph [ref=e62]: Indonesia
          - link "Hubungi Kami" [ref=e63] [cursor=pointer]:
            - /url: /login
    - generic [ref=e65]: © 2026 Pantiku. Semua hak dilindungi.
  - button "Open Next.js Dev Tools" [ref=e71] [cursor=pointer]:
    - img [ref=e72]
  - alert [ref=e75]
  - generic [ref=e76]: Berhasil masuk. Selamat datang kembali.
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
  48 |   await expect(page).toHaveURL(/\/dashboard\/donor/);
  49 |   await expect(navbar.getByRole("link", { name: "Dashboard" })).toBeVisible();
  50 |   await expect(navbar.getByRole("button", { name: "Keluar" })).toBeVisible();
> 51 |   expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
     |                                                                                   ^ Error: Unexpected console errors: Failed to load resource: net::ERR_CONNECTION_REFUSED
  52 | });
  53 | 
```