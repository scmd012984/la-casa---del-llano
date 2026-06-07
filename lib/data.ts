import { images, type ImageKey } from "./images";
import { stitchEventosImages } from "./stitch-images";

export const conversionCTAs = {
  vip: {
    label: "Reservar Mesa VIP",
    href: "/reserva?tipo=vip#formulario-reserva",
    whatsappType: "vip" as const,
    description: "Mesa exclusiva con servicio preferencial y botellas premium.",
  },
  evento: {
    label: "Reservar Evento Privado",
    href: "/reserva?tipo=cumpleanos#formulario-reserva",
    whatsappType: "evento" as const,
    description:
      "Cumpleaños y festividades con comida, servicio de botellas y karaoke.",
  },
} as const;

export const audiovisualHighlights = [
  {
    id: "rumba-pista",
    title: "Rumba en la Pista",
    subtitle: "Luces LED y energía tropical",
    thumbnail: stitchEventosImages.karaoke,
    type: "reel" as const,
  },
  {
    id: "karaoke-vivo",
    title: "Karaoke en Vivo",
    subtitle: "Escenario y noches temáticas",
    thumbnail: stitchEventosImages.karaoke,
    type: "video" as const,
  },
  {
    id: "dj-temporada",
    title: "DJs por Temporada",
    subtitle: "Sets exclusivos cada fin de semana",
    thumbnail: stitchEventosImages.hero,
    type: "reel" as const,
  },
  {
    id: "ambiente-vip",
    title: "Experiencia VIP",
    subtitle: "Mesa premium y servicio de botellas",
    thumbnail: stitchEventosImages.hero,
    type: "video" as const,
  },
] as const;

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/eventos", label: "Eventos" },
  { href: "/menu", label: "Tragos y Tapas" },
  { href: "/reserva", label: "Reservas" },
] as const;

export const targetAudience = {
  title: "Para todas las edades",
  subtitle: "Entretenimiento nocturno en Venezuela",
  description:
    "Un espacio energético en La Guaira para quienes buscan rumba, buena música y celebrar fechas especiales. Ambiente vibrante, tragos premium y la mejor vibra del Casco Colonial.",
  familyPolicy:
    "Menores de edad bienvenidos únicamente con acompañamiento de familiar directo y responsable.",
  celebrations: [
    "Cumpleaños",
    "Ascensos",
    "Despedidas",
    "Bodas",
    "Aniversarios",
    "Celebraciones familiares",
  ],
} as const;

export const businessPillars = [
  {
    icon: "nightlife",
    title: "Tasca Disco",
    description:
      "Ambiente energético con luces LED, pista de baile y rumba tropical. DJs especiales por temporadas.",
    href: "/eventos",
    cta: "Ver la rumba",
  },
  {
    icon: "mic_external_on",
    title: "Karaoke",
    description:
      "Escenario profesional y noches temáticas para cantar, celebrar y vivir la noche al máximo.",
    href: "/eventos",
    cta: "Cartelera de karaoke",
  },
  {
    icon: "headphones",
    title: "DJs Especiales",
    description:
      "Por temporadas traemos DJs invitados que elevan la fiesta con sets exclusivos y buen ambiente musical.",
    href: "/eventos",
    cta: "Próximos DJs",
  },
  {
    icon: "local_bar",
    title: "Bebidas Premium",
    description:
      "Coctelería criolla, ron venezolano de autor y tragos premium para brindar en un ambiente vibrante.",
    href: "/menu",
    cta: "Ver tragos premium",
  },
  {
    icon: "celebration",
    title: "Tu Celebración",
    description:
      "Reservas para cumpleaños, ascensos, despedidas, bodas y todo tipo de eventos especiales.",
    href: "/reserva",
    cta: "Cotizar evento",
  },
] as const;

export const eventReservationTypes = [
  {
    id: "mesa",
    label: "Mesa Estándar",
    icon: "table_restaurant",
    description:
      "Reserva tu mesa para disfrutar de tragos premium, tapas y entretenimiento nocturno.",
  },
  {
    id: "vip",
    label: "Zona VIP",
    icon: "diamond",
    description:
      "Mesa exclusiva con servicio preferencial, botellas premium y la mejor vista del escenario.",
  },
  {
    id: "cumpleanos",
    label: "Cumpleaños",
    icon: "cake",
    description:
      "Celebra con decoración, comida, servicio de botellas, karaoke y barra premium.",
  },
  {
    id: "boda",
    label: "Boda / Aniversario",
    icon: "favorite",
    description:
      "Brinda por el amor con ambiente romántico, coctelería premium y música en vivo o DJ.",
  },
  {
    id: "despedida",
    label: "Despedida",
    icon: "flight_takeoff",
    description:
      "Despedidas memorables con rumba, karaoke, tragos y el mejor ambiente energético.",
  },
  {
    id: "ascenso",
    label: "Ascenso / Logro",
    icon: "workspace_premium",
    description:
      "Celebra tu ascenso o logro profesional con un evento a tu medida y barra premium.",
  },
  {
    id: "karaoke",
    label: "Karaoke Grupal",
    icon: "mic",
    description:
      "Reserva para tu grupo en nuestras noches temáticas de karaoke con escenario profesional.",
  },
  {
    id: "rumba-privada",
    label: "Rumba Privada",
    icon: "nightlife",
    description:
      "Cierra el espacio para tu celebración con DJ, karaoke y paquete todo incluido.",
  },
  {
    id: "familiar",
    label: "Celebración Familiar",
    icon: "groups",
    description:
      "Reuniones familiares con picoteo y barra. Menores con acompañamiento responsable.",
  },
  {
    id: "otro",
    label: "Otro Evento",
    icon: "event",
    description:
      "Cuéntanos tu idea y diseñamos un paquete personalizado para tu ocasión especial.",
  },
] as const;

