"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { restaurantInfo } from "@/lib/data";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú" },
  { href: "/eventos", label: "Eventos" },
  { href: "/reserva", label: "Reservas" },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-md">
      <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-[1280px] mx-auto">
        <Link
          href="/"
          className="font-display text-2xl text-secondary tracking-tighter hover:text-secondary-fixed-dim transition-colors"
        >
          {restaurantInfo.name.replace(" 2014", "")}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
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
            href="/reserva"
            className="bg-secondary text-on-secondary px-6 py-2 text-base rounded-full scale-95 active:scale-90 transition-transform hover:text-tertiary duration-300"
          >
            Reservar Mesa
          </Link>
        </div>

        <Link href="/menu" className="md:hidden text-on-surface">
          <span className="material-symbols-outlined">menu</span>
        </Link>
      </div>
    </nav>
  );
}
