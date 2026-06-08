import { images, type ImageKey } from "./images";
import { stitchEventosImages } from "./stitch-images";

/** Dirección oficial del local — una sola fuente para mapas, footer y SEO. */
export const venueAddress = "Calle Bolívar, Casco Histórico, La Guaira" as const;

/** Coordenadas del Casco Histórico (Google Maps / cómo llegar). */
export const venueCoordinates = {
  lat: 10.5992,
  lng: -66.9339,
} as const;

const mapEmbedQuery = encodeURIComponent(`${venueAddress}, Venezuela`);

export const conversionCTAs = {
  vip: {
    label: "Reservar Mesa VIP",
    href: "/reserva?tipo=vip#formulario-reserva",
    whatsappType: "vip" as const,
    description: "Mesa exclusiva con servicio preferencial y botellas selectas.",
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
    id: "bienvenida",
    title: "Mensaje de bienvenida",
    subtitle: "Los esperamos con los brazos abiertos",
    thumbnail: "/videos/bienvenida-poster.jpg",
    type: "video" as const,
    typeLabel: "Bienvenida",
    featured: true,
  },
  {
    id: "rumba-pista",
    title: "Karaoke Llanero",
    subtitle: "Escenario y noches temáticas",
    thumbnail: "/videos/rumba-pista-poster.jpg",
    type: "video" as const,
    typeLabel: "",
  },
  {
    id: "karaoke-vivo",
    title: "Ubicación de La Casa del Llano",
    subtitle: venueAddress,
    thumbnail: "/videos/karaoke-vivo-poster.jpg",
    type: "video" as const,
    typeLabel: "",
  },
  {
    id: "dj-temporada",
    title: "DJs por Temporada",
    subtitle: "Sesiones exclusivas cada fin de semana",
    thumbnail: stitchEventosImages.hero,
    type: "photo" as const,
    typeLabel: "Ambiente",
  },
  {
    id: "ambiente-vip",
    title: "Experiencia VIP",
    subtitle: "Mesa selecta y servicio de botellas",
    thumbnail: stitchEventosImages.hero,
    type: "photo" as const,
    typeLabel: "VIP",
  },
] as const;

