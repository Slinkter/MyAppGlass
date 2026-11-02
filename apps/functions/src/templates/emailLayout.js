// Layout compartido de los correos (reclamos y contacto): estructura en tablas, estilos en línea
// y logo por URL pública, para que se vea igual en Gmail, Outlook y móviles.
const { sanitizeHtml } = require("../adapters/sanitize");

const BRAND = {
  name: "GLASS & ALUMINUM COMPANY S.A.C.",
  ruc: "20606432870",
  address: "Av. Los Fresnos 1250 - La Molina, Lima - Perú",
  siteUrl: "https://www.gyacompany.com",
  whatsappUrl: "https://wa.me/51974278303",
  whatsappLabel: "974 278 303",
  contactEmail: "acueva@gyacompany.com",
  // Los clientes de correo no muestran SVG: se usa el PNG publicado en el sitio.
  logoUrl: "https://gyacompany.com/logovcr.png",
};

const COLOR = {
  accent: "#cc0202",
  ink: "#0f172a",
  body: "#334155",
  muted: "#64748b",
  faint: "#94a3b8",
  line: "#e2e8f0",
  soft: "#f8fafc",
  page: "#f1f5f9",
  card: "#ffffff",
};

const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Fila etiqueta/valor. `valueHtml` debe venir ya escapado (usar `sanitizeHtml`). */
const row = (label, valueHtml, { strong = false } = {}) => `
  <tr>
    <td valign="top" style="width: 33%; padding: 7px 10px 7px 0; font-size: 13px; color: ${COLOR.muted}; line-height: 1.45;">${label}</td>
    <td valign="top" style="padding: 7px 0; font-size: 14px; color: ${COLOR.ink}; line-height: 1.45; word-break: break-word; overflow-wrap: anywhere; ${strong ? "font-weight: 600;" : ""}">${valueHtml}</td>
  </tr>`;

/** Tabla de filas etiqueta/valor. */
const detailTable = (rowsHtml) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">${rowsHtml}</table>`;

/** Sección con título numerado y contenido. */
const section = (title, innerHtml) => `
  <tr>
    <td style="padding: 22px 32px 0 32px;">
      <p style="margin: 0 0 8px 0; padding-bottom: 8px; border-bottom: 1px solid ${COLOR.line}; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${COLOR.muted};">${title}</p>
      ${innerHtml}
    </td>
  </tr>`;

