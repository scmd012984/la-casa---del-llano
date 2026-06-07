import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import ConversionFab from "@/components/ConversionFab";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import Navbar from "@/components/Navbar";
import { restaurantInfo } from "@/lib/data";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: restaurantInfo.name,
    template: `%s | ${restaurantInfo.name}`,
  },
  description: restaurantInfo.shortDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${newsreader.variable} ${manrope.variable} site-page-bg dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-foreground selection:bg-tertiary selection:text-on-tertiary site-shell">
        <Navbar />
        <main className="flex-1 site-main">{children}</main>
        <Footer />
        <MobileBottomNav />
        <ConversionFab />
      </body>
    </html>
  );
}
