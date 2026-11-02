// Plantillas HTML de los correos del Libro de Reclamaciones (admin y cliente).
const { sanitizeHtml } = require("../adapters/sanitize");
const { BRAND, COLOR, emailLayout, row, detailTable, section, textPanel, codeBox, notice, paragraph } = require("./emailLayout");

/** Monto en soles con dos decimales y separador de miles (ej. "S/. 1,250.50"). */
const monto = (data) => {
  const value = Number(data.montoReclamado || 0);
  const safe = Number.isFinite(value) ? value : 0;
  return `S/. ${safe.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/** Primera letra en mayúscula ("servicio" -> "Servicio"), ya escapado. */
const tipoBien = (data) => {
  const value = String(data.tipoBien ?? "");
  return sanitizeHtml(value.charAt(0).toUpperCase() + value.slice(1));
};

/**
 * Plantilla HTML formal para el Administrador (Libro de Reclamaciones).
 */
const createAdminEmailHtml = (data, reclamoId, timestampFormatted) =>
  emailLayout({
    title: "Hoja de Reclamación Virtual",
    eyebrow: "Libro de Reclamaciones",
    preheader: `Nuevo ${data.tipoSolicitud} de ${data.nombreCompleto} · Código ${reclamoId}`,
    bodyRows: [
      codeBox({
        label: "Código de hoja",
        code: sanitizeHtml(reclamoId),
        metaHtml: `Registrado el ${timestampFormatted}`,
      }),
      paragraph(
        `Tipo de solicitud: <strong style="color: ${COLOR.accent}; text-transform: uppercase;">${sanitizeHtml(data.tipoSolicitud)}</strong>`,
        { top: 20 },
      ),
      section(
        "1. Identificación del consumidor",
        detailTable(
          row("Nombre / Razón social", sanitizeHtml(data.nombreCompleto), { strong: true }) +
            row("Documento", `${sanitizeHtml(data.tipoDocumento)} ${sanitizeHtml(data.numeroDocumento)}`) +
            row("Domicilio", sanitizeHtml(data.domicilio)) +
            row("Teléfono", sanitizeHtml(data.telefono)) +
            row("Correo electrónico", sanitizeHtml(data.email)) +
            (data.nombrePadreMadre ? row("Padre, madre o tutor", sanitizeHtml(data.nombrePadreMadre)) : "") +
            row("Consentimientos", "Declaración jurada: Sí &middot; Notificación por correo: Sí"),
        ),
      ),
      section(
        "2. Identificación del bien contratado",
        detailTable(
          row("Tipo de bien", tipoBien(data), { strong: true }) +
            row("Monto reclamado", monto(data)) +
            row("Descripción", sanitizeHtml(data.descripcionBien)),
        ),
      ),
      section(
        "3. Detalle y pedido del consumidor",
        textPanel([
          { label: "Detalle de los hechos", valueHtml: sanitizeHtml(data.detalle) },
          { label: "Pedido concreto", valueHtml: sanitizeHtml(data.pedido) },
        ]),
      ),
      notice(
        `<strong style="color: ${COLOR.ink};">Registro legal.</strong> Conforme a la Ley N° 29571 y D.S. N° 011-2011-PCM, modificado por Ley N° 31435. Plazo legal de respuesta: <strong>15 días hábiles improrrogables</strong>.`,
      ),
    ].join(""),
  });

/**
 * Plantilla HTML oficial de copia al Consumidor (Libro de Reclamaciones).
 */
const createClientEmailHtml = (data, reclamoId, timestampFormatted) =>
  emailLayout({
    title: "Constancia de Hoja de Reclamación",
    eyebrow: "Libro de Reclamaciones Virtual",
    preheader: `Recibimos su ${data.tipoSolicitud}. Código de seguimiento ${reclamoId}`,
    bodyRows: [
      paragraph(
        `Estimado(a) <strong style="color: ${COLOR.ink};">${sanitizeHtml(data.nombreCompleto)}</strong>,<br><br>` +
          `Confirmamos la recepción de su <strong>${sanitizeHtml(data.tipoSolicitud)}</strong> a través de nuestro Libro de Reclamaciones Virtual. Conserve este correo como constancia.`,
        { top: 26 },
      ),
      codeBox({
        label: "Código correlativo de seguimiento",
        code: sanitizeHtml(reclamoId),
        metaHtml: `Fecha y hora de registro: ${timestampFormatted}`,
      }),
      section(
        "Resumen del registro",
        detailTable(
          row("Documento", `${sanitizeHtml(data.tipoDocumento)} ${sanitizeHtml(data.numeroDocumento)}`) +
            (data.nombrePadreMadre ? row("Padre, madre o tutor", sanitizeHtml(data.nombrePadreMadre)) : "") +
            row("Bien contratado", `${tipoBien(data)} &ndash; ${sanitizeHtml(data.descripcionBien)}`) +
            row("Monto reclamado", monto(data)),
        ),
      ),
      section(
        `Detalle del ${sanitizeHtml(data.tipoSolicitud)}`,
        textPanel([
          { label: "Detalle", valueHtml: sanitizeHtml(data.detalle) },
          { label: "Pedido del consumidor", valueHtml: sanitizeHtml(data.pedido) },
        ]),
      ),
      notice(
        `<strong style="color: ${COLOR.ink};">Información legal al consumidor (Ley N° 29571 y Ley N° 31435).</strong><br>` +
          `La empresa brindará respuesta formal a su ${sanitizeHtml(data.tipoSolicitud).toLowerCase()} en un plazo máximo e improrrogable de <strong>quince (15) días hábiles</strong>, contados desde el día siguiente a esta notificación.`,
      ),
      paragraph(
        `Atentamente,<br><strong style="color: ${COLOR.ink};">Área de Atención al Cliente y Cumplimiento Normativo</strong><br>${BRAND.name}`,
        { top: 24 },
      ),
    ].join(""),
  });

module.exports = { createAdminEmailHtml, createClientEmailHtml };
