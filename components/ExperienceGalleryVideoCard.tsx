"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useGalleryVideoPlayback } from "@/components/GalleryVideoPlaybackContext";
import OptimizedImage, { IMAGE_SIZES } from "@/components/OptimizedImage";
import { audiovisualHighlights } from "@/lib/data";
import type { VideoSource } from "@/lib/videos";

type GalleryHighlight = (typeof audiovisualHighlights)[number];

type ExperienceGalleryVideoCardProps = {
  item: GalleryHighlight;
  sources: readonly VideoSource[];
  poster?: string;
  featured?: boolean;
  compact?: boolean;
};

export default function ExperienceGalleryVideoCard({
  item,
  sources,
  poster,
  featured = false,
  compact = false,
}: ExperienceGalleryVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const preferSoundRef = useRef(false);
  const playback = useGalleryVideoPlayback();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const mutePlayback = useCallback(() => {
    const video = videoRef.current;
    if (video) video.muted = true;
    setMuted(true);
  }, []);

  const stopPlayback = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.muted = true;
    }
    setPlaying(false);
    setMuted(true);
  }, []);

  useEffect(() => {
    if (!playback) return;
    return playback.register(item.id, { mute: mutePlayback, stop: stopPlayback });
  }, [item.id, playback, mutePlayback, stopPlayback]);

  useEffect(() => {
    if (!playing) return;

    const video = videoRef.current;
    if (!video) return;

    if (preferSoundRef.current) {
      video.muted = false;
      setMuted(false);
      preferSoundRef.current = false;
    }

    void video.play().catch(() => {
      video.muted = true;
      setMuted(true);
      void video.play().catch(() => {
        stopPlayback();
      });
    });
  }, [playing, stopPlayback]);

  useEffect(() => {
    if (!playing || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || entry.intersectionRatio < 0.35) {
          mutePlayback();
        }
      },
      { threshold: [0, 0.35, 0.55] },
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [playing, mutePlayback]);

  const startPlayback = useCallback(() => {
    playback?.requestPlay(item.id);
    preferSoundRef.current = true;
    setPlaying(true);
  }, [item.id, playback]);

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

  if (compact) {
    return (
      <article
        ref={cardRef}
        className="group relative aspect-[3/4] overflow-hidden rounded-xl led-thread-border experience-gallery-card experience-gallery-card--video experience-gallery-card--compact"
      >
        <div className="experience-gallery-media absolute inset-0">
          {playing ? (
            <video
              ref={videoRef}
              className="experience-gallery-video h-full w-full object-cover object-center"
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
              sizes={IMAGE_SIZES.gallery}
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
        {!playing ? (
          <button
            type="button"
            className="absolute inset-0 flex items-center justify-center opacity-80 transition-opacity group-hover:opacity-100"
            onClick={() => void startPlayback()}
            aria-label={`Reproducir ${item.title}`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-highest/90 border border-outline-variant shadow-lg">
              <span className="material-symbols-outlined ml-0.5 text-2xl text-on-surface">
                play_arrow
              </span>
            </span>
          </button>
        ) : (
          <button
            type="button"
            className="gallery-video-sound-toggle gallery-video-sound-toggle--overlay"
            onClick={toggleSound}
            aria-pressed={!muted}
            aria-label={muted ? "Activar sonido del video" : "Silenciar video"}
            title={muted ? "Activar sonido" : "Silenciar"}
          >
            <span className="material-symbols-outlined" aria-hidden>
              {muted ? "volume_off" : "volume_up"}
            </span>
          </button>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 pointer-events-none">
          {item.typeLabel ? (
            <span className="text-[9px] uppercase tracking-widest text-on-surface-variant font-semibold">
              {item.typeLabel}
            </span>
          ) : null}
          <h3 className="font-display text-sm text-on-surface mt-0.5 leading-snug">
            {item.title}
          </h3>
          <p className="text-[11px] text-on-surface-variant leading-snug">{item.subtitle}</p>
        </div>
      </article>
    );
  }

  return (
    <article
      ref={cardRef}
      className={`group led-thread-border experience-gallery-card experience-gallery-card--video ${
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
        <div
          className={
            playing ? "experience-gallery-caption-body pr-10" : "experience-gallery-caption-body"
          }
        >
          {featured ? (
            <p className="text-xs text-on-surface-variant leading-snug">{item.subtitle}</p>
          ) : (
            <>
              {item.typeLabel ? (
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                  {item.typeLabel}
                </span>
              ) : null}
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
