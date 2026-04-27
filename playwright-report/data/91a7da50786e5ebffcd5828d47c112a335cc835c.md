# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> orphanage manager register shows pending verification dashboard
- Location: e2e\auth.spec.ts:43:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/dashboard\/panti/
Received string:  "http://localhost:3000/dashboard/donor"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    4 × unexpected value "http://localhost:3000/register"
    10 × unexpected value "http://localhost:3000/dashboard/donor"

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
        - link "Dashboard" [active] [ref=e15] [cursor=pointer]:
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
  9  |     if (text.includes("Failed to load resource")) return;
  10 |     errors.push(text);
  11 |   });
  12 |   return errors;
  13 | }
  14 | 
  15 | test("donor register then login redirects to donor dashboard", async ({ page }) => {
  16 |   const consoleErrors = attachConsoleGuard(page);
  17 |   const ts = Date.now();
  18 |   const email = `donor.ui.${ts}@pantiku.test`;
  19 |   const password = "Password123!";
  20 | 
  21 |   await page.goto("/register");
  22 |   await page.waitForTimeout(500);
  23 |   await page.getByRole("button", { name: "Donatur" }).click();
  24 |   const donorNameInput = page.locator('input[placeholder="Nama lengkap"]').first();
  25 |   await donorNameInput.fill("Donor UI Test");
  26 |   await expect(donorNameInput).toHaveValue("Donor UI Test");
  27 |   await page.getByPlaceholder("Email").fill(email);
  28 |   await page.getByPlaceholder("Password").fill(password);
  29 |   await page.getByRole("button", { name: "Daftar Sekarang" }).click();
  30 | 
  31 |   await expect(page).toHaveURL(/\/(dashboard\/donor|profile)/, { timeout: 20_000 });
  32 |   await page.goto("/login");
  33 |   await page.waitForTimeout(500);
  34 |   await page.getByPlaceholder("Masukkan email").fill(email);
  35 |   await page.getByPlaceholder("Masukkan password").fill(password);
  36 |   await page.getByRole("button", { name: "Masuk" }).click();
  37 | 
  38 |   await expect(page).toHaveURL(/\/dashboard\/donor/);
  39 |   await expect(page.getByRole("heading", { name: "Selamat datang kembali" })).toBeVisible();
  40 |   expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
  41 | });
  42 | 
  43 | test("orphanage manager register shows pending verification dashboard", async ({ page }) => {
  44 |   const consoleErrors = attachConsoleGuard(page);
  45 |   const ts = Date.now();
  46 |   const email = `manager.ui.${ts}@pantiku.test`;
  47 | 
  48 |   await page.goto("/register");
  49 |   await page.waitForTimeout(500);
  50 |   await page.getByRole("button", { name: /Pengelola Panti/i }).click();
  51 |   await expect(page.getByPlaceholder("Nama Pengelola")).toBeVisible({ timeout: 15_000 });
  52 | 
  53 |   await page.getByPlaceholder("Nama Pengelola").fill("Manager UI Test");
  54 |   await page.getByPlaceholder("No Telepon Pengelola").fill("08123456789");
  55 |   await page.getByPlaceholder("Nama Panti").fill(`Panti UI ${ts}`);
  56 |   await page.getByPlaceholder("Alamat").fill("Jl. Pantiku Test No. 7");
  57 |   await page.getByPlaceholder("Kota").fill("Jakarta");
  58 |   await page.getByPlaceholder("Provinsi").fill("DKI Jakarta");
  59 |   await page.getByPlaceholder("No Telepon Panti").fill("08123456780");
  60 |   await page.getByPlaceholder("Jumlah Anak (Estimasi)").fill("12");
  61 |   await page.getByPlaceholder("Email").fill(email);
  62 |   await page.getByPlaceholder("Password").fill("Password123!");
  63 |   await page.getByRole("button", { name: "Daftar Sekarang" }).click();
  64 | 
  65 |   await page.waitForTimeout(500);
  66 |   await page.getByRole("banner").getByRole("link", { name: "Dashboard" }).click();
> 67 |   await expect(page).toHaveURL(/\/dashboard\/panti/);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  68 | 
  69 |   await expect(page.getByText("Menunggu Verifikasi")).toBeVisible();
  70 |   await expect(page.getByRole("link", { name: "Lengkapi Profil Panti" })).toBeVisible();
  71 |   await expect(page.getByRole("link", { name: "Buat Campaign" })).toHaveCount(0);
  72 |   expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
  73 | });
  74 | 
```