/** DNI (8 dígitos) o RUC (11 dígitos). */
export const isValidDniRuc = (value: string): boolean => /^(\d{8}|\d{11})$/.test(value);
