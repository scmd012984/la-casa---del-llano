/**
 * Google Apps Script — Webhook para reservas
 *
 * CONFIGURACIÓN (5 minutos):
 * 1. Crea una hoja en Google Drive: "Reservas La Casa del Llano"
 * 2. Extensión → Apps Script → pega este código
 * 3. Ejecuta setupSheet() una vez (autoriza permisos)
 * 4. Proyecto → Configuración → Propiedades del script:
 *    - WEBHOOK_SECRET     → clave secreta (misma que RESERVATION_WEBHOOK_SECRET en .env)
 *    - RESTAURANT_EMAIL   → correo del local que recibirá alertas
 *    - SPREADSHEET_ID     → ID de la URL de la hoja (entre /d/ e /edit)
 * 5. Implementar → Nueva implementación → Aplicación web
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier persona
 * 6. Copia la URL en GOOGLE_SHEETS_WEBHOOK_URL del .env.local
 */

const SHEET_NAME = "Reservas";

function setupSheet() {
  const props = PropertiesService.getScriptProperties();
  const spreadsheetId = props.getProperty("SPREADSHEET_ID");

  if (!spreadsheetId) {
    throw new Error("Define SPREADSHEET_ID en las propiedades del script.");
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  const headers = [
    "Fecha registro",
    "Estado",
    "Nombre",
    "Teléfono",
    "Fecha evento",
    "Hora",
    "Personas",
    "Tipo celebración",
    "Paquete",
    "Extras",
    "Notas",
    "Origen",
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

function doPost(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    const expectedSecret = props.getProperty("WEBHOOK_SECRET");
    const restaurantEmail = props.getProperty("RESTAURANT_EMAIL");
    const spreadsheetId = props.getProperty("SPREADSHEET_ID");

    if (!expectedSecret || !restaurantEmail || !spreadsheetId) {
      return jsonResponse({ ok: false, error: "Script sin configurar." }, 500);
    }

    const data = JSON.parse(e.postData.contents);

    if (data.secret !== expectedSecret) {
      return jsonResponse({ ok: false, error: "No autorizado." }, 401);
    }

    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      setupSheet();
      sheet = spreadsheet.getSheetByName(SHEET_NAME);
    }

    const submittedAt = data.submittedAt
      ? new Date(data.submittedAt)
      : new Date();

    sheet.appendRow([
      submittedAt,
      data.status || "Nueva",
      data.name || "",
      data.phone || "",
      data.date || "",
      data.time || "",
      data.guests || "",
      data.celebrationType || "",
      data.packageLabel || data.packageId || "",
      data.extras || "",
      data.notes || "",
      data.source || "web",
    ]);

    const subject =
      "[Reserva] " +
      (data.celebrationType || "Evento") +
      " — " +
      (data.name || "Cliente") +
      " (" +
      (data.date || "") +
      ")";

    const body = [
      "Nueva cotización recibida desde la web",
      "",
      "Nombre: " + (data.name || ""),
      "Teléfono: " + (data.phone || ""),
      "Fecha del evento: " + (data.date || ""),
      "Hora: " + (data.time || "—"),
      "Personas: " + (data.guests || ""),
      "Celebración: " + (data.celebrationType || ""),
      "Paquete: " + (data.packageLabel || data.packageId || ""),
      "Extras: " + (data.extras || "—"),
      "Notas: " + (data.notes || "—"),
      "",
      "Estado en hoja: Nueva",
      "Origen: " + (data.source || "web"),
    ].join("\n");

    MailApp.sendEmail({
      to: restaurantEmail,
      subject: subject,
      body: body,
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        error: error && error.message ? error.message : "Error interno.",
      },
      500
    );
  }
}

function jsonResponse(payload, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );

  // Apps Script web apps no permiten códigos HTTP personalizados en doPost,
  // pero incluimos el campo ok para que Next.js lo interprete.
  if (statusCode && statusCode >= 400) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: payload.error || "Error" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  return output;
}
