import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paysmallsmall.app"),
  title: {
    default: "Paysmallsmall - Shop Products & Services Online",
    template: "%s | Paysmallsmall",
  },
  description: "Your trusted e-commerce platform. Shop products, find services, and get great deals with flexible payment options.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "/",
    siteName: "Paysmallsmall",
    title: "Paysmallsmall - Shop Products & Services Online",
    description: "Shop products and services with secure, flexible payment options in Ghana.",
  },
  twitter: {
    card: "summary",
    title: "Paysmallsmall - Shop Products & Services Online",
    description: "Shop products and services with secure, flexible payment options in Ghana.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
