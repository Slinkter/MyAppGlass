import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // Configuración para JPG
      jpg: {
        quality: 85, // Calidad de compresión (0-100)
      },
      // Configuración para PNG
      png: {
        quality: 85,
      },
      // Configuración para WebP (formato moderno)
      webp: {
        quality: 85,
      },
      // ⚠️ IMPORTANTE: Opciones de Sharp para corregir orientación
      // Esta es la clave para solucionar el problema de imágenes volteadas
      cache: false, // Deshabilita caché para asegurar que siempre se procesen
      cacheLocation: undefined,
      // Configuración global de Sharp
      sharpOptions: {
        // 🔧 AUTO-ROTATE: Corrige la orientación basándose en EXIF
        // y luego ELIMINA los metadatos EXIF
        // Esto previene que las imágenes se vean volteadas
        rotate: true, // Auto-rotación basada en EXIF
      },
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
          if (id.includes("firebase")) {
            return "firebase";
          }
          if (id.includes("@chakra-ui")) {
            return "chakra-ui";
          }
          if (id.includes("framer-motion")) {
            return "framer-motion";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
