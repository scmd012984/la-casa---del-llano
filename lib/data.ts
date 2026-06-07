import { images, type ImageKey } from "./images";

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú de Tapas" },
  { href: "/eventos", label: "Eventos y Karaoke" },
  { href: "/reserva", label: "Reserva de Mesa" },
] as const;

type MenuItem = {
  name: string;
  description: string;
  price: string;
  image: string;
};

export const menuCategories: { title: string; items: MenuItem[] }[] = [
  {
    title: "Entradas y Frituras",
    items: [
      {
        name: "Empanadas de Carne Mechada",
        description:
          "Masa crujiente rellena de carne mechada criolla con toque de ají dulce.",
        price: "$3.50",
        image: images.empanadas,
      },
      {
        name: "Tequeños de Queso",
        description:
          "Palitos de masa frita con queso blanco derretido, clásico de la casa.",
        price: "$4.00",
        image: images.tequenos,
      },
      {
        name: "Carne Frita al Estilo Llanero",
        description:
          "Trozos de res marinados, dorados y servidos con yuca frita y ají.",
        price: "$8.50",
        image: images.carneFrita,
      },
    ],
  },
  {
    title: "Del Mar",
    items: [
      {
        name: "Camarones al Ajillo",
        description:
          "Camarones salteados en mantequilla de ajo, perejil y vino blanco.",
        price: "$12.00",
        image: images.camarones,
      },
      {
        name: "Pescado Frito con Tostones",
        description:
          "Filete fresco del día, empanizado y acompañado de tostones caseros.",
        price: "$10.00",
        image: images.pescado,
      },
    ],
  },
  {
    title: "Bebidas",
    items: [
      {
        name: "Ron Santa Teresa 1796",
        description:
          "Copa de nuestro ron premium venezolano, servido solo o en las rocas.",
        price: "$6.00",
        image: images.bebidas,
      },
      {
        name: "Chicha Venezolana",
        description:
          "Bebida tradicional de arroz, leche condensada y canela.",
        price: "$3.00",
        image: images.bebidas,
      },
      {
        name: "Cerveza Polar / Solera",
        description:
          "Cerveza fría, la compañera perfecta de una noche de rumba.",
        price: "$2.50",
        image: images.bebidas,
      },
    ],
  },
];

type Event = {
  day: string;
  title: string;
  description: string;
  time: string;
  tag: string;
  image: string;
};

export const events: Event[] = [
  {
    day: "Miércoles",
    title: "Noche de Arpa Llanera",
    description:
      "Música en vivo con arpa, cuatro y maracas. Ambiente tradicional venezolano.",
    time: "8:00 PM",
    tag: "Música en Vivo",
    image: images.arpa,
  },
  {
    day: "Viernes",
    title: "Rumba Tropical",
    description:
      "Salsa, merengue y música tropical para bailar hasta el amanecer.",
    time: "9:00 PM",
    tag: "Rumba",
    image: images.rumba,
  },
  {
    day: "Sábado",
    title: "Karaoke Night",
    description:
      "Sube al escenario y canta tus favoritos. Premios para los mejores intérpretes.",
    time: "10:00 PM",
    tag: "Karaoke",
    image: images.karaoke,
  },
  {
    day: "Domingo",
    title: "Almuerzo Familiar",
    description:
      "Menú especial de domingo con parrilla y música acústica en la terraza.",
    time: "12:00 PM",
    tag: "Especial",
    image: images.terraza,
  },
];

export const specialties = [
  "Camarones al Ajillo de la Casa",
  "Empanadas Criollas Horneadas al Momento",
  "Carne Frita con Yuca y Guasacaca",
  "Ron Santa Teresa y Coctelería Venezolana",
] as const;

export const restaurantInfo = {
  name: "La Casa del Llano 2014",
  tagline: "Tasca-Restaurante Familiar",
  location: "Casco Colonial, La Guaira, Venezuela",
  address: "Av. Urdaneta, Casco Histórico, La Guaira 1160",
  phone: "+58 212-355-0000",
  hours: "Mar – Dom: 12:00 PM – 2:00 AM",
  description:
    "En el corazón del Casco Colonial de La Guaira, La Casa del Llano 2014 es más que un restaurante: es un refugio donde la gastronomía criolla se encuentra con la rumba tropical. De día, sabores auténticos del llano y el mar; de noche, luces LED, música en vivo y karaoke bajo las estrellas del puerto.",
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
