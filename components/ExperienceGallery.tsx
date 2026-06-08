import OptimizedImage, { IMAGE_SIZES } from "@/components/OptimizedImage";
import ExperienceGalleryVideoCard from "@/components/ExperienceGalleryVideoCard";
import MinorsPolicyNotice from "@/components/MinorsPolicyNotice";
import Link from "next/link";
import { audiovisualHighlights, conversionCTAs } from "@/lib/data";
import { audiovisualVideoMap } from "@/lib/videos";

type GalleryHighlight = (typeof audiovisualHighlights)[number];

function GalleryThumbCard({ item }: { item: GalleryHighlight }) {
  return (
    <article className="group relative aspect-[3/4] rounded-xl overflow-hidden card-wood interactive-card experience-gallery-thumb">
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
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-highest/90 border border-outline-variant shadow-lg">
          <span className="material-symbols-outlined ml-0.5 text-2xl text-on-surface">
            play_arrow
          </span>
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        {item.typeLabel ? (
          <span className="text-[9px] uppercase tracking-widest text-on-surface-variant font-semibold">
            {item.typeLabel}
          </span>
        ) : null}
        <h3 className="font-display text-sm text-on-surface mt-0.5 leading-snug">{item.title}</h3>
        <p className="text-[11px] text-on-surface-variant leading-snug">{item.subtitle}</p>
      </div>
    </article>
  );
}

function GalleryVideoCard({
  item,
  compact = false,
}: {
  item: GalleryHighlight;
  compact?: boolean;
}) {
  const video = audiovisualVideoMap[item.id];
  if (!video?.sources.length) return null;

  return (
    <ExperienceGalleryVideoCard
      item={item}
      sources={video.sources}
      poster={video.poster ?? item.thumbnail}
      featured={Boolean("featured" in item && item.featured === true)}
      compact={compact}
    />
  );
}

function renderGalleryItem(item: GalleryHighlight, compact = false) {
  const video = audiovisualVideoMap[item.id];

  if (video?.sources.length) {
    return <GalleryVideoCard key={item.id} item={item} compact={compact} />;
  }

  return <GalleryThumbCard key={item.id} item={item} />;
}

const featuredHighlight = audiovisualHighlights.find(
  (item) => "featured" in item && item.featured === true,
);
const sideHighlights = audiovisualHighlights.filter(
  (item) => !("featured" in item && item.featured === true),
);

export default function ExperienceGallery() {
  return (
    <section id="galeria-experiencia" className="site-container scroll-mt-24 py-20 sm:py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <p className="eyebrow-llano mb-2">Vive la Experiencia</p>
          <h2 className="font-display text-3xl text-on-surface">
            Ambiente <span className="title-accent">Rumbero</span>
          </h2>
          <p className="text-base text-on-surface-variant mt-3 max-w-lg">
            Luces, música, karaoke y la energía del Casco Colonial. Reproduce el
            mensaje de bienvenida y conoce la casa antes de reservar.
          </p>
        </div>
        <Link href="/eventos" className="link-llano">
          Ver cartelera →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:max-w-md sm:mx-auto lg:hidden">
        {audiovisualHighlights.map((item) => renderGalleryItem(item))}
      </div>

      <div className="hidden lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-3 experience-gallery-board">
        <div className="experience-gallery-featured-slot row-span-2 col-span-1 min-h-0">
          {featuredHighlight ? (
            <GalleryVideoCard item={featuredHighlight} />
          ) : null}
        </div>
        {sideHighlights.map((item) => renderGalleryItem(item, true))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-4">
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
        <MinorsPolicyNotice className="max-w-md text-center" />
      </div>
    </section>
  );
}
