# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: empty-state.spec.ts >> campaign page shows empty state or demo badge/cards safely
- Location: e2e\empty-state.spec.ts:14:5

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
        - link "Masuk" [ref=e15] [cursor=pointer]:
          - /url: /login
        - link "Gabung Sekarang" [ref=e16] [cursor=pointer]:
          - /url: /register
  - main [ref=e17]:
    - generic [ref=e19]:
      - generic [ref=e20]:
        - paragraph [ref=e21]: Campaign Produktif
        - heading "Jelajahi Campaign" [level=2] [ref=e22]
        - paragraph [ref=e23]: Pilih program yang mendorong anak bertumbuh dan panti menjadi lebih mandiri.
      - generic [ref=e24]:
        - textbox "Cari campaign, panti, atau lokasi..." [ref=e25]
        - combobox [ref=e26]:
          - option "Semua" [selected]
      - generic [ref=e27]:
        - generic [ref=e28]:
          - heading "Campaign pertama sedang disiapkan" [level=3] [ref=e29]
          - paragraph [ref=e30]: Pantiku sedang menyiapkan campaign produktif bersama panti mitra. Nantikan campaign pertama yang sudah terverifikasi.
        - generic [ref=e31]:
          - link "Daftarkan Panti" [ref=e32] [cursor=pointer]:
            - /url: /register
          - link "Hubungi Tim Pantiku" [ref=e33] [cursor=pointer]:
            - /url: /login
  - contentinfo [ref=e34]:
    - generic [ref=e35]:
      - generic [ref=e36]:
        - generic [ref=e37]:
          - img "Pantiku Logo" [ref=e38]
          - generic [ref=e39]: Pantiku
        - paragraph [ref=e40]: Anak Bertumbuh, Panti Mandiri.
        - paragraph [ref=e41]: Pantiku membangun ekosistem digital untuk mendukung pemberdayaan panti dan masa depan anak.
      - generic [ref=e42]:
        - paragraph [ref=e43]: Platform
        - generic [ref=e44]:
          - link "Campaign" [ref=e45] [cursor=pointer]:
            - /url: /campaigns
          - link "Produk Karya Panti" [ref=e46] [cursor=pointer]:
            - /url: /marketplace
          - link "Lihat Dampak" [ref=e47] [cursor=pointer]:
            - /url: /impact
          - link "Panti Berdaya" [ref=e48] [cursor=pointer]:
            - /url: /orphanages
      - generic [ref=e49]:
        - paragraph [ref=e50]: Bergabung
        - generic [ref=e51]:
          - link "Donatur" [ref=e52] [cursor=pointer]:
            - /url: /register
          - link "Pengelola Panti" [ref=e53] [cursor=pointer]:
            - /url: /register
          - link "Relawan" [ref=e54] [cursor=pointer]:
            - /url: /register
          - link "Mitra CSR" [ref=e55] [cursor=pointer]:
            - /url: /register
      - generic [ref=e56]:
        - paragraph [ref=e57]: Kontak
        - generic [ref=e58]:
          - paragraph [ref=e59]: halo@pantiku.id
          - paragraph [ref=e60]: Indonesia
          - link "Hubungi Kami" [ref=e61] [cursor=pointer]:
            - /url: /login
    - generic [ref=e63]: © 2026 Pantiku. Semua hak dilindungi.
  - button "Open Next.js Dev Tools" [ref=e69] [cursor=pointer]:
    - img [ref=e70]
  - alert [ref=e73]
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
  9  |     errors.push(text);
  10 |   });
  11 |   return errors;
  12 | }
  13 | 
  14 | test("campaign page shows empty state or demo badge/cards safely", async ({ page }) => {
  15 |   const consoleErrors = attachConsoleGuard(page);
  16 |   await page.goto("/campaigns");
  17 |   await expect(page.getByRole("heading", { name: "Jelajahi Campaign" })).toBeVisible();
  18 |   await expect.poll(async () => await page.locator("text=Memuat").count(), { timeout: 15_000 }).toBe(0);
  19 | 
  20 |   const emptyState = page.getByRole("heading", { name: "Campaign pertama sedang disiapkan" });
  21 |   const demoBadge = page.getByText("Mode Demo");
  22 |   const campaignCardLink = page.locator('a[href^="/campaigns/"]');
  23 |   await expect
  24 |     .poll(async () => (await emptyState.count()) + (await demoBadge.count()) + (await campaignCardLink.count()), { timeout: 15_000 })
  25 |     .toBeGreaterThan(0);
  26 | 
  27 |   if ((await emptyState.count()) > 0) {
  28 |     await expect(emptyState.first()).toBeVisible();
  29 |   } else {
  30 |     const hasDemoBadge = await demoBadge.isVisible().catch(() => false);
  31 |     const hasAnyCard = (await campaignCardLink.count()) > 0;
  32 |     expect(hasDemoBadge || hasAnyCard).toBeTruthy();
  33 |   }
  34 | 
> 35 |   expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
     |                                                                                   ^ Error: Unexpected console errors: Failed to load resource: net::ERR_CONNECTION_REFUSED
  36 | });
  37 | 
  38 | test("marketplace page shows empty state or demo badge/cards safely", async ({ page }) => {
  39 |   const consoleErrors = attachConsoleGuard(page);
  40 |   await page.goto("/marketplace");
  41 |   await expect(page.getByRole("heading", { name: "Produk Karya Panti" })).toBeVisible();
  42 |   await expect.poll(async () => await page.locator("text=Memuat").count(), { timeout: 15_000 }).toBe(0);
  43 | 
  44 |   const emptyState = page.getByRole("heading", { name: "Produk karya panti segera hadir" });
  45 |   const demoBadge = page.getByText("Mode Demo");
  46 |   const productCardLink = page.locator('a[href^="/marketplace/"]');
  47 |   await expect
  48 |     .poll(async () => (await emptyState.count()) + (await demoBadge.count()) + (await productCardLink.count()), { timeout: 15_000 })
  49 |     .toBeGreaterThan(0);
  50 | 
  51 |   if ((await emptyState.count()) > 0) {
  52 |     await expect(emptyState.first()).toBeVisible();
  53 |   } else {
  54 |     const hasDemoBadge = await demoBadge.isVisible().catch(() => false);
  55 |     const hasAnyCard = (await productCardLink.count()) > 0;
  56 |     expect(hasDemoBadge || hasAnyCard).toBeTruthy();
  57 |   }
  58 | 
  59 |   expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
  60 | });
  61 | 
```