export const siteArchitecture = {
  principle:
    "4 rutas limpias. Inicio modular. Todo lo demás es componente, ancla o CTA — no página nueva.",
  model: "modular-landing",
  maxSections: 4,
  approach: "mobile-first",
  globalShell: ["navbar", "mobileBottomNav", "conversionFab", "footer"] as const,
  sections: [
    {
      id: "inicio",
      href: "/",
      label: "Inicio",
      mobileLabel: "Inicio",
      icon: "home",
      role: "Landing modular",
      objective: "Marca, ambiente audiovisual, cartelera y ubicación",
      stitchScreen: "SCREEN_15",
      modules: [
        { id: "hero", label: "Hero con video de bienvenida" },
        { id: "thematic-nights", label: "Calendario noches temáticas", anchor: "noches" },
        { id: "social-proof", label: "Instagram y reseñas Google" },
        { id: "celebraciones", label: "Combos de eventos y celebraciones", anchor: "celebraciones" },
        { id: "business-pillars", label: "Pilares del negocio" },
        { id: "experience-gallery", label: "Galería audiovisual" },
        { id: "private-events-cta", label: "CTA eventos privados" },
        { id: "location", label: "Mapa y ubicación", anchor: "ubicacion" },
      ],
    },
    {
      id: "eventos",
      href: "/eventos",
      label: "Eventos",
      mobileLabel: "Rumba",
      icon: "nightlife",
      role: "Entretenimiento",
      objective: "Proyectar la rumba, karaoke y DJs por temporadas",
      stitchScreen: "SCREEN_17",
      modules: [
        { id: "hero", label: "Hero de eventos" },
        { id: "bento", label: "Karaoke, pista y música en vivo" },
        { id: "cartelera", label: "Calendario de eventos" },
        { id: "celebraciones", label: "Combos de celebraciones", anchor: "celebraciones" },
        { id: "experience-gallery", label: "Galería audiovisual" },
        { id: "conversion-cta", label: "CTA reservas VIP y eventos" },
      ],
    },
    {
      id: "menu",
      href: "/menu",
      label: "Tragos y Tapas",
      mobileLabel: "Tragos",
      icon: "local_bar",
      role: "Carta digital",
      objective: "Consulta rápida de tragos, tapas y botellas VIP",
      stitchScreen: "SCREEN_16",
      modules: [
        { id: "hero", label: "Hero y CTAs" },
        { id: "digital-menu", label: "Carta web interactiva" },
        { id: "botellas", label: "Botellas y baldes de cerveza", anchor: "botellas" },
        { id: "cocteleria", label: "Coctelería de autor", anchor: "cocteleria" },
        { id: "tapas", label: "Tapas para compartir", anchor: "tapas" },
        { id: "conversion-cta", label: "CTA reservas" },
      ],
    },
    {
      id: "reserva",
      href: "/reserva",
      label: "Reservas",
      mobileLabel: "Reservas",
      icon: "event_available",
      role: "Conversión",
      objective: "Mesa VIP y eventos privados con confirmación por WhatsApp",
      stitchScreen: "SCREEN_2",
      modules: [
        { id: "hero", label: "Hero y CTAs rápidos" },
        { id: "event-types", label: "Tipos de reserva" },
        { id: "celebraciones", label: "Combos Platino, Rumbero y más", anchor: "celebraciones" },
        { id: "metodos-pago", label: "Métodos de pago", anchor: "metodos-pago" },
        { id: "form", label: "Formulario WhatsApp", anchor: "formulario-reserva" },
      ],
    },
  ],
  anchors: [
    {
      id: "ubicacion",
      label: "Ubicación",
      href: "/#ubicacion",
      sectionId: "inicio",
    },
  ],
} as const;

export type SiteSectionId =
  (typeof siteArchitecture.sections)[number]["id"];

export const navLinks = siteArchitecture.sections.map(({ href, label }) => ({
  href,
  label,
}));

/** Etiquetas cortas solo para la barra superior (desktop/tablet). */
export const navbarLinks = siteArchitecture.sections.map((section) => ({
  href: section.href,
  label: section.id === "menu" ? section.mobileLabel : section.label,
}));

export const navbarCTAs = {
  evento: {
    label: "Evento Privado",
    href: conversionCTAs.evento.href,
  },
  vip: {
    label: "Reservar VIP",
    href: conversionCTAs.vip.href,
  },
} as const;

export function isNavSectionActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export const heroContent = {
  slogan: "Ven y disfruta del sabor llanero",
  sloganAccent: "platos criollos, rumba y coctelería de la casa",
  cta: {
    label: "Reservar tu Mesa / Cumpleaños",
    href: "/reserva?tipo=cumpleanos#formulario-reserva",
  },
} as const;

