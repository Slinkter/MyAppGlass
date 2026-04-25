/**
 * @file bank-accounts.ts
 * @description Static data representing the different bank accounts of GYA Company.
 * @module data
 */

import bbvaLogo from "@/assets/bbva.svg";
import bnLogo from "@/assets/banconacion.svg";

export interface Account {
  label: string;
  value: string;
  note?: string;
}

export interface BankAccount {
  logo: string;
  bankName: string;
  accountType: string;
  logoBg: string;
  accounts: Account[];
}

export const bankAccountsData: BankAccount[] = [
  {
    logo: bbvaLogo.src,
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
    logo: bnLogo.src,
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
