# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> volunteer dashboard shows role-specific onboarding content
- Location: e2e\dashboard.spec.ts:66:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/dashboard\/relawan/
Received string:  "http://localhost:3000/dashboard/donor"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    7 × unexpected value "http://localhost:3000/login"
    7 × unexpected value "http://localhost:3000/dashboard/donor"

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
  27 | async function registerVolunteer(page: import("@playwright/test").Page, email: string, password: string) {
  28 |   await page.goto("/register");
  29 |   await page.waitForTimeout(500);
  30 |   await page.getByRole("button", { name: "Relawan" }).click();
  31 |   const nameInput = page.locator('input[placeholder="Nama lengkap"]').first();
  32 |   await nameInput.fill("Relawan Test");
  33 |   await expect(nameInput).toHaveValue("Relawan Test");
  34 |   await page.getByPlaceholder("Email").fill(email);
  35 |   await page.getByPlaceholder("Password").fill(password);
  36 |   await page.getByRole("button", { name: "Daftar Sekarang" }).click();
  37 | }
  38 | 
  39 | test("navbar auth state changes after donor login", async ({ page }) => {
  40 |   const consoleErrors = attachConsoleGuard(page);
  41 |   const email = `donor.nav.${Date.now()}@pantiku.test`;
  42 |   const password = "Password123!";
  43 | 
  44 |   await page.goto("/");
  45 |   const navbar = page.getByRole("banner");
  46 |   await expect(navbar.getByRole("link", { name: "Masuk" })).toBeVisible();
  47 |   await expect(navbar.getByRole("link", { name: "Gabung Sekarang" })).toBeVisible();
  48 | 
  49 |   await registerDonor(page, email, password);
  50 |   if (/\/dashboard\/donor/.test(page.url()) || /\/profile/.test(page.url())) {
  51 |     await page.getByRole("button", { name: "Keluar" }).click();
  52 |   }
  53 | 
  54 |   await page.goto("/login");
  55 |   await page.waitForTimeout(500);
  56 |   await page.getByPlaceholder("Masukkan email").fill(email);
  57 |   await page.getByPlaceholder("Masukkan password").fill(password);
  58 |   await page.getByRole("button", { name: "Masuk" }).click();
  59 | 
  60 |   await expect(page).toHaveURL(/\/dashboard\/donor/);
  61 |   await expect(navbar.getByRole("link", { name: "Dashboard" })).toBeVisible();
  62 |   await expect(navbar.getByRole("button", { name: "Keluar" })).toBeVisible();
  63 |   expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
  64 | });
  65 | 
  66 | test("volunteer dashboard shows role-specific onboarding content", async ({ page }) => {
  67 |   const email = `volunteer.nav.${Date.now()}@pantiku.test`;
  68 |   const password = "Password123!";
  69 | 
  70 |   await registerVolunteer(page, email, password);
  71 |   await page.goto("/login");
  72 |   await page.waitForTimeout(500);
  73 |   await page.getByPlaceholder("Masukkan email").fill(email);
  74 |   await page.getByPlaceholder("Masukkan password").fill(password);
  75 |   await page.getByRole("button", { name: "Masuk" }).click();
  76 | 
> 77 |   await expect(page).toHaveURL(/\/dashboard\/relawan/);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  78 |   await expect(page.getByRole("heading", { name: "Terima Kasih Sudah Ingin Terlibat" })).toBeVisible();
  79 |   await expect(page.getByText("Program Relawan Sedang Disiapkan")).toBeVisible();
  80 | });
  81 | 
```