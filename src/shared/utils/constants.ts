/**
 * @file constants.ts
 * @description Global configuration constants and localized static texts.
 * @module utils/constants
 */

/**
 * Error messages used across the application.
 */
export interface ErrorMessages {
  UNEXPECTED_ERROR: string;
}

export const ERROR_MESSAGES: ErrorMessages = {
  UNEXPECTED_ERROR:
    "Ha ocurrido un error inesperado. Por favor, intente de nuevo.",
};

/**
 * Static texts for various features in the application.
 */
export interface FeatureTexts {
  PRESUPUESTO_ONLINE_HEADING: string;
  PRESUPUESTO_ONLINE_DESCRIPTION: string;
  VISITA_TECNICA_HEADING: string;
  VISITA_TECNICA_DESCRIPTION: string;
  MATERIALES_HEADING: string;
  MATERIALES_DESCRIPTION: string;
  TECNICOS_CAPACITADOS_HEADING: string;
  TECNICOS_CAPACITADOS_DESCRIPTION: string;
  GARANTIAS_HEADING: string;
  GARANTIAS_DESCRIPTION: string;
  METODO_PAGO_HEADING: string;
  METODO_PAGO_DESCRIPTION: string;
  RECIBOS_HEADING: string;
  RECIBOS_DESCRIPTION: string;
  PROMOCIONES_HEADING: string;
  PROMOCIONES_DESCRIPTION: string;
}

export const FEATURE_TEXTS: FeatureTexts = {
  PRESUPUESTO_ONLINE_HEADING: "Presupuesto Online",
  PRESUPUESTO_ONLINE_DESCRIPTION:
    "Recibe una estimación rápida y precisa a través de WhatsApp.",
  VISITA_TECNICA_HEADING: "Visita Técnica",
  VISITA_TECNICA_DESCRIPTION:
    "Coordina una visita técnica sin costo adicional. Nuestro equipo evaluará tus necesidades en persona.",
  MATERIALES_HEADING: "Materiales",
  MATERIALES_DESCRIPTION:
    "Utilizamos materiales de alta calidad para asegurar la durabilidad y el mejor acabado en todos nuestros proyectos.",
  TECNICOS_CAPACITADOS_HEADING: "Técnicos Capacitados",
  TECNICOS_CAPACITADOS_DESCRIPTION:
    "Nuestro equipo de operarios está altamente capacitado y cuenta con amplia experiencia en instalaciones.",
  GARANTIAS_HEADING: "Garantías",
  GARANTIAS_DESCRIPTION:
    "Disfruta de una garantía de 6 meses en todos nuestros productos instalados.",
  METODO_PAGO_HEADING: "Método de pago",
  METODO_PAGO_DESCRIPTION:
    "Disponemos de una cuenta corriente empresarial y aceptamos tarjetas de crédito y débito.",
  RECIBOS_HEADING: "Recibos",
  RECIBOS_DESCRIPTION:
    "Emitimos boletas y facturas electrónicas inmediatamente después de realizar el pago.",
  PROMOCIONES_HEADING: "Promociones",
  PROMOCIONES_DESCRIPTION:
    "Descubre nuestras ofertas y promociones actualizadas cada mes en una variedad de productos y servicios.",
};
