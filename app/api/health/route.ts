import { NextResponse } from "next/server";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { getReservationNotifyMode } from "@/lib/reservation-notify";

export const runtime = "nodejs";

const MENU_ASSETS = [
  "menu-empanada-carne.jpg",
  "menu-tequenos.jpg",
  "menu-empanada-queso.jpg",
  "menu-camarones.jpg",
  "menu-carne-frita.jpg",
  "menu-cazuelita-mar.jpg",
] as const;

export async function GET() {
  const imagesDir = join(process.cwd(), "public", "images");
  const menuAssetsOk = MENU_ASSETS.every((file) =>
    existsSync(join(imagesDir, file))
  );

  return NextResponse.json({
    ok: menuAssetsOk,
    reservationMode: getReservationNotifyMode(),
    menuAssets: menuAssetsOk,
    timestamp: new Date().toISOString(),
  });
}
