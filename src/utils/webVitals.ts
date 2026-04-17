/**
 * @file webVitals.ts
 * @description Utility for calculating and reporting Core Web Vitals to analytics endpoints.
 * @module utils/performance
 */

import { Metric } from "web-vitals";

/**
 * Interface for Global window.gtag
 */
declare global {
  interface Window {
    gtag?: (
      command: "event",
      action: string,
      params: {
        value: number;
        event_category: string;
        event_label: string;
        non_interaction: boolean;
      }
    ) => void;
  }
}

/**
 * Reports Web Vitals metrics to an analytics endpoint.
 * @param metric - Web Vitals metric object.
 */
const reportWebVitals = (metric: Metric): void => {
  // Send to analytics (Google Analytics, Firebase, etc.)
  if (window.gtag) {
    window.gtag("event", metric.name, {
      value: Math.round(metric.value),
      event_category: "Web Vitals",
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log in development
  if (process.env.NODE_ENV !== "production") {
    console.log(metric);
  }
};

export default reportWebVitals;
