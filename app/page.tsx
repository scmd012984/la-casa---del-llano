import Image from "next/image";
import Link from "next/link";
import { NeonPulse, ScrollRevealCards } from "@/components/StitchAnimations";
import CelebrationCombos from "@/components/CelebrationCombos";
import ExperienceGallery from "@/components/ExperienceGallery";
import HeroWelcome from "@/components/HeroWelcome";
import SocialProof from "@/components/SocialProof";
import ThematicNightsCalendar from "@/components/ThematicNightsCalendar";
import {
  businessPillars,
  conversionCTAs,
  restaurantInfo,
} from "@/lib/data";
import { stitchEventosImages } from "@/lib/stitch-images";

export default function Home() {
  return (
    <div>
      <ScrollRevealCards />
      <NeonPulse />

      <HeroWelcome />

      <ThematicNightsCalendar />

      <SocialProof />

      <section className="site-container py-16 sm:py-20">
        <CelebrationCombos />
      </section>

      {/* Pilares del negocio */}
      <section className="site-container py-20 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="type-section-title text-on-surface mb-2">
            Rumba, música y{" "}
            <span className="text-secondary italic">tragos selectos</span>
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
              className="group bg-surface-container-low stone-outline rounded-xl p-6 interactive-card hover:bg-surface-container-high transition-all"
            >
              <span className="material-symbols-outlined text-secondary text-3xl mb-4 block">
                {pillar.icon}
              </span>
              <h3 className="font-display text-xl text-on-surface mb-2 group-hover:text-secondary transition-colors">
                {pillar.title}
              </h3>
              <p className="text-sm text-on-surface-variant mb-4">
                {pillar.description}
              </p>
              <span className="text-xs text-tertiary font-semibold uppercase tracking-wider">
                {pillar.cta} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ExperienceGallery />

      {/* CTA eventos privados */}
      <section className="site-container py-20 sm:py-24">
        <div className="relative overflow-hidden rounded-xl stone-outline bg-surface-container-high">
          <div className="relative h-48 md:h-56">
            <Image
              src={stitchEventosImages.hero}
              alt="Reservas para eventos privados"
              fill
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
          </div>
          <div className="relative md:absolute md:inset-0 md:flex md:items-center p-8 md:p-12">
            <div className="max-w-lg">
              <h2 className="font-display text-3xl text-on-surface mb-3">
                ¿Planeas un{" "}
                <span className="text-secondary italic">evento especial</span>?
              </h2>
              <p className="text-base text-on-surface-variant mb-6">
                Cumpleaños, ascensos, despedidas, bodas y celebraciones
                familiares. Reservamos para todo tipo de eventos en Venezuela.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={conversionCTAs.evento.href}
                  className="bg-secondary text-on-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary-container transition-colors"
                >
                  {conversionCTAs.evento.label}
                </Link>
                <Link
                  href={conversionCTAs.vip.href}
                  className="border border-tertiary text-tertiary px-8 py-3 rounded-full font-semibold hover:bg-tertiary/10 transition-colors"
                >
                  {conversionCTAs.vip.label}
                </Link>
                <Link
                  href="/menu"
                  className="border border-outline-variant text-on-surface-variant px-8 py-3 rounded-full font-semibold hover:text-secondary hover:border-secondary transition-colors"
                >
                  Ver Carta Digital
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section
        id="ubicacion"
        className="site-container scroll-mt-20 py-20 sm:py-24"
      >
        <h2 className="type-section-title text-on-surface mb-4 text-center">
          En el <span className="text-secondary italic">Casco Colonial</span>
        </h2>
        <p className="text-center text-on-surface-variant mb-10 text-sm">
          {restaurantInfo.hours} · {restaurantInfo.location}
        </p>
        <div className="rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container">
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
            <a
              href="https://maps.google.com/?q=La+Guaira+Venezuela+Casco+Colonial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-tertiary hover:text-secondary transition-colors underline"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
