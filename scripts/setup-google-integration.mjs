#!/usr/bin/env node

import { execSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const INTEGRATION_DIR = join(ROOT, "google-integration");
const ENV_LOCAL = join(ROOT, ".env.local");
const CLASP_RC = join(homedir(), ".clasprc.json");
const RESTAURANT_EMAIL = "reservas@lacasadelallano.com";
const SHEET_TITLE = "Reservas La Casa del Llano 2014";

function run(command, options = {}) {
  console.log(`\n→ ${command}`);
  return execSync(command, {
    cwd: ROOT,
    stdio: "inherit",
    ...options,
  });
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function upsertEnvLocal(values) {
  const lines = existsSync(ENV_LOCAL)
    ? readFileSync(ENV_LOCAL, "utf8").split("\n")
    : [];

  const map = new Map(
    lines
      .filter((line) => line.trim() && !line.trim().startsWith("#"))
      .map((line) => {
        const index = line.indexOf("=");
        if (index === -1) return [line, ""];
        return [line.slice(0, index), line.slice(index + 1)];
      })
  );

  for (const [key, value] of Object.entries(values)) {
    map.set(key, value);
  }

  const output = [
    "# Generado automáticamente por npm run setup:google",
    "# Google Sheets + correo del local vía Apps Script",
    "",
    ...Array.from(map.entries()).map(([key, value]) => `${key}=${value}`),
    "",
  ].join("\n");

  writeFileSync(ENV_LOCAL, output, "utf8");
  console.log(`\n✓ Variables guardadas en ${ENV_LOCAL}`);
}

function ensureClaspLogin() {
  if (existsSync(CLASP_RC)) return;

  console.log("\nSe abrirá el navegador para autorizar tu cuenta de Google.");
  console.log("Elige la cuenta donde quieres la hoja de reservas.\n");
  run("npx clasp login");
}

function ensureClaspProject() {
  const claspFile = join(INTEGRATION_DIR, ".clasp.json");

  if (existsSync(claspFile)) return readJson(claspFile);

  run(
    `npx clasp create --type sheets --title "${SHEET_TITLE}" --rootDir "${INTEGRATION_DIR}"`,
    { cwd: INTEGRATION_DIR }
  );

  return readJson(claspFile);
}

function getWebAppUrl() {
  const output = execSync("npx clasp deployments", {
    cwd: INTEGRATION_DIR,
    encoding: "utf8",
  });

  const match = output.match(
    /https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec/
  );

  if (match) return match[0];

  const idMatch = output.match(/- ([A-Za-z0-9_-]{20,}) @/);
  if (idMatch) {
    return `https://script.google.com/macros/s/${idMatch[1]}/exec`;
  }

  throw new Error(
    "No se pudo obtener la URL del webhook. Revisa `npx clasp deployments` en google-integration/."
  );
}

async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  Configuración automática — Reservas Google Sheets");
  console.log("═══════════════════════════════════════════════════════\n");

  const secret = randomBytes(24).toString("hex");

  ensureClaspLogin();
  const claspProject = ensureClaspProject();

  run("npx clasp push", { cwd: INTEGRATION_DIR });

  console.log("\n→ Inicializando hoja y propiedades del script...");
  try {
    run(
      `npx clasp run initializeIntegration --params '["${secret}","${RESTAURANT_EMAIL}"]'`,
      { cwd: INTEGRATION_DIR }
    );
  } catch {
    console.log(
      "\n⚠ No se pudo ejecutar initializeIntegration de forma remota."
    );
    console.log(
      "  Abre la hoja en Google Drive → Extensiones → Apps Script → ejecuta initializeIntegration manualmente con:"
    );
    console.log(`  secret: ${secret}`);
    console.log(`  email:  ${RESTAURANT_EMAIL}`);
  }

  console.log("\n→ Publicando aplicación web...");
  run('npx clasp deploy --description "Webhook reservas web"', {
    cwd: INTEGRATION_DIR,
  });

  const webhookUrl = getWebAppUrl();

  upsertEnvLocal({
    GOOGLE_SHEETS_WEBHOOK_URL: webhookUrl,
    RESERVATION_WEBHOOK_SECRET: secret,
    RESTAURANT_EMAIL,
    RESERVATIONS_DEV_FALLBACK: "false",
  });

  console.log("\n═══════════════════════════════════════════════════════");
  console.log("  ¡Listo!");
  console.log("═══════════════════════════════════════════════════════");
  console.log(`\n  Hoja vinculada al script: ${SHEET_TITLE}`);
  console.log(`  Script ID: ${claspProject.scriptId}`);
  console.log(`  Webhook:   ${webhookUrl}`);
  console.log(`  Correo:    ${RESTAURANT_EMAIL}`);
  console.log("\n  Reinicia el servidor: npm run dev:clean");
  console.log("  Prueba el formulario en /reserva\n");
}

main().catch((error) => {
  console.error("\n✗ Error en la configuración:", error.message);
  process.exit(1);
});
