"use client";

import OptimizedImage, { IMAGE_SIZES } from "@/components/OptimizedImage";
import HoverLiftLetters from "@/components/HoverLiftLetters";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  isNavSectionActive,
  navbarCTAs,
  navbarLinks,
  restaurantInfo,
} from "@/lib/data";

const brandStars = [
  { top: "34%", left: "3%" },
  { top: "38%", left: "7%" },
  { top: "36%", left: "12%" },
  { top: "32%", left: "26%" },
  { top: "30%", left: "40%" },
  { top: "30%", left: "54%" },
  { top: "32%", left: "68%" },
  { top: "36%", left: "82%" },
  { top: "40%", left: "94%" },
  { top: "34%", left: "48%" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { logo } = restaurantInfo;

  return (
    <nav className="site-glass site-navbar sticky top-0 z-50">
      <div className="site-navbar-inner">
        <Link
          href="/"
          className="nav-brand-lockup group hover-lift-letters-wrap"
          aria-label={restaurantInfo.name}
        >
          <div className="nav-brand-wrap">
            <div className="nav-brand-flag-breeze" aria-hidden>
              <div className="nav-brand-flag-sheet nav-brand-flag-sheet--back" />
              <div className="nav-brand-flag-sheet nav-brand-flag-sheet--front" />
              <div className="nav-brand-flag-stars-field">
                <div className="nav-brand-flag-stars nav-brand-flag-stars--front">
                  {brandStars.map((star, index) => (
                    <span
                      key={index}
                      className="nav-brand-flag-star nav-brand-flag-star--front"
                      style={{ top: star.top, left: star.left }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="nav-brand-content">
              <div className="nav-brand-logo-track">
                <div className="nav-logo-wood-ring shrink-0">
                  <div className="nav-logo-shine relative overflow-hidden rounded-full bg-surface-container-lowest">
                    <OptimizedImage
                      src={logo.icon.src}
                      alt={logo.icon.alt}
                      width={logo.icon.width}
                      height={logo.icon.height}
                      priority
                      qualityPreset="logo"
                      sizes={IMAGE_SIZES.logo}
                      localKey="eslogan-principal"
                      className="nav-logo-image h-full w-full object-contain object-center"
                    />
                  </div>
                </div>
              </div>
              <span className="nav-brand-wordmark">
                <span className="nav-brand-wordmark-line">
                  <HoverLiftLetters text={logo.wordmark} />
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
                className="site-navbar-link hover-lift-letters-wrap"
                aria-current={isActive ? "page" : undefined}
              >
                <HoverLiftLetters text={item.label} />
              </Link>
            );
          })}
          <Link
            href={navbarCTAs.evento.href}
            className="site-navbar-link hover-lift-letters-wrap"
          >
            <span className="site-nav-label-long">
              <HoverLiftLetters text={navbarCTAs.evento.label} />
            </span>
            <span className="site-nav-label-short">
              <HoverLiftLetters text="Evento" />
            </span>
          </Link>
          <Link
            href={navbarCTAs.vip.href}
            className="site-navbar-link hover-lift-letters-wrap"
          >
            <span className="site-nav-label-long">
              <HoverLiftLetters text={navbarCTAs.vip.label} />
            </span>
            <span className="site-nav-label-short">
              <HoverLiftLetters text="Reservar" />
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
