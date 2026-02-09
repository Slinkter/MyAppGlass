// src/config/darkModeManager.js
// Custom ColorModeManager to always enforce dark mode

const darkModeManager = {
  get: () => "dark",
  set: () => {}, // Do nothing, don't allow setting any other mode
};

export default darkModeManager;
