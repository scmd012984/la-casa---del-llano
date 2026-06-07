import { restaurantInfo } from "./data";
import {
  appendReservationDevLog,
  getDevLogPath,
  isDevFallbackEnabled,
} from "./reservation-dev-store";
import {
  formatReservationEmailHtml,
  formatReservationEmailText,
  type ReservationRecord,
} from "./reservation";

type NotifyResult = {
  channel: "google_sheets" | "email" | "dev_log";
  ok: boolean;
  error?: string;
};

function getWebhookConfig() {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  const secret = process.env.RESERVATION_WEBHOOK_SECRET?.trim();
  return { url, secret };
}

function getEmailConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY?.trim(),
    from: process.env.RESEND_FROM_EMAIL?.trim(),
    to:
      process.env.RESTAURANT_EMAIL?.trim() ??
      process.env.NEXT_PUBLIC_RESTAURANT_EMAIL?.trim() ??
      restaurantInfo.email,
  };
}

function getSmtpConfig() {
  return {
    host: process.env.SMTP_HOST?.trim(),
    port: Number(process.env.SMTP_PORT ?? "587"),
    user: process.env.SMTP_USER?.trim(),
    pass: process.env.SMTP_PASS?.trim(),
    from: process.env.SMTP_FROM?.trim(),
    to: process.env.RESTAURANT_EMAIL?.trim() ?? restaurantInfo.email,
  };
}

export async function notifyGoogleSheet(
  record: ReservationRecord
): Promise<NotifyResult> {
  const { url, secret } = getWebhookConfig();

  if (!url || !secret) {
    return {
      channel: "google_sheets",
      ok: false,
      error: "Webhook de Google Sheets no configurado.",
    };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        submittedAt: record.submittedAt,
        name: record.name,
        phone: record.phone,
        date: record.date,
        time: record.time,
        guests: record.guests,
        celebrationType: record.celebrationType,
        packageId: record.packageId,
        packageLabel: record.packageLabel,
        extras: record.extras.join(" | "),
        notes: record.notes,
        source: record.source ?? "web",
        status: "Nueva",
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return {
        channel: "google_sheets",
        ok: false,
        error: `Google Sheets respondió ${response.status}: ${body.slice(0, 200)}`,
      };
    }

    const payload = (await response.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (payload && payload.ok === false) {
      return {
        channel: "google_sheets",
        ok: false,
        error: payload.error ?? "Error desconocido en Google Sheets.",
      };
    }

    return { channel: "google_sheets", ok: true };
  } catch (error) {
    return {
      channel: "google_sheets",
      ok: false,
      error: error instanceof Error ? error.message : "Error de red.",
    };
  }
}

export async function notifyRestaurantEmailResend(
  record: ReservationRecord
): Promise<NotifyResult> {
  const { apiKey, from, to } = getEmailConfig();

  if (!apiKey || !from || !to) {
    return {
      channel: "email",
      ok: false,
      error: "Correo Resend no configurado.",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `[Reserva] ${record.celebrationType} — ${record.name} (${record.date})`,
        text: formatReservationEmailText(record),
        html: formatReservationEmailHtml(record),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return {
        channel: "email",
        ok: false,
        error: `Resend respondió ${response.status}: ${body.slice(0, 200)}`,
      };
    }

    return { channel: "email", ok: true };
  } catch (error) {
    return {
      channel: "email",
      ok: false,
      error: error instanceof Error ? error.message : "Error de red.",
    };
  }
}

export async function notifyRestaurantEmailSmtp(
  record: ReservationRecord
): Promise<NotifyResult> {
  const { host, port, user, pass, from, to } = getSmtpConfig();

  if (!host || !user || !pass || !from || !to) {
    return {
      channel: "email",
      ok: false,
      error: "Correo SMTP no configurado.",
    };
  }

  try {
    const nodemailer = await import("nodemailer");
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transport.sendMail({
      from,
      to,
      subject: `[Reserva] ${record.celebrationType} — ${record.name} (${record.date})`,
      text: formatReservationEmailText(record),
      html: formatReservationEmailHtml(record),
    });

    return { channel: "email", ok: true };
  } catch (error) {
    return {
      channel: "email",
      ok: false,
      error: error instanceof Error ? error.message : "Error SMTP.",
    };
  }
}

async function notifyDevFallback(
  record: ReservationRecord
): Promise<NotifyResult> {
  try {
    appendReservationDevLog(record);
    console.info("[reservas:dev]", formatReservationEmailText(record));
    return {
      channel: "dev_log",
      ok: true,
    };
  } catch (error) {
    return {
      channel: "dev_log",
      ok: false,
      error: `${error instanceof Error ? error.message : "Error"} (${getDevLogPath()})`,
    };
  }
}

export function isReservationNotifyConfigured(): boolean {
  const { url, secret } = getWebhookConfig();
  const resend = getEmailConfig();
  const smtp = getSmtpConfig();
  return Boolean(
    (url && secret) ||
      (resend.apiKey && resend.from && resend.to) ||
      (smtp.host && smtp.user && smtp.pass) ||
      isDevFallbackEnabled()
  );
}

export function getReservationNotifyMode():
  | "google"
  | "email"
  | "both"
  | "dev"
  | "none" {
  const hasGoogle = Boolean(
    process.env.GOOGLE_SHEETS_WEBHOOK_URL &&
      process.env.RESERVATION_WEBHOOK_SECRET
  );
  const hasResend = Boolean(
    process.env.RESEND_API_KEY &&
      process.env.RESEND_FROM_EMAIL &&
      (process.env.RESTAURANT_EMAIL ?? restaurantInfo.email)
  );
  const hasSmtp = Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );

  if (hasGoogle && (hasResend || hasSmtp)) return "both";
  if (hasGoogle) return "google";
  if (hasResend || hasSmtp) return "email";
  if (isDevFallbackEnabled()) return "dev";
  return "none";
}

export async function notifyReservationChannels(
  record: ReservationRecord
): Promise<{
  ok: boolean;
  results: NotifyResult[];
  restaurantName: string;
}> {
  const mode = getReservationNotifyMode();
  const results: NotifyResult[] = [];

  if (mode === "none") {
    return {
      ok: false,
      results: [
        {
          channel: "google_sheets",
          ok: false,
          error:
            "Integración no configurada. Ejecuta: npm run setup:google",
        },
      ],
      restaurantName: restaurantInfo.name,
    };
  }

  if (mode === "dev") {
    results.push(await notifyDevFallback(record));
    return {
      ok: results.some((result) => result.ok),
      results,
      restaurantName: restaurantInfo.name,
    };
  }

  if (mode === "google" || mode === "both") {
    results.push(await notifyGoogleSheet(record));
  }

  if (mode === "email" || mode === "both") {
    const resendResult = await notifyRestaurantEmailResend(record);
    if (resendResult.ok) {
      results.push(resendResult);
    } else {
      const smtpResult = await notifyRestaurantEmailSmtp(record);
      results.push(smtpResult.ok ? smtpResult : resendResult);
    }
  }

  const ok = results.some((result) => result.ok);

  return { ok, results, restaurantName: restaurantInfo.name };
}
