// Plantillas HTML de los correos del Libro de Reclamaciones (admin y cliente).
const { sanitizeHtml } = require("../adapters/sanitize");

/**
 * Plantilla HTML formal para el Administrador (Libro de Reclamaciones).
 */
const createAdminEmailHtml = (data, reclamoId, timestampFormatted) => `
  <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 650px; color: #1e293b; line-height: 1.5;">
    <div style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
      <h2 style="margin: 0; color: #0f172a; font-size: 20px;">HOJA DE RECLAMACIÓN VIRTUAL</h2>
      <p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">Razón Social: <strong>GLASS & ALUMINUM COMPANY S.A.C.</strong> | RUC: <strong>20601542407</strong></p>
      <p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">Código de Hoja: <strong style="color: #0f172a;">${sanitizeHtml(reclamoId)}</strong> | Fecha: <strong>${timestampFormatted}</strong></p>
    </div>

    <div style="background-color: #f8fafc; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #cc0202;">
      <p style="margin: 0; font-size: 14px; font-weight: bold; color: #0f172a;">
        Tipo de Solicitud: <span style="color: #cc0202; text-transform: uppercase;">${sanitizeHtml(data.tipoSolicitud)}</span>
      </p>
    </div>
    
    <h3 style="font-size: 14px; text-transform: uppercase; color: #475569; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 20px;">
      1. Identificación del Consumidor Reclamante
    </h3>
    <table style="width: 100%; font-size: 13px; margin-bottom: 16px;">
      <tr><td style="width: 35%; color: #64748b; padding: 4px 0;">Nombre / Razón Social:</td><td style="font-weight: 600;">${sanitizeHtml(data.nombreCompleto)}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Documento:</td><td>${sanitizeHtml(data.tipoDocumento)} ${sanitizeHtml(data.numeroDocumento)}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Domicilio:</td><td>${sanitizeHtml(data.domicilio)}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Teléfono:</td><td>${sanitizeHtml(data.telefono)}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Email:</td><td>${sanitizeHtml(data.email)}</td></tr>
    </table>

    <h3 style="font-size: 14px; text-transform: uppercase; color: #475569; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 20px;">
      2. Identificación del Bien Contratado
    </h3>
    <table style="width: 100%; font-size: 13px; margin-bottom: 16px;">
      <tr><td style="width: 35%; color: #64748b; padding: 4px 0;">Tipo de Bien:</td><td style="font-weight: 600;">${sanitizeHtml(data.tipoBien)}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Monto Reclamado:</td><td>S/. ${sanitizeHtml(String(data.montoReclamado || "0.00"))}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Descripción:</td><td>${sanitizeHtml(data.descripcionBien)}</td></tr>
    </table>

    <h3 style="font-size: 14px; text-transform: uppercase; color: #475569; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 20px;">
      3. Detalle de la Reclamación y Pedido del Consumidor
    </h3>
    <div style="background-color: #f8fafc; padding: 14px; border-radius: 6px; font-size: 13px; margin-bottom: 12px; border: 1px solid #e2e8f0;">
      <strong style="color: #0f172a;">Detalle de los hechos:</strong>
      <p style="margin: 6px 0 12px 0; white-space: pre-wrap; color: #334155;">${sanitizeHtml(data.detalle)}</p>
      <strong style="color: #0f172a;">Pedido concreto:</strong>
      <p style="margin: 6px 0 0 0; white-space: pre-wrap; color: #334155;">${sanitizeHtml(data.pedido)}</p>
    </div>

    <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8;">
      <p style="margin: 0;">Registro legal conforme a la Ley N° 29571 y D.S. N° 011-2011-PCM modificado por Ley N° 31435. Plazo legal de respuesta: 15 días hábiles improrrogables.</p>
    </div>
  </div>
`;

/**
 * Plantilla HTML oficial de copia al Consumidor (Libro de Reclamaciones).
 */
