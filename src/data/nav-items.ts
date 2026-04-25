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
}

/**
 * Array of navigation items for the main navigation bar.
 * Defines the primary routes available in the application header.
 */
const NAV_ITEMS: NavItem[] = [
  {
    label: "Portal GYA",
    href: "/",
  },
  {
    label: "Ventanas",
    href: "/servicios/ventana",
  },
  {
    label: "Mamparas",
    href: "/servicios/mampara",
  },
  {
    label: "Puertas de Ducha",
    href: "/servicios/ducha",
  },
  {
    label: "Proyectos",
    href: "/proyectos",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Cotizar",
    href: "/contacto",
  },
];

export default NAV_ITEMS;
