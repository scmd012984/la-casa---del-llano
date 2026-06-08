"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import OptimizedImage, { IMAGE_SIZES } from "@/components/OptimizedImage";
import { audiovisualHighlights } from "@/lib/data";
import type { VideoSource } from "@/lib/videos";

type GalleryHighlight = (typeof audiovisualHighlights)[number];

type ExperienceGalleryVideoCardProps = {
  item: GalleryHighlight;
  sources: readonly VideoSource[];
  poster?: string;
  featured?: boolean;
};

export default function ExperienceGalleryVideoCard({
  item,
  sources,
  poster,
  featured = false,
}: ExperienceGalleryVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!playing) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    setMuted(false);

    void video.play().catch(() => {
      video.muted = true;
      setMuted(true);
      void video.play().catch(() => {
        setPlaying(false);
      });
    });
  }, [playing]);

  const startPlayback = useCallback(() => {
    setPlaying(true);
  }, []);

  const toggleSound = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      const video = videoRef.current;
      if (!video || !playing) return;

      const nextMuted = !video.muted;
      video.muted = nextMuted;
      setMuted(nextMuted);
    },
    [playing],
  );

  return (
    <article
      className={`group card-wood interactive-card experience-gallery-card experience-gallery-card--video ${
        featured ? "experience-gallery-card--featured" : ""
      }`}
    >
      <div className="experience-gallery-media-frame relative overflow-hidden">
        <div className="experience-gallery-media absolute inset-0">
          {playing ? (
            <video
              ref={videoRef}
              className="experience-gallery-video h-full w-full object-cover object-[center_45%]"
              autoPlay
              muted={muted}
              loop
              playsInline
              preload="metadata"
              poster={poster ?? item.thumbnail}
            >
              {sources.map((source) => (
                <source key={source.src} src={source.src} type={source.type} />
              ))}
            </video>
          ) : (
            <OptimizedImage
              src={poster ?? item.thumbnail}
              alt={item.title}
              fill
              qualityPreset="thumb"
              sizes={featured ? IMAGE_SIZES.hero : IMAGE_SIZES.gallery}
              className="object-cover object-[center_45%]"
            />
          )}
        </div>

        {!playing ? (
          <button
            type="button"
            className="absolute inset-0 flex items-center justify-center opacity-80 transition-opacity group-hover:opacity-100"
            onClick={() => void startPlayback()}
            aria-label={`Reproducir ${item.title}`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-highest/90 border border-outline-variant shadow-lg">
              <span className="material-symbols-outlined ml-1 text-3xl text-on-surface">
                play_arrow
              </span>
            </span>
          </button>
        ) : null}
      </div>

      <div className="experience-gallery-caption">
        <div className={playing ? "experience-gallery-caption-body pr-10" : "experience-gallery-caption-body"}>
          {featured ? (
            <p className="text-xs text-on-surface-variant leading-snug">{item.subtitle}</p>
          ) : (
            <>
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                {item.typeLabel}
              </span>
              <h3 className="font-display text-base text-on-surface mt-0.5 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5 leading-snug">{item.subtitle}</p>
            </>
          )}
        </div>
        {playing ? (
          <button
            type="button"
            className="gallery-video-sound-toggle gallery-video-sound-toggle--caption"
            onClick={toggleSound}
            aria-pressed={!muted}
            aria-label={muted ? "Activar sonido del video" : "Silenciar video"}
            title={muted ? "Activar sonido" : "Silenciar"}
          >
            <span className="material-symbols-outlined" aria-hidden>
              {muted ? "volume_off" : "volume_up"}
            </span>
          </button>
        ) : null}
      </div>
    </article>
  );
}
