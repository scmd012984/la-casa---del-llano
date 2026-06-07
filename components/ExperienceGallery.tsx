import Image from "next/image";
import Link from "next/link";
import { audiovisualHighlights, conversionCTAs } from "@/lib/data";

export default function ExperienceGallery() {
  return (
    <section className="py-24 px-4 md:px-16 max-w-[1280px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <p className="text-tertiary text-xs uppercase tracking-widest mb-2 font-semibold">
            Vive la Experiencia
          </p>
          <h2 className="font-display text-3xl text-on-surface">
            Ambiente <span className="text-secondary italic">Rumbero</span>
          </h2>
          <p className="text-base text-on-surface-variant mt-3 max-w-lg">
            Luces, música, karaoke y la energía del Casco Colonial. Así se vive
            La Casa del Llano antes de reservar.
          </p>
        </div>
        <Link
          href="/eventos"
          className="text-secondary border-b border-secondary pb-1 text-xs font-semibold uppercase tracking-widest hover:text-tertiary hover:border-tertiary transition-colors"
        >
          Ver cartelera →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {audiovisualHighlights.map((item) => (
          <article
            key={item.id}
            className="group relative aspect-[9/16] sm:aspect-[4/5] rounded-xl overflow-hidden stone-outline interactive-card"
          >
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
              <span className="w-14 h-14 rounded-full bg-tertiary/90 flex items-center justify-center neon-glow-magenta">
                <span className="material-symbols-outlined text-on-tertiary text-3xl ml-1">
                  play_arrow
                </span>
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="text-[10px] uppercase tracking-widest text-tertiary font-semibold">
                {item.type === "reel" ? "Reel" : "Video"}
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
        <Link
          href={conversionCTAs.vip.href}
          className="bg-secondary text-on-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary-container transition-colors"
        >
          {conversionCTAs.vip.label}
        </Link>
        <Link
          href={conversionCTAs.evento.href}
          className="border border-tertiary text-tertiary px-8 py-3 rounded-full font-semibold hover:bg-tertiary/10 transition-colors"
        >
          {conversionCTAs.evento.label}
        </Link>
      </div>
    </section>
  );
}
