# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: empty-state.spec.ts >> marketplace page shows empty state or demo badge/cards safely
- Location: e2e\empty-state.spec.ts:38:5

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
    - generic [ref=e18]:
      - generic [ref=e19]:
        - paragraph [ref=e20]: Marketplace
        - heading "Produk Karya Panti" [level=2] [ref=e21]
        - paragraph [ref=e22]: Setiap pembelian mendukung program produktif dan kemandirian panti.
      - generic [ref=e23]:
        - textbox "Cari produk atau panti..." [ref=e24]
        - combobox [ref=e25]:
          - option "Semua" [selected]
      - generic [ref=e26]:
        - generic [ref=e27]:
          - heading "Produk karya panti segera hadir" [level=3] [ref=e28]
          - paragraph [ref=e29]: Marketplace Pantiku akan menampilkan produk dari panti mitra setelah proses kurasi dan verifikasi selesai.
        - link "Saya Pengelola Panti" [ref=e30] [cursor=pointer]:
          - /url: /register
  - contentinfo [ref=e31]:
    - generic [ref=e32]:
      - generic [ref=e33]:
        - generic [ref=e34]:
          - img "Pantiku Logo" [ref=e35]
          - generic [ref=e36]: Pantiku
        - paragraph [ref=e37]: Anak Bertumbuh, Panti Mandiri.
        - paragraph [ref=e38]: Pantiku membangun ekosistem digital untuk mendukung pemberdayaan panti dan masa depan anak.
      - generic [ref=e39]:
        - paragraph [ref=e40]: Platform
        - generic [ref=e41]:
          - link "Campaign" [ref=e42] [cursor=pointer]:
            - /url: /campaigns
          - link "Produk Karya Panti" [ref=e43] [cursor=pointer]:
            - /url: /marketplace
          - link "Lihat Dampak" [ref=e44] [cursor=pointer]:
            - /url: /impact
          - link "Panti Berdaya" [ref=e45] [cursor=pointer]:
            - /url: /orphanages
      - generic [ref=e46]:
        - paragraph [ref=e47]: Bergabung
        - generic [ref=e48]:
          - link "Donatur" [ref=e49] [cursor=pointer]:
            - /url: /register
          - link "Pengelola Panti" [ref=e50] [cursor=pointer]:
            - /url: /register
          - link "Relawan" [ref=e51] [cursor=pointer]:
            - /url: /register
          - link "Mitra CSR" [ref=e52] [cursor=pointer]:
            - /url: /register
      - generic [ref=e53]:
        - paragraph [ref=e54]: Kontak
        - generic [ref=e55]:
          - paragraph [ref=e56]: halo@pantiku.id
          - paragraph [ref=e57]: Indonesia
          - link "Hubungi Kami" [ref=e58] [cursor=pointer]:
            - /url: /login
    - generic [ref=e60]: © 2026 Pantiku. Semua hak dilindungi.
  - button "Open Next.js Dev Tools" [ref=e66] [cursor=pointer]:
    - img [ref=e67]
  - alert [ref=e70]
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
  35 |   expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
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
> 59 |   expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
     |                                                                                   ^ Error: Unexpected console errors: Failed to load resource: net::ERR_CONNECTION_REFUSED
  60 | });
  61 | 
```