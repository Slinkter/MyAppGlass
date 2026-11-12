/**
 * @file nav-items.ts
 * @description Configuration for the main application navigation structure.
 * @module data
 */

/**
 * NavItem interface representing a navigation link.
 */
export interface NavItem {
  label: string;
  href: string;
  /** Si es true, el ítem abre el acordeón de servicios en la navbar móvil. */
  isAccordion?: boolean;
}

/**
 * Array of navigation items for the main navigation bar.
 * Defines the primary routes available in the application header.
 */
const NAV_ITEMS: NavItem[] = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Servicios",
    href: "/#servicios",
  },
  {
    label: "Presupuesto",
    href: "/presupuesto",
  },
  {
    label: "Proyectos",
    href: "/#proyectos",
  },
  {
    label: "Ubicación",
    href: "/#ubicacion",
  },
];

/**
 * Acceso a la cuenta del cliente: una sola ruta para escritorio, móvil y footer.
 * Se mantiene fuera de NAV_ITEMS para que la barra principal priorice a constructoras.
 */
export const ACCOUNT_NAV_ITEM: NavItem = {
  label: "Mi cuenta",
  href: "/mi-cuenta",
};

export const CONTACT_NAV_ITEM: NavItem = {
  label: "Contacto",
  href: "/contacto",
};

/**
 * Enlaces para la columna principal del footer: incluye las 4 secciones principales,
 * Contacto y Mi cuenta.
 */
export const FOOTER_EXPLORE_ITEMS: NavItem[] = [
  ...NAV_ITEMS,
  CONTACT_NAV_ITEM,
  ACCOUNT_NAV_ITEM,
];

/**
 * Arquitectura de información de la navbar móvil: 5 enlaces primarios,
 * donde "Servicios" despliega el acordeón.
 */
export const MOBILE_NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/#servicios", isAccordion: true },
  { label: "Presupuesto", href: "/presupuesto" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Ubicación", href: "/#ubicacion" },
  { label: "Contacto", href: "/contacto" },
];

export default NAV_ITEMS;
