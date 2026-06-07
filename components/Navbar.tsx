"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { conversionCTAs, navLinks, restaurantInfo } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-md">
      <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-[1280px] mx-auto">
        <Link href="/" className="group">
          <span className="font-display text-2xl text-secondary tracking-tighter group-hover:text-secondary-fixed-dim transition-colors block">
            {restaurantInfo.name.replace(" 2014", "")}
          </span>
          <span className="text-[10px] text-on-surface-variant uppercase tracking-widest hidden sm:block">
            {restaurantInfo.tagline}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base transition-colors ${
                  isActive
                    ? "text-secondary-fixed font-bold border-b-2 border-secondary"
                    : "text-on-surface-variant hover:text-secondary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={conversionCTAs.evento.href}
            className="text-on-surface-variant hover:text-secondary text-sm font-semibold transition-colors"
          >
            Evento Privado
          </Link>
          <Link
            href={conversionCTAs.vip.href}
            className="bg-secondary text-on-secondary px-6 py-2 text-base rounded-full scale-95 active:scale-90 transition-transform hover:text-tertiary duration-300"
          >
            {conversionCTAs.vip.label}
          </Link>
        </div>

        <Link href={conversionCTAs.vip.href} className="md:hidden text-secondary">
          <span className="material-symbols-outlined">diamond</span>
        </Link>
      </div>
    </nav>
  );
}
