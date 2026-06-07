import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import CelebrationCombos from "@/components/CelebrationCombos";
import ReservationForm from "@/components/ReservationForm";
import {
  conversionCTAs,
  eventReservationTypes,
  celebrationCombos,
  restaurantInfo,
  specialties,
  targetAudience,
} from "@/lib/data";
import { stitchEventosImages } from "@/lib/stitch-images";

export const metadata: Metadata = {
  title: "Reservas VIP y Eventos Privados",
  description:
    "Reserva mesa VIP o evento privado con comida y servicio de botellas. Confirmación inmediata por WhatsApp en La Guaira.",
};

type ReservaPageProps = {
  searchParams: Promise<{ tipo?: string }>;
};

export default async function ReservaPage({ searchParams }: ReservaPageProps) {
  const { tipo } = await searchParams;
  return (
    <div>
      <header className="relative min-h-[45vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={stitchEventosImages.karaoke}
            alt="Reservas para eventos en La Casa del Llano"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45 grayscale-[0.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 grain-texture" />
        </div>
        <div className="site-container relative z-10 w-full pb-10 pt-8 sm:pb-12 md:pt-10">
          <span className="inline-block mb-3 px-4 py-1 bg-tertiary-container text-tertiary rounded-full text-xs uppercase tracking-widest border border-tertiary/30 font-semibold">
            Reservas para todo tipo de eventos
          </span>
          <h1 className="type-hero-title text-on-surface">
            Reserva tu Experiencia
          </h1>
          <p className="text-base text-on-surface-variant mt-3 max-w-xl">
            Mesa VIP y eventos privados con comida, servicio de botellas y
            karaoke. Confirmación inmediata por WhatsApp.{" "}
            {targetAudience.familyPolicy}
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href={conversionCTAs.vip.href}
              className="bg-secondary text-on-secondary px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-secondary-container transition-colors"
            >
              {conversionCTAs.vip.label}
            </Link>
            <Link
              href={conversionCTAs.evento.href}
              className="border border-tertiary text-tertiary px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-tertiary/10 transition-colors"
            >
              {conversionCTAs.evento.label}
            </Link>
          </div>
        </div>
      </header>

      {/* Tipos de evento */}
      <section className="site-container py-16 sm:py-20">
        <h2 className="font-display text-2xl text-on-surface mb-8 text-center">
          ¿Qué tipo de <span className="text-secondary italic">evento</span>{" "}
          planeas?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {eventReservationTypes.map((type) => (
            <Link
              key={type.id}
              href={`/reserva?tipo=${type.id}#formulario-reserva`}
              className="group bg-surface-container-low stone-outline rounded-xl p-5 hover:bg-surface-container-high hover:border-secondary/50 transition-all text-center"
            >
              <span className="material-symbols-outlined text-secondary text-3xl mb-3 block group-hover:text-tertiary transition-colors">
                {type.icon}
              </span>
              <h3 className="font-display text-sm md:text-base text-on-surface group-hover:text-secondary transition-colors">
                {type.label}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Combos de celebración */}
      <section className="py-16 bg-surface-container-lowest border-y border-outline-variant/20">
        <div className="site-container">
          <CelebrationCombos />
        </div>
      </section>

      {/* Formulario */}
      <section
        id="formulario-reserva"
        className="site-container scroll-mt-24 py-20 sm:py-24"
      >
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="font-display text-2xl text-on-surface mb-2">
              Solicitud de Reserva
            </h2>
            <p className="text-on-surface-variant mb-6 text-sm">
              Completa el formulario y confirma al instante por WhatsApp.
              Incluye comida, tapas y servicio de botellas si lo necesitas.
            </p>
            <Suspense
              fallback={
                <div className="rounded-xl p-8 bg-surface-container border border-outline-variant/30 text-on-surface-variant text-sm">
                  Cargando formulario...
                </div>
              }
            >
              <ReservationForm key={tipo ?? "mesa"} defaultEventType={tipo} />
            </Suspense>
          </div>

          <aside className="lg:col-span-2 space-y-8">
            <div className="rounded-xl p-6 bg-surface-container border border-outline-variant/30">
              <h3 className="font-display text-xl text-secondary mb-4">
                ¿Por qué reservar con nosotros?
              </h3>
              <ul className="space-y-3">
                {specialties.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined text-tertiary text-base mt-0.5">
                      star
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl p-6 bg-surface-container border border-outline-variant/30">
              <h3 className="font-display text-xl text-secondary mb-4">
                Contacto Directo
              </h3>
              <p className="text-sm text-on-surface-variant mb-1">
                {restaurantInfo.address}
              </p>
              <p className="text-sm text-on-surface-variant mb-4">
                {restaurantInfo.phone}
              </p>
              <p className="text-sm text-on-surface-variant">
                {restaurantInfo.hours}
              </p>
              <a
                href={`https://wa.me/${restaurantInfo.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-secondary hover:text-tertiary transition-colors font-semibold"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                WhatsApp directo
              </a>
            </div>

            <div className="rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container">
              <iframe
                title="Ubicación La Casa del Llano"
                src={restaurantInfo.mapEmbedUrl}
                className="w-full aspect-square border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </aside>
        </div>
      </section>

    </div>
  );
}
