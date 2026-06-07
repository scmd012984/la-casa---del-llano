"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { conversionCTAs } from "@/lib/data";
import {
  buildQuickReservationMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";

export default function ConversionFab() {
  const pathname = usePathname();

  if (pathname === "/reserva") return null;

  const vipWhatsApp = buildWhatsAppUrl(
    buildQuickReservationMessage("vip", conversionCTAs.vip.label)
  );
  const eventoWhatsApp = buildWhatsAppUrl(
    buildQuickReservationMessage("evento", conversionCTAs.evento.label)
  );

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40 flex flex-col items-end gap-2">
      <a
        href={eventoWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex items-center gap-2 bg-surface-container-highest text-on-surface px-4 py-2 rounded-full text-xs font-semibold border border-outline-variant/40 shadow-lg hover:border-tertiary hover:text-tertiary transition-all"
      >
        <span className="material-symbols-outlined text-base">celebration</span>
        Evento Privado
      </a>
      <div className="flex items-center gap-2">
        <a
          href={vipWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 bg-surface-container-highest text-on-surface px-4 py-2 rounded-full text-xs font-semibold border border-secondary/30 shadow-lg hover:border-secondary hover:text-secondary transition-all"
          aria-label="Reservar VIP por WhatsApp"
        >
          <span className="material-symbols-outlined text-base">chat</span>
          WhatsApp VIP
        </a>
        <Link
          href={conversionCTAs.vip.href}
          className="bg-secondary text-on-secondary p-4 rounded-full shadow-xl hover:shadow-[0_0_20px_rgba(217,160,54,0.5)] transition-all group flex items-center gap-2"
          aria-label="Reservar Mesa VIP"
        >
          <span className="material-symbols-outlined text-3xl">diamond</span>
          <span className="hidden md:inline text-sm font-semibold pr-1">
            Mesa VIP
          </span>
        </Link>
      </div>
    </div>
  );
}
