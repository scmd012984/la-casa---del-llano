/** Presets WPO — redes móviles VE (~2.5s LCP objetivo) */
export const IMAGE_QUALITY = {
  hero: 68,
  content: 72,
  thumb: 74,
  menu: 88,
  logo: 80,
} as const;

export const IMAGE_SIZES = {
  hero: "100vw",
  section: "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px",
  card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  gallery: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  menuThumb: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px",
  logo: "152px",
} as const;

export function mediaSrc(localPath: string): string {
  if (!localPath.startsWith("/images/")) return localPath;
  if (localPath.startsWith("/images/opt/")) return localPath;

  const filename = localPath.replace("/images/", "");
  const base = filename.replace(/\.(jpe?g|png|webp)$/i, "");
  return `/images/opt/${base}.webp`;
}

/** Ruta original JPG/PNG como respaldo si falta el WebP optimizado */
export function mediaSrcFallback(localPath: string): string {
  return localPath;
}
