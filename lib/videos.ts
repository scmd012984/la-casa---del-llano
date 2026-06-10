/** Fuente de video para <video> */
export type VideoSource = {
  src: string;
  type: "video/mp4" | "video/webm" | "video/quicktime";
};

/**
 * Videos locales en /public/videos
 *
 * Importar clips:
 *   npm run videos:import
 * o arrastrarlos a public/videos/ desde Finder.
 *
 * Para activar un clip en la galería, descomenta su entrada en
 * audiovisualVideoMap y sube WELCOME_VIDEO_VERSION (o el id del clip).
 */
/** Sube este número tras recortar o reemplazar hero-bienvenida.mp4 (evita caché del navegador). */
export const WELCOME_VIDEO_VERSION = 9;

export const KARAOKE_VIDEO_VERSION = 2;

export const RUMBA_PISTA_VIDEO_VERSION = 2;

export const welcomeVideo = {
  poster: "/videos/bienvenida-poster.jpg",
  sources: [
    {
      src: `/videos/hero-bienvenida.mp4?v=${WELCOME_VIDEO_VERSION}`,
      type: "video/mp4",
    },
  ] satisfies VideoSource[],
} as const;

export const karaokeVivoVideo = {
  poster: "/videos/karaoke-vivo-poster.jpg",
  sources: [
    {
      src: `/videos/karaoke-vivo.mp4?v=${KARAOKE_VIDEO_VERSION}`,
      type: "video/mp4",
    },
  ] satisfies VideoSource[],
} as const;

export const rumbaPistaVideo = {
  poster: "/videos/rumba-pista-poster.jpg",
  sources: [
    {
      src: `/videos/rumba-pista.mp4?v=${RUMBA_PISTA_VIDEO_VERSION}`,
      type: "video/mp4",
    },
  ] satisfies VideoSource[],
} as const;

/** Mapa id de galería → archivo en /public/videos */
export const audiovisualVideoMap: Record<
  string,
  { sources: VideoSource[]; poster?: string }
> = {
  bienvenida: welcomeVideo,
  "rumba-pista": rumbaPistaVideo,
  "karaoke-vivo": karaokeVivoVideo,
};

export function hasVideoSources(sources: readonly VideoSource[]) {
  return sources.length > 0;
}
