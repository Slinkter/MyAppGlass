/**
 * @file ErrorFallback.jsx
 * @description Minimalist loading placeholder specifically for the error route redirection.
 * @module shared/common
 */

import React from "react";

const ErrorFallback = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    Loading...
  </div>
);

export default ErrorFallback;
