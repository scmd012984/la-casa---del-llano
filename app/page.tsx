import Image from "next/image";
import Link from "next/link";
import MobileBottomNav from "@/components/MobileBottomNav";
import { NeonPulse, ScrollRevealCards } from "@/components/StitchAnimations";
import { restaurantInfo } from "@/lib/data";
import { stitchImages } from "@/lib/stitch-images";

export default function Home() {
  return (
    <div className="pb-20 md:pb-0">
      <ScrollRevealCards />
      <NeonPulse />

      {/* SCREEN_15 — Hero / Fachada */}
      <header className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={stitchImages.fachada}
            alt="Fachada de La Casa del Llano en el Casco Colonial de La Guaira"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60 grayscale-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />
          <div className="absolute inset-0 grain-texture" />
          <div className="absolute top-1/3 -left-20 w-96 h-96 bg-secondary/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-tertiary/15 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 text-center px-4 md:px-16 max-w-4xl">
          <span className="inline-block mb-4 px-4 py-1 bg-primary-container text-secondary rounded-full text-xs uppercase tracking-widest border border-secondary/30 font-semibold">
            Casco Histórico · La Guaira
          </span>
          <h1 className="font-display text-4xl md:text-[56px] md:leading-[64px] font-bold mb-6 leading-tight">
            {restaurantInfo.name}
          </h1>
          <p className="text-base text-on-surface-variant mb-8 max-w-2xl mx-auto leading-relaxed">
            {restaurantInfo.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/menu"
              className="bg-secondary text-on-secondary px-8 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-[0_0_20px_rgba(217,160,54,0.5)] active:scale-95"
            >
              Ver Menú de Tapas
            </Link>
            <Link
              href="/eventos"
              className="bg-transparent border border-tertiary text-tertiary px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-tertiary/10 active:scale-95"
            >
              Eventos y Rumba
            </Link>
          </div>
        </div>
      </header>

      {/* Atmósfera dual: gastronomía + rumba */}
      <section className="py-24 px-4 md:px-16 max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl text-on-surface mb-2">
            Dos almas, <span className="text-secondary italic">un solo hogar</span>
          </h2>
          <p className="text-base text-on-surface-variant max-w-xl mx-auto">
            Gastronomía criolla de día, rumba y karaoke cuando cae la noche.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 group relative overflow-hidden rounded-xl bg-surface-container border border-outline-variant/30 h-[380px] interactive-card">
            <Image
              src={stitchImages.gastronomia}
              alt="Gastronomía criolla venezolana"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center rounded-lg mb-4 border border-secondary/30">
                <span className="material-symbols-outlined text-secondary">
                  restaurant
                </span>
              </div>
              <h3 className="font-display text-2xl text-secondary mb-2 neon-glow-stone">
                Gastronomía Criolla
              </h3>
              <p className="text-base text-on-surface-variant max-w-md">
                Empanadas, tequeños, camarones al ajillo y carne frita. Recetas
                familiares desde 2014.
              </p>
              <Link
                href="/menu"
                className="inline-block mt-4 text-sm text-secondary font-semibold hover:text-tertiary transition-colors"
              >
                Ver catálogo de tapas →
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 group relative overflow-hidden rounded-xl bg-surface-container border border-outline-variant/30 h-[380px] interactive-card">
            <Image
              src={stitchImages.karaoke}
              alt="Noches de rumba y karaoke"
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="font-display text-2xl text-tertiary mb-2 neon-glow-magenta">
                Rumba y Karaoke
              </h3>
              <p className="text-base text-on-surface-variant">
                Luces LED, arpa llanera y las mejores noches del puerto.
              </p>
              <Link
                href="/eventos"
                className="inline-block mt-4 text-sm text-tertiary font-semibold hover:text-secondary transition-colors"
              >
                Ver eventos →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-24 bg-surface-container-lowest border-y border-outline-variant/20">
        <div className="px-4 md:px-16 max-w-[1280px] mx-auto grid gap-10 lg:grid-cols-2 items-center">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-outline-variant/30 interactive-card">
            <Image
              src={stitchImages.terraza}
              alt="Terraza y ambiente familiar"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl text-on-surface mb-4">
              Nuestra <span className="text-secondary italic">Historia</span>
            </h2>
            <p className="text-base text-on-surface-variant leading-relaxed mb-6">
              Fundada en 2014 en el Casco Histórico de La Guaira, nuestra tasca
              nació del sueño de una familia llanera que quiso traer el calor del
              llano y la brisa del mar Caribe a un mismo lugar.
            </p>
            <Link
              href="/reserva"
              className="inline-block bg-secondary text-on-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary-container transition-colors"
            >
              Reserva tu Mesa
            </Link>
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section id="ubicacion" className="py-24 px-4 md:px-16 max-w-[1280px] mx-auto scroll-mt-20">
        <h2 className="font-display text-3xl text-on-surface text-center mb-10">
          Ubicación en el <span className="text-secondary italic">Casco Colonial</span>
        </h2>
        <div className="rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container">
          <iframe
            title="Mapa de La Casa del Llano 2014"
            src={restaurantInfo.mapEmbedUrl}
            className="w-full aspect-[16/9] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="p-6 text-center bg-surface-container-high">
            <p className="text-secondary font-semibold mb-1">
              {restaurantInfo.location}
            </p>
            <p className="text-sm text-on-surface-variant">{restaurantInfo.address}</p>
            <a
              href="https://maps.google.com/?q=La+Guaira+Venezuela+Casco+Colonial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-tertiary hover:text-secondary transition-colors underline"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </section>

      <MobileBottomNav />
    </div>
  );
}
