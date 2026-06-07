"use client";

import { useState } from "react";
import {
  paymentMethods,
  paymentMethodsModule,
  type PaymentField,
} from "@/lib/payment-methods";
import { PaymentBrandBadge, PaymentMethodLogo } from "@/components/PaymentMethodLogo";

type PaymentMethodsPanelProps = {
  variant?: "full" | "compact" | "strip";
};

function CopyFieldButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="payment-copy-btn"
      aria-label={`Copiar ${value}`}
      title="Copiar al portapapeles"
    >
      <span className="material-symbols-outlined text-base">
        {copied ? "check" : "content_copy"}
      </span>
    </button>
  );
}

function PaymentFieldRow({ field }: { field: PaymentField }) {
  return (
    <div className="payment-field">
      <dt className="payment-field-label">{field.label}</dt>
      <dd className="payment-field-value">
        <span>{field.value}</span>
        {field.copy ? <CopyFieldButton value={field.value} /> : null}
      </dd>
    </div>
  );
}

export default function PaymentMethodsPanel({
  variant = "full",
}: PaymentMethodsPanelProps) {
  if (variant === "strip") {
    return (
      <div className="payment-strip" aria-label="Métodos de pago aceptados">
        <span className="payment-strip-label">Aceptamos</span>
        <div className="payment-strip-logos">
          {paymentMethods.map((method) => (
            <div key={method.id} className="payment-strip-item" title={method.label}>
              <PaymentMethodLogo methodId={method.id} className="payment-strip-logo" />
              <span>{method.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="payment-panel payment-panel--compact">
        <div className="payment-panel-header">
          <span className="material-symbols-outlined text-on-surface-variant">payments</span>
          <div>
            <h3 className="payment-panel-title">Métodos de pago</h3>
            <p className="payment-panel-lead">{paymentMethodsModule.note}</p>
          </div>
        </div>
        <ul className="payment-compact-list">
          {paymentMethods.map((method) => (
            <li key={method.id} className={`payment-compact-item payment-accent--${method.accent}`}>
              <PaymentMethodLogo methodId={method.id} className="payment-compact-logo" />
              <div>
                <p className="payment-compact-label">{method.label}</p>
                <p className="payment-compact-tagline">{method.tagline}</p>
              </div>
            </li>
          ))}
        </ul>
        <a href="#metodos-pago" className="payment-panel-link">
          Ver datos completos
          <span className="material-symbols-outlined text-sm">arrow_downward</span>
        </a>
      </div>
    );
  }

  return (
    <section
      id={paymentMethodsModule.id}
      className="payment-panel payment-panel--full scroll-mt-24"
      aria-labelledby="payment-methods-heading"
    >
      <div className="payment-panel-intro">
        <span className="payment-panel-eyebrow">{paymentMethodsModule.eyebrow}</span>
        <h2 id="payment-methods-heading" className="payment-panel-heading">
          {paymentMethodsModule.title}
        </h2>
        <p className="payment-panel-description">{paymentMethodsModule.description}</p>
        <p className="payment-panel-note">{paymentMethodsModule.note}</p>
      </div>

      <div className="payment-methods-grid">
        {paymentMethods.map((method) => (
          <article
            key={method.id}
            className={`payment-method-card payment-accent--${method.accent}`}
          >
            <div className="payment-method-card-head">
              <PaymentMethodLogo
                methodId={method.id}
                className="payment-method-card-logo"
              />
              <div>
                <h3 className="payment-method-card-title">{method.label}</h3>
                <p className="payment-method-card-tagline">{method.tagline}</p>
              </div>
            </div>

            <div className="payment-method-brands">
              {method.brands.map((brand) => (
                <PaymentBrandBadge key={brand} label={brand} />
              ))}
            </div>

            <dl className="payment-method-fields">
              {method.fields.map((field) => (
                <PaymentFieldRow key={`${method.id}-${field.label}`} field={field} />
              ))}
            </dl>
          </article>
        ))}
      </div>

      <div className="payment-panel-disclaimer">
        <span className="material-symbols-outlined text-base">info</span>
        Pasarela manual: confirma tu reserva por WhatsApp y el local te indicará
        monto, anticipo y datos exactos de pago.
      </div>
    </section>
  );
}
