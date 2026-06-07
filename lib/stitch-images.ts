import { images } from "./images";

export const stitchEventosImages = {
  hero:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC5BLiLEdPxUIuW5lqeNipTmuVjBB3ldzT4E9Do0_1GQ9LbICCARdh_MpdWqZzmMhMYYrPh5wK212sptvOFytVV2O4GGwKwy9Yg_L8uBNIr38kx3fOBvBi0myjaUQzrOfosRDoREzy-B7KfvTJFNoqgIBkBi_5ZLIWdmIsu0roh8yHHIqNEUsZwwsr9XEK9OuJlNYSTseQKvrH4U3EvAyOVT-_b398WhMxdHuyj8BS59lyzGZGcVHCCy_8Uwb_ecEENncivJqbBXwTb",
  karaoke:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB1gfmGp0T4BzvVm2rUXOG69KxsE9-UHLoMzHsdp2umv52rPTSaOUsQ9eUcdVGaTqczDL8GOo7wo5tFDpJchXWyLvrE-Dwd_Q5jCFxuzsllKJYa9ZMN3o5QOSy4z7btK8XF535DUoIA02JCuTbuI4vNvZTKCvHoF29tsCAgcg_fsmDyPmBt5Vh7MlqdoovEIe0QdZwkM39BKnULfmWOi33h5bRaoXZ-sWVSmoBBYoesyFz17-CmmRWGjKeQazVIpYUSR0cPL0nNyGze",
  arpa:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBEoLBrZZsWif3ZgQUqsgvO0i_O10jvJnY8ECJviKV3GhBWnY5tyNy8ibo7otiYhLlvpNmGM-UV-42tEG6wghkTCivDTGEJlZtS_QziHLJzMAFrmt2Dg4IRLD0ZrYhv6dp7ZqqRB1lbVtiaS4BPJPyFCD_giFnzYw37JX_nY-jxW5c_lGNEuabPEVtcnEslPL-93h9SP8MoAffGsOPBqlfOtyr7G1H4CIT5xEsy55__sXEvvU4IjNnHkZndkHJwtGb0xQZMoA58j3cg",
} as const;

export const stitchImages = {
  fachada: stitchEventosImages.hero,
  hero: stitchEventosImages.hero,
  karaoke: stitchEventosImages.karaoke,
  arpa: stitchEventosImages.arpa,
  gastronomia: images.gastronomia,
  empanadas: images.empanadas,
  tequenos: images.tequenos,
  carneFrita: images.carneFrita,
  camarones: images.camarones,
  pescado: images.pescado,
  bebidas: images.bebidas,
  rumba: images.rumba,
  terraza: images.terraza,
} as const;

export const stitchUpcomingEvents = [
  {
    month: "OCT",
    day: "24",
    title: "Noche de Estrellas del Karaoke",
    description: "Premios en efectivo para las mejores interpretaciones.",
    time: "8:00 p. m. – 2:00 a. m.",
    badge: "Entrada Libre",
    badgeVariant: "default" as const,
  },
  {
    month: "OCT",
    day: "26",
    title: "Gran Parranda Llanera",
    description: "Con el maestro del Arpa invitada desde los llanos centrales.",
    time: "3:00 p. m. – 10:00 p. m.",
    badge: "Reservación Sugerida",
    badgeVariant: "default" as const,
  },
  {
    month: "OCT",
    day: "31",
    title: "Fiesta de Halloween Rumbera",
    description: "Concurso de disfraces y orquesta en vivo toda la noche.",
    time: "9:00 p. m. – Cierre",
    badge: "Evento Especial",
    badgeVariant: "tertiary" as const,
  },
] as const;
