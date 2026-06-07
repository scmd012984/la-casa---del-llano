"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getWhatsAppFunnelConfig,
  resolveWhatsAppFunnelKey,
  whatsappFunnelSectionsByPath,
  type WhatsAppFunnelConfig,
} from "@/lib/whatsapp-funnel";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function useVisibleSection(pathname: string): string | null {
  const sectionIds = whatsappFunnelSectionsByPath[pathname];
  const tracksSections = Boolean(sectionIds?.length);
  const [sectionsByPath, setSectionsByPath] = useState<
    Record<string, string | null>
  >({});

  useEffect(() => {
    if (!sectionIds?.length) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextSection = visible[0]?.target.id;
        if (nextSection) {
          setSectionsByPath((current) => ({
            ...current,
            [pathname]: nextSection,
          }));
        }
      },
      {
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0, 0.2, 0.45, 0.7, 1],
      }
    );

    elements.forEach((element) => observer.observe(element));

    const syncHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && sectionIds.includes(hash)) {
        setSectionsByPath((current) => ({
          ...current,
          [pathname]: hash,
        }));
      }
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncHash);
    };
  }, [pathname, sectionIds]);

  if (!tracksSections) return null;
  return sectionsByPath[pathname] ?? null;
}

export function useWhatsAppFunnel(): WhatsAppFunnelConfig & {
  whatsappUrl: string;
} {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const visibleSection = useVisibleSection(pathname);
  const eventType = searchParams.get("tipo");

  const config = useMemo(() => {
    const key = resolveWhatsAppFunnelKey({
      pathname,
      section: visibleSection,
      eventType,
    });
    return getWhatsAppFunnelConfig(key);
  }, [pathname, visibleSection, eventType]);

  const whatsappUrl = useMemo(
    () => buildWhatsAppUrl(config.message),
    [config.message]
  );

  return { ...config, whatsappUrl };
}