export const socialProof = {
  headline: "¿Te pillamos este fin de semana?",
  subheadline: "Así se vive la rumba en La Casa del Llano",
  instagram: {
    handle: "@lacasadelllano2014",
    profileUrl: "https://instagram.com/lacasadelllano2014",
    feedMode: "gallery" as const,
    photos: [
      {
        src: stitchEventosImages.karaoke,
        alt: "Karaoke en vivo en La Casa del Llano",
      },
      {
        src: stitchEventosImages.hero,
        alt: "Ambiente rumbero con luces LED",
      },
      {
        src: stitchEventosImages.arpa,
        alt: "Música en vivo y coctelería",
      },
      {
        src: audiovisualHighlights[0].thumbnail,
        alt: "Mensaje de bienvenida",
      },
      {
        src: audiovisualHighlights[2].thumbnail,
        alt: "Ubicación en el Casco Histórico",
      },
      {
        src: images.rumba,
        alt: "Rumba y pista",
      },
    ],
  },
  googleBusiness: {
    label: "Google Maps",
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`La Casa del Llano 2014, ${venueAddress}, Venezuela`)}`,
    ctaLabel: "Ver ubicación y opiniones",
    description:
      "Encuéntranos en Google Maps, revisa la ruta desde tu zona y deja tu opinión después de visitarnos.",
  },
} as const;

export const reservationFaq = [
  {
    id: "vip-includes",
    question: "¿Qué incluye la mesa VIP?",
    answer:
      "Mesa reservada en zona preferencial, servicio de botellas selectas y atención prioritaria. Los tragos y tapas se eligen de la carta digital o con el equipo de sala.",
  },
  {
    id: "minors",
    question: "¿Pueden entrar menores de edad?",
    answer:
      "Sí, únicamente con acompañamiento de familiar directo y responsable. El local es para todas las edades con ambiente nocturno responsable.",
  },
  {
    id: "deposit",
    question: "¿Se requiere depósito o anticipo?",
    answer:
      "Para mesa VIP y eventos privados puede solicitarse confirmación por WhatsApp. Te indicamos disponibilidad, mínimo de consumo y formas de pago al reservar.",
  },
  {
    id: "deadline",
    question: "¿Hasta cuándo puedo reservar?",
    answer:
      "Recomendamos reservar con al menos 24–48 horas de anticipación para cumpleaños y eventos. Para mesa VIP el mismo día, escríbenos por WhatsApp según disponibilidad.",
  },
] as const;

/** Banner temporal editable desde data.ts — cambia id al actualizar el mensaje. */
export const seasonalBanner = {
  enabled: true,
  id: "temporada-jun-2026",
  eyebrow: "Esta temporada",
  message: "Karaoke en vivo, DJs invitados y noches temáticas cada fin de semana.",
  ctaLabel: "Reservar mesa",
  ctaHref: "/reserva?tipo=vip#formulario-reserva",
} as const;

export const targetAudience = {
  title: "Para todas las edades",
  subtitle: "Entretenimiento nocturno en Venezuela",
  description:
    "Un espacio energético en La Guaira para quienes buscan rumba, buena música y celebrar fechas especiales. Ambiente vibrante, tragos de primera y la mejor vibra del Casco Histórico.",
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
    title: "Bebidas Selectas",
    description:
      "Coctelería criolla, ron venezolano de autor y tragos de primera para brindar en un ambiente vibrante.",
    href: "/menu",
    cta: "Ver tragos selectos",
  },
  {
    icon: "celebration",
    title: "Tu Celebración",
    description:
      "Combos Rumbero, Platino y Corporativo para cumpleaños, bodas, despedidas y eventos especiales.",
    href: "/#celebraciones",
    cta: "Ver combos",
  },
] as const;

export const eventReservationTypes = [
  {
    id: "mesa",
    label: "Mesa Estándar",
    icon: "table_restaurant",
    description:
      "Reserva tu mesa para disfrutar de tragos selectos, tapas y entretenimiento nocturno.",
  },
  {
    id: "vip",
    label: "Zona VIP",
    icon: "diamond",
    description:
      "Mesa exclusiva con servicio preferencial, botellas selectas y la mejor vista del escenario.",
  },
  {
    id: "cumpleanos",
    label: "Cumpleaños",
    icon: "cake",
    description:
      "Celebra con decoración, comida, servicio de botellas, karaoke y barra selecta.",
  },
  {
    id: "boda",
    label: "Boda / Aniversario",
    icon: "favorite",
    description:
      "Brinda por el amor con ambiente romántico, coctelería selecta y música en vivo o DJ.",
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
      "Celebra tu ascenso o logro profesional con un evento a tu medida y barra selecta.",
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

export const tascaHours = "4:00 p. m. – 5:00 a. m." as const;

export const operatingSchedule = {
  days: "Martes a domingo",
  closedDay: "Lunes cerrado",
  hours: tascaHours,
  tuesdayNote: "Martes a jueves: ambiente musical rumbero en la tasca",
} as const;

export const weeklyNights = [
  {
    id: "martes",
    day: "Martes",
    dayShort: "MAR",
    title: "Ambiente Musical Rumbero",
    description:
      "Arranca la semana con rumba, buena música y tragos en la tasca. Ambiente rumbero para compartir en mesa con tapas y coctelería.",
    time: tascaHours,
    tag: "Rumba",
    icon: "nightlife",
    accent: "secondary",
    image: images.rumba,
    href: "/reserva?tipo=vip#formulario-reserva",
    thematic: true,
    ctaLabel: "Reservar esta noche",
  },
  {
    id: "miercoles",
    day: "Miércoles",
    dayShort: "MIÉ",
    title: "Ambiente Musical Rumbero",
    description:
      "Mitad de semana con música rumbera, salsa y merengue. Coctelería de autor y el calor de la tasca para desconectar entre semana.",
    time: tascaHours,
    tag: "Rumba",
    icon: "nightlife",
    accent: "secondary",
    image: images.rumba,
    href: "/reserva?tipo=vip#formulario-reserva",
    thematic: true,
    ctaLabel: "Reservar esta noche",
  },
  {
    id: "jueves",
    day: "Jueves",
    dayShort: "JUE",
    title: "Noche de Dama",
    description:
      "Ambiente musical rumbero con noche especial para ellas: primera copa gratis (cerveza o coctel), promos en coctelería, rumba y ambiente VIP. Ideal para salir en grupo.",
    time: tascaHours,
    tag: "Rumba",
    tags: ["Rumba", "Noche de Dama"] as const,
    icon: "female",
    accent: "tertiary",
    image: images.rumba,
    href: "/reserva?tipo=vip#formulario-reserva",
    thematic: true,
    ctaLabel: "Reservar esta noche",
  },
  {
    id: "viernes",
    day: "Viernes",
    dayShort: "VIE",
    title: "Noche de Rumba y Karaoke",
    description:
      "Rumba en la pista y escenario profesional para cantar. Luces LED, coctelería y noches perfectas para cumpleaños y celebraciones.",
    time: tascaHours,
    tag: "Rumba",
    tags: ["Rumba", "Karaoke"] as const,
    icon: "mic_external_on",
    accent: "tertiary",
    image: images.karaoke,
    href: "/reserva?tipo=karaoke#formulario-reserva",
    thematic: true,
    ctaLabel: "Reservar esta noche",
  },
  {
    id: "sabado",
    day: "Sábado",
    dayShort: "SÁB",
    title: "DJ Invitado",
    description:
      "La noche más intensa: DJ especial por temporada, pista llena y tragos de primera.",
    time: tascaHours,
    tag: "DJ",
    icon: "headphones",
    accent: "secondary",
    image: images.rumba,
    href: "/eventos",
    thematic: true,
    ctaLabel: "Reservar esta noche",
  },
  {
    id: "domingo",
    day: "Domingo",
    dayShort: "DOM",
    title: "Rumba Criolla",
    description:
      "Cierra el fin de semana con salsa, merengue y karaoke. Coctelería y tapas para compartir.",
    time: "4:00 p. m. – 3:00 a. m.",
    tag: "Rumba",
    icon: "nightlife",
    accent: "secondary",
    image: images.rumba,
    href: "/menu",
    thematic: true,
    ctaLabel: "Reservar esta noche",
  },
] as const;

export type WeeklyNightId = (typeof weeklyNights)[number]["id"];

export const celebrationCombosModule = {
  id: "celebraciones",
  eyebrow: "El motor del negocio",
  title: "Eventos Especiales y Celebraciones",
  description:
    "Diseñamos la rumba perfecta para tu ocasión: cumpleaños, eventos corporativos, bodas, despedidas y ascensos. Elige un combo y lo personalizamos contigo.",
  familyPolicy:
    "Menores de edad bienvenidos únicamente con acompañamiento de familiar directo y responsable.",
  celebrationTypes: [
    "Cumpleaños",
    "Eventos corporativos",
    "Bodas y aniversarios",
    "Despedidas",
    "Ascensos",
    "Celebraciones familiares",
  ],
} as const;

export type CelebrationComboId = "rumbero" | "platino" | "corporativo" | "familiar";

export const celebrationCombos = [
  {
    id: "rumbero" as const,
    name: "Combo Rumbero",
    tier: "Más pedido",
    tagline: "Rumba, karaoke y picoteo para armar la fiesta",
    description:
      "El combo ideal para cumpleaños, despedidas y ascensos. Ambiente vibrante, barra lista y el escenario encendido para que tu gente cante y baile sin parar.",
    idealFor: ["Cumpleaños", "Despedidas", "Ascensos", "Rumbas con amigos"],
    guests: "20 – 50 personas",
    includes: [
      "Espacio reservado con decoración temática",
      "Karaoke 2 horas en escenario profesional",
      "Baldes de cerveza o barra estándar",
      "Catering de tapas (tequeños, empanadas, picoteo)",
      "DJ set o playlist de la casa",
      "Servicio de mesa y hielo incluido",
    ],
    highlight: "Karaoke + barra + tapas",
    reservationType: "cumpleanos",
    accent: "tertiary" as const,
    icon: "celebration",
  },
  {
    id: "platino" as const,
    name: "Combo Platino",
    tier: "Premium VIP",
    tagline: "La experiencia completa con botellas selectas y servicio exclusivo",
    description:
      "Nuestro paquete estrella para quienes quieren brillar: botellas premium, coctelería de autor, decoración VIP y entretenimiento extendido para bodas, aniversarios y cumpleaños especiales.",
    idealFor: [
      "Cumpleaños VIP",
      "Bodas y aniversarios",
      "Brindis ejecutivos",
      "Celebraciones premium",
    ],
    guests: "30 – 80 personas",
    includes: [
      "Mesa o zona VIP decorada",
      "Servicio de botellas selectas (Ron 1796, Diplomático, espumante)",
      "Coctelería de autor y barra premium",
      "Karaoke 3 horas + DJ invitado por temporada",
      "Catering completo de tapas y platos para compartir",
      "Torta de celebración y personal dedicado",
    ],
    highlight: "Botellas VIP + DJ + catering completo",
    reservationType: "vip",
    accent: "secondary" as const,
    icon: "diamond",
  },
  {
    id: "corporativo" as const,
    name: "Combo Corporativo",
    tier: "Empresas",
    tagline: "Team building, cierres de año y lanzamientos con estilo",
    description:
      "Paquete pensado para empresas: espacio organizado, barra por horas, catering adaptable y opción de karaoke o DJ para premiar al equipo o cerrar un proyecto con rumba.",
    idealFor: [
      "Eventos corporativos",
      "Fin de año empresarial",
      "Lanzamientos",
      "Ascensos y logros del equipo",
    ],
    guests: "25 – 120 personas",
    includes: [
      "Espacio semi-privado o reservado para la empresa",
      "Barra selecta por horas (ron, cerveza, coctelería)",
      "Catering de tapas o coffee break extendido",
      "Karaoke o DJ opcional para dinámica de equipo",
      "Micrófono y escenario para palabras de agradecimiento",
      "Cotización y facturación corporativa",
    ],
    highlight: "Barra por horas + espacio empresarial",
    reservationType: "ascenso",
    accent: "secondary" as const,
    icon: "corporate_fare",
  },
  {
    id: "familiar" as const,
    name: "Combo Familiar",
    tier: "Íntimo",
    tagline: "Celebraciones en familia con ambiente acogedor",
    description:
      "Para reuniones familiares, aniversarios íntimos o fechas especiales en mesa. Comida compartida, tragos selectos y karaoke opcional en un ambiente cálido del Casco Histórico.",
    idealFor: [
      "Celebraciones familiares",
      "Aniversarios íntimos",
      "Reuniones multigeneracionales",
      "Comuniones y fechas especiales",
    ],
    guests: "10 – 25 personas",
    includes: [
      "Mesa grande reservada",
      "Carta de tapas y coctelería de autor",
      "Servicio de botellas a la mesa (a la carta)",
      "Karaoke 1 hora opcional para la familia",
      "Ambiente con acompañamiento responsable para menores",
      "Atención personalizada del equipo de sala",
    ],
    highlight: "Mesa familiar + tapas + ambiente acogedor",
    reservationType: "familiar",
    accent: "tertiary" as const,
    icon: "family_restroom",
  },
] as const;

export const celebrationExtras = [
  { id: "decoracion", label: "Decoración temática" },
  { id: "torta", label: "Torta / pastel de celebración" },
  { id: "botellas-premium", label: "Servicio de botellas premium" },
  { id: "catering-ampliado", label: "Catering / tapas ampliado" },
  { id: "karaoke-extendido", label: "Karaoke extendido" },
  { id: "dj-invitado", label: "DJ invitado" },
  { id: "espumante", label: "Espumante / brindis especial" },
  { id: "fotografia", label: "Espacio para fotos y brindis" },
] as const;

export type CelebrationExtraId = (typeof celebrationExtras)[number]["id"];

export const quotePackageOptions = [
  ...celebrationCombos.map((combo) => ({
    id: combo.id,
    label: combo.name,
  })),
  { id: "personalizado", label: "Paquete a medida / Aún no sé" },
] as const;

export type QuotePackageId =
  | CelebrationComboId
  | "personalizado";

/** @deprecated Usar celebrationCombos */
export const privateEventPackages = celebrationCombos.map((combo) => ({
  title: combo.name,
  includes: combo.includes,
}));

export const specialties = [
  "Reserva inmediata por WhatsApp",
  "Mesas VIP con servicio de botellas selectas",
  "Eventos privados con comida y catering",
  "Carta digital de tragos y tapas",
  "Ambiente rumbero con DJs y karaoke en vivo",
] as const;

export const restaurantInfo = {
  name: "La Casa del Llano 2014",
  logo: {
    emblem: {
      src: "/images/logo-emblem-notext.png",
      alt: "Emblema La Casa del Llano",
      width: 323,
      height: 208,
    },
    icon: {
      src: "/images/eslogan-principal.png",
      alt: "La Casa del Llano 2014",
      width: 1024,
      height: 719,
    },
    src: "/images/eslogan-principal.png",
    alt: "La Casa del Llano 2014",
    width: 1024,
    height: 719,
    wordmarkTop: "LA CASA DEL",
    wordmarkBottom: "LLANO 2014",
    wordmark: "LA CASA DEL LLANO 2014",
  },
  tagline: "Tasca · Disco · Karaoke",
  location: venueAddress,
  address: venueAddress,
  phone: "+58 424-2411578",
  email: "reservas@lacasadelallano.com",
  hours: `Martes a domingo: ${tascaHours}`,
  description:
    "En el Casco Histórico de La Guaira, Venezuela, La Casa del Llano 2014 es el punto de encuentro para quienes buscan entretenimiento nocturno con energía, buena música y tragos de primera. Celebra cumpleaños, ascensos, despedidas, bodas y fechas especiales en un ambiente vibrante con karaoke, DJs por temporadas y coctelería de autor.",
  shortDescription:
    "Disco, karaoke y tasca en La Guaira, Venezuela. Reserva mesa VIP y eventos privados con tragos, tapas y servicio de botellas en el Casco Histórico.",
  seoKeywords: [
    "La Casa del Llano",
    "disco La Guaira",
    "karaoke La Guaira",
    "mesa VIP",
    "eventos privados",
    "Casco Histórico",
    "Calle Bolívar La Guaira",
    "rumba Venezuela",
  ],
  mapEmbedUrl: `https://maps.google.com/maps?q=${mapEmbedQuery}&hl=es&z=16&output=embed`,
} as const;

export const stitchScreens = Object.fromEntries(
  siteArchitecture.sections.map((s) => [s.id, s.stitchScreen])
) as Record<SiteSectionId, string>;

export type { ImageKey };
