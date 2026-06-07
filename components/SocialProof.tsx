import OptimizedImage, { IMAGE_SIZES } from "@/components/OptimizedImage";
import { socialProof } from "@/lib/data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`material-symbols-outlined text-base ${
            i < rating ? "text-platinum-muted" : "text-on-surface-variant/30"
          }`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function SocialProof() {
  const { instagram, googleReviews, headline, subheadline } = socialProof;

  return (
    <section className="site-container py-16 sm:py-20 md:py-24">
      <div className="text-center mb-10">
        <p className="eyebrow-llano mb-2">En la Casa</p>
        <h2 className="font-display text-3xl md:text-4xl text-on-surface mb-2">
          {headline}
        </h2>
        <p className="text-base text-on-surface-variant">{subheadline}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <div className="flex items-center justify-between mb-4">
            <a
              href={instagram.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-on-surface hover:text-platinum transition-colors"
            >
              <span className="material-symbols-outlined text-on-surface-variant">
                photo_camera
              </span>
              <span className="font-semibold">{instagram.handle}</span>
            </a>
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">
              {instagram.feedMode === "gallery"
                ? "Galería de rumbas"
                : "Publicaciones en vivo"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {instagram.photos.map((photo, index) => (
              <a
                key={`${photo.alt}-${index}`}
                href={instagram.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-lg overflow-hidden stone-outline"
              >
                <OptimizedImage
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  qualityPreset="thumb"
                  sizes={IMAGE_SIZES.gallery}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface opacity-0 group-hover:opacity-100 transition-opacity">
                    open_in_new
                  </span>
                </div>
              </a>
            ))}
          </div>
          <p className="text-xs text-on-surface-variant mt-3">
            Síguenos en Instagram para ver las rumbas en tiempo real. Próximamente
            publicaciones integradas automáticamente.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-on-surface-variant">
              reviews
            </span>
            <h3 className="font-display text-xl text-on-surface">
              Opiniones en Google
            </h3>
          </div>
          <div className="space-y-4">
            {googleReviews.map((review) => (
              <blockquote
                key={review.author}
                className="rounded-xl card-wood p-5"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div>
                    <cite className="not-italic font-semibold text-on-surface text-sm">
                      {review.author}
                    </cite>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">
                      {review.source} · {review.date}
                    </p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
