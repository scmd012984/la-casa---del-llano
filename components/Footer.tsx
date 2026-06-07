import Link from "next/link";
import { navLinks, restaurantInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest py-12 border-t border-primary-container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-16 max-w-[1280px] mx-auto">
        <div className="space-y-4 md:col-span-1">
          <div className="font-display text-2xl text-on-surface">
            {restaurantInfo.name.replace(" 2014", "")}
          </div>
          <p className="text-sm text-on-surface-variant opacity-80">
            {restaurantInfo.tagline}. Rumba, karaoke, tragos y reservas para
            todo tipo de eventos.
          </p>
          <p className="text-xs text-on-surface-variant">
            © {new Date().getFullYear()} {restaurantInfo.name}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-secondary uppercase mb-2 tracking-widest font-semibold">
            Navegación
          </span>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base text-on-surface-variant hover:text-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#ubicacion"
            className="text-base text-on-surface-variant hover:text-secondary transition-colors"
          >
            Ubicación
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-secondary uppercase mb-2 tracking-widest font-semibold">
            Contacto
          </span>
          <p className="text-sm text-on-surface-variant">
            {restaurantInfo.address}
          </p>
          <p className="text-sm text-on-surface-variant">
            {restaurantInfo.phone}
          </p>
          <p className="text-sm text-on-surface-variant">
            {restaurantInfo.hours}
          </p>
          <Link
            href="/reserva"
            className="text-base text-on-surface-variant hover:text-tertiary transition-colors"
          >
            Reservar Evento
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-secondary uppercase mb-2 tracking-widest font-semibold">
            Redes
          </span>
          <a
            href="#"
            className="text-base text-on-surface-variant hover:text-tertiary transition-colors"
            aria-label="Instagram (próximamente)"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-base text-on-surface-variant hover:text-tertiary transition-colors"
            aria-label="Facebook (próximamente)"
          >
            Facebook
          </a>
          <a
            href={`https://wa.me/${restaurantInfo.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-on-surface-variant hover:text-tertiary transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
