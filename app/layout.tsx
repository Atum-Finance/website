import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Atum Finance — Product & Engineering Studio for Private Finance",
  description:
    "Atum Finance designs and develops DeFi products, financial infrastructure, smart contracts, and user experiences for Anubis Chain and beyond.",
  keywords: [
    "Atum Finance",
    "Anubis Chain",
    "Privacy DeFi",
    "Zero-Knowledge",
    "ZK Protocols",
    "Product Studio",
    "Web3 Engineering",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo-icon.png", type: "image/png" },
    ],
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
  openGraph: {
    title: "Atum Finance — Product & Engineering Studio for Private Finance",
    description:
      "Atum Finance designs and develops DeFi products, financial infrastructure, smart contracts, and user experiences for Anubis Chain and beyond.",
    type: "website",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
