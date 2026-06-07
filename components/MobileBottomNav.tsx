"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items: {
  href: string;
  label: string;
  icon: string;
  match?: (path: string) => boolean;
}[] = [
  { href: "/", label: "Inicio", icon: "home", match: (p) => p === "/" },
  { href: "/eventos", label: "Rumba", icon: "nightlife", match: (p) => p === "/eventos" },
  { href: "/menu", label: "Tragos", icon: "local_bar", match: (p) => p === "/menu" },
  { href: "/reserva", label: "Reservas", icon: "event_available", match: (p) => p === "/reserva" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-lg border-t border-outline-variant/20 z-[100] px-4 py-3">
      <div className="flex justify-between items-center">
        {items.map((item) => {
          const isActive = item.match ? item.match(pathname) : pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center ${
                isActive ? "text-secondary" : "text-on-surface-variant"
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={
                  isActive ? { fontVariationSettings: "'FILL' 1" } : undefined
                }
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-semibold tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
