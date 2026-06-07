import {
  celebrationCombos,
  eventReservationTypes,
  quotePackageOptions,
  restaurantInfo,
} from "./data";

export type QuoteFormPayload = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  celebrationType: string;
  packageId: string;
  extras: string[];
  notes: string;
};

/** @deprecated Usar QuoteFormPayload */
type ReservationPayload = QuoteFormPayload & {
  eventType: string;
  bottleService: boolean;
  foodService: boolean;
};

export function buildWhatsAppUrl(message: string) {
  const digits = restaurantInfo.phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildQuoteMessage(data: QuoteFormPayload) {
  const packageLabel =
    quotePackageOptions.find((pkg) => pkg.id === data.packageId)?.label ??
    data.packageId;

  const comboDetail = celebrationCombos.find((combo) => combo.id === data.packageId);

  const extrasBlock =
    data.extras.length > 0
      ? `\n*Extras solicitados:*\n${data.extras.map((extra) => `✓ ${extra}`).join("\n")}`
      : null;

  const timeLine = data.time ? `*Hora aproximada:* ${data.time}` : null;

  return [
    `*Cotización — ${restaurantInfo.name}*`,
    "",
    `*Tipo de celebración:* ${data.celebrationType}`,
    `*Paquete de preferencia:* ${packageLabel}`,
    comboDetail ? `_(${comboDetail.tagline})_` : null,
    `*Fecha del evento:* ${data.date}`,
    timeLine,
    `*Personas estimadas:* ${data.guests}`,
    extrasBlock,
    `\n*Contacto:*`,
    `*Nombre:* ${data.name}`,
    `*Teléfono:* ${data.phone}`,
    data.notes ? `\n*Notas adicionales:*\n${data.notes}` : null,
    "",
    "Enviado desde la web. ¡Gracias!",
  ]
    .filter(Boolean)
    .join("\n");
}

/** @deprecated Usar buildQuoteMessage */
export function buildReservationMessage(data: ReservationPayload) {
  const typeLabel =
    eventReservationTypes.find((t) => t.id === data.eventType)?.label ??
    data.eventType;

  return buildQuoteMessage({
    name: data.name,
    phone: data.phone,
    date: data.date,
    time: data.time,
    guests: data.guests,
    celebrationType: typeLabel,
    packageId: data.packageId || "personalizado",
    extras: data.extras,
    notes: data.notes,
  });
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
