import Link from "next/link";
import PaymentMethodsPanel from "@/components/PaymentMethodsPanel";
import { navLinks, restaurantInfo, siteArchitecture, socialProof } from "@/lib/data";
import { mailtoHref, telHref, whatsappHref } from "@/lib/contact";

export default function Footer() {
  const { instagram, googleBusiness } = socialProof;

  return (
    <footer className="site-footer bg-surface-container-lowest py-12 site-section-divider-t wood-pattern">
      <div className="site-container grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
          <span className="eyebrow-llano mb-2 block">Navegación</span>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {siteArchitecture.anchors.map((anchor) => (
            <Link
              key={anchor.id}
              href={anchor.href}
              className="text-base text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {anchor.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <span className="eyebrow-llano mb-2 block">Contacto</span>
          <p className="text-sm text-on-surface-variant">{restaurantInfo.address}</p>
          <a
            href={telHref}
            className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
          >
            {restaurantInfo.phone}
          </a>
          <a
            href={mailtoHref}
            className="text-sm text-on-surface-variant hover:text-on-surface transition-colors break-all"
          >
            {restaurantInfo.email}
          </a>
          <p className="text-sm text-on-surface-variant">{restaurantInfo.hours}</p>
          <Link
            href="/reserva"
            className="text-base text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Reservar evento
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <span className="eyebrow-llano mb-2 block">Redes</span>
          <a
            href={instagram.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Instagram {instagram.handle}
          </a>
          <a
            href={googleBusiness.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Google Maps
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-on-surface-variant hover:text-on-surface transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="site-container mt-10 pt-8 site-section-divider-t">
        <PaymentMethodsPanel variant="strip" />
      </div>
    </footer>
  );
}
