import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Чисто под Тепето | Професионално почистване Пловдив",
  description:
    "Професионално почистване на домове, офиси и обекти след ремонт в Пловдив. Доверете се на качеството!",
  openGraph: {
    title: "Чисто под Тепето",
    description: "Най-доброто професионално почистване в Пловдив.",
    url: "https://chistopodtepeto.com",
    siteName: "Чисто под Тепето",
    locale: "bg_BG",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body
        className={`${inter.variable} antialiased`}
      >
        <ToastProvider />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
