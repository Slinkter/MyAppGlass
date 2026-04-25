/**
 * @file company-data.ts
 * @description Centralized store for static legal and contact information of GYA Company.
 * @module config
 */

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
}

/**
 * Centralized store for static legal and contact information of GYA Company.
 */
export const companyData: CompanyInfo = {
  razonSocial: "GLASS & ALUMINUM COMPANY S.A.C.",
  ruc: "20606432870",
  direccion: "Av. Los Fresnos MZ H Lt.16 - La Molina",
  whatsappNumber: "51974278303", // Example: "519XXXXXXXX" for Peru
  whatsappMessage: "Quisiera una cotización para ....", // Default message for quotes
  companyName: "GLASS & ALUMINUM COMPANY S.A.C.",
  contactPerson: "Juan Carlos Cueva Carrasco",
  contactTitle: "Gerente General",
  contactPhone: "996-537-435",
  contactEmail: "acueva@gyacompany.com", // New contact email
};
