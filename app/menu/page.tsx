import type { Metadata } from "next";
import Link from "next/link";
import DigitalMenu from "@/components/DigitalMenu";
import PaymentMethodsPanel from "@/components/PaymentMethodsPanel";
import { conversionCTAs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Carta Digital — Tragos y Tapas",
  description:
    "Carta web interactiva de coctelería de autor, botellas VIP, baldes de cerveza y tapas para compartir. Optimizada para consultar en la barra.",
};

export default function MenuPage() {
  return (
    <div className="digital-menu-page min-h-screen">
      <div className="site-container py-8 sm:py-10 md:py-12">
        <header className="digital-menu-hero mb-8 md:mb-10">
          <p className="digital-menu-eyebrow">La Barra de la Rumba</p>
          <h1 className="digital-menu-title">Carta Digital</h1>
          <p className="digital-menu-lead">
            Tragos, coctelería de autor, botellas VIP y tapas para compartir.
            Consulta la carta en tu móvil directamente en la mesa — sin PDF.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link href={conversionCTAs.vip.href} className="digital-menu-cta">
              {conversionCTAs.vip.label}
            </Link>
            <Link
              href={conversionCTAs.evento.href}
              className="digital-menu-cta digital-menu-cta--outline"
            >
              {conversionCTAs.evento.label}
            </Link>
          </div>
        </header>

        <DigitalMenu />

        <div className="mt-14 md:mt-16">
          <PaymentMethodsPanel variant="full" />
        </div>

        <section className="digital-menu-footer-cta mt-16 md:mt-20">
          <h2 className="font-display text-xl md:text-2xl text-on-surface mb-2">
            ¿Reservas para un evento con barra y catering?
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base mb-6 max-w-lg">
            Paquetes de tragos selectos, tapas y karaoke para cumpleaños, bodas,
            despedidas y rumbas privadas.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={conversionCTAs.evento.href} className="digital-menu-cta">
              {conversionCTAs.evento.label}
            </Link>
            <Link
              href={conversionCTAs.vip.href}
              className="digital-menu-cta digital-menu-cta--outline"
            >
              {conversionCTAs.vip.label}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
