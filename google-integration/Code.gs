const SHEET_NAME = "Reservas";

function initializeIntegration(secret, email) {
  PropertiesService.getScriptProperties().setProperties({
    WEBHOOK_SECRET: String(secret),
    RESTAURANT_EMAIL: String(email),
  });
  setupSheet();
  return {
    ok: true,
    spreadsheetUrl: SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    spreadsheetId: SpreadsheetApp.getActiveSpreadsheet().getId(),
  };
}

function setupSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
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

    if (!expectedSecret || !restaurantEmail) {
      return jsonResponse({ ok: false, error: "Script sin configurar." });
    }

    const data = JSON.parse(e.postData.contents);

    if (data.secret !== expectedSecret) {
      return jsonResponse({ ok: false, error: "No autorizado." });
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
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
      "",
      "Hoja: " + spreadsheet.getUrl(),
    ].join("\n");

    MailApp.sendEmail({
      to: restaurantEmail,
      subject: subject,
      body: body,
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: error && error.message ? error.message : "Error interno.",
    });
  }
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
