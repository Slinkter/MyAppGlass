/**
 * @file bank-accounts.js
 * @description Static data representing the different client sectors served by GYA Company.
 * @module data
 */

import bbvaLogo from "@/assets/bbva.svg";
import bnLogo from "@/assets/banconacion.svg";

export const bankAccountsData = [
  {
    logo: bbvaLogo,
    bankName: "BBVA Perú",
    accountType: "Cuenta Corriente en Soles",
    logoBg: "white",
    accounts: [
      {
        label: "N° Cuenta",
        value: "0011-0106-0100041622",
      },
      {
        label: "CCI",
        value: "011-106-000100041622-20",
      },
    ],
  },
  {
    logo: bnLogo,
    bankName: "Banco de la Nación",
    accountType: "Cuenta de Detracciones",
    logoBg: "white",
    accounts: [
      {
        label: "N° Cuenta",
        value: "00-066-173291",
        note: "(Obligatorio para facturas sujetas a detracción)",
      },
    ],
  },
];
