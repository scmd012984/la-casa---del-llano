"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { seasonalBanner } from "@/lib/data";

const storageKey = `llano-banner-dismiss-${seasonalBanner.id}`;

const bannerListeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  bannerListeners.add(onStoreChange);
  return () => {
    bannerListeners.delete(onStoreChange);
  };
}

function notifyBannerListeners() {
  bannerListeners.forEach((listener) => listener());
}

function getDismissedSnapshot() {
  try {
    return localStorage.getItem(storageKey) === "1";
  } catch {
    return false;
  }
}

export default function SeasonalBanner() {
  const dismissed = useSyncExternalStore(
    subscribe,
    getDismissedSnapshot,
    () => false,
  );

  if (!seasonalBanner.enabled || dismissed) return null;

  function dismiss() {
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
    notifyBannerListeners();
  }

  return (
    <div
      className="site-container pt-3 sm:pt-4"
      role="region"
      aria-label="Aviso de temporada"
    >
      <div className="flex flex-col gap-3 rounded-xl border border-outline-variant/35 bg-surface-container-high/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="min-w-0 pr-2">
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold mb-0.5">
            {seasonalBanner.eyebrow}
          </p>
          <p className="text-sm text-on-surface leading-snug">{seasonalBanner.message}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
          <Link href={seasonalBanner.ctaHref} className="btn-led btn-led--sm">
            {seasonalBanner.ctaLabel}
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant/50 text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Cerrar aviso"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
