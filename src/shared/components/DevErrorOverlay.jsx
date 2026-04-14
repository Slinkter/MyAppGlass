/**
 * @file DevErrorOverlay.jsx
 * @description Overlay de errores en pantalla para desarrollo.
 * Captura window.onerror, console.error y unhandledrejection
 * y los muestra en pantalla. Solo activo en modo desarrollo.
 */
import { useState, useEffect, useCallback } from "react";

const PANEL_STYLE = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  maxHeight: "40vh",
  overflowY: "auto",
  background: "#1a0000",
  borderTop: "2px solid #ff3333",
  zIndex: 99999,
  fontFamily: "monospace",
  fontSize: "12px",
};

const HEADER_STYLE = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "4px 12px",
  background: "#ff1a1a",
  color: "white",
  fontWeight: "bold",
  fontSize: "11px",
};

const ERROR_ITEM = {
  borderBottom: "1px solid #440000",
  padding: "6px 12px",
  color: "#ff8888",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
};

const WARNING_ITEM = {
  ...ERROR_ITEM,
  color: "#ffcc44",
};

export default function DevErrorOverlay() {
  const [errors, setErrors] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const addError = useCallback((message, type = "error", source = "") => {
    const ts = new Date().toLocaleTimeString();
    setErrors((prev) => [
      { id: Date.now() + Math.random(), message, type, source, ts },
      ...prev,
    ].slice(0, 30)); // Max 30 entries
  }, []);

  useEffect(() => {
    // Capture global JS errors
    const handleError = (event) => {
      addError(`${event.message}\n  at ${event.filename}:${event.lineno}:${event.colno}`, "error");
    };

    // Capture unhandled promise rejections
    const handleRejection = (event) => {
      const msg = event.reason?.message || String(event.reason);
      addError(`UnhandledPromise: ${msg}`, "error");
    };

    // Intercept console.error
    const origError = console.error.bind(console);
    console.error = (...args) => {
      origError(...args);
      const msg = args.map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" ");
      addError(msg, "error", "console.error");
    };

    // Intercept console.warn
    const origWarn = console.warn.bind(console);
    console.warn = (...args) => {
      origWarn(...args);
      const msg = args.map((a) => String(a)).join(" ");
      addError(msg, "warn", "console.warn");
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
      console.error = origError;
      console.warn = origWarn;
    };
  }, [addError]);

  if (import.meta.env.PROD) return null;
  if (errors.length === 0) return null;

  return (
    <div style={PANEL_STYLE}>
      <div style={HEADER_STYLE}>
        <span>⚠ Dev Error Panel — {errors.length} error(s)</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setIsOpen((o) => !o)}
            style={{ background: "none", border: "1px solid white", color: "white", cursor: "pointer", padding: "1px 6px", borderRadius: "3px" }}
          >
            {isOpen ? "▼ Colapsar" : "▲ Expandir"}
          </button>
          <button
            onClick={() => setErrors([])}
            style={{ background: "none", border: "1px solid white", color: "white", cursor: "pointer", padding: "1px 6px", borderRadius: "3px" }}
          >
            ✕ Limpiar
          </button>
        </div>
      </div>
      {isOpen && errors.map((e) => (
        <div key={e.id} style={e.type === "warn" ? WARNING_ITEM : ERROR_ITEM}>
          <span style={{ opacity: 0.5, marginRight: 8 }}>[{e.ts}{e.source ? ` ${e.source}` : ""}]</span>
          {e.message}
        </div>
      ))}
    </div>
  );
}
