/** Cartelera con fecha ISO — filtra eventos pasados automáticamente. */
export type UpcomingEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  time: string;
  badge: string;
  badgeVariant: "default" | "tertiary";
};

const monthLabels = [
  "ENE",
  "FEB",
  "MAR",
  "ABR",
  "MAY",
  "JUN",
  "JUL",
  "AGO",
  "SEP",
  "OCT",
  "NOV",
  "DIC",
] as const;

export const upcomingEventsCatalog: UpcomingEvent[] = [
  {
    id: "dj-jun-13",
    date: "2026-06-13",
    title: "DJ Invitado de Temporada",
    description:
      "Sesión exclusiva en la pista con mezclas tropicales y rumba hasta el cierre.",
    time: "9:00 p. m. – Cierre",
    badge: "Reservación Sugerida",
    badgeVariant: "default",
  },
  {
    id: "karaoke-jun-20",
    date: "2026-06-20",
    title: "Noche de Estrellas del Karaoke",
    description:
      "Premios para las mejores interpretaciones y escenario profesional toda la noche.",
    time: "8:00 p. m. – 2:00 a. m.",
    badge: "Entrada Libre",
    badgeVariant: "default",
  },
  {
    id: "parranda-jun-27",
    date: "2026-06-27",
    title: "Gran Parranda Llanera",
    description:
      "Música en vivo con arpa invitada, coctelería y ambiente de tarde-noche.",
    time: "3:00 p. m. – 10:00 p. m.",
    badge: "Reservación Sugerida",
    badgeVariant: "default",
  },
  {
    id: "dama-jul-03",
    date: "2026-07-03",
    title: "Noche de Dama Especial",
    description:
      "Promos en coctelería, primera copa de bienvenida y rumba en ambiente VIP.",
    time: "7:00 p. m. – 1:00 a. m.",
    badge: "Promo Mujeres",
    badgeVariant: "tertiary",
  },
  {
    id: "dj-jul-11",
    date: "2026-07-11",
    title: "DJ Sunset Session",
    description:
      "Apertura temprana con DJ, tapas y tragos para arrancar el fin de semana.",
    time: "6:00 p. m. – 12:00 a. m.",
    badge: "Evento Especial",
    badgeVariant: "tertiary",
  },
  {
    id: "karaoke-jul-18",
    date: "2026-07-18",
    title: "Maratón Karaoke Llanero",
    description:
      "Turnos extendidos en escenario, combos de celebración y pista encendida.",
    time: "8:00 p. m. – Cierre",
    badge: "Reservación Sugerida",
    badgeVariant: "default",
  },
];

function todayIsoInCaracas(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Caracas",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function getUpcomingEvents(now = todayIsoInCaracas()) {
  return upcomingEventsCatalog
    .filter((event) => event.date >= now)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export type DisplayEvent = UpcomingEvent & {
  month: string;
  day: string;
  year: string;
};

export function getDisplayUpcomingEvents(): DisplayEvent[] {
  return getUpcomingEvents().map((event) => {
    const [year, month, day] = event.date.split("-");
    return {
      ...event,
      year,
      month: monthLabels[Number(month) - 1] ?? month,
      day: String(Number(day)),
    };
  });
}