export const weeklyNights = [
  {
    day: "Jueves",
    title: "Karaoke Night",
    description:
      "Noche temática de karaoke con escenario profesional. Ideal para celebrar cumpleaños y fechas especiales.",
    time: "8:00 PM – 2:00 AM",
    tag: "Karaoke",
    image: images.karaoke,
  },
  {
    day: "Viernes",
    title: "Rumba Tropical + DJ",
    description:
      "DJ en cabina, salsa, merengue y luces LED. Ambiente energético que no se detiene.",
    time: "9:00 PM – 3:00 AM",
    tag: "Disco",
    image: images.rumba,
  },
  {
    day: "Sábado",
    title: "Noche Premium VIP",
    description:
      "La noche más intensa: DJs especiales por temporada, karaoke y tragos premium.",
    time: "9:00 PM – 3:00 AM",
    tag: "VIP",
    image: images.rumba,
  },
  {
    day: "Miércoles",
    title: "Música en Vivo",
    description:
      "Arpa llanera y conjunto en vivo con coctelería criolla. Buen ambiente musical para empezar la semana.",
    time: "7:00 PM – 12:00 AM",
    tag: "En Vivo",
    image: images.arpa,
  },
] as const;

export const privateEventPackages = [
  {
    title: "Paquete Cumpleaños",
    includes: [
      "Mesa decorada",
      "Torta y catering de tapas",
      "Servicio de botellas premium (10 pax)",
      "Karaoke 2 horas",
    ],
  },
  {
    title: "Paquete Boda / Aniversario",
    includes: [
      "Decoración romántica",
      "Coctelería premium",
      "DJ o música en vivo",
      "Mesa VIP para los novios",
    ],
  },
  {
    title: "Paquete Despedida / Ascenso",
    includes: [
      "Espacio reservado",
      "Servicio de botellas por horas",
      "Karaoke y DJ",
      "Catering de comida y tapas",
    ],
  },
  {
    title: "Rumba Privada",
    includes: [
      "Local exclusivo",
      "DJ invitado o karaoke",
      "Barra libre premium",
      "Personal dedicado",
    ],
  },
] as const;

export const specialties = [
  "Reserva inmediata por WhatsApp",
  "Mesas VIP con servicio de botellas premium",
  "Eventos privados con comida y catering",
  "Carta digital de tragos y tapas",
  "Ambiente rumbero con DJs y karaoke en vivo",
] as const;

export const restaurantInfo = {
  name: "La Casa del Llano 2014",
  tagline: "Tasca · Disco · Karaoke",
  location: "Casco Colonial, La Guaira, Venezuela",
  address: "Av. Urdaneta, Casco Histórico, La Guaira 1160",
  phone: "+58 212-355-0000",
  hours: "Mié – Dom: 7:00 PM – 3:00 AM",
  description:
    "En el Casco Colonial de La Guaira, Venezuela, La Casa del Llano 2014 es el punto de encuentro para quienes buscan entretenimiento nocturno con energía, buena música y tragos premium. Celebra cumpleaños, ascensos, despedidas, bodas y fechas especiales en un ambiente vibrante con karaoke, DJs por temporadas y coctelería de autor.",
  shortDescription:
    "Reserva mesa VIP y eventos privados en La Guaira. Rumba, karaoke, carta digital de tragos y tapas, y servicio de botellas premium.",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.8!2d-66.934!3d10.601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a3b8f8f8f8f8f%3A0x0!2sLa%20Guaira%2C%20Venezuela!5e0!3m2!1ses!2sve!4v1700000000000!5m2!1ses!2sve",
} as const;

export const stitchScreens = {
  inicio: "SCREEN_15",
  menu: "SCREEN_16",
  eventos: "SCREEN_17",
  reserva: "SCREEN_2",
} as const;

export type { ImageKey };
