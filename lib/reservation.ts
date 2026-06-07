import {
  quotePackageOptions,
  type QuotePackageId,
} from "./data";
import type { QuoteFormPayload } from "./whatsapp";

export type ReservationSubmitPayload = QuoteFormPayload & {
  source?: string;
};

export type ReservationRecord = ReservationSubmitPayload & {
  packageLabel: string;
  submittedAt: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidPackageId(id: string): id is QuotePackageId {
  return quotePackageOptions.some((pkg) => pkg.id === id);
}

export function getPackageLabel(packageId: string): string {
  return (
    quotePackageOptions.find((pkg) => pkg.id === packageId)?.label ?? packageId
  );
}

export function validateReservationPayload(
  body: unknown
):
  | { ok: true; data: ReservationSubmitPayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Datos inválidos." };
  }

  const record = body as Record<string, unknown>;

  const name = String(record.name ?? "").trim();
  const phone = String(record.phone ?? "").trim();
  const date = String(record.date ?? "").trim();
  const time = String(record.time ?? "").trim();
  const guests = String(record.guests ?? "").trim();
  const celebrationType = String(record.celebrationType ?? "").trim();
  const packageId = String(record.packageId ?? "").trim();
  const notes = String(record.notes ?? "").trim();
  const source =
    typeof record.source === "string" ? record.source.trim() : "web";

  if (!isNonEmptyString(name)) {
    return { ok: false, error: "El nombre es obligatorio." };
  }
  if (!isNonEmptyString(phone)) {
    return { ok: false, error: "El teléfono es obligatorio." };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { ok: false, error: "La fecha no es válida." };
  }
  if (!isNonEmptyString(guests)) {
    return { ok: false, error: "Indica la cantidad de personas." };
  }
  if (!isNonEmptyString(celebrationType)) {
    return { ok: false, error: "Selecciona el tipo de celebración." };
  }
  if (!isValidPackageId(packageId)) {
    return { ok: false, error: "Selecciona un paquete válido." };
  }

  const extras = Array.isArray(record.extras)
    ? record.extras.filter((item): item is string => typeof item === "string")
    : [];

  return {
    ok: true,
    data: {
      name,
      phone,
      date,
      time,
      guests,
      celebrationType,
      packageId,
      extras,
      notes,
      source,
    },
  };
}

export function toReservationRecord(
  payload: ReservationSubmitPayload
): ReservationRecord {
  return {
    ...payload,
    packageLabel: getPackageLabel(payload.packageId),
    submittedAt: new Date().toISOString(),
  };
}

export function formatReservationEmailText(record: ReservationRecord): string {
  const extrasBlock =
    record.extras.length > 0
      ? `\nExtras solicitados:\n${record.extras.map((extra) => `- ${extra}`).join("\n")}`
      : "";

  return [
    `Nueva cotización recibida — ${record.submittedAt}`,
    "",
    `Nombre: ${record.name}`,
    `Teléfono / WhatsApp: ${record.phone}`,
    `Fecha del evento: ${record.date}`,
    record.time ? `Hora aproximada: ${record.time}` : null,
    `Personas estimadas: ${record.guests}`,
    `Tipo de celebración: ${record.celebrationType}`,
    `Paquete: ${record.packageLabel}`,
    extrasBlock || null,
    record.notes ? `\nNotas:\n${record.notes}` : null,
    "",
    `Origen: ${record.source ?? "web"}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function formatReservationEmailHtml(record: ReservationRecord): string {
  const rows = [
    ["Nombre", record.name],
    ["Teléfono / WhatsApp", record.phone],
    ["Fecha", record.date],
    ...(record.time ? [["Hora", record.time]] : []),
    ["Personas", record.guests],
    ["Celebración", record.celebrationType],
    ["Paquete", record.packageLabel],
    ...(record.extras.length
      ? [["Extras", record.extras.join(", ")]]
      : []),
    ...(record.notes ? [["Notas", record.notes]] : []),
    ["Origen", record.source ?? "web"],
  ] as const;

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;background:#f9f9f9">${label}</td><td style="padding:8px 12px;border:1px solid #ddd">${value}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#222"><h2 style="color:#8B4513">Nueva cotización de evento</h2><p>Recibida el ${record.submittedAt}</p><table style="border-collapse:collapse;width:100%;max-width:560px">${tableRows}</table></body></html>`;
}
