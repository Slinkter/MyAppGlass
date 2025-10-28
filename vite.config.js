import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],

    // ⚙️ Opcional: configuración del servidor local
    server: {
        port: 5173,
        open: true,
    },

    // 📦 Opcional: limpia cachés previas del build
    build: {
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
});
