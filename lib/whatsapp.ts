import { eventReservationTypes, restaurantInfo } from "./data";

type ReservationPayload = {
  eventType: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
  bottleService: boolean;
  foodService: boolean;
};

export function buildWhatsAppUrl(message: string) {
  const digits = restaurantInfo.phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildReservationMessage(data: ReservationPayload) {
  const typeLabel =
    eventReservationTypes.find((t) => t.id === data.eventType)?.label ??
    data.eventType;

  const services = [
    data.bottleService ? "✓ Servicio de botellas" : null,
    data.foodService ? "✓ Catering / comida" : null,
  ]
    .filter(Boolean)
    .join("\n");

  return [
    `*Reserva — ${restaurantInfo.name}*`,
    "",
    `*Tipo:* ${typeLabel}`,
    `*Nombre:* ${data.name}`,
    `*Teléfono:* ${data.phone}`,
    `*Fecha:* ${data.date}`,
    `*Hora:* ${data.time}`,
    `*Personas:* ${data.guests}`,
    services ? `\n*Servicios adicionales:*\n${services}` : null,
    data.notes ? `\n*Detalles:*\n${data.notes}` : null,
    "",
    "Enviado desde la web. ¡Gracias!",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildQuickReservationMessage(
  type: "vip" | "evento",
  label?: string
) {
  const typeLabel =
    label ??
    (type === "vip" ? "Mesa VIP" : "Evento Privado (cumpleaños / festividad)");

  return [
    `Hola, quiero reservar en *${restaurantInfo.name}*`,
    "",
    `*Tipo:* ${typeLabel}`,
    "Me gustaría información sobre disponibilidad, comida y servicio de botellas.",
  ].join("\n");
}
