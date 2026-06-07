import type { PaymentMethodId } from "@/lib/payment-methods";

type PaymentMethodLogoProps = {
  methodId: PaymentMethodId;
  className?: string;
};

export function PaymentMethodLogo({
  methodId,
  className = "",
}: PaymentMethodLogoProps) {
  const base = `payment-method-logo ${className}`.trim();

  switch (methodId) {
    case "euros":
      return (
        <svg
          className={base}
          viewBox="0 0 64 64"
          aria-hidden="true"
          role="img"
        >
          <rect width="64" height="64" rx="16" fill="#003399" />
          <circle cx="32" cy="32" r="18" fill="none" stroke="#FFCC00" strokeWidth="2.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x = 32 + Math.cos(rad) * 18;
            const y = 32 + Math.sin(rad) * 18;
            return <circle key={deg} cx={x} cy={y} r="2.2" fill="#FFCC00" />;
          })}
          <text
            x="32"
            y="38"
            textAnchor="middle"
            fill="#fff"
            fontSize="22"
            fontWeight="700"
            fontFamily="Arial, sans-serif"
          >
            €
          </text>
        </svg>
      );
    case "dolares":
      return (
        <svg
          className={base}
          viewBox="0 0 64 64"
          aria-hidden="true"
          role="img"
        >
          <rect width="64" height="64" rx="16" fill="#145A32" />
          <rect x="10" y="18" width="44" height="28" rx="4" fill="#27AE60" />
          <rect x="14" y="22" width="36" height="20" rx="2" fill="#1E8449" />
          <circle cx="32" cy="32" r="7" fill="#F1C40F" />
          <text
            x="32"
            y="36"
            textAnchor="middle"
            fill="#145A32"
            fontSize="10"
            fontWeight="700"
            fontFamily="Arial, sans-serif"
          >
            $
          </text>
        </svg>
      );
    case "bolivares":
      return (
        <svg
          className={base}
          viewBox="0 0 64 64"
          aria-hidden="true"
          role="img"
        >
          <rect width="64" height="64" rx="16" fill="#922B21" />
          <rect x="10" y="18" width="44" height="28" rx="4" fill="#CB4335" />
          <rect x="14" y="22" width="36" height="20" rx="2" fill="#B03A2E" />
          <text
            x="32"
            y="36"
            textAnchor="middle"
            fill="#F9E79F"
            fontSize="11"
            fontWeight="700"
            fontFamily="Arial, sans-serif"
          >
            Bs.
          </text>
        </svg>
      );
    case "pago-movil":
      return (
        <svg
          className={base}
          viewBox="0 0 64 64"
          aria-hidden="true"
          role="img"
        >
          <rect width="64" height="64" rx="16" fill="#0A3D62" />
          <rect x="18" y="10" width="28" height="44" rx="5" fill="#F8F9FA" />
          <rect x="22" y="16" width="20" height="28" rx="2" fill="#1B4F72" />
          <circle cx="32" cy="48" r="2.5" fill="#AAB7B8" />
          <path
            d="M26 22h12M26 27h8M26 32h10"
            stroke="#85C1E9"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="46" cy="18" r="10" fill="#E67E22" />
          <path
            d="M42 18l3 3 6-7"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case "punto-de-venta":
      return (
        <svg
          className={base}
          viewBox="0 0 64 64"
          aria-hidden="true"
          role="img"
        >
          <rect width="64" height="64" rx="16" fill="#1C2833" />
          <rect x="14" y="22" width="36" height="26" rx="4" fill="#2E4053" />
          <rect x="18" y="26" width="28" height="8" rx="2" fill="#5DADE2" />
          <rect x="18" y="38" width="12" height="6" rx="1.5" fill="#F4D03F" />
          <rect x="34" y="38" width="12" height="6" rx="1.5" fill="#EC7063" />
          <path
            d="M22 14h20l4 8H18l4-8z"
            fill="#566573"
          />
          <rect x="40" y="34" width="14" height="20" rx="3" fill="#F8F9FA" />
          <rect x="43" y="38" width="8" height="10" rx="1" fill="#D5DBDB" />
        </svg>
      );
    default:
      return null;
  }
}

type BrandBadgeProps = {
  label: string;
};

export function PaymentBrandBadge({ label }: BrandBadgeProps) {
  const tone =
    label === "Visa"
      ? "payment-brand--visa"
      : label === "Mastercard"
        ? "payment-brand--mastercard"
          : label === "Maestro"
          ? "payment-brand--maestro"
          : label === "EUR"
            ? "payment-brand--euro"
            : label === "USD" || label === "VES"
              ? "payment-brand--cash"
              : "payment-brand--bank";

  return <span className={`payment-brand ${tone}`}>{label}</span>;
}
