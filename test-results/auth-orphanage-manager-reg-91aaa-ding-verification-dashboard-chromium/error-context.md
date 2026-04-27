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
    - generic [ref=e19]:
      - generic [ref=e20]:
        - heading "Selamat Datang di Pantiku" [level=1] [ref=e21]
        - paragraph [ref=e22]: Dukung campaign produktif, beli produk karya panti, dan lihat dampak dari kontribusimu.
        - generic [ref=e23]:
          - link "Jelajahi Campaign" [ref=e24] [cursor=pointer]:
            - /url: /campaigns
          - link "Lihat Produk Karya Panti" [ref=e25] [cursor=pointer]:
            - /url: /marketplace
      - generic [ref=e26]:
        - article [ref=e27]:
          - heading "Dukung Campaign Produktif" [level=3] [ref=e28]
          - paragraph [ref=e29]: Bantu panti mendapatkan alat, pelatihan, dan modal produktif.
          - link "Lihat Campaign" [ref=e30] [cursor=pointer]:
            - /url: /campaigns
        - article [ref=e31]:
          - heading "Beli Produk Karya Panti" [level=3] [ref=e32]
          - paragraph [ref=e33]: Dukung kemandirian panti melalui produk yang mereka hasilkan.
          - link "Lihat Marketplace" [ref=e34] [cursor=pointer]:
            - /url: /marketplace
        - article [ref=e35]:
          - heading "Pantau Dampak" [level=3] [ref=e36]
          - paragraph [ref=e37]: Lihat bagaimana dukungan berkembang menjadi dampak.
          - link "Lihat Dampak" [ref=e38] [cursor=pointer]:
            - /url: /impact
      - generic [ref=e39]:
        - heading "Campaign pertama sedang disiapkan bersama panti mitra terverifikasi." [level=3] [ref=e40]
        - paragraph [ref=e41]: Jelajahi campaign secara berkala. Pantiku akan menampilkan campaign produktif yang sudah siap didukung.
  - contentinfo [ref=e42]:
    - generic [ref=e43]:
      - generic [ref=e44]:
        - generic [ref=e45]:
          - img "Pantiku Logo" [ref=e46]
          - generic [ref=e47]: Pantiku
        - paragraph [ref=e48]: Anak Bertumbuh, Panti Mandiri.
        - paragraph [ref=e49]: Pantiku membangun ekosistem digital untuk mendukung pemberdayaan panti dan masa depan anak.
      - generic [ref=e50]:
        - paragraph [ref=e51]: Platform
        - generic [ref=e52]:
          - link "Campaign" [ref=e53] [cursor=pointer]:
            - /url: /campaigns
          - link "Produk Karya Panti" [ref=e54] [cursor=pointer]:
            - /url: /marketplace
          - link "Lihat Dampak" [ref=e55] [cursor=pointer]:
            - /url: /impact
          - link "Panti Berdaya" [ref=e56] [cursor=pointer]:
            - /url: /orphanages
      - generic [ref=e57]:
        - paragraph [ref=e58]: Bergabung
        - generic [ref=e59]:
          - link "Donatur" [ref=e60] [cursor=pointer]:
            - /url: /register
          - link "Pengelola Panti" [ref=e61] [cursor=pointer]:
            - /url: /register
          - link "Relawan" [ref=e62] [cursor=pointer]:
            - /url: /register
          - link "Mitra CSR" [ref=e63] [cursor=pointer]:
            - /url: /register
      - generic [ref=e64]:
        - paragraph [ref=e65]: Kontak
        - generic [ref=e66]:
          - paragraph [ref=e67]: halo@pantiku.id
          - paragraph [ref=e68]: Indonesia
          - link "Hubungi Kami" [ref=e69] [cursor=pointer]:
            - /url: /login
    - generic [ref=e71]: © 2026 Pantiku. Semua hak dilindungi.
  - button "Open Next.js Dev Tools" [ref=e77] [cursor=pointer]:
    - img [ref=e78]
  - alert [ref=e81]
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
  39 |   await expect(page.getByRole("heading", { name: "Selamat Datang di Pantiku" })).toBeVisible();
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