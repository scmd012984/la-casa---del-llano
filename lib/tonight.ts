import {
  operatingSchedule,
  weeklyNights,
  type WeeklyNightId,
} from "@/lib/data";

const VENUE_TIMEZONE = "America/Caracas";

const weekdayToNightId: Record<number, WeeklyNightId | "closed"> = {
  0: "domingo",
  1: "closed",
  2: "martes",
  3: "miercoles",
  4: "jueves",
  5: "viernes",
  6: "sabado",
};

function getCaracasWeekday(): number {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: VENUE_TIMEZONE,
    weekday: "short",
  }).format(new Date());

  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return map[weekday] ?? new Date().getDay();
}

export function getTonightHighlight() {
  const nightId = weekdayToNightId[getCaracasWeekday()];

  if (nightId === "closed") {
    return {
      isOpen: false as const,
      headline: "Hoy descansamos",
      summary: `${operatingSchedule.closedDay}. Volvemos ${operatingSchedule.days}.`,
      hours: operatingSchedule.hours,
    };
  }

  const night = weeklyNights.find((entry) => entry.id === nightId)!;
  const tags = "tags" in night && night.tags ? night.tags : [night.tag];

  return {
    isOpen: true as const,
    nightId: night.id,
    headline: `Esta noche: ${night.title}`,
    summary: night.description,
    hours: night.time,
    tags,
    href: night.href,
    ctaLabel: night.ctaLabel,
  };
}
