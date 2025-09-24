// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
    plugins: [
        react(),
        ViteImageOptimizer({
            /* Opciones de configuración para la optimización */

            // Configuración para PNG
            png: {
                quality: 85, // Calidad del 0 al 100
            },
            // Configuración para JPEG
            jpeg: {
                quality: 85, // Calidad del 0 al 100
            },
            // Configuración para JPG
            jpg: {
                quality: 85, // Calidad del 0 al 100
            },
            // Crear versiones WebP de tus imágenes
            webp: {
                quality: 85, // Calidad del 0 al 100
            },
        }),
    ],
});
