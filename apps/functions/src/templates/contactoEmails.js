// Plantillas HTML de los correos de Contacto/Cotización (admin y cliente).
const { sanitizeHtml } = require("../adapters/sanitize");

/**
 * Plantilla HTML para notificación al Administrador (Contacto/Cotización).
 */
const createContactEmailHtml = (data, contactId, timestampFormatted) => `
  <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 600px; color: #1e293b;">
    <div style="border-bottom: 2px solid #cc0202; padding-bottom: 10px; margin-bottom: 16px;">
      <h2 style="margin: 0; color: #0f172a; font-size: 18px;">NUEVA SOLICITUD DE CONTACTO / COTIZACIÓN</h2>
      <p style="margin: 4px 0 0 0; color: #64748b; font-size: 12px;">ID: <strong>${sanitizeHtml(contactId)}</strong> | Fecha: <strong>${timestampFormatted}</strong></p>
    </div>

    <table style="width: 100%; font-size: 13px; margin-bottom: 16px;">
      <tr><td style="width: 30%; color: #64748b; padding: 4px 0;">Nombre:</td><td style="font-weight: 600;">${sanitizeHtml(data.name)}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Email:</td><td>${sanitizeHtml(data.email)}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Teléfono:</td><td>${sanitizeHtml(data.phone || "No especificado")}</td></tr>
    </table>

    <div style="background-color: #f8fafc; padding: 14px; border-radius: 6px; font-size: 13px; border: 1px solid #e2e8f0;">
      <strong style="color: #0f172a;">Requerimiento / Mensaje:</strong>
      <p style="margin: 6px 0 0 0; white-space: pre-wrap; color: #334155;">${sanitizeHtml(data.message)}</p>
    </div>
  </div>
`;

/**
 * Plantilla HTML de confirmación al Cliente (Contacto/Cotización).
 */
const createContactClientEmailHtml = (data, contactId) => `
  <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 600px; color: #1e293b;">
    <div style="border-bottom: 2px solid #cc0202; padding-bottom: 10px; margin-bottom: 16px; text-align: center;">
      <h2 style="margin: 0; color: #0f172a; font-size: 20px;">Hemos recibido tu solicitud</h2>
      <p style="margin: 4px 0 0 0; color: #64748b; font-size: 12px;"><strong>GLASS & ALUMINUM COMPANY S.A.C.</strong></p>
    </div>

    <p style="font-size: 14px;">Hola <strong>${sanitizeHtml(data.name)}</strong>,</p>
    <p style="font-size: 14px; color: #334155;">
      Gracias por contactar con nuestro equipo. Hemos recibido tu requerimiento y un asesor técnico se comunicará contigo en menos de 24 horas hábiles.
    </p>

    <div style="background-color: #f8fafc; padding: 14px; border-radius: 6px; text-align: center; margin: 20px 0; border: 1px solid #e2e8f0;">
      <p style="margin: 0; font-size: 11px; color: #64748b; font-weight: bold; text-transform: uppercase;">CÓDIGO DE SEGUIMIENTO</p>
      <p style="margin: 4px 0 0 0; font-size: 18px; font-weight: bold; color: #0f172a; font-family: monospace;">${sanitizeHtml(contactId)}</p>
    </div>

    <p style="font-size: 12px; color: #64748b;">
      Atentamente,<br/>
      <strong>Equipo Comercial & Proyectos</strong><br/>
      Glass & Aluminum Company S.A.C.
    </p>
  </div>
`;

module.exports = { createContactEmailHtml, createContactClientEmailHtml };
