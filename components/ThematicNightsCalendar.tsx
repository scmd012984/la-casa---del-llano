"use client";

import HoverLiftLetters from "@/components/HoverLiftLetters";
import OptimizedImage, { IMAGE_SIZES } from "@/components/OptimizedImage";
import Link from "next/link";
import { useState } from "react";
import {
  operatingSchedule,
  weeklyNights,
  type WeeklyNightId,
} from "@/lib/data";

const accentClasses = {
  secondary:
    "border-outline-variant bg-surface-container-high text-on-surface",
  tertiary:
    "border-outline-variant bg-surface-container-high text-on-surface",
} as const;

export default function ThematicNightsCalendar() {
  const [activeId, setActiveId] = useState<WeeklyNightId>("jueves");
  const activeNight =
    weeklyNights.find((n) => n.id === activeId) ?? weeklyNights[0];

  return (
    <section
      id="noches"
      className="py-20 md:py-24 bg-surface-container-lowest scroll-mt-20 wood-pattern section-llano"
    >
      <div className="site-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <p className="eyebrow-llano mb-2 hover-lift-letters-wrap">
              <HoverLiftLetters text="Cartelera Semanal" />
            </p>
            <h2 className="font-display text-3xl text-on-surface hover-lift-letters-wrap">
              <HoverLiftLetters text="Noches " />
              <span className="title-accent">
                <HoverLiftLetters text="Temáticas" />
              </span>
            </h2>
            <p className="text-sm text-on-surface-variant mt-2">
              {operatingSchedule.days}, {operatingSchedule.hours}.{" "}
              {operatingSchedule.closedDay}. {operatingSchedule.tuesdayNote}.
            </p>
          </div>
          <Link href="/eventos" className="link-llano">
            Ver cartelera completa →
          </Link>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-1 px-1">
          {weeklyNights.map((night) => {
            const isActive = night.id === activeId;
            const accent =
              accentClasses[night.accent as keyof typeof accentClasses];
            return (
              <button
                key={night.id}
                type="button"
                onClick={() => setActiveId(night.id)}
                className={`night-day-btn shrink-0 min-w-[4.5rem] rounded-xl border px-3 py-4 text-center transition-all ${
                  isActive
                    ? `${accent} shadow-[0_8px_20px_rgba(0,0,0,0.28)] scale-[1.02]`
                    : "border-outline-variant/40 bg-surface-container-low text-on-surface-variant hover:border-outline-variant"
                }`}
              >
                <span className="block text-[10px] font-bold tracking-widest">
                  <HoverLiftLetters text={night.dayShort} />
                </span>
                <span
                  className={`material-symbols-outlined text-xl mt-1 ${
                    isActive ? "" : "opacity-60"
                  }`}
                >
                  {night.icon}
                </span>
              </button>
            );
          })}
        </div>

        <article className="mt-6 rounded-xl card-wood interactive-card">
          <div className="grid md:grid-cols-2">
            <div className="relative h-56 md:h-auto md:min-h-[280px] overflow-hidden rounded-t-xl md:rounded-t-none md:rounded-l-xl">
              <OptimizedImage
                src={activeNight.image}
                alt={activeNight.title}
                fill
                qualityPreset="content"
                sizes={IMAGE_SIZES.card}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/80 via-transparent to-transparent" />
            </div>
            <div className="card-body-safe flex flex-col justify-center md:!py-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs text-on-surface-variant font-semibold uppercase tracking-widest">
                  {activeNight.day}
                </span>
                {"tags" in activeNight && activeNight.tags ? (
                  activeNight.tags.map((badge) => (
                    <span
                      key={badge}
                      className="badge-llano !py-0.5 !px-2 !text-[10px]"
                    >
                      {badge}
                    </span>
                  ))
                ) : (
                  <span className="badge-llano !py-0.5 !px-2 !text-[10px]">
                    {activeNight.tag}
                  </span>
                )}
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-on-surface mb-3 hover-lift-letters-wrap">
                <HoverLiftLetters text={activeNight.title} />
              </h3>
              <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                {activeNight.description}
              </p>
              <p className="text-sm text-on-surface-variant font-semibold mb-6">
                {activeNight.time}
              </p>
              <Link
                href={activeNight.href}
                className={
                  activeNight.thematic
                    ? "btn-led btn-led--sm self-start"
                    : "btn-led btn-led--ghost btn-led--sm self-start"
                }
              >
                {activeNight.ctaLabel}
                <span className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