/** Bloque de texto largo (detalle, pedido) con fondo suave. */
const textPanel = (blocks) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate; background: ${COLOR.soft}; border: 1px solid ${COLOR.line}; border-radius: 10px;">
    <tr><td style="padding: 16px 18px;">
      ${blocks
        .map(
          ({ label, valueHtml }, i) => `
      <p style="margin: ${i === 0 ? "0" : "14px"} 0 4px 0; font-size: 12px; font-weight: 700; color: ${COLOR.ink}; letter-spacing: 0.04em; text-transform: uppercase;">${label}</p>
      <p style="margin: 0; font-size: 14px; color: ${COLOR.body}; line-height: 1.6; white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere;">${valueHtml}</p>`,
        )
        .join("")}
    </td></tr>
  </table>`;

/** Caja destacada con el código de seguimiento. */
const codeBox = ({ label, code, metaHtml = "" }) => `
  <tr>
    <td style="padding: 24px 32px 0 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate; background: ${COLOR.soft}; border: 1px solid ${COLOR.line}; border-top: 3px solid ${COLOR.accent}; border-radius: 10px;">
        <tr><td align="center" style="padding: 18px 16px;">
          <p style="margin: 0; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${COLOR.muted};">${label}</p>
          <p style="margin: 8px 0 0 0; font-size: 18px; font-weight: 700; letter-spacing: 0.02em; color: ${COLOR.accent}; word-break: keep-all; font-family: 'SFMono-Regular', Consolas, 'Courier New', monospace;">${code}</p>
          ${metaHtml ? `<p style="margin: 8px 0 0 0; font-size: 12px; color: ${COLOR.muted};">${metaHtml}</p>` : ""}
        </td></tr>
      </table>
    </td>
  </tr>`;

/** Aviso con borde lateral (información legal, notas). */
const notice = (innerHtml) => `
  <tr>
    <td style="padding: 22px 32px 0 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate; background: ${COLOR.soft}; border-left: 4px solid ${COLOR.accent}; border-radius: 6px;">
        <tr><td style="padding: 14px 16px; font-size: 12px; color: ${COLOR.body}; line-height: 1.6;">${innerHtml}</td></tr>
      </table>
    </td>
  </tr>`;

/** Párrafo suelto dentro del cuerpo. */
const paragraph = (html, { top = 22 } = {}) => `
  <tr>
    <td style="padding: ${top}px 32px 0 32px; font-size: 15px; color: ${COLOR.body}; line-height: 1.65;">${html}</td>
  </tr>`;

/**
 * Documento HTML completo del correo.
 * @param {object} opts
 * @param {string} opts.title Título del documento y del encabezado.
 * @param {string} opts.eyebrow Texto pequeño sobre el título.
 * @param {string} opts.preheader Texto de vista previa en la bandeja de entrada.
 * @param {string} opts.bodyRows Filas `<tr>` del cuerpo (usar helpers de este módulo).
 */
const emailLayout = ({ title, eyebrow, preheader, bodyRows }) => `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${sanitizeHtml(title)}</title>
</head>
<body style="margin: 0; padding: 0; background: ${COLOR.page}; font-family: ${FONT};">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; color: transparent; font-size: 1px; line-height: 1px;">${sanitizeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background: ${COLOR.page};">
    <tr><td align="center" style="padding: 24px 12px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px; border-collapse: separate; background: ${COLOR.card}; border: 1px solid ${COLOR.line}; border-radius: 14px; overflow: hidden;">
        <tr><td style="height: 5px; line-height: 5px; font-size: 0; background: ${COLOR.accent};">&nbsp;</td></tr>
        <tr>
          <td style="padding: 24px 32px 20px 32px; border-bottom: 1px solid ${COLOR.line};">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="56" valign="middle" style="width: 56px;">
                  <a href="${BRAND.siteUrl}" target="_blank" style="text-decoration: none;"><img src="${BRAND.logoUrl}" width="56" height="56" alt="GYA Glass &amp; Aluminum" style="display: block; width: 56px; height: 56px; border: 0; outline: none;"></a>
                </td>
                <td valign="middle" style="padding-left: 14px;">
                  <p style="margin: 0; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: ${COLOR.accent};">${sanitizeHtml(eyebrow)}</p>
                  <p style="margin: 4px 0 0 0; font-size: 19px; font-weight: 700; line-height: 1.25; color: ${COLOR.ink};">${sanitizeHtml(title)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        ${bodyRows}
        <tr><td style="height: 28px; line-height: 28px; font-size: 0;">&nbsp;</td></tr>
        <tr>
          <td style="padding: 20px 32px 24px 32px; background: ${COLOR.soft}; border-top: 1px solid ${COLOR.line};">
            <p style="margin: 0; font-size: 12px; font-weight: 700; color: ${COLOR.ink};">${BRAND.name}</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: ${COLOR.muted}; line-height: 1.6;">RUC ${BRAND.ruc} &middot; ${BRAND.address}</p>
            <p style="margin: 8px 0 0 0; font-size: 12px; line-height: 1.6;">
              <a href="${BRAND.siteUrl}" target="_blank" style="color: ${COLOR.accent}; text-decoration: none; font-weight: 600;">gyacompany.com</a>
              <span style="color: ${COLOR.faint};"> &nbsp;|&nbsp; </span>
              <a href="${BRAND.whatsappUrl}" target="_blank" style="color: ${COLOR.accent}; text-decoration: none; font-weight: 600;">WhatsApp ${BRAND.whatsappLabel}</a>
              <span style="color: ${COLOR.faint};"> &nbsp;|&nbsp; </span>
              <a href="mailto:${BRAND.contactEmail}" style="color: ${COLOR.accent}; text-decoration: none; font-weight: 600;">${BRAND.contactEmail}</a>
            </p>
            <p style="margin: 10px 0 0 0; font-size: 11px; color: ${COLOR.faint}; line-height: 1.5;">Este mensaje se generó automáticamente. Por favor, no responda a esta dirección.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

module.exports = { BRAND, COLOR, emailLayout, row, detailTable, section, textPanel, codeBox, notice, paragraph };
