import { images } from "./images";

/** Tapas del menú — assets locales optimizados */
export const stitchMenuImages = {
  empanadaCarne: images.empanadas,
  tequenos: images.tequenos,
  empanadaQueso: images.empanadas,
  camarones: images.camarones,
  carneFrita: images.carneFrita,
  tequenosGala: images.tequenos,
  cazuelitaMar: images.pescado,
} as const;

export type MenuCategoryId = "botellas" | "cocteleria" | "tapas";

export const menuCategories = [
  {
    id: "botellas" as const,
    label: "Botellas y Cerveza",
    shortLabel: "Botellas",
    icon: "wine_bar",
    description:
      "Servicio de botellas VIP y baldes de cerveza para compartir en mesa.",
  },
  {
    id: "cocteleria" as const,
    label: "Coctelería de Autor",
    shortLabel: "Coctelería",
    icon: "liquor",
    description:
      "Creaciones de la casa y clásicos de barra preparados al momento.",
  },
  {
    id: "tapas" as const,
    label: "Tapas para Compartir",
    shortLabel: "Tapas",
    icon: "restaurant_menu",
    description:
      "Entradas y picoteo criollo para acompañar la rumba en mesa.",
  },
] as const;

/** @deprecated Usar menuCategories */
export const menuSections = menuCategories;

export const serviciosBotellas = [
  {
    name: "Ron Santa Teresa 1796",
    price: "$95.00",
    description: "Servicio de mesa con hielo, mezcladores y copas de primera.",
    tag: "Selecto",
  },
  {
    name: "Ron Diplomático Reserva",
    price: "$85.00",
    description: "Botella para compartir en mesa VIP o evento privado.",
    tag: "VIP",
  },
  {
    name: "Vodka Selecto",
    price: "$65.00",
    description: "Ideal para despedidas, cumpleaños y celebraciones.",
    tag: null,
  },
  {
    name: "Selección de Whisky",
    price: "Desde $90.00",
    description: "Etiquetas importadas para brindis exclusivos.",
    tag: null,
  },
  {
    name: "Champán / Espumante",
    price: "Desde $70.00",
    description: "Para bodas, aniversarios y fechas especiales.",
    tag: "Celebración",
  },
  {
    name: "Paquete Barra Botellas",
    price: "Cotizar",
    description:
      "Combo de botellas + tapas para eventos privados. Consulta con reservas.",
    tag: "Eventos",
  },
] as const;

export const baldesCerveza = [
  {
    name: "Balde Cerveza Nacional (5 uds.)",
    price: "$15.00",
    description: "Cerveza fría para compartir en mesa. Ideal para grupos.",
    tag: "Para compartir",
  },
  {
    name: "Balde Cerveza Nacional (10 uds.)",
    price: "$28.00",
    description: "Doble balde para mesas grandes y rumbas largas.",
    tag: "Mesa grande",
  },
  {
    name: "Cerveza Nacional (unidad)",
    price: "$3.50",
    description: "Servida bien fría, directo de la nevera.",
    tag: null,
  },
  {
    name: "Balde + Picoteo",
    price: "Consultar",
    description: "Combo balde de cerveza con selección de tapas para la mesa.",
    tag: "Combo",
  },
] as const;

export const cocteleria = [
  {
    name: "Sangría del Llano",
    price: "$25.00",
    description:
      "Jarra para compartir. Vino tinto, frutas tropicales y un toque de ron criollo.",
    tag: "Para compartir",
  },
  {
    name: "Mojito Guaireño",
    price: "$8.00",
    description:
      "Ron blanco, hierbabuena fresca, lima y soda. Refrescante para la pista.",
    tag: "Clásico",
  },
  {
    name: "Ron Criollo Sour",
    price: "$10.00",
    description: "Santa Teresa, limón, amargo de angostura y espuma de clara.",
    tag: "Exclusivo",
  },
  {
    name: "Margarita de la Casa",
    price: "$9.00",
    description:
      "Tequila, triple sec y sal de rim con ají dulce. Picante y elegante.",
    tag: "Favorito",
  },
  {
    name: "Cuba Libre Selecto",
    price: "$7.00",
    description: "Ron añejo, cola artesanal y lima fresca. El trago de la rumba.",
    tag: null,
  },
  {
    name: "Tizana con Ron",
    price: "$8.00",
    description: "Tizana guaireña con shot de ron. Dulce, tropical y potente.",
    tag: null,
  },
] as const;

export const tragosBarra = [
  { name: "Selección de Ron Añejo", price: "$12.00" },
  { name: "Papelón con Limón", price: "$4.00" },
  { name: "Tizana Guaireña", price: "$6.00" },
  { name: "Chicha con Ron", price: "$7.00" },
  { name: "Agua Mineral", price: "$2.50" },
] as const;

type TapaItem = {
  name: string;
  price: string;
  description: string;
  image: string;
  badge?: { text: string; variant: "tertiary" | "primary" };
};

export const tapasTradicionales: TapaItem[] = [
  {
    name: "Empanada de Carne",
    price: "$6.50",
    description:
      "Masa de maíz crujiente rellena de carne mechada sazonada con el secreto del Llano.",
    image: stitchMenuImages.empanadaCarne,
    badge: { text: "Favorito", variant: "tertiary" },
  },
  {
    name: "Tequeños Guaireños",
    price: "$8.00",
    description:
      "Deditos de queso envueltos en masa artesanal, fritos hasta el punto perfecto de oro.",
    image: stitchMenuImages.tequenos,
    badge: { text: "Noche de Karaoke", variant: "primary" },
  },
  {
    name: "Empanada de Queso",
    price: "$6.00",
    description:
      "Queso blanco fundido en una costra de maíz dulce y salada. Un clásico infaltable.",
    image: stitchMenuImages.empanadaQueso,
  },
  {
    name: "Camarones al Ajillo",
    price: "$16.50",
    description:
      "El picoteo estrella para acompañar tu trago mientras esperas tu turno en el karaoke.",
    image: stitchMenuImages.camarones,
    badge: { text: "Especialidad", variant: "tertiary" },
  },
  {
    name: "Carne Frita del Llano",
    price: "$12.00",
    description: "Para compartir en mesa mientras suena la rumba.",
    image: stitchMenuImages.carneFrita,
  },
  {
    name: "Cazuelita del Mar",
    price: "$14.00",
    description:
      "Mariscos salteados en salsa criolla. Perfecta para picar entre tragos.",
    image: stitchMenuImages.cazuelitaMar,
  },
];
