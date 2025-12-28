import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import BackgroundEffects from "@/components/BackgroundEffects";
import ClerkProviderWrapper from "@/components/ClerkProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KodNeYapar? - Yapay Zeka Destekli Kod Analizi",
  description: "Kodunuzu saniyeler içinde analiz edin, açıklayın ve iyileştirin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProviderWrapper>
            <BackgroundEffects />
            <div className="relative z-10">
              {children}
            </div>
          </ClerkProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
