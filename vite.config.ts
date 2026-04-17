import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { fileURLToPath, URL } from "url";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: {
        quality: 70,
        progressive: true,
      },

      png: {
        quality: 70,
        compressionLevel: 9,
      },

      webp: {
        quality: 70,
        lossless: false,
      },

      sharpOptions: {
        rotate: true,
        resize: {
          width: 1280,
          withoutEnlargement: true,
          fit: "inside",
        },
      },
    }),
    // Visualizer: genera `dist/bundle-report.html` con el desglose del bundle
    visualizer({
      filename: "dist/bundle-report.html",
      title: "Bundle Report",
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
  ],

  // ⚙️ Opcional: configuración del servidor local
  server: {
    port: 5173,
    open: true,
  },

  // 📦 Opcional: limpia cachés previas del build
  build: {
    target: "es2015", // 📱 FIX: Aumenta compatibilidad con móviles antiguos (Chrome 50+, iOS 10+)
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id) return null;

          const pkg = (name) =>
            new RegExp(`node_modules[\\/](${name})([\\/]|$)`);
          const chakraRE = pkg("@chakra-ui");
          const framerRE = pkg("framer-motion");
          const iconsRE = pkg("react-icons");
          const firebaseRE = pkg("firebase");

          if (chakraRE.test(id)) return "chakra-ui";
          if (framerRE.test(id)) return "framer-motion";
          if (iconsRE.test(id)) return "react-icons";
          if (firebaseRE.test(id)) return "firebase";
          // Keep `react`/`react-dom` inside the general `vendor` chunk to
          // avoid circular imports between a dedicated react chunk and other
          // vendor chunks.
          if (framerRE.test(id)) return "framer-motion";
          if (id.includes("node_modules")) return "vendor";
          return null;
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
      "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
      "@layout": fileURLToPath(new URL("./src/layout", import.meta.url)),
    },
  },
});
