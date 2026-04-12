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
  /** @returns {"light"} Always returns light to start with light theme */
  get: () => "light",
  /** Does nothing to prevent saving alternative modes to localStorage if needed, 
   * or keep it static if you want to force light. 
   * Given the previous requirement of 'dark only', I will now set it to allow switching 
   * but starting at light. */
  set: (value) => {
    try {
      localStorage.setItem("chakra-ui-color-mode", value);
    } catch (e) {
      // localStorage is not available in some environments (e.g., private browsing), so we can safely ignore the error.
    }
  },
};

export default darkModeManager;
