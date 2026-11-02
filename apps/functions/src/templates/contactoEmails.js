// Plantillas HTML de los correos de Contacto/Cotización (admin y cliente).
const { sanitizeHtml } = require("../adapters/sanitize");
const { BRAND, COLOR, emailLayout, row, detailTable, section, textPanel, codeBox, paragraph } = require("./emailLayout");

/**
 * Plantilla HTML para notificación al Administrador (Contacto/Cotización).
 */
const createContactEmailHtml = (data, contactId, timestampFormatted) =>
  emailLayout({
    title: "Nueva solicitud de contacto",
    eyebrow: "Contacto / Cotización",
    preheader: `${data.name} solicitó contacto · ID ${contactId}`,
    bodyRows: [
      codeBox({
        label: "ID de solicitud",
        code: sanitizeHtml(contactId),
        metaHtml: `Recibida el ${timestampFormatted}`,
      }),
      section(
        "Datos del contacto",
        detailTable(
          row("Nombre", sanitizeHtml(data.name), { strong: true }) +
            row("Correo electrónico", sanitizeHtml(data.email)) +
            row("Teléfono", sanitizeHtml(data.phone || "No especificado")),
        ),
      ),
      section("Requerimiento", textPanel([{ label: "Mensaje", valueHtml: sanitizeHtml(data.message) }])),
    ].join(""),
  });

/**
 * Plantilla HTML de confirmación al Cliente (Contacto/Cotización).
 */
const createContactClientEmailHtml = (data, contactId) =>
  emailLayout({
    title: "Hemos recibido tu solicitud",
    eyebrow: "Contacto / Cotización",
    preheader: `Gracias por escribirnos. Código de seguimiento ${contactId}`,
    bodyRows: [
      paragraph(
        `Hola <strong style="color: ${COLOR.ink};">${sanitizeHtml(data.name)}</strong>,<br><br>` +
          `Gracias por contactar con nuestro equipo. Hemos recibido tu requerimiento y un asesor técnico se comunicará contigo en menos de <strong>24 horas hábiles</strong>.`,
        { top: 26 },
      ),
      codeBox({ label: "Código de seguimiento", code: sanitizeHtml(contactId) }),
      paragraph(
        `Atentamente,<br><strong style="color: ${COLOR.ink};">Equipo Comercial &amp; Proyectos</strong><br>${BRAND.name}`,
        { top: 24 },
      ),
    ].join(""),
  });

module.exports = { createContactEmailHtml, createContactClientEmailHtml };
