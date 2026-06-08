import { restaurantInfo } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const mapsQuery = encodeURIComponent(
  "La Casa del Llano 2014, Av. Urdaneta, Casco Histórico, La Guaira, Venezuela",
);

export const locationLinks = {
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
} as const;

export function buildWhatsAppDirectionsUrl() {
  const message = `Hola, quisiera saber cómo llegar a ${restaurantInfo.name} en ${restaurantInfo.location}. ¿Me pueden indicar la ubicación?`;
  return buildWhatsAppUrl(message);
}
