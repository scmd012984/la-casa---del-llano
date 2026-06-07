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
          className="nav-brand-lockup group hover-lift-letters-wrap"
          aria-label={restaurantInfo.name}
        >
          <div className="nav-brand-wrap">
            <div className="nav-brand-flag-breeze" aria-hidden>
              <div className="nav-brand-flag-beam nav-brand-flag-beam--right" aria-hidden>
                <span className="nav-brand-flag-beam-layer nav-brand-flag-beam-layer--back" />
                <span className="nav-brand-flag-beam-layer nav-brand-flag-beam-layer--front" />
                <span className="nav-brand-flag-beam-core" />
              </div>
              <div className="nav-brand-flag-beam nav-brand-flag-beam--left" aria-hidden>
                <span className="nav-brand-flag-beam-layer nav-brand-flag-beam-layer--back" />
                <span className="nav-brand-flag-beam-layer nav-brand-flag-beam-layer--front" />
                <span className="nav-brand-flag-beam-core" />
              </div>
              <div
                className="nav-brand-flag-beam nav-brand-flag-beam--top nav-brand-flag-beam--vertical"
                aria-hidden
              >
                <span className="nav-brand-flag-beam-layer nav-brand-flag-beam-layer--back" />
                <span className="nav-brand-flag-beam-layer nav-brand-flag-beam-layer--front" />
                <span className="nav-brand-flag-beam-core" />
              </div>
              <div className="nav-brand-flag-sheet nav-brand-flag-sheet--back" />
              <div className="nav-brand-flag-sheet nav-brand-flag-sheet--front" />
              <div className="nav-brand-flag-stars-field">
                <div className="nav-brand-flag-stars nav-brand-flag-stars--back">
                  {brandStars.map((star, index) => (
                    <span
                      key={`back-${index}`}
                      className="nav-brand-flag-star nav-brand-flag-star--back"
                      style={{ top: star.top, animationDelay: star.delay }}
                    />
                  ))}
                </div>
                <div className="nav-brand-flag-stars nav-brand-flag-stars--front">
                  {brandStars.map((star, index) => (
                    <span
                      key={`front-${index}`}
                      className="nav-brand-flag-star nav-brand-flag-star--front"
                      style={{ top: star.top, animationDelay: star.delay }}
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
                      className="nav-logo-image h-full w-full object-cover object-[center_42%]"
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
