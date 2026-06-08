import { buildWhatsAppDirectionsUrl, locationLinks } from "@/lib/location";

export default function LocationActions() {
  const whatsappDirections = buildWhatsAppDirectionsUrl();

  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mt-6">
      <a
        href={locationLinks.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-led btn-led--md inline-flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-lg" aria-hidden>
          directions
        </span>
        Cómo llegar
      </a>
      <a
        href={whatsappDirections}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-led btn-led--alt btn-led--md inline-flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-lg" aria-hidden>
          chat
        </span>
        Ubicación por WhatsApp
      </a>
      <a
        href={locationLinks.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-led btn-led--ghost btn-led--md inline-flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-lg" aria-hidden>
          map
        </span>
        Abrir en Maps
      </a>
    </div>
  );
}
