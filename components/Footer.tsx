import Link from "next/link";
import { restaurantInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest py-12 border-t border-primary-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-16 max-w-[1280px] mx-auto">
        <div className="space-y-4">
          <div className="font-display text-2xl text-on-surface">
            {restaurantInfo.name.replace(" 2014", "")}
          </div>
          <p className="text-base text-on-surface-variant opacity-80">
            © {new Date().getFullYear()} {restaurantInfo.name}. Sabor Llanero y
            Rumba Guaireña. Pasión por nuestra tierra en cada rincón.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-secondary uppercase mb-2 tracking-widest font-semibold">
            Social
          </span>
          <a
            href="#"
            className="text-base text-on-surface-variant hover:text-tertiary transition-colors"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-base text-on-surface-variant hover:text-tertiary transition-colors"
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

        <div className="flex flex-col gap-2">
          <span className="text-xs text-secondary uppercase mb-2 tracking-widest font-semibold">
            Contacto
          </span>
          <p className="text-base text-on-surface-variant">
            {restaurantInfo.address}
          </p>
          <p className="text-base text-on-surface-variant">
            {restaurantInfo.phone}
          </p>
          <Link
            href="/reserva"
            className="text-base text-on-surface-variant hover:text-tertiary transition-colors"
          >
            Contáctanos
          </Link>
        </div>
      </div>
    </footer>
  );
}
