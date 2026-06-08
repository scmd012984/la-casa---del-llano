import {
  eventReservationTypes,
  restaurantInfo,
  venueAddress,
} from "./data";
import { locationLinks } from "./location";

export type WhatsAppFunnelKey =
  | "home_default"
  | "home_noches"
  | "home_celebraciones"
  | "home_ubicacion"
  | "menu_default"
  | "menu_botellas"
  | "menu_cocteleria"
  | "menu_tapas"
  | "eventos_default"
  | "eventos_celebraciones"
  | "reserva_default"
  | `reserva_${string}`;

export type WhatsAppFunnelContext = {
  pathname: string;
  section?: string | null;
  eventType?: string | null;
};

export type WhatsAppFunnelConfig = {
  shortLabel: string;
  fabAriaLabel: string;
  hint?: string;
  message: string;
  formHref?: string;
  mapsHref?: string;
  mapsAriaLabel?: string;
};

const eventTypeLabels = Object.fromEntries(
  eventReservationTypes.map((type) => [type.id, type.label])
) as Record<string, string>;

export const whatsappFunnelSectionsByPath: Record<string, string[]> = {
  "/": ["noches", "celebraciones", "ubicacion"],
  "/menu": ["botellas", "cocteleria", "tapas"],
  "/eventos": ["celebraciones"],
};

const funnelTemplates: Record<
  Exclude<WhatsAppFunnelKey, `reserva_${string}`> | "reserva_default",
  WhatsAppFunnelConfig
> = {
  home_default: {
    shortLabel: "Consultar",
    fabAriaLabel: "Contactar por WhatsApp",
    hint: "Información general",
    message: [
      `Hola, me interesa *${restaurantInfo.name}*.`,
      "¿Podrían orientarme sobre reservas, carta y próximas noches temáticas?",
    ].join("\n"),
    formHref: "/reserva",
  },
  home_noches: {
    shortLabel: "Noche temática",
    fabAriaLabel: "Reservar noche temática por WhatsApp",
    hint: "Calendario de noches",
    message: [
      `Hola, vi el calendario de noches temáticas de *${restaurantInfo.name}*.`,
      "Me gustaría reservar para la fecha *___* con *___* personas.",
      "¿Qué noche recomiendan y qué incluye la reserva?",
    ].join("\n"),
    formHref: "/reserva?tipo=karaoke#formulario-reserva",
  },
  home_celebraciones: {
    shortLabel: "Cotizar evento",
    fabAriaLabel: "Cotizar celebración por WhatsApp",
    hint: "Combos y celebraciones",
    message: [
      `Hola, quiero cotizar una celebración en *${restaurantInfo.name}*.`,
      "*Tipo de evento:* cumpleaños / festividad (indicar)",
      "*Fecha:* ___",
      "*Personas estimadas:* ___",
      "Vi sus combos en la web y me gustaría conocer opciones y disponibilidad.",
    ].join("\n"),
    formHref: "/reserva?tipo=cumpleanos#formulario-reserva",
  },
  home_ubicacion: {
    shortLabel: "Ubicación",
    fabAriaLabel: "Consultar ubicación por WhatsApp",
    hint: "Cómo llegar y horarios",
    mapsHref: locationLinks.directionsUrl,
    mapsAriaLabel: "Abrir cómo llegar en Google Maps",
    message: [
      `Hola, quisiera confirmar la ubicación (${venueAddress}) y horarios de *${restaurantInfo.name}*.`,
      "Planeo visitarlos el día *___* aproximadamente a las *___*.",
      "¿Tienen estacionamiento o alguna recomendación para llegar?",
    ].join("\n"),
  },
  menu_default: {
    shortLabel: "Consultar carta",
    fabAriaLabel: "Consultar carta por WhatsApp",
    hint: "Menú y reservas",
    message: [
      `Hola, estoy viendo la carta de *${restaurantInfo.name}*.`,
      "Me gustaría reservar mesa para la fecha *___* con *___* personas.",
      "¿Qué recomiendan de la carta y tienen disponibilidad?",
    ].join("\n"),
    formHref: "/reserva?tipo=mesa#formulario-reserva",
  },
  menu_botellas: {
    shortLabel: "Botellas y barra",
    fabAriaLabel: "Consultar botellas por WhatsApp",
    hint: "Servicio de botellas",
    message: [
      `Hola, vi la sección de botellas y baldes en la carta de *${restaurantInfo.name}*.`,
      "Quiero reservar para la fecha *___* con *___* personas.",
      "¿Qué botellas o paquetes de barra recomiendan para mi grupo?",
    ].join("\n"),
    formHref: "/reserva?tipo=vip#formulario-reserva",
  },
  menu_cocteleria: {
    shortLabel: "Coctelería",
    fabAriaLabel: "Consultar coctelería por WhatsApp",
    hint: "Cocteles de autor",
    message: [
      `Hola, me interesan los cócteles de autor de *${restaurantInfo.name}*.`,
      "Quiero reservar mesa para la fecha *___* con *___* personas.",
      "¿Cuáles son los más pedidos y hay promociones de barra?",
    ].join("\n"),
    formHref: "/reserva?tipo=mesa#formulario-reserva",
  },
  menu_tapas: {
    shortLabel: "Tapas",
    fabAriaLabel: "Consultar tapas por WhatsApp",
    hint: "Picoteo para compartir",
    message: [
      `Hola, vi las tapas para compartir en *${restaurantInfo.name}*.`,
      "Quiero reservar para la fecha *___* con *___* personas.",
      "¿Qué combinación de tapas recomiendan para mi grupo?",
    ].join("\n"),
    formHref: "/reserva?tipo=mesa#formulario-reserva",
  },
  eventos_default: {
    shortLabel: "Evento privado",
    fabAriaLabel: "Reservar evento privado por WhatsApp",
    hint: "Rumba, karaoke y DJs",
    message: [
      `Hola, me interesa organizar un evento privado en *${restaurantInfo.name}*.`,
      "*Tipo:* cumpleaños / despedida / boda (indicar)",
      "*Fecha:* ___",
      "*Personas estimadas:* ___",
      "¿Qué paquetes incluyen comida, botellas y karaoke?",
    ].join("\n"),
    formHref: "/reserva?tipo=cumpleanos#formulario-reserva",
  },
  eventos_celebraciones: {
    shortLabel: "Cotizar combo",
    fabAriaLabel: "Cotizar combo de celebración por WhatsApp",
    hint: "Combos Platino, Rumbero y más",
    message: [
      `Hola, vi los combos de celebración de *${restaurantInfo.name}* (Platino, Rumbero, etc.).`,
      "Quiero cotizar para la fecha *___* con *___* personas.",
      "*Tipo de celebración:* cumpleaños / boda / corporativo (indicar)",
      "¿Cuál combo recomiendan según mi grupo?",
    ].join("\n"),
    formHref: "/reserva?tipo=cumpleanos#formulario-reserva",
  },
  reserva_default: {
    shortLabel: "Cotización rápida",
    fabAriaLabel: "Enviar cotización por WhatsApp",
    hint: "Alternativa al formulario",
    message: [
      `Hola, quiero cotizar en *${restaurantInfo.name}*.`,
      "*Tipo de reserva:* mesa / evento (indicar)",
      "*Fecha:* ___",
      "*Personas estimadas:* ___",
      "Prefiero coordinar los detalles por aquí.",
    ].join("\n"),
    formHref: "/reserva#formulario-reserva",
  },
};

