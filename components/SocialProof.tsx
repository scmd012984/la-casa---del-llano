import Link from "next/link";
import OptimizedImage, { IMAGE_SIZES } from "@/components/OptimizedImage";
import { socialProof, specialties } from "@/lib/data";

export default function SocialProof() {
  const { instagram, googleBusiness, headline, subheadline } = socialProof;

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
              Galería del local
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
            Síguenos en Instagram para ver noches temáticas, karaoke y la rumba en vivo.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl card-wood p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-on-surface-variant">
                reviews
              </span>
              <h3 className="font-display text-xl text-on-surface">
                Opiniones en Google
              </h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
              {googleBusiness.description}
            </p>
            <a
              href={googleBusiness.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-led btn-led--md inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden>
                map
              </span>
              {googleBusiness.ctaLabel}
            </a>
          </div>

          <div className="rounded-xl card-wood p-6">
            <h3 className="font-display text-lg text-on-surface mb-3">
              Por qué reservar con nosotros
            </h3>
            <ul className="space-y-2.5">
              {specialties.slice(0, 4).map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-on-surface-variant"
                >
                  <span className="material-symbols-outlined text-base text-on-surface-variant mt-0.5 shrink-0">
                    check_circle
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/reserva" className="btn-led btn-led--alt btn-led--sm mt-5 inline-flex">
              Reservar ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
