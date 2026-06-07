"use client";

import { menuSections } from "@/lib/stitch-menu";

export default function MenuQuickNav() {
  return (
    <nav
      aria-label="Navegación rápida del menú"
      className="sticky top-[73px] z-40 -mx-4 md:-mx-16 px-4 md:px-16 py-3 mb-10 bg-background/95 backdrop-blur-md border-b border-outline-variant/20"
    >
      <div className="flex gap-2 overflow-x-auto scrollbar-none max-w-[1280px] mx-auto">
        {menuSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="flex items-center gap-1.5 shrink-0 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border border-outline-variant/40 text-on-surface-variant hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all"
          >
            <span className="material-symbols-outlined text-base">
              {section.icon}
            </span>
            {section.label}
          </a>
        ))}
      </div>
      <p className="text-[10px] text-on-surface-variant/70 text-center mt-2 max-w-[1280px] mx-auto">
        Carta digital — consulta antes y durante tu visita
      </p>
    </nav>
  );
}