function buildReservaFunnelConfig(eventType: string): WhatsAppFunnelConfig {
  const label = eventTypeLabels[eventType] ?? eventType;
  const formHref = `/reserva?tipo=${eventType}#formulario-reserva`;

  const messageByType: Partial<Record<string, string>> = {
    vip: [
      `Hola, quiero reservar *Mesa VIP* en *${restaurantInfo.name}*.`,
      "*Fecha:* ___",
      "*Hora aproximada:* ___",
      "*Personas:* ___",
      "Me interesa servicio preferencial y botellas selectas. ¿Hay disponibilidad?",
    ].join("\n"),
    cumpleanos: [
      `Hola, quiero cotizar un *cumpleaños* en *${restaurantInfo.name}*.`,
      "*Fecha del evento:* ___",
      "*Personas estimadas:* ___",
      "Me interesa comida, servicio de botellas y karaoke. ¿Qué combos recomiendan?",
    ].join("\n"),
    boda: [
      `Hola, quiero cotizar una *boda o aniversario* en *${restaurantInfo.name}*.`,
      "*Fecha:* ___",
      "*Personas estimadas:* ___",
      "¿Qué paquetes incluyen decoración, coctelería y entretenimiento?",
    ].join("\n"),
    despedida: [
      `Hola, quiero organizar una *despedida* en *${restaurantInfo.name}*.`,
      "*Fecha:* ___",
      "*Personas estimadas:* ___",
      "¿Qué incluye el paquete de rumba, karaoke y barra?",
    ].join("\n"),
    karaoke: [
      `Hola, quiero reservar *karaoke grupal* en *${restaurantInfo.name}*.`,
      "*Fecha:* ___",
      "*Personas:* ___",
      "¿En qué noche temática nos recomiendan y qué incluye la reserva?",
    ].join("\n"),
  };

  return {
    shortLabel: `Cotizar ${label}`,
    fabAriaLabel: `Cotizar ${label} por WhatsApp`,
    hint: label,
    message:
      messageByType[eventType] ??
      [
        `Hola, quiero cotizar *${label}* en *${restaurantInfo.name}*.`,
        "*Fecha:* ___",
        "*Personas estimadas:* ___",
        "¿Podrían orientarme sobre paquetes y disponibilidad?",
      ].join("\n"),
    formHref,
  };
}

export function resolveWhatsAppFunnelKey(
  context: WhatsAppFunnelContext
): WhatsAppFunnelKey {
  const { pathname, section, eventType } = context;

  if (pathname === "/reserva") {
    if (eventType && eventTypeLabels[eventType]) {
      return `reserva_${eventType}` as WhatsAppFunnelKey;
    }
    return "reserva_default";
  }

  if (pathname === "/menu" && section) {
    if (section === "botellas") return "menu_botellas";
    if (section === "cocteleria") return "menu_cocteleria";
    if (section === "tapas") return "menu_tapas";
  }

  if (pathname === "/eventos") {
    if (section === "celebraciones") return "eventos_celebraciones";
    return "eventos_default";
  }

  if (pathname === "/") {
    if (section === "noches") return "home_noches";
    if (section === "celebraciones") return "home_celebraciones";
    if (section === "ubicacion") return "home_ubicacion";
    return "home_default";
  }

  return "home_default";
}

export function getWhatsAppFunnelConfig(
  key: WhatsAppFunnelKey
): WhatsAppFunnelConfig {
  if (key.startsWith("reserva_") && key !== "reserva_default") {
    const eventType = key.replace("reserva_", "");
    return buildReservaFunnelConfig(eventType);
  }

  return funnelTemplates[key as keyof typeof funnelTemplates] ?? funnelTemplates.home_default;
}
