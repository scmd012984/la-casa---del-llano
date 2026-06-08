import Link from "next/link";
import OptimizedImage, { IMAGE_SIZES } from "@/components/OptimizedImage";
import MinorsPolicyNotice from "@/components/MinorsPolicyNotice";
import { conversionCTAs, restaurantInfo } from "@/lib/data";
import { images } from "@/lib/images";

export default function HeroWelcome() {
  return (
    <header className="hero-fullscreen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={images.karaoke}
          alt="Ambiente nocturno en La Casa del Llano"
          fill
          priority
          qualityPreset="hero"
          sizes={IMAGE_SIZES.hero}
          className="object-cover opacity-40 grayscale-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/85" />
        <div className="absolute inset-0 grain-texture" />
        <div className="absolute inset-0 hero-night-veil" />
      </div>
      <div className="relative z-10 w-full">
        <div className="hero-enter site-container max-w-4xl py-10 text-center md:py-14">
          <span className="badge-llano mb-6 inline-flex">{restaurantInfo.tagline}</span>
          <h1 className="type-hero-title mb-6 text-on-surface">
            Entretenimiento Nocturno con{" "}
            <span className="title-accent">Energía</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-on-surface-variant sm:text-base md:text-lg">
            {restaurantInfo.description}
          </p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
            <Link href={conversionCTAs.vip.href} className="btn-led btn-led--lg">
              {conversionCTAs.vip.label}
            </Link>
            <Link
              href={conversionCTAs.evento.href}
              className="btn-led btn-led--alt btn-led--lg"
            >
              {conversionCTAs.evento.label}
            </Link>
          </div>
          <p className="mt-4 text-xs text-on-surface-variant/80">
            Confirmación inmediata por WhatsApp · Comida y servicio de botellas
          </p>
          <MinorsPolicyNotice className="mt-3 max-w-xl mx-auto text-center" />
        </div>
      </div>
    </header>
  );
}
