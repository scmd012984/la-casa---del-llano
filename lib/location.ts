import { restaurantInfo, venueAddress, venueCoordinates } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const mapsAddressQuery = encodeURIComponent(`${venueAddress}, Venezuela`);
const mapsCoordsQuery = `${venueCoordinates.lat},${venueCoordinates.lng}`;

export const locationLinks = {
  /** Abre Google Maps con ruta al local (coordenadas precisas). */
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${mapsCoordsQuery}`,
  /** Abre la ficha del lugar en Google Maps. */
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${mapsAddressQuery}`,
} as const;

export function buildWhatsAppDirectionsUrl() {
  const message = `Hola, quisiera saber cómo llegar a ${restaurantInfo.name} en ${venueAddress}. ¿Me pueden indicar la ubicación?`;
  return buildWhatsAppUrl(message);
}
