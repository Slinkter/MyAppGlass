/**
 * @file darkModeManager.js
 * @description Custom Chakra UI ColorModeManager that enforces a "Dark-Only" design system.
 * @module config
 */

/**
 * Singleton object that overrides Chakra UI's default color mode storage.
 * @description Forces the application to remain in dark mode regardless of user preference or system settings.
 * @remarks
 * we explicitly ignore 'set' operations to ensure the UI aesthetic remains consistent with the brand's premium dark look.
 */
const darkModeManager = {
  /** @returns {"dark"} Always returns dark to prevent switching */
  get: () => "dark",
  /** Does nothing to prevent saving alternative modes to localStorage */
  set: () => {},
};

export default darkModeManager;
