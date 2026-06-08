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

export { getDisplayUpcomingEvents, getUpcomingEvents } from "./upcoming-events";
