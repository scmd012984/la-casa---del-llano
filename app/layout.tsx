import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import ConversionFab from "@/components/ConversionFab";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      className={`${newsreader.variable} ${manrope.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-tertiary selection:text-on-tertiary">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConversionFab />
      </body>
    </html>
  );
}
