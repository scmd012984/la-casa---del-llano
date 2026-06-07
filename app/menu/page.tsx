import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MobileBottomNav from "@/components/MobileBottomNav";
import ReservationFab from "@/components/ReservationFab";
import {
  bebidasRumba,
  stitchMenuImages,
  tapasTradicionales,
} from "@/lib/stitch-menu";

export const metadata: Metadata = {
  title: "Menú de Tapas",
  description:
    "Empanadas, tequeños, camarones al ajillo, carne frita y bebidas en La Casa del Llano 2014.",
};

function Badge({
  text,
  variant,
}: {
  text: string;
  variant: "tertiary" | "primary";
}) {
  const classes =
    variant === "tertiary"
      ? "bg-tertiary-container/80 text-tertiary"
      : "bg-primary-container/80 text-primary";

  return (
    <div
      className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1 rounded-full ${classes}`}
    >
      <span className="text-xs font-semibold">{text}</span>
    </div>
  );
}

export default function MenuPage() {
  return (
    <div className="wood-pattern min-h-screen pb-20 md:pb-0">
      <main className="max-w-[1280px] mx-auto px-4 md:px-16 py-12">
        {/* Hero Title */}
        <section className="mb-16 text-center md:text-left">
          <p className="text-secondary text-xs uppercase tracking-widest mb-2 font-semibold">
            Experiencia Rumbera
          </p>
          <h1 className="font-display text-4xl md:text-[56px] md:leading-[64px] font-bold text-on-surface mb-4 tracking-tight">
            Nuestras Tapas
          </h1>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto md:mx-0" />
        </section>

        {/* Tapas Tradicionales */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="material-symbols-outlined text-secondary text-3xl">
              restaurant_menu
            </span>
            <h2 className="font-display text-2xl md:text-[32px] text-on-background">
              Tapas Tradicionales
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tapasTradicionales.map((item) => (
              <article
                key={item.name}
                className="group bg-surface-container-low stone-outline rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:bg-surface-container-high"
              >
                <div className="h-64 overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {item.badge && (
                    <Badge text={item.badge.text} variant={item.badge.variant} />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-display text-xl md:text-2xl text-secondary">
                      {item.name}
                    </h3>
                    <span className="text-base text-secondary-fixed-dim font-semibold">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-base text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Especialidades de la Casa */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="material-symbols-outlined text-secondary text-3xl">
              star
            </span>
            <h2 className="font-display text-2xl md:text-[32px] text-on-background">
              Especialidades de la Casa
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Camarones al Ajillo */}
            <article className="md:col-span-8 bg-surface-container-high stone-outline rounded-xl overflow-hidden flex flex-col md:flex-row min-h-[400px] group">
              <div className="relative md:w-1/2 h-64 md:h-full overflow-hidden">
                <Image
                  src={stitchMenuImages.camarones}
                  alt="Camarones al ajillo"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                <span className="text-tertiary text-xs mb-2 uppercase tracking-tighter font-semibold">
                  Firma del Chef
                </span>
                <h3 className="font-display text-2xl text-secondary mb-4">
                  Camarones al Ajillo
                </h3>
                <p className="text-base md:text-lg text-on-surface-variant mb-6 italic leading-relaxed">
                  &ldquo;Sabor a costa y rumba. Camarones frescos saltados con ajo
                  premium y un toque de ají dulce.&rdquo;
                </p>
                <div className="flex items-center justify-between mt-auto gap-4">
                  <span className="text-2xl font-bold text-on-background">
                    $16.50
                  </span>
                  <Link
                    href="/reserva"
                    className="bg-secondary text-on-secondary px-4 py-2 rounded text-xs font-semibold hover:shadow-lg transition-all whitespace-nowrap"
                  >
                    Pedir Ahora
                  </Link>
                </div>
              </div>
            </article>

            {/* Carne Frita del Llano */}
            <article className="md:col-span-4 bg-surface-container-low stone-outline rounded-xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={stitchMenuImages.carneFrita}
                  alt="Carne Frita del Llano"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl md:text-2xl text-secondary">
                  Carne Frita del Llano
                </h3>
                <p className="text-base text-on-surface-variant mt-2 mb-4">
                  Cubos de res macerados en especias llaneras y fritos al
                  caldero.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">$12.00</span>
                  <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                    arrow_forward
                  </span>
                </div>
              </div>
            </article>

            {/* Tequeños de Gala */}
            <article className="md:col-span-5 bg-surface-container-low stone-outline rounded-xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={stitchMenuImages.tequenosGala}
                  alt="Tequeños de Gala"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl md:text-2xl text-secondary">
                  Tequeños de Gala
                </h3>
                <p className="text-base text-on-surface-variant mt-2">
                  Versión premium rellena de una mezcla de quesos ahumados.
                </p>
                <div className="mt-4 text-xl font-bold text-on-background">
                  $9.50
                </div>
              </div>
            </article>

            {/* Cazuelita de Mar */}
            <article className="md:col-span-7 bg-surface-container-high stone-outline rounded-xl overflow-hidden flex group">
              <div className="p-8 flex-1 flex flex-col justify-center">
                <h3 className="font-display text-xl md:text-2xl text-secondary">
                  Cazuelita de Mar
                </h3>
                <p className="text-base text-on-surface-variant mt-2">
                  Pequeña porción de nuestros camarones estrella, ideal para
                  picar solo.
                </p>
                <div className="mt-4 text-xl font-bold text-on-background">
                  $9.00
                </div>
              </div>
              <div className="relative w-1/3 min-h-[160px] overflow-hidden hidden sm:block">
                <Image
                  src={stitchMenuImages.cazuelitaMar}
                  alt="Cazuelita de Mar"
                  fill
                  sizes="200px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </article>
          </div>
        </section>

        {/* Bebidas y Rumba */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="material-symbols-outlined text-secondary text-3xl">
              local_bar
            </span>
            <h2 className="font-display text-2xl md:text-[32px] text-on-background">
              Bebidas y Rumba
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-6">
            {bebidasRumba.map((drink) => (
              <div key={drink.name} className="flex items-end">
                <span className="font-display text-lg text-secondary min-w-fit pr-2">
                  {drink.name}
                </span>
                <div className="menu-dots" />
                <span className="text-base text-on-surface-variant">
                  {drink.price}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ReservationFab />
      <MobileBottomNav />
    </div>
  );
}
