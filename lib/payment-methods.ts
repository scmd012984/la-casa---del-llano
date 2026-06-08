export type PaymentMethodId =
  | "euros"
  | "dolares"
  | "bolivares"
  | "pago-movil"
  | "punto-de-venta";

export type PaymentField = {
  label: string;
  value: string;
  copy?: boolean;
};

export const paymentMethodsModule = {
  id: "metodos-pago",
  eyebrow: "Pasarela informativa",
  title: "Métodos de pago aceptados",
  description:
    "Confirmamos tu cotización por WhatsApp y coordinamos el pago de forma manual. No procesamos cobros en línea.",
  note:
    "Indica en tu reserva el método preferido. El tipo de cambio y montos finales se confirman con el local antes del evento.",
  methods: [
    {
      id: "euros" as const,
      label: "Euros",
      tagline: "EUR en efectivo o transferencia",
      accent: "primary" as const,
      brands: ["EUR"],
      fields: [
        {
          label: "Efectivo",
          value: "EUR en caja — tipo del día acordado por WhatsApp",
          copy: false,
        },
        {
          label: "Transferencia",
          value: "IBAN disponible bajo cotización confirmada",
          copy: false,
        },
      ],
    },
    {
      id: "dolares" as const,
      label: "Dólares",
      tagline: "USD en efectivo en caja",
      accent: "secondary" as const,
      brands: ["USD"],
      fields: [
        {
          label: "Modalidad",
          value: "Dólares en efectivo al consumir o al cierre del evento",
          copy: false,
        },
        {
          label: "Tipo de cambio",
          value: "Referencial del día — confirmado por WhatsApp",
          copy: false,
        },
      ],
    },
    {
      id: "bolivares" as const,
      label: "Bolívares",
      tagline: "Bs. en efectivo en caja",
      accent: "tertiary" as const,
      brands: ["VES"],
      fields: [
        {
          label: "Modalidad",
          value: "Bolívares en efectivo en barra o caja",
          copy: false,
        },
        {
          label: "Tipo de cambio",
          value: "Según tasa acordada al confirmar la reserva",
          copy: false,
        },
      ],
    },
    {
      id: "pago-movil" as const,
      label: "Pago Móvil",
      tagline: "Transferencia inmediata en bolívares",
      accent: "tertiary" as const,
      brands: ["Banesco", "Mercantil", "Venezuela"],
      fields: [
        {
          label: "Modalidad",
          value: "Datos bancarios confirmados por WhatsApp al cerrar tu reserva",
          copy: false,
        },
        {
          label: "Contacto pago",
          value: "0424-2411578",
          copy: true,
        },
      ],
    },
    {
      id: "punto-de-venta" as const,
      label: "Punto de venta",
      tagline: "Tarjetas débito y crédito en caja",
      accent: "primary" as const,
      brands: ["Visa", "Mastercard", "Maestro"],
      fields: [
        {
          label: "Disponible",
          value: "En barra y caja al momento del consumo o cierre de evento",
          copy: false,
        },
        {
          label: "Tarjetas",
          value: "Visa, Mastercard, Maestro y débito nacional",
          copy: false,
        },
      ],
    },
  ],
} as const;

export const paymentMethods = paymentMethodsModule.methods;
