# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: impact.spec.ts >> impact page shows honest state for real or demo mode
- Location: e2e\impact.spec.ts:16:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
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
    - paragraph [ref=e23]: Memuat data...
  - contentinfo [ref=e60]:
    - generic [ref=e61]:
      - generic [ref=e62]:
        - generic [ref=e63]:
          - img "Pantiku Logo" [ref=e64]
          - generic [ref=e65]: Pantiku
        - paragraph [ref=e66]: Anak Bertumbuh, Panti Mandiri.
        - paragraph [ref=e67]: Pantiku membangun ekosistem digital untuk mendukung pemberdayaan panti dan masa depan anak.
      - generic [ref=e68]:
        - paragraph [ref=e69]: Platform
        - generic [ref=e70]:
          - link "Campaign" [ref=e71] [cursor=pointer]:
            - /url: /campaigns
          - link "Produk Karya Panti" [ref=e72] [cursor=pointer]:
            - /url: /marketplace
          - link "Lihat Dampak" [ref=e73] [cursor=pointer]:
            - /url: /impact
          - link "Panti Berdaya" [ref=e74] [cursor=pointer]:
            - /url: /orphanages
      - generic [ref=e75]:
        - paragraph [ref=e76]: Bergabung
        - generic [ref=e77]:
          - link "Donatur" [ref=e78] [cursor=pointer]:
            - /url: /register
          - link "Pengelola Panti" [ref=e79] [cursor=pointer]:
            - /url: /register
          - link "Relawan" [ref=e80] [cursor=pointer]:
            - /url: /register
          - link "Mitra CSR" [ref=e81] [cursor=pointer]:
            - /url: /register
      - generic [ref=e82]:
        - paragraph [ref=e83]: Kontak
        - generic [ref=e84]:
          - paragraph [ref=e85]: halo@pantiku.id
          - paragraph [ref=e86]: Indonesia
          - link "Hubungi Kami" [ref=e87] [cursor=pointer]:
            - /url: /login
    - generic [ref=e89]: © 2026 Pantiku. Semua hak dilindungi.
  - button "Open Next.js Dev Tools" [ref=e95] [cursor=pointer]:
    - img [ref=e96]
  - alert [ref=e99]
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
  10 |     if (text.includes("Failed to load resource") && text.includes("ERR_CONNECTION_REFUSED")) return;
  11 |     errors.push(text);
  12 |   });
  13 |   return errors;
  14 | }
  15 | 
  16 | test("impact page shows honest state for real or demo mode", async ({ page }) => {
  17 |   const consoleErrors = attachConsoleGuard(page);
  18 |   await page.goto("/impact");
  19 |   const impactHeadingVisible = await page
  20 |     .getByRole("heading", { name: "Dampak Nyata Bersama Pantiku" })
  21 |     .isVisible()
  22 |     .catch(() => false);
  23 |   const errorStateVisible = await page.getByText("Data dampak belum dapat dimuat.").isVisible().catch(() => false);
> 24 |   expect(impactHeadingVisible || errorStateVisible).toBeTruthy();
     |                                                     ^ Error: expect(received).toBeTruthy()
  25 | 
  26 |   if (impactHeadingVisible) {
  27 |     const demoBadgeVisible = await page.getByText("Mode Demo").first().isVisible().catch(() => false);
  28 |     const emptyRealVisible = await page.getByText("Data dampak sedang disiapkan").first().isVisible().catch(() => false);
  29 |     expect(demoBadgeVisible || emptyRealVisible).toBeTruthy();
  30 |   }
  31 | 
  32 |   await expect(page.getByText("+17% bulan ini")).toHaveCount(0);
  33 |   expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
  34 | });
  35 | 
  36 | test("impact page does not show legacy hardcoded values", async ({ page }) => {
  37 |   await page.goto("/impact");
  38 |   await expect(page.getByText("Rp 45.450.000")).toHaveCount(0);
  39 |   await expect(page.getByText("+17% bulan ini")).toHaveCount(0);
  40 |   await expect(page.getByText(/\b63\b/)).toHaveCount(0);
  41 |   await expect(page.getByText(/\b182\b/)).toHaveCount(0);
  42 | });
  43 | 
```