"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

type StopPlayback = () => void;

type GalleryVideoPlaybackContextValue = {
  register: (id: string, stop: StopPlayback) => () => void;
  requestPlay: (id: string) => void;
};

const GalleryVideoPlaybackContext =
  createContext<GalleryVideoPlaybackContextValue | null>(null);

export function GalleryVideoPlaybackProvider({ children }: { children: ReactNode }) {
  const stopsRef = useRef<Map<string, StopPlayback>>(new Map());

  const register = useCallback((id: string, stop: StopPlayback) => {
    stopsRef.current.set(id, stop);
    return () => {
      stopsRef.current.delete(id);
    };
  }, []);

  const requestPlay = useCallback((id: string) => {
    stopsRef.current.forEach((stop, registeredId) => {
      if (registeredId !== id) stop();
    });
  }, []);

  const value = useMemo(
    () => ({ register, requestPlay }),
    [register, requestPlay],
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
