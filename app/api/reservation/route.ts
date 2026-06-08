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

  const message = notification.registered
    ? "Reserva registrada. Te redirigimos a WhatsApp para confirmar."
    : "Te redirigimos a WhatsApp para confirmar tu solicitud al instante.";

  return NextResponse.json({
    ok: true,
    registered: notification.registered,
    handoffOnly: notification.handoffOnly,
    message,
    channels: notification.results
      .filter((result) => result.ok)
      .map((result) => result.channel),
  });
}
