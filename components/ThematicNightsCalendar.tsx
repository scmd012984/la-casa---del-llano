"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  operatingSchedule,
  weeklyNights,
  type WeeklyNightId,
} from "@/lib/data";

const accentClasses = {
  secondary: "border-secondary bg-secondary/10 text-secondary",
  tertiary: "border-tertiary bg-tertiary/10 text-tertiary",
} as const;

export default function ThematicNightsCalendar() {
  const [activeId, setActiveId] = useState<WeeklyNightId>(weeklyNights[1].id);
  const activeNight =
    weeklyNights.find((n) => n.id === activeId) ?? weeklyNights[0];

  return (
    <section
      id="noches"
      className="py-20 md:py-24 bg-surface-container-lowest border-y border-outline-variant/20 scroll-mt-20"
    >
      <div className="site-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <p className="text-secondary text-xs uppercase tracking-widest mb-2 font-semibold">
              Cartelera Semanal
            </p>
            <h2 className="font-display text-3xl text-on-surface">
              Noches <span className="text-tertiary italic">Temáticas</span>
            </h2>
            <p className="text-sm text-on-surface-variant mt-2">
              {operatingSchedule.days}, {operatingSchedule.hours}.{" "}
              {operatingSchedule.closedDay}. {operatingSchedule.tuesdayNote}.
            </p>
          </div>
          <Link
            href="/eventos"
            className="text-secondary border-b border-secondary pb-1 text-xs font-semibold uppercase tracking-widest hover:text-tertiary hover:border-tertiary transition-colors"
          >
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
                className={`shrink-0 min-w-[4.5rem] rounded-xl border px-3 py-4 text-center transition-all ${
                  isActive
                    ? `${accent} shadow-[0_0_20px_rgba(217,160,54,0.15)] scale-[1.02]`
                    : "border-outline-variant/40 bg-surface-container-low text-on-surface-variant hover:border-secondary/50"
                }`}
              >
                <span className="block text-[10px] font-bold tracking-widest">
                  {night.dayShort}
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

        <article className="mt-6 rounded-xl stone-outline bg-surface-container overflow-hidden interactive-card">
          <div className="grid md:grid-cols-2">
            <div className="relative h-56 md:h-auto md:min-h-[280px]">
              <Image
                src={activeNight.image}
                alt={activeNight.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={activeNight.id === weeklyNights[1].id}
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/80 via-transparent to-transparent" />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs text-tertiary font-semibold uppercase tracking-widest">
                  {activeNight.day}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${
                    accentClasses[
                      activeNight.accent as keyof typeof accentClasses
                    ]
                  }`}
                >
                  {activeNight.tag}
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-on-surface mb-3">
                {activeNight.title}
              </h3>
              <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                {activeNight.description}
              </p>
              <p className="text-sm text-secondary font-semibold mb-6">
                {activeNight.time}
              </p>
              <Link
                href={activeNight.href}
                className={`inline-flex items-center gap-2 self-start px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  activeNight.thematic
                    ? "bg-secondary text-on-secondary hover:bg-secondary-container"
                    : "border border-outline-variant text-on-surface hover:border-secondary hover:text-secondary"
                }`}
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
