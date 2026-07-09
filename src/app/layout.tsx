import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { PwaRegister } from "@/features/pwa/components/pwa-register";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Monster Notebook Redesign | Frontend Case Study",
  description:
    "Next.js, TypeScript, Tailwind CSS ve PWA destekli Monster Notebook arayüz çalışması.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#7ed321",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
