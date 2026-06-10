"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

type PlaybackHandlers = {
  mute: () => void;
  stop: () => void;
};

type GalleryVideoPlaybackContextValue = {
  register: (id: string, handlers: PlaybackHandlers) => () => void;
  requestPlay: (id: string) => void;
  muteAll: () => void;
};

const GalleryVideoPlaybackContext =
  createContext<GalleryVideoPlaybackContextValue | null>(null);

export function GalleryVideoPlaybackProvider({ children }: { children: ReactNode }) {
  const handlersRef = useRef<Map<string, PlaybackHandlers>>(new Map());

  const muteAll = useCallback(() => {
    handlersRef.current.forEach((handlers) => handlers.mute());
  }, []);

  const register = useCallback((id: string, handlers: PlaybackHandlers) => {
    handlersRef.current.set(id, handlers);
    return () => {
      handlersRef.current.delete(id);
    };
  }, []);

  const requestPlay = useCallback((id: string) => {
    handlersRef.current.forEach((handlers, registeredId) => {
      if (registeredId !== id) handlers.stop();
    });
  }, []);

  useEffect(() => {
    const onScrollOrMove = () => muteAll();

    window.addEventListener("scroll", onScrollOrMove, { passive: true });
    window.addEventListener("wheel", onScrollOrMove, { passive: true });
    window.addEventListener("touchmove", onScrollOrMove, { passive: true });

    const onVisibility = () => {
      if (document.visibilityState === "hidden") muteAll();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("scroll", onScrollOrMove);
      window.removeEventListener("wheel", onScrollOrMove);
      window.removeEventListener("touchmove", onScrollOrMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [muteAll]);

  const value = useMemo(
    () => ({ register, requestPlay, muteAll }),
    [register, requestPlay, muteAll],
  );

  return (
    <GalleryVideoPlaybackContext.Provider value={value}>
      {children}
    </GalleryVideoPlaybackContext.Provider>
  );
}

export function useGalleryVideoPlayback() {
  return useContext(GalleryVideoPlaybackContext);
}
