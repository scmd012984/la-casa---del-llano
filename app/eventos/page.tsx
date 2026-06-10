import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import CelebrationCombos from "@/components/CelebrationCombos";
import ExperienceGallery from "@/components/ExperienceGallery";
import OptimizedImage, { IMAGE_SIZES } from "@/components/OptimizedImage";
import { conversionCTAs } from "@/lib/data";
import { images } from "@/lib/images";
import EventCalendarPrintButton from "@/components/EventCalendarPrintButton";
import { getDisplayUpcomingEvents } from "@/lib/upcoming-events";

const ScrollRevealCards = dynamic(
  () =>
    import("@/components/StitchAnimations").then((mod) => mod.ScrollRevealCards),
  { loading: () => null },
);

export const metadata: Metadata = {
  title: "Eventos, Rumba y Karaoke",
  description:
    "Entretenimiento nocturno en La Guaira, Venezuela. DJs especiales por temporadas, karaoke, rumba tropical y reservas para cumpleaños, bodas y despedidas.",
};

export default function EventosPage() {
  const upcomingEvents = getDisplayUpcomingEvents();

  return (
    <div>
      <ScrollRevealCards />

      {/* Hero */}
      <header className="hero-fullscreen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={images.fachada}
            alt="Decoración temática de La Casa del Llano"
            fill
            priority
            qualityPreset="hero"
            sizes={IMAGE_SIZES.hero}
            className="object-cover opacity-50 grayscale-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
          <div className="absolute inset-0 grain-texture" />
          <div className="absolute inset-0 hero-night-veil" />
        </div>

        <div className="site-container relative z-10 max-w-4xl py-10 text-center md:py-14">
          <span className="badge-llano mb-4">Rumba Guaireña</span>
          <h1 className="type-hero-title mb-6 text-on-surface">
            Noches de Sabor y{" "}
            <span className="title-accent">Tradición</span>
          </h1>
          <p className="text-base text-on-surface-variant mb-8 max-w-2xl mx-auto leading-relaxed">
            Ambiente energético para todas las edades en Venezuela. DJs
            especiales por temporadas, karaoke, música en vivo y tragos de primera
            para celebrar cumpleaños, ascensos, despedidas, bodas y más.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#cartelera" className="btn-led btn-led--lg">
              Ver Calendario
            </a>
            <Link
              href={conversionCTAs.vip.href}
              className="btn-led btn-led--alt btn-led--lg"
            >
              {conversionCTAs.vip.label}
            </Link>
          </div>
        </div>
      </header>

      {/* Bento */}
      <section className="site-container py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Karaoke */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-xl card-wood h-[400px] interactive-card">
            <OptimizedImage
              src={images.karaoke}
              alt="Noches de karaoke — escenario profesional con luces LED"
              fill
              qualityPreset="content"
              sizes={IMAGE_SIZES.card}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="font-display text-2xl text-on-surface mb-2">
                Noches de Karaoke
              </h3>
              <p className="text-base text-on-surface-variant max-w-md">
                Libera el artista que llevas dentro en nuestro escenario
                profesional con el mejor sonido de la costa. Todos los viernes
                desde las 8:00 p. m.
              </p>
            </div>
          </div>

          {/* Pista de Baile */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-xl card-wood h-[400px] interactive-card">
            <div className="p-8 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 bg-surface-container-lowest flex items-center justify-center rounded-lg mb-6 border border-outline-variant/40">
                  <span className="material-symbols-outlined text-on-surface-variant">
                    theater_comedy
                  </span>
                </div>
                <h3 className="font-display text-2xl text-on-surface mb-4">
                  Pista de Baile
                </h3>
                <p className="text-base text-on-surface-variant">
                  Amplio espacio diseñado para que el baile no se detenga. Desde
                  joropo hasta los éxitos del momento.
                </p>
              </div>
              <div className="mt-4">
                <span className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">
                  +200m² de rumba
                </span>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
              <span
                className="material-symbols-outlined text-[160px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                music_note
              </span>
            </div>
          </div>

          {/* Música en Vivo */}
          <div className="md:col-span-12 group relative overflow-hidden rounded-xl card-wood h-[300px] interactive-card">
            <div className="flex flex-col md:flex-row h-full">
              <div className="relative md:w-1/3 h-48 md:h-full">
                <OptimizedImage
                  src={images.arpa}
                  alt="Música en vivo - arpa llanera"
                  fill
                  qualityPreset="content"
                  sizes={IMAGE_SIZES.card}
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:w-2/3 flex flex-col justify-center bg-surface-container-high/50 backdrop-blur-sm">
                <h3 className="font-display text-2xl text-on-surface mb-2">
                  Música en Vivo por Temporadas
                </h3>
                <p className="text-base text-on-surface-variant mb-6">
                  Por temporadas traemos agrupaciones en vivo y conjuntos
                  invitados. Una experiencia sensorial completa entre rumba,
                  coctelería y el calor de la tasca.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="badge-llano !text-[10px]">
                    Viernes: Rumba Tropical
                  </span>
                  <span className="badge-llano !text-[10px]">
                    Sábado: Ambiente Rumbero y DJ Invitado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cartelera */}
      <section
        id="cartelera"
        className="cartelera-print py-24 bg-surface-container-lowest scroll-mt-20"
      >
        <div className="site-container">
          <p className="cartelera-print-brand">La Casa del Llano 2014 — Cartelera</p>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="font-display text-3xl text-on-surface mb-2">
                Cartelera de{" "}
                <span className="title-accent">Espectáculos</span>
              </h2>
              <p className="text-base text-on-surface-variant">
                No te pierdas de los próximos grandes momentos en La Casa del
                Llano.
              </p>
            </div>
            {upcomingEvents.length > 0 ? (
              <EventCalendarPrintButton />
            ) : null}
          </div>

          <div className="space-y-6">
            {upcomingEvents.length === 0 ? (
              <p className="text-base text-on-surface-variant card-wood rounded-xl p-6">
                Próximamente publicaremos nuevos espectáculos. Mientras tanto,
                revisa nuestras{" "}
                <Link href="/#noches" className="link-llano">
                  noches temáticas
                </Link>{" "}
                o reserva tu mesa.
              </p>
            ) : null}
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="group flex items-center p-6 rounded-xl card-wood hover:bg-surface-container-high transition-all"
              >
                <div className="flex flex-col items-center justify-center min-w-[80px] h-[80px] bg-surface-container-lowest rounded-lg border border-outline-variant/40">
                  <span className="text-xs text-on-surface-variant uppercase font-semibold">
                    {event.month}
                  </span>
                  <span className="font-display text-2xl leading-none text-on-surface">
                    {event.day}
                  </span>
                  <span className="text-[10px] text-on-surface-variant mt-0.5">
                    {event.year}
                  </span>
                </div>
                <div className="ml-4 md:ml-8 flex-grow min-w-0">
                  <h4 className="font-display text-xl text-on-surface">
                    {event.title}
                  </h4>
                  <p className="text-sm text-on-surface-variant">
                    {event.description}
                  </p>
                </div>
                <div className="hidden md:flex flex-col items-end mr-8 shrink-0">
                  <span className="text-base text-on-surface-variant">
                    {event.time}
                  </span>
                  <span className="text-xs uppercase tracking-tighter font-semibold text-on-surface-variant">
                    {event.badge}
                  </span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                  arrow_forward
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container py-16 sm:py-20 bg-surface-container-lowest site-section-divider-y">
        <CelebrationCombos />
      </section>

      <ExperienceGallery />

      {/* CTA */}
      <section className="relative py-24 wood-pattern">
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl mb-6 text-on-surface leading-tight py-1">
            ¿Planeas una rumba privada?
          </h2>
          <p className="text-base text-on-surface-variant mb-10 max-w-xl mx-auto">
            Reserva para cumpleaños, ascensos, despedidas, bodas y celebraciones
            familiares. Menores con acompañamiento responsable. Paquetes todo
            incluido con barra selecta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={conversionCTAs.evento.href}
              className="btn-led btn-led--lg"
            >
              {conversionCTAs.evento.label}
            </Link>
            <Link
              href={conversionCTAs.vip.href}
              className="btn-led btn-led--alt btn-led--lg"
            >
              {conversionCTAs.vip.label}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
