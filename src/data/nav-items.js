/**
 * @typedef {Object} NavItem
 * @property {string} label - Display text for the navigation link
 * @property {string} href - Route path for the navigation link
 */

/**
 * @constant {NavItem[]} NAV_ITEMS
 * @description Array of navigation items for the main navigation bar.
 * Defines the primary routes available in the application header.
 */
const NAV_ITEMS = [
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
