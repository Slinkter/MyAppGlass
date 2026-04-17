/**
 * @file darkModeManager.ts
 * @description Custom ColorModeManager that enforces a consistent design system.
 * @module config
 */

/**
 * Interface for the color mode manager.
 */
export interface ColorModeManager {
  get: () => "light" | "dark" | (string & {});
  set: (value: "light" | "dark") => void;
}

/**
 * Singleton object that overrides default color mode storage.
 * @description Forces the application to remain in a consistent mode regardless of user preference or system settings.
 * @remarks
 * In this implementation, it starts with light mode but allows switching and persists it.
 */
const darkModeManager: ColorModeManager = {
  /** @returns {"light"} Always returns light to start with light theme */
  get: () => "light",
  
  /** 
   * Saves the color mode to localStorage.
   * @param value - The color mode to set.
   */
  set: (value: "light" | "dark") => {
    try {
      localStorage.setItem("chakra-ui-color-mode", value);
    } catch {
      // localStorage is not available in some environments (e.g., private browsing), so we can safely ignore the error.
    }
  },
};

export default darkModeManager;
