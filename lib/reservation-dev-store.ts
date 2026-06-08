import { appendFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import type { ReservationRecord } from "./reservation";

const LOG_DIR = join(process.cwd(), "data");
const LOG_FILE = join(LOG_DIR, "reservations.jsonl");

export function isDevFallbackEnabled(): boolean {
  if (process.env.RESERVATIONS_DEV_FALLBACK === "false") return false;
  if (process.env.RESERVATIONS_DEV_FALLBACK === "true") return true;
  return process.env.NODE_ENV === "development";
}

export function appendReservationDevLog(record: ReservationRecord): void {
  if (!existsSync(LOG_DIR)) {
    mkdirSync(LOG_DIR, { recursive: true });
  }

  appendFileSync(LOG_FILE, `${JSON.stringify(record)}\n`, { flag: "a" });
}

export function getDevLogPath(): string {
  return LOG_FILE;
}
