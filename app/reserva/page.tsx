import type { Metadata } from "next";
import Image from "next/image";
import MobileBottomNav from "@/components/MobileBottomNav";
import ReservationForm from "@/components/ReservationForm";
import { restaurantInfo, specialties } from "@/lib/data";
import { stitchImages } from "@/lib/stitch-images";

export const metadata: Metadata = {
  title: "Reserva de Mesa",
  description:
    "Reserva tu mesa en La Casa del Llano 2014. Formulario, ubicación y especialidades de la casa.",
};

export default function ReservaPage() {
  return (
    <div className="pb-20 md:pb-0">
      {/* SCREEN_2 — Hero */}
      <header className="relative min-h-[45vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={stitchImages.fachada}
            alt="Reserva de mesa en La Casa del Llano"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50 grayscale-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 grain-texture" />
        </div>
        <div className="relative z-10 px-4 md:px-16 pb-12 max-w-[1280px] mx-auto w-full">
          <span className="inline-block mb-3 px-4 py-1 bg-primary-container text-tertiary rounded-full text-xs uppercase tracking-widest border border-tertiary/30 font-semibold">
            Conversión y Contacto
          </span>
          <h1 className="font-display text-4xl md:text-[48px] font-bold text-on-surface">
            Reserva de Mesa
          </h1>
          <p className="text-base text-on-surface-variant mt-3 max-w-lg">
            Asegura tu lugar para la mejor gastronomía criolla y las noches de
            rumba en La Guaira.
          </p>
        </div>
      </header>

      <section className="py-24 px-4 md:px-16 max-w-[1280px] mx-auto">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Formulario */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-2xl text-on-surface mb-6">
              Formulario de Reserva
            </h2>
            <ReservationForm />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2 space-y-8">
            <div className="rounded-xl overflow-hidden bg-surface-container border border-outline-variant/30">
              <div className="relative aspect-[16/10]">
                <Image
                  src={stitchImages.camarones}
                  alt="Especialidades de la casa"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-secondary mb-4">
                  Especialidades de la Casa
                </h3>
                <ul className="space-y-3">
                  {specialties.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-secondary text-base mt-0.5">
                        star
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-xl p-6 bg-surface-container border border-outline-variant/30">
              <h3 className="font-display text-xl text-secondary mb-4">
                Contacto y Horarios
              </h3>
              <p className="text-sm text-on-surface-variant mb-1">
                {restaurantInfo.address}
              </p>
              <p className="text-sm text-on-surface-variant mb-1">
                {restaurantInfo.location}
              </p>
              <p className="text-sm text-on-surface-variant mb-4">
                {restaurantInfo.phone}
              </p>
              <p className="text-sm text-on-surface-variant">{restaurantInfo.hours}</p>
            </div>

            <div className="rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container">
              <iframe
                title="Ubicación La Casa del Llano"
                src={restaurantInfo.mapEmbedUrl}
                className="w-full aspect-square border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="p-4 text-center">
                <a
                  href="https://maps.google.com/?q=La+Guaira+Venezuela+Casco+Colonial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-tertiary hover:text-secondary transition-colors underline"
                >
                  Ver en Google Maps →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <MobileBottomNav />
    </div>
  );
}
