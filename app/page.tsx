import Image from "next/image";
import Link from "next/link";
import MobileBottomNav from "@/components/MobileBottomNav";
import { NeonPulse, ScrollRevealCards } from "@/components/StitchAnimations";
import ExperienceGallery from "@/components/ExperienceGallery";
import {
  businessPillars,
  conversionCTAs,
  restaurantInfo,
  targetAudience,
  weeklyNights,
} from "@/lib/data";
import { stitchEventosImages } from "@/lib/stitch-images";

export default function Home() {
  return (
    <div className="pb-20 md:pb-0">
      <ScrollRevealCards />
      <NeonPulse />

      {/* Hero — Tasca Disco Karaoke */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={stitchEventosImages.karaoke}
            alt="Ambiente nocturno en La Casa del Llano"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50 grayscale-[0.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/70" />
          <div className="absolute inset-0 grain-texture" />
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-tertiary/25 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 text-center px-4 md:px-16 max-w-4xl">
          <span className="inline-block mb-4 px-4 py-1 bg-tertiary-container text-tertiary rounded-full text-xs uppercase tracking-widest border border-tertiary/30 font-semibold">
            {restaurantInfo.tagline}
          </span>
          <h1 className="font-display text-4xl md:text-[56px] md:leading-[64px] font-bold mb-6 leading-tight">
            Entretenimiento Nocturno con{" "}
            <span className="text-tertiary neon-glow-magenta italic">
              Energía
            </span>
          </h1>
          <p className="text-base text-on-surface-variant mb-8 max-w-2xl mx-auto leading-relaxed">
            {restaurantInfo.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={conversionCTAs.vip.href}
              className="bg-secondary text-on-secondary px-8 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-[0_0_20px_rgba(217,160,54,0.5)] active:scale-95"
            >
              {conversionCTAs.vip.label}
            </Link>
            <Link
              href={conversionCTAs.evento.href}
              className="bg-transparent border border-tertiary text-tertiary px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-tertiary/10 active:scale-95"
            >
              {conversionCTAs.evento.label}
            </Link>
          </div>
          <p className="text-xs text-on-surface-variant/80 mt-4">
            Confirmación inmediata por WhatsApp · Comida y servicio de botellas
          </p>
        </div>
      </header>

      {/* Público objetivo */}
      <section className="py-20 px-4 md:px-16 max-w-[1280px] mx-auto">
        <div className="rounded-xl stone-outline bg-surface-container-low p-8 md:p-12 text-center">
          <p className="text-secondary text-xs uppercase tracking-widest mb-2 font-semibold">
            {targetAudience.subtitle}
          </p>
          <h2 className="font-display text-3xl text-on-surface mb-4">
            {targetAudience.title}
          </h2>
          <p className="text-base text-on-surface-variant max-w-2xl mx-auto mb-6">
            {targetAudience.description}
          </p>
          <p className="text-sm text-tertiary font-medium mb-6">
            {targetAudience.familyPolicy}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {targetAudience.celebrations.map((item) => (
              <span
                key={item}
                className="px-4 py-1.5 bg-primary-container text-secondary rounded-full text-xs font-semibold border border-secondary/20"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pilares del negocio */}
      <section className="py-24 px-4 md:px-16 max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl text-on-surface mb-2">
            Rumba, música y{" "}
            <span className="text-secondary italic">tragos premium</span>
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

      {/* Noches de la semana */}
      <section className="py-24 bg-surface-container-lowest border-y border-outline-variant/20">
        <div className="px-4 md:px-16 max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <p className="text-secondary text-xs uppercase tracking-widest mb-2 font-semibold">
                Cartelera Semanal
              </p>
              <h2 className="font-display text-3xl text-on-surface">
                Noches <span className="text-tertiary italic">Temáticas</span>
              </h2>
            </div>
            <Link
              href="/eventos"
              className="text-secondary border-b border-secondary pb-1 text-xs font-semibold uppercase tracking-widest hover:text-tertiary hover:border-tertiary transition-colors"
            >
              Ver cartelera completa →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weeklyNights.map((night) => (
              <div
                key={night.title}
                className="group flex gap-4 p-5 rounded-xl bg-surface border border-outline-variant/30 hover:border-secondary transition-all interactive-card"
              >
                <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={night.image}
                    alt={night.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-tertiary font-semibold uppercase">
                      {night.day}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-secondary/20 text-secondary rounded-full">
                      {night.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-lg text-on-surface group-hover:text-secondary transition-colors">
                    {night.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-1 line-clamp-2">
                    {night.description}
                  </p>
                  <p className="text-xs text-secondary mt-2 font-semibold">
                    {night.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA eventos privados */}
      <section className="py-24 px-4 md:px-16 max-w-[1280px] mx-auto">
        <div className="relative rounded-xl overflow-hidden stone-outline bg-surface-container-high">
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
        className="py-24 px-4 md:px-16 max-w-[1280px] mx-auto scroll-mt-20"
      >
        <h2 className="font-display text-3xl text-on-surface text-center mb-4">
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

      <MobileBottomNav />
    </div>
  );
}
