"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  isNavSectionActive,
  navbarCTAs,
  navbarLinks,
  restaurantInfo,
} from "@/lib/data";

const brandStars = [
  { top: "48%", delay: "0s" },
  { top: "40%", delay: "-2.5s" },
  { top: "34%", delay: "-5s" },
  { top: "30%", delay: "-7.5s" },
  { top: "30%", delay: "-10s" },
  { top: "34%", delay: "-12.5s" },
  { top: "40%", delay: "-15s" },
  { top: "48%", delay: "-17.5s" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { logo } = restaurantInfo;

  return (
    <nav className="site-glass site-navbar sticky top-0 z-50">
      <div className="site-navbar-inner">
        <Link
          href="/"
          className="nav-brand-lockup group"
          aria-label={restaurantInfo.name}
        >
          <div className="nav-brand-wrap">
            <div className="nav-brand-flag-breeze" aria-hidden>
              <span className="nav-brand-flag-wave nav-brand-flag-wave--yellow" />
              <span className="nav-brand-flag-wave nav-brand-flag-wave--blue" />
              <span className="nav-brand-flag-wave nav-brand-flag-wave--red" />
              <div className="nav-brand-flag-stars">
                {brandStars.map((star, index) => (
                  <span
                    key={index}
                    className="nav-brand-flag-star"
                    style={{ top: star.top, animationDelay: star.delay }}
                  />
                ))}
              </div>
            </div>
            <div className="nav-brand-content">
              <div className="nav-logo-wood-ring shrink-0">
                <div className="nav-logo-shine relative h-[4.25rem] w-[4.25rem] overflow-hidden rounded-full bg-surface-container-lowest sm:h-[5.25rem] sm:w-[5.25rem] md:h-[6.25rem] md:w-[6.25rem]">
                  <Image
                    src={logo.icon.src}
                    alt={logo.icon.alt}
                    width={logo.icon.width}
                    height={logo.icon.height}
                    priority
                    unoptimized
                    className="nav-logo-image h-full w-full object-cover object-[center_42%]"
                  />
                </div>
              </div>
              <span className="nav-brand-wordmark">
                <span className="site-navbar-link nav-brand-wordmark-line">
                  {logo.wordmarkTop}
                </span>
                <span className="site-navbar-link nav-brand-wordmark-line">
                  {logo.wordmarkBottom}
                </span>
              </span>
            </div>
          </div>
        </Link>

        <div className="site-navbar-navlinks shrink-0 items-center">
          {navbarLinks.map((item) => {
            const isActive = isNavSectionActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="site-navbar-link"
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href={navbarCTAs.evento.href} className="site-navbar-link">
            <span className="site-nav-label-long">{navbarCTAs.evento.label}</span>
            <span className="site-nav-label-short">Evento</span>
          </Link>
          <Link href={navbarCTAs.vip.href} className="site-navbar-link">
            <span className="site-nav-label-long">{navbarCTAs.vip.label}</span>
            <span className="site-nav-label-short">Reservar</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
