import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MobileBottomNav from "@/components/MobileBottomNav";
import MenuQuickNav from "@/components/MenuQuickNav";
import { conversionCTAs } from "@/lib/data";
import {
  cocteleria,
  serviciosBotellas,
  stitchMenuImages,
  tapasTradicionales,
  tragosBarra,
} from "@/lib/stitch-menu";

export const metadata: Metadata = {
  title: "Carta Digital — Tragos y Tapas",
  description:
    "Carta digital de coctelería, tragos, tapas y servicio de botellas VIP. Consulta antes y durante tu visita en La Guaira.",
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
        {/* Hero */}
        <section className="mb-16 text-center md:text-left">
          <p className="text-tertiary text-xs uppercase tracking-widest mb-2 font-semibold">
            La Barra de la Rumba
          </p>
          <h1 className="font-display text-4xl md:text-[56px] md:leading-[64px] font-bold text-on-surface mb-4 tracking-tight">
            Tragos, Coctelería y Tapas
          </h1>
          <p className="text-base text-on-surface-variant max-w-xl mb-4">
            Carta digital para consultar antes y durante tu estancia. Coctelería,
            tragos, tapas y servicio de botellas VIP.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link
              href={conversionCTAs.vip.href}
              className="bg-secondary text-on-secondary px-6 py-2 rounded-full text-sm font-semibold hover:bg-secondary-container transition-colors"
            >
              {conversionCTAs.vip.label}
            </Link>
            <Link
              href={conversionCTAs.evento.href}
              className="border border-tertiary text-tertiary px-6 py-2 rounded-full text-sm font-semibold hover:bg-tertiary/10 transition-colors"
            >
              {conversionCTAs.evento.label}
            </Link>
          </div>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto md:mx-0 mt-6" />
        </section>

        <MenuQuickNav />

        {/* Coctelería — protagonista */}
        <section id="cocteleria" className="mb-24 scroll-mt-36">
          <div className="flex items-center gap-4 mb-10">
            <span className="material-symbols-outlined text-secondary text-3xl">
              liquor
            </span>
            <h2 className="font-display text-2xl md:text-[32px] text-on-background">
              Coctelería de la Casa
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cocteleria.map((drink) => (
              <article
                key={drink.name}
                className="bg-surface-container-low stone-outline rounded-xl p-6 hover:bg-surface-container-high transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-xl text-secondary group-hover:text-tertiary transition-colors">
                    {drink.name}
                  </h3>
                  <span className="text-secondary-fixed-dim font-semibold whitespace-nowrap ml-2">
                    {drink.price}
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant mb-3">
                  {drink.description}
                </p>
                {drink.tag && (
                  <span className="text-xs px-2 py-1 bg-tertiary-container/50 text-tertiary rounded-full font-semibold">
                    {drink.tag}
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Barra de tragos */}
        <section id="tragos" className="mb-24 scroll-mt-36">
          <div className="flex items-center gap-4 mb-10">
            <span className="material-symbols-outlined text-secondary text-3xl">
              local_bar
            </span>
            <h2 className="font-display text-2xl md:text-[32px] text-on-background">
              Tragos y Barra
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-6">
            {tragosBarra.map((drink) => (
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

        {/* Tapas para picar */}
        <section id="tapas" className="mb-24 scroll-mt-36">
          <div className="flex items-center gap-4 mb-10">
            <span className="material-symbols-outlined text-secondary text-3xl">
              restaurant_menu
            </span>
            <h2 className="font-display text-2xl md:text-[32px] text-on-background">
              Tapas y Picoteo
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
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {item.badge && (
                    <Badge text={item.badge.text} variant={item.badge.variant} />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-display text-xl text-secondary">
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

        {/* Servicio de botellas */}
        <section id="botellas" className="mb-24 scroll-mt-36">
          <div className="flex items-center gap-4 mb-10">
            <span className="material-symbols-outlined text-secondary text-3xl">
              wine_bar
            </span>
            <h2 className="font-display text-2xl md:text-[32px] text-on-background">
              Servicio de Botellas VIP
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant mb-8 max-w-2xl">
            Botellas premium para mesas VIP y eventos privados. Incluye hielo,
            mezcladores y servicio de mesa.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviciosBotellas.map((bottle) => (
              <article
                key={bottle.name}
                className="bg-surface-container-low stone-outline rounded-xl p-6 hover:bg-surface-container-high transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-xl text-secondary group-hover:text-tertiary transition-colors">
                    {bottle.name}
                  </h3>
                  <span className="text-secondary-fixed-dim font-semibold whitespace-nowrap ml-2">
                    {bottle.price}
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant mb-3">
                  {bottle.description}
                </p>
                {bottle.tag && (
                  <span className="text-xs px-2 py-1 bg-primary-container/50 text-primary rounded-full font-semibold">
                    {bottle.tag}
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Especialidades bento */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="material-symbols-outlined text-secondary text-3xl">
              star
            </span>
            <h2 className="font-display text-2xl md:text-[32px] text-on-background">
              Especialidades para la Noche
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <article className="md:col-span-8 bg-surface-container-high stone-outline rounded-xl overflow-hidden flex flex-col md:flex-row min-h-[360px] group">
              <div className="relative md:w-1/2 h-64 md:h-full overflow-hidden">
                <Image
                  src={stitchMenuImages.camarones}
                  alt="Camarones al ajillo"
                  fill
                  sizes="50vw"
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
                <p className="text-base text-on-surface-variant mb-6 italic leading-relaxed">
                  El picoteo estrella para acompañar tu trago mientras esperas
                  tu turno en el karaoke.
                </p>
                <div className="flex items-center justify-between mt-auto gap-4">
                  <span className="text-2xl font-bold text-on-background">
                    $16.50
                  </span>
                  <Link
                    href="/reserva"
                    className="bg-secondary text-on-secondary px-4 py-2 rounded text-xs font-semibold hover:shadow-lg transition-all"
                  >
                    Reservar Mesa
                  </Link>
                </div>
              </div>
            </article>

            <article className="md:col-span-4 bg-surface-container-low stone-outline rounded-xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={stitchMenuImages.carneFrita}
                  alt="Carne Frita del Llano"
                  fill
                  sizes="33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-secondary">
                  Carne Frita del Llano
                </h3>
                <p className="text-sm text-on-surface-variant mt-2 mb-4">
                  Para compartir en mesa mientras suena la rumba.
                </p>
                <span className="text-xl font-bold">$12.00</span>
              </div>
            </article>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 px-6 rounded-xl bg-surface-container border border-outline-variant/30">
          <h2 className="font-display text-2xl text-on-surface mb-3">
            ¿Reservas para un evento con barra y catering?
          </h2>
          <p className="text-on-surface-variant mb-6 max-w-md mx-auto">
            Paquetes de tragos premium, tapas y karaoke para cumpleaños, bodas,
            despedidas, ascensos y rumbas privadas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={conversionCTAs.evento.href}
              className="inline-block bg-secondary text-on-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary-container transition-colors"
            >
              {conversionCTAs.evento.label}
            </Link>
            <Link
              href={conversionCTAs.vip.href}
              className="inline-block border border-tertiary text-tertiary px-8 py-3 rounded-full font-semibold hover:bg-tertiary/10 transition-colors"
            >
              {conversionCTAs.vip.label}
            </Link>
          </div>
        </section>
      </main>

      <MobileBottomNav />
    </div>
  );
}
