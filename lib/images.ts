export const images = {
  fachada: "/images/fachada.jpg",
  fachadaNegocio: "/images/fachada-negocio.jpg",
  gastronomia: "/images/gastronomia.jpg",
  terraza: "/images/terraza.jpg",
  rumba: "/images/rumba.jpg",
  empanadas: "/images/empanadas.jpg",
  tequenos: "/images/tequenos.jpg",
  carneFrita: "/images/carne-frita.jpg",
  camarones: "/images/camarones.jpg",
  pescado: "/images/pescado.jpg",
  bebidas: "/images/bebidas.jpg",
  arpa: "/images/arpa.jpg",
  karaoke: "/images/karaoke.jpg",
} as const;

export type ImageKey = keyof typeof images;
