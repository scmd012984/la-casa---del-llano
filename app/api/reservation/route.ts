import { NextResponse } from "next/server";
import { notifyReservationChannels } from "@/lib/reservation-notify";
import {
  toReservationRecord,
  validateReservationPayload,
} from "@/lib/reservation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON inválido." },
      { status: 400 }
    );
  }

  const validation = validateReservationPayload(body);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: validation.error },
      { status: 400 }
    );
  }

  const record = toReservationRecord(validation.data);
  const notification = await notifyReservationChannels(record);

  if (!notification.ok) {
    const errors = notification.results
      .filter((result) => !result.ok)
      .map((result) => result.error)
      .filter(Boolean);

    return NextResponse.json(
      {
        ok: false,
        error:
          errors[0] ??
          "No se pudo registrar la reserva. Intenta de nuevo o usa WhatsApp.",
        details: notification.results,
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Reserva registrada. Te redirigimos a WhatsApp para confirmar.",
    channels: notification.results
      .filter((result) => result.ok)
      .map((result) => result.channel),
  });
}
