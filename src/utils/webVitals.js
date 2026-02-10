/**
 * @file webVitals.js
 * @description Utility for calculating and reporting Core Web Vitals to analytics endpoints.
 * @module utils/performance
 */

/**
 * Reporta métricas de Web Vitals a un endpoint de analytics
 * @param {object} metric - Objeto de métrica de web-vitals
 */
const reportWebVitals = (metric) => {
  // Enviar a analytics (Google Analytics, Firebase, etc.)
  if (window.gtag) {
    window.gtag("event", metric.name, {
      value: Math.round(metric.value),
      event_category: "Web Vitals",
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log en desarrollo
  if (import.meta.env.DEV) {
    console.log(metric);
  }
};

export default reportWebVitals;
