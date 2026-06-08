"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavSectionActive, siteArchitecture } from "@/lib/data";

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal móvil"
      className="mobile-bottom-nav site-glass md:hidden fixed bottom-0 left-0 right-0 z-[100] px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]"
    >
      <div className="mobile-bottom-nav-inner">
        {siteArchitecture.sections.map((section) => {
          const isActive = isNavSectionActive(pathname, section.href);
          return (
            <Link
              key={section.id}
              href={section.href}
              className="mobile-bottom-nav-link"
              aria-current={isActive ? "page" : undefined}
            >
              <span className="material-symbols-outlined mobile-bottom-nav-icon">
                {section.icon}
              </span>
              <span className="site-navbar-link mobile-bottom-nav-label">
                {section.mobileLabel}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
