import OptimizedImage, { IMAGE_SIZES } from "@/components/OptimizedImage";
import Link from "next/link";
import { audiovisualHighlights, conversionCTAs } from "@/lib/data";

export default function ExperienceGallery() {
  return (
    <section className="site-container py-20 sm:py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <p className="eyebrow-llano mb-2">Vive la Experiencia</p>
          <h2 className="font-display text-3xl text-on-surface">
            Ambiente <span className="title-accent">Rumbero</span>
          </h2>
          <p className="text-base text-on-surface-variant mt-3 max-w-lg">
            Luces, música, karaoke y la energía del Casco Colonial. Así se vive
            La Casa del Llano antes de reservar.
          </p>
        </div>
        <Link href="/eventos" className="link-llano">
          Ver cartelera →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {audiovisualHighlights.map((item) => (
          <article
            key={item.id}
            className="group relative aspect-[9/16] sm:aspect-[4/5] rounded-xl overflow-hidden card-wood interactive-card"
          >
            <OptimizedImage
              src={item.thumbnail}
              alt={item.title}
              fill
              qualityPreset="thumb"
              sizes={IMAGE_SIZES.gallery}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-highest/90 border border-outline-variant shadow-lg">
                <span className="material-symbols-outlined ml-1 text-3xl text-on-surface">
                  play_arrow
                </span>
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                {item.typeLabel}
              </span>
              <h3 className="font-display text-lg text-on-surface mt-1">
                {item.title}
              </h3>
              <p className="text-xs text-on-surface-variant">{item.subtitle}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href={conversionCTAs.vip.href} className="btn-led btn-led--md">
          {conversionCTAs.vip.label}
        </Link>
        <Link
          href={conversionCTAs.evento.href}
          className="btn-led btn-led--alt btn-led--md"
        >
          {conversionCTAs.evento.label}
        </Link>
      </div>
    </section>
  );
}
