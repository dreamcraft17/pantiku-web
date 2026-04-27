import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AppQueryProvider } from "@/lib/providers/query-provider";
import { ToastProvider } from "@/components/common/toast-provider";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  metadataBase: new URL("https://pantiku-web.vercel.app"),
  title: "Pantiku",
  description: "Platform pemberdayaan panti asuhan",
  icons: {
    icon: "/Logo/logo.png",
    shortcut: "/Logo/logo.png",
    apple: "/Logo/logo.png"
  },
  openGraph: {
    title: "Pantiku",
    description: "Platform pemberdayaan panti asuhan",
    type: "website",
    url: "https://pantiku-web.vercel.app",
    images: [
      {
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pantiku",
    description: "Platform pemberdayaan panti asuhan",
    images: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      {/* <head>
        <link rel="icon" href="/Logo/logo.png" />
        <link rel="apple-touch-icon" href="/Logo/logo.png" />
      </head> */}
      <body className="min-h-full flex flex-col bg-amber-50/30 text-slate-900">
        <AppQueryProvider>
          <ToastProvider>
            <Navbar />
            <main className="w-full flex-1">
              <PageContainer size="wide" className="py-10">
                {children}
              </PageContainer>
            </main>
            <Footer />
          </ToastProvider>
        </AppQueryProvider>
      </body>
    </html>
  );
}
