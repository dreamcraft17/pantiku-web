# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: impact.spec.ts >> impact page shows honest state for real or demo mode
- Location: e2e\impact.spec.ts:15:5

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
    - generic [ref=e18]:
      - generic [ref=e19]:
        - paragraph [ref=e20]: Impact Dashboard
        - heading "Dampak Nyata Bersama Pantiku" [level=1] [ref=e21]
        - paragraph [ref=e22]: Setiap dukungan membantu anak bertumbuh dan panti menjadi mandiri
      - generic [ref=e23]:
        - generic [ref=e24]:
          - generic [ref=e25]:
            - paragraph [ref=e26]: Anak Terjangkau
            - generic [ref=e27]: 🧒
          - paragraph [ref=e28]: "0"
        - generic [ref=e29]:
          - generic [ref=e30]:
            - paragraph [ref=e31]: Panti Terverifikasi
            - generic [ref=e32]: 🏠
          - paragraph [ref=e33]: "0"
        - generic [ref=e34]:
          - generic [ref=e35]:
            - paragraph [ref=e36]: Campaign Aktif
            - generic [ref=e37]: 🎯
          - paragraph [ref=e38]: "0"
        - generic [ref=e39]:
          - generic [ref=e40]:
            - paragraph [ref=e41]: Produk Terjual
            - generic [ref=e42]: 🛍️
          - paragraph [ref=e43]: "0"
        - generic [ref=e44]:
          - generic [ref=e45]:
            - paragraph [ref=e46]: Total Dukungan
            - generic [ref=e47]: 💚
          - paragraph [ref=e48]: Rp 0
      - generic [ref=e49]:
        - heading "Dari Donasi ke Kemandirian" [level=2] [ref=e50]
        - paragraph [ref=e51]: "Setiap kontribusi menggerakkan siklus dampak berkelanjutan: campaign produktif mendanai pelatihan keterampilan, keterampilan menghasilkan produk karya panti, lalu penjualan produk menghadirkan pemasukan untuk program berikutnya. Dampak tidak berhenti di satu transaksi, tetapi tumbuh menjadi ekosistem kemandirian."
        - generic [ref=e52]:
          - generic [ref=e53]: Campaign
          - generic [ref=e54]: Skill
          - generic [ref=e55]: Produk
          - generic [ref=e56]: Income
      - generic [ref=e57]:
        - heading "Ayo lanjutkan dampaknya" [level=3] [ref=e58]
        - paragraph [ref=e59]: Pilih campaign produktif dan bantu panti membangun kemandirian jangka panjang.
        - link "Dukung Campaign Sekarang" [ref=e61] [cursor=pointer]:
          - /url: /campaigns
  - contentinfo [ref=e62]:
    - generic [ref=e63]:
      - generic [ref=e64]:
        - generic [ref=e65]:
          - img "Pantiku Logo" [ref=e66]
          - generic [ref=e67]: Pantiku
        - paragraph [ref=e68]: Anak Bertumbuh, Panti Mandiri.
        - paragraph [ref=e69]: Pantiku membangun ekosistem digital untuk mendukung pemberdayaan panti dan masa depan anak.
      - generic [ref=e70]:
        - paragraph [ref=e71]: Platform
        - generic [ref=e72]:
          - link "Campaign" [ref=e73] [cursor=pointer]:
            - /url: /campaigns
          - link "Produk Karya Panti" [ref=e74] [cursor=pointer]:
            - /url: /marketplace
          - link "Lihat Dampak" [ref=e75] [cursor=pointer]:
            - /url: /impact
          - link "Panti Berdaya" [ref=e76] [cursor=pointer]:
            - /url: /orphanages
      - generic [ref=e77]:
        - paragraph [ref=e78]: Bergabung
        - generic [ref=e79]:
          - link "Donatur" [ref=e80] [cursor=pointer]:
            - /url: /register
          - link "Pengelola Panti" [ref=e81] [cursor=pointer]:
            - /url: /register
          - link "Relawan" [ref=e82] [cursor=pointer]:
            - /url: /register
          - link "Mitra CSR" [ref=e83] [cursor=pointer]:
            - /url: /register
      - generic [ref=e84]:
        - paragraph [ref=e85]: Kontak
        - generic [ref=e86]:
          - paragraph [ref=e87]: halo@pantiku.id
          - paragraph [ref=e88]: Indonesia
          - link "Hubungi Kami" [ref=e89] [cursor=pointer]:
            - /url: /login
    - generic [ref=e91]: © 2026 Pantiku. Semua hak dilindungi.
  - button "Open Next.js Dev Tools" [ref=e97] [cursor=pointer]:
    - img [ref=e98]
  - alert [ref=e101]
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
  15 | test("impact page shows honest state for real or demo mode", async ({ page }) => {
  16 |   const consoleErrors = attachConsoleGuard(page);
  17 |   await page.goto("/impact");
  18 |   await expect(page.getByRole("heading", { name: "Dampak Nyata Bersama Pantiku" })).toBeVisible();
  19 | 
  20 |   const demoBadgeVisible = await page.getByText("Mode Demo").first().isVisible().catch(() => false);
  21 |   const emptyRealVisible = await page.getByText("Data dampak sedang disiapkan").first().isVisible().catch(() => false);
> 22 |   expect(demoBadgeVisible || emptyRealVisible).toBeTruthy();
     |                                                ^ Error: expect(received).toBeTruthy()
  23 | 
  24 |   await expect(page.getByText("+17% bulan ini")).toHaveCount(0);
  25 |   expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
  26 | });
  27 | 
  28 | test("impact page does not show legacy hardcoded values", async ({ page }) => {
  29 |   await page.goto("/impact");
  30 |   await expect(page.getByText("Rp 45.450.000")).toHaveCount(0);
  31 |   await expect(page.getByText("+17% bulan ini")).toHaveCount(0);
  32 |   await expect(page.getByText(/\b63\b/)).toHaveCount(0);
  33 |   await expect(page.getByText(/\b182\b/)).toHaveCount(0);
  34 | });
  35 | 
```