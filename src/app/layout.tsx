import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { siteConfig } from "@/config/site";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const defaultTitle = "Atum Finance — The Protection Layer for Digital Assets";

const metadataBase = siteConfig.url
  ? new URL(siteConfig.url)
  : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: defaultTitle,
    template: "%s — Atum Finance",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    ...(siteConfig.url ? { url: siteConfig.url } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(siteConfig.url
    ? {
        alternates: {
          canonical: siteConfig.url,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="font-sans antialiased">
        <SkipToContent />
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
