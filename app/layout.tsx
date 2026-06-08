import type { Metadata, Viewport } from "next";
import ConversionFab from "@/components/ConversionFab";
import Footer from "@/components/Footer";
import LocalBusinessJsonLd from "@/components/LocalBusinessJsonLd";
import MobileBottomNav from "@/components/MobileBottomNav";
import Navbar from "@/components/Navbar";
import { restaurantInfo } from "@/lib/data";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";

const MATERIAL_SYMBOLS_HREF =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: `${restaurantInfo.name} · Disco y Karaoke en La Guaira`,
    template: `%s | ${restaurantInfo.name}`,
  },
  description: restaurantInfo.shortDescription,
  keywords: [...restaurantInfo.seoKeywords],
  applicationName: restaurantInfo.name,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "La Casa del Llano",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    locale: "es_VE",
    siteName: restaurantInfo.name,
    title: `${restaurantInfo.name} · Disco y Karaoke en La Guaira`,
    description: restaurantInfo.shortDescription,
    images: [{ url: restaurantInfo.logo.src, alt: restaurantInfo.logo.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${restaurantInfo.name} · Disco y Karaoke en La Guaira`,
    description: restaurantInfo.shortDescription,
    images: [restaurantInfo.logo.src],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a120b",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={MATERIAL_SYMBOLS_HREF} />
        <link rel="apple-touch-icon" href="/images/logo-icon.png" />
        <LocalBusinessJsonLd />
      </head>
      <body className="min-h-full flex flex-col text-foreground selection:bg-primary-container selection:text-on-surface site-shell">
        <Navbar />
        <main className="flex-1 site-main">{children}</main>
        <Footer />
        <MobileBottomNav />
        <ConversionFab />
      </body>
    </html>
  );
}
