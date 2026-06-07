import Image from "next/image";
import Link from "next/link";
import { conversionCTAs, restaurantInfo } from "@/lib/data";
import { stitchEventosImages } from "@/lib/stitch-images";

export default function HeroWelcome() {
  return (
    <header className="hero-fullscreen relative flex items-center justify-center overflow-hidden">
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
        <div className="absolute top-1/4 -left-20 h-64 w-64 rounded-full bg-tertiary/25 blur-[100px] sm:h-96 sm:w-96 sm:blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 h-64 w-64 rounded-full bg-secondary/20 blur-[100px] sm:h-96 sm:w-96 sm:blur-[120px]" />
      </div>

      <div className="site-container relative z-10 max-w-4xl py-10 text-center md:py-14">
        <span className="mb-4 inline-block rounded-full border border-tertiary/30 bg-tertiary-container px-4 py-1 text-xs font-semibold uppercase tracking-widest text-tertiary">
          {restaurantInfo.tagline}
        </span>
        <h1 className="type-hero-title mb-6">
          Entretenimiento Nocturno con{" "}
          <span className="text-tertiary italic neon-glow-magenta">Energía</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-on-surface-variant sm:text-base md:text-lg">
          {restaurantInfo.description}
        </p>
        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
          <Link
            href={conversionCTAs.vip.href}
            className="rounded-full bg-secondary px-6 py-3.5 text-base font-semibold text-on-secondary transition-all hover:shadow-[0_0_20px_rgba(217,160,54,0.5)] active:scale-95 sm:px-8 sm:py-4 sm:text-lg"
          >
            {conversionCTAs.vip.label}
          </Link>
          <Link
            href={conversionCTAs.evento.href}
            className="rounded-full border border-tertiary bg-transparent px-6 py-3.5 text-base font-semibold text-tertiary transition-all hover:bg-tertiary/10 active:scale-95 sm:px-8 sm:py-4 sm:text-lg"
          >
            {conversionCTAs.evento.label}
          </Link>
        </div>
        <p className="mt-4 text-xs text-on-surface-variant/80">
          Confirmación inmediata por WhatsApp · Comida y servicio de botellas
        </p>
      </div>
    </header>
  );
}
