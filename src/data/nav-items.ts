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
    label: "Inicio",
    href: "/",
  },
  {
    label: "Servicios",
    href: "/servicios",
  },
  {
    label: "Proyectos",
    href: "/proyectos",
  },
];

export default NAV_ITEMS;
