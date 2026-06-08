import dynamic from "next/dynamic";
import Link from "next/link";
import OptimizedImage, { IMAGE_SIZES } from "@/components/OptimizedImage";
import CelebrationCombos from "@/components/CelebrationCombos";
import ClientQuoteStrip from "@/components/ClientQuoteStrip";
import ExperienceGallery from "@/components/ExperienceGallery";
import HeroWelcome from "@/components/HeroWelcome";
import LocationActions from "@/components/LocationActions";
import MinorsPolicyNotice from "@/components/MinorsPolicyNotice";
import ReservationFAQ from "@/components/ReservationFAQ";
import SocialProof from "@/components/SocialProof";
import ThematicNightsCalendar from "@/components/ThematicNightsCalendar";
import TonightAtLaCasa from "@/components/TonightAtLaCasa";
import {
  businessPillars,
  conversionCTAs,
  restaurantInfo,
} from "@/lib/data";
import { images } from "@/lib/images";

const SeasonalBanner = dynamic(() => import("@/components/SeasonalBanner"), {
  loading: () => null,
});

const ScrollRevealCards = dynamic(
  () =>
    import("@/components/StitchAnimations").then((mod) => mod.ScrollRevealCards),
  { loading: () => null },
);

export default function Home() {
  return (
    <div>
      <ScrollRevealCards />

      <SeasonalBanner />

      <HeroWelcome />

      <TonightAtLaCasa />

      <ClientQuoteStrip />

      <ThematicNightsCalendar />

      <SocialProof />

      <ExperienceGallery />

      <section className="site-container py-16 sm:py-20">
        <CelebrationCombos />
      </section>

      {/* Pilares del negocio */}
      <section className="site-container py-20 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="type-section-title text-on-surface mb-2">
            Rumba, música y{" "}
            <span className="title-accent">tragos selectos</span>
          </h2>
          <p className="text-base text-on-surface-variant max-w-xl mx-auto">
            DJs especiales por temporadas, karaoke, coctelería y reservas para
            celebrar en La Guaira, Venezuela.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {businessPillars.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.href}
              className="group card-wood rounded-xl p-6 interactive-card hover:bg-surface-container-high transition-all"
            >
              <span className="material-symbols-outlined text-on-surface-variant text-3xl mb-4 block">
                {pillar.icon}
              </span>
              <h3 className="font-display text-xl text-on-surface mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-on-surface-variant mb-4">
                {pillar.description}
              </p>
              <span className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">
                {pillar.cta} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA eventos privados */}
      <section className="site-container py-20 sm:py-24">
        <div className="relative rounded-xl card-wood md:min-h-[14rem]">
          <div className="relative h-48 md:h-56 overflow-hidden rounded-t-[10px] md:rounded-t-xl">
            <OptimizedImage
              src={images.fachada}
              alt="Reservas para eventos privados"
              fill
              qualityPreset="content"
              sizes={IMAGE_SIZES.section}
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
          </div>
          <div className="relative md:absolute md:inset-0 md:flex md:items-center card-body-safe md:py-14">
            <div className="max-w-lg">
              <h2 className="font-display text-3xl text-on-surface mb-3 leading-snug py-0.5">
                ¿Planeas un{" "}
                <span className="title-accent">evento especial</span>?
              </h2>
              <p className="text-base text-on-surface-variant mb-4">
                Cumpleaños, ascensos, despedidas, bodas y celebraciones
                familiares. Reservamos para todo tipo de eventos en Venezuela.
              </p>
              <MinorsPolicyNotice className="mb-6" />
              <div className="flex flex-wrap gap-4">
                <Link
                  href={conversionCTAs.evento.href}
                  className="btn-led btn-led--md"
                >
                  {conversionCTAs.evento.label}
                </Link>
                <Link
                  href={conversionCTAs.vip.href}
                  className="btn-led btn-led--alt btn-led--md"
                >
                  {conversionCTAs.vip.label}
                </Link>
                <Link
                  href="/menu"
                  className="btn-led btn-led--ghost btn-led--md"
                >
                  Ver Carta Digital
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReservationFAQ />

      {/* Ubicación */}
      <section
        id="ubicacion"
        className="site-container scroll-mt-20 py-20 sm:py-24"
      >
        <h2 className="type-section-title text-on-surface mb-4 text-center">
          En el <span className="title-accent">Casco Colonial</span>
        </h2>
        <p className="text-center text-on-surface-variant mb-6 text-sm">
          {restaurantInfo.hours} · {restaurantInfo.location}
        </p>
        <LocationActions />
        <div className="rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container mt-8">
          <iframe
            title="Mapa de La Casa del Llano 2014"
            src={restaurantInfo.mapEmbedUrl}
            className="w-full aspect-[16/9] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="p-6 text-center bg-surface-container-high">
            <p className="text-sm text-on-surface-variant">{restaurantInfo.address}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