const createClientEmailHtml = (data, reclamoId, timestampFormatted) => `
  <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 650px; color: #1e293b; line-height: 1.5;">
    <div style="border-bottom: 2px solid #cc0202; padding-bottom: 14px; margin-bottom: 20px; text-align: center;">
      <h2 style="margin: 0; color: #0f172a; font-size: 22px;">CONSTANCIA DE HOJA DE RECLAMACIÓN VIRTUAL</h2>
      <p style="margin: 6px 0 0 0; color: #475569; font-size: 13px;"><strong>GLASS & ALUMINUM COMPANY S.A.C.</strong> | RUC: <strong>20601542407</strong></p>
      <p style="margin: 2px 0 0 0; color: #64748b; font-size: 12px;">Calle Los Cedros Mz. E Lt. 7, Huertos de La Molina, Lima - Perú</p>
    </div>

    <p style="font-size: 14px;">Estimado(a) <strong>${sanitizeHtml(data.nombreCompleto)}</strong>,</p>
    <p style="font-size: 14px; color: #334155;">
      Confirmamos la recepción de su <strong>${sanitizeHtml(data.tipoSolicitud)}</strong> a través de nuestro Libro de Reclamaciones Virtual.
    </p>

    <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; text-align: center; margin: 20px 0; border: 1px dashed #cbd5e1;">
      <p style="margin: 0; font-size: 11px; font-weight: bold; color: #64748b; letter-spacing: 0.1em; text-transform: uppercase;">CÓDIGO CORRELATIVO DE SEGUIMIENTO</p>
      <p style="margin: 6px 0 0 0; font-size: 20px; font-weight: bold; color: #cc0202; font-family: monospace;">${sanitizeHtml(reclamoId)}</p>
      <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">Fecha y Hora de Registro: ${timestampFormatted}</p>
    </div>

    <h3 style="font-size: 13px; text-transform: uppercase; color: #475569; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">Resumen del Registro</h3>
    <table style="width: 100%; font-size: 13px; margin-bottom: 16px;">
      <tr><td style="width: 35%; color: #64748b; padding: 3px 0;">Documento:</td><td>${sanitizeHtml(data.tipoDocumento)} ${sanitizeHtml(data.numeroDocumento)}</td></tr>
      <tr><td style="color: #64748b; padding: 3px 0;">Bien Contratado:</td><td>${sanitizeHtml(data.tipoBien)} - ${sanitizeHtml(data.descripcionBien)}</td></tr>
      <tr><td style="color: #64748b; padding: 3px 0;">Monto Reclamado:</td><td>S/. ${sanitizeHtml(String(data.montoReclamado || "0.00"))}</td></tr>
    </table>

    <div style="background-color: #f8fafc; padding: 14px; border-radius: 6px; font-size: 12px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
      <strong style="color: #0f172a;">Detalle del ${sanitizeHtml(data.tipoSolicitud)}:</strong>
      <p style="margin: 4px 0 8px 0; color: #334155;">${sanitizeHtml(data.detalle)}</p>
      <strong style="color: #0f172a;">Pedido del Consumidor:</strong>
      <p style="margin: 4px 0 0 0; color: #334155;">${sanitizeHtml(data.pedido)}</p>
    </div>

    <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px 16px; border-radius: 4px; margin: 20px 0;">
      <p style="margin: 0; font-size: 12px; color: #1e3a8a; line-height: 1.4;">
        <strong>Información Legal al Consumidor (Ley N° 29571 & Ley N° 31435):</strong><br/>
        De acuerdo con la normativa vigente de protección al consumidor de Indecopi, la empresa brindará respuesta formal a su reclamo o queja en un plazo máximo e improrrogable de <strong>quince (15) días hábiles</strong> contados a partir del día siguiente de la presente notificación.
      </p>
    </div>

    <p style="font-size: 12px; color: #64748b; margin-top: 24px;">
      Atentamente,<br/>
      <strong>Área de Atención al Cliente y Cumplimiento Normativo</strong><br/>
      Glass & Aluminum Company S.A.C.
    </p>
  </div>
`;

module.exports = { createAdminEmailHtml, createClientEmailHtml };
