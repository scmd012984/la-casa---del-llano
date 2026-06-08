"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  celebrationCombos,
  celebrationCombosModule,
  celebrationExtras,
  quotePackageOptions,
  type CelebrationComboId,
  type QuotePackageId,
} from "@/lib/data";
import { buildQuoteMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const inputClass =
  "w-full rounded-lg bg-surface-container-low border border-outline-variant/50 px-4 py-2.5 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50";

const labelClass = "block text-sm font-medium text-on-surface mb-1.5";

const reservationTypeToCelebration: Record<string, string> = {
  cumpleanos: "Cumpleaños",
  boda: "Bodas y aniversarios",
  despedida: "Despedidas",
  ascenso: "Ascensos",
  familiar: "Celebraciones familiares",
  vip: "Cumpleaños",
  "rumba-privada": "Celebraciones familiares",
  mesa: "Celebraciones familiares",
  karaoke: "Cumpleaños",
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

function isValidComboId(id: string | null): id is CelebrationComboId {
  return id !== null && celebrationCombos.some((combo) => combo.id === id);
}

function isValidPackageId(id: string): id is QuotePackageId {
  return quotePackageOptions.some((pkg) => pkg.id === id);
}

type ReservationFormProps = {
  defaultEventType?: string;
};

export default function ReservationForm({
  defaultEventType = "mesa",
}: ReservationFormProps) {
  const searchParams = useSearchParams();
  const tipoParam = searchParams.get("tipo");
  const comboParam = searchParams.get("combo");

  const initialCelebrationType = useMemo(() => {
    if (isValidComboId(comboParam)) {
      const combo = celebrationCombos.find((item) => item.id === comboParam);
      const fromCombo = combo
        ? reservationTypeToCelebration[combo.reservationType]
        : undefined;
      if (fromCombo) return fromCombo;
    }

    const fromTipo = tipoParam ? reservationTypeToCelebration[tipoParam] : undefined;
    if (
      fromTipo &&
      (celebrationCombosModule.celebrationTypes as readonly string[]).includes(
        fromTipo,
      )
    ) {
      return fromTipo;
    }

    const fromDefault = reservationTypeToCelebration[defaultEventType];
    return fromDefault ?? "";
  }, [comboParam, tipoParam, defaultEventType]);

  const initialPackageId: QuotePackageId = isValidComboId(comboParam)
    ? comboParam
    : "personalizado";

  const [celebrationType, setCelebrationType] = useState(initialCelebrationType);
  const [packageId, setPackageId] = useState<QuotePackageId>(initialPackageId);
  const [guests, setGuests] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const selectedPackage = celebrationCombos.find((combo) => combo.id === packageId);

  function toggleExtra(extraId: string) {
    setSelectedExtras((current) =>
      current.includes(extraId)
        ? current.filter((id) => id !== extraId)
        : [...current, extraId],
    );
  }

  function buildPayloadFromForm(form: HTMLFormElement) {
    const formData = new FormData(form);
    const extraLabels = celebrationExtras
      .filter((extra) => selectedExtras.includes(extra.id))
      .map((extra) => extra.label);

    return {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      date: String(formData.get("date") ?? ""),
      time: String(formData.get("time") ?? ""),
      guests,
      celebrationType,
      packageId,
      extras: extraLabels,
      notes,
      source: "web-reserva",
    };
  }

  function openWhatsAppFromForm(form: HTMLFormElement) {
    const message = buildQuoteMessage(buildPayloadFromForm(form));
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!celebrationType || !packageId || !guests) return;

    const payload = buildPayloadFromForm(form);
    const message = buildQuoteMessage(payload);

    setSubmitStatus("loading");
    setSubmitError("");

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; message?: string }
        | null;

      if (!response.ok || !result?.ok) {
        throw new Error(
          result?.error ??
            "No pudimos registrar tu solicitud. Puedes enviarla por WhatsApp.",
        );
      }

      setSubmitStatus("success");
      window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Error al enviar. Intenta de nuevo.",
      );
    }
  }

  const isSubmitting = submitStatus === "loading";

  return (
    <form onSubmit={handleSubmit} className="quote-form space-y-6">
      <div className="rounded-lg card-wood px-4 py-3 text-sm text-on-surface-variant">
        <span className="material-symbols-outlined text-on-surface-variant text-base align-middle mr-1">
          bolt
        </span>
        Cotización inteligente: registramos tu solicitud en el sistema del local,
        enviamos alerta al correo del administrador y te abrimos WhatsApp para
        confirmar al instante.
      </div>

      {submitStatus === "success" ? (
        <div
          className="rounded-lg card-wood px-4 py-3 text-sm text-on-surface"
          role="status"
        >
          <span className="material-symbols-outlined text-on-surface-variant text-base align-middle mr-1">
            check_circle
          </span>
          Solicitud registrada. Si WhatsApp no se abrió, revisa el bloqueador de
          ventanas emergentes.
        </div>
      ) : null}

      {submitStatus === "error" ? (
        <div
          className="rounded-lg bg-error-container/20 border border-error/30 px-4 py-3 text-sm text-on-surface space-y-3"
          role="alert"
        >
          <p>
            <span className="material-symbols-outlined text-error text-base align-middle mr-1">
              error
            </span>
            {submitError}
          </p>
          <button
            type="button"
            onClick={(event) => {
              const form = event.currentTarget.closest("form");
              if (form instanceof HTMLFormElement) openWhatsAppFromForm(form);
            }}
            className="text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:underline"
          >
            Enviar solo por WhatsApp →
          </button>
        </div>
      ) : null}

      <fieldset className="quote-form-section space-y-4">
        <legend className="quote-form-legend">Datos del evento</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className={labelClass}>
              Fecha del evento <span className="text-on-surface-variant">*</span>
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              min={today}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="guests" className={labelClass}>
              Personas estimadas <span className="text-on-surface-variant">*</span>
            </label>
            <select
              id="guests"
              name="guests"
              required
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                Selecciona cantidad...
              </option>
              {[10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120].map((n) => (
                <option key={n} value={`${n} personas`}>
                  {n} personas
                </option>
              ))}
              <option value="Más de 120 personas">Más de 120 personas</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="celebrationType" className={labelClass}>
            Tipo de celebración <span className="text-on-surface-variant">*</span>
          </label>
          <select
            id="celebrationType"
            name="celebrationType"
            required
            value={celebrationType}
            onChange={(e) => setCelebrationType(e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Selecciona el tipo de celebración...
            </option>
            {celebrationCombosModule.celebrationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="packageId" className={labelClass}>
            Paquete de preferencia <span className="text-on-surface-variant">*</span>
          </label>
          <select
            id="packageId"
            name="packageId"
            required
            value={packageId}
            onChange={(e) => {
              const value = e.target.value;
              if (isValidPackageId(value)) setPackageId(value);
            }}
            className={inputClass}
          >
            {quotePackageOptions.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.label}
              </option>
            ))}
          </select>
          {selectedPackage && (
            <p className="text-sm text-on-surface-variant mt-2">
              {selectedPackage.description}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="time" className={labelClass}>
            Hora aproximada <span className="text-on-surface-variant/70">(opcional)</span>
          </label>
          <input id="time" name="time" type="time" className={inputClass} />
        </div>
      </fieldset>

      <fieldset className="quote-form-section space-y-3">
        <legend className="quote-form-legend">
          Extras opcionales
          <span className="quote-form-legend-note">
            Decoración, pastel y más
          </span>
        </legend>
        <div className="quote-form-extras">
          {celebrationExtras.map((extra, index) => (
            <label
              key={extra.id}
              className="quote-form-extra"
              style={{ ["--cascade-index" as string]: index }}
            >
              <input
                type="checkbox"
                checked={selectedExtras.includes(extra.id)}
                onChange={() => toggleExtra(extra.id)}
                className="w-4 h-4 rounded border-outline-variant accent-secondary shrink-0 mt-0.5"
              />
              <span>{extra.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="quote-form-section space-y-4">
        <legend className="quote-form-legend">Tu contacto</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Nombre completo <span className="text-on-surface-variant">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={inputClass}
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Teléfono / WhatsApp <span className="text-on-surface-variant">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className={inputClass}
              placeholder="+58 424-2411578"
            />
          </div>
        </div>
        <div>
          <label htmlFor="notes" className={labelClass}>
            Notas adicionales{" "}
            <span className="text-on-surface-variant/70">(opcional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="Colores de decoración, sabor de torta, botellas preferidas, dinámica del evento..."
          />
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-led btn-led--md w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed disabled:animate-none"
      >
        <span className="material-symbols-outlined text-xl">
          {isSubmitting ? "hourglass_top" : "send"}
        </span>
        {isSubmitting
          ? "Registrando solicitud..."
          : "Enviar y confirmar por WhatsApp"}
      </button>
    </form>
  );
}
