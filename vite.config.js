import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { fileURLToPath, URL } from "url";
// import { visualizer } from "rollup-plugin-visualizer"; // Desactivado para producción

export default defineConfig({
    plugins: [
        react(),
        ViteImageOptimizer({
            // 🚀 OPTIMIZACIÓN AGRESIVA para máxima ligereza
            // Configuración para JPG
            jpg: {
                quality: 70, // Reducido de 80 a 70 (30-40% más ligero, calidad imperceptible)
                progressive: true, // Carga progresiva
            },
            // Configuración para PNG
            png: {
                quality: 75, // Optimizado para PNGs
                compressionLevel: 9, // Máxima compresión
            },
            // Configuración para WebP (formato moderno y más ligero)
            webp: {
                quality: 70, // WebP es más eficiente que JPG
                lossless: false,
            },
            // ⚠️ IMPORTANTE: Opciones de Sharp para corregir orientación
            sharpOptions: {
                rotate: true, // Auto-rotación basada en EXIF
                // 🔧 Resize automático para imágenes muy grandes
                // Si una imagen es mayor a 2000px de ancho, se redimensiona
                resize: {
                    width: 2000,
                    withoutEnlargement: true, // No agranda imágenes pequeñas
                    fit: 'inside', // Mantiene aspect ratio
                },
            },
        }),
        // Visualizer desactivado por defecto (descomentar si necesitas analizar bundle)
        // visualizer({ open: true }),
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
                    // Separate react-icons into a dedicated chunk
                    if (id.includes("react-icons")) {
                        return "react-icons";
                    }
                    // Group React and ReactDOM into a separate chunk
                    if (id.includes("react") || id.includes("react-dom")) {
                        return "react-vendor";
                    }
                    // Catch-all for other node_modules
                    if (id.includes("node_modules")) {
                        return "vendor";
                    }
                    // Default chunk for everything else
                    return "main";
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
