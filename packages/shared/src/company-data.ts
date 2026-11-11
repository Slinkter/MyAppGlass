/**
 * @file company-data.ts
 * @description Centralized store for static legal and contact information of GYA Company.
 * @module config
 */

/**
 * Interface representing the company's contact and legal information.
 */
export interface CompanySchedule {
  days: string;
  hours: string;
  display: string;
  openHour: number;
  closeHour: number;
}

/**
 * Interface representing the company's contact and legal information.
 */
export interface CompanyInfo {
  razonSocial: string;
  ruc: string;
  direccion: string;
  whatsappNumber: string;
  whatsappMessage: string;
  companyName: string;
  contactPerson: string;
  contactTitle: string;
  contactPhone: string;
  contactEmail: string;
  salesEmail: string;
  whatsappDisplay: string;
  horario: string;
  schedule: CompanySchedule;
}

/**
 * URL pública del sitio (sin barra final).
 */
export const SITE_URL = "https://www.gyacompany.com";

/**
 * Centralized store for static legal and contact information of GYA Company.
 */
export const companyData: CompanyInfo = {
  razonSocial: "GLASS & ALUMINUM COMPANY S.A.C.",
  ruc: "20606432870",
  direccion: "Av. Los Fresnos 1250 - La Molina",
  whatsappNumber: "51974278303", // Example: "519XXXXXXXX" for Peru
  whatsappMessage: "Hola, quisiera solicitar una cotización.", // Default message for quotes
  companyName: "GLASS & ALUMINUM COMPANY S.A.C.",
  contactPerson: "Juan Carlos Cueva Carrasco",
  contactTitle: "Gerente General",
  contactPhone: "996-537-435",
  contactEmail: "acueva@gyacompany.com", // New contact email
  salesEmail: "ventas@gyacompany.com",
  whatsappDisplay: "974 278 303", // Formato visual para mostrar al usuario
  horario: "Lunes a Sábado, 8:00 am – 6:00 pm",
  schedule: {
    days: "Lunes a Sábado",
    hours: "8:00 am – 6:00 pm",
    display: "Lunes a Sábado, 8:00 am – 6:00 pm",
    openHour: 8,
    closeHour: 18,
  },
};
