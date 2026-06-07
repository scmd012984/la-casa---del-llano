import { images } from "./images";

/** Imágenes locales — sin CDN externo (WPO móvil VE) */
export const stitchEventosImages = {
  hero: images.fachada,
  karaoke: images.karaoke,
  arpa: images.arpa,
} as const;

export const stitchImages = {
  fachada: images.fachada,
  hero: images.fachada,
  karaoke: images.karaoke,
  arpa: images.arpa,
  gastronomia: images.gastronomia,
  empanadas: images.empanadas,
  tequenos: images.tequenos,
  carneFrita: images.carneFrita,
  camarones: images.camarones,
  pescado: images.pescado,
  bebidas: images.bebidas,
  rumba: images.rumba,
  terraza: images.terraza,
} as const;

export const stitchUpcomingEvents = [
  {
    month: "OCT",
    day: "24",
    title: "Noche de Estrellas del Karaoke",
    description: "Premios en efectivo para las mejores interpretaciones.",
    time: "8:00 p. m. – 2:00 a. m.",
    badge: "Entrada Libre",
    badgeVariant: "default" as const,
  },
  {
    month: "OCT",
    day: "26",
    title: "Gran Parranda Llanera",
    description: "Con el maestro del Arpa invitada desde los llanos centrales.",
    time: "3:00 p. m. – 10:00 p. m.",
    badge: "Reservación Sugerida",
    badgeVariant: "default" as const,
  },
  {
    month: "OCT",
    day: "31",
    title: "Fiesta de Halloween Rumbera",
    description: "Concurso de disfraces y orquesta en vivo toda la noche.",
    time: "9:00 p. m. – Cierre",
    badge: "Evento Especial",
    badgeVariant: "tertiary" as const,
  },
] as const;
