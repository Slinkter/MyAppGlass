# 🧠 Foundational Mandates - MyAppGlass

Este documento contiene las reglas críticas y mandatos de arquitectura para agentes de IA que trabajen en este repositorio.

## 📐 Mandatos de UI/UX (Aura System)
- **Regla de Oro:** NUNCA use valores de espaciado numéricos fijos (ej: `gap={4}`). Use SIEMPRE los tokens `phi_` (`phi_xs` a `phi_3xl`).
- **Fluidez 120Hz:** Toda animación o transición debe usar `transform: translateZ(0)` para forzar aceleración por GPU.
- **Identidad:** Mantenga el minimalismo premium y el uso de Glassmorphism (Zinc Scale) para emular la estética del vidrio y el aluminio.
- **Skeleton Sync:** Antes de crear un componente que cargue datos, diseñe su Skeleton asegurando que las dimensiones (`h`, `w`, `gap`, `p`) sean idénticas para evitar CLS (Cumulative Layout Shift).

## 🚀 Mandatos de SEO & Autoridad
- **Jerarquía Semántica:** Todas las páginas deben tener un `H1` con palabras clave de alta intención local (ej: "Vidriería La Molina").
- **JSON-LD:** Al agregar una nueva funcionalidad corporativa, actualice `src/shared/utils/seo-utils.ts` para mantener el grafo de conocimiento de Google al día.
- **Sitelinks:** Cualquier cambio en la navegación principal debe sincronizarse con el `WebSite` schema en `seo-utils.ts` y las prioridades de `public/sitemap.xml`.

## ⚙️ Mandatos de Backend & Seguridad
- **Cero Secrets:** Prohibido escribir API Keys o emails corporativos en archivos `.js`, `.ts` o `.env` seguidos por Git. Use Firebase Secret Manager para producción.
- **CORS Estricto:** Mantenga el filtro de CORS por Regex en `functions/index.js` para permitir peticiones solo desde `gyacompany.com` y sus subdominios.
- **Legalidad:** Los cambios en el `ReclamationForm` deben ser validados por un Agente Backend Senior para asegurar que no se rompa la persistencia legal en Firestore.

## 🧱 Mandatos de Arquitectura (FSD - Feature-Sliced Design)
- **Capa de Enrutamiento (`src/app`):** Uso exclusivo para enrutamiento de Next.js (`layout.tsx`, `page.tsx`). Prohibido colocar lógica de UI compleja aquí.
- **Capa de Vistas (`src/screens`):** Implementación visual de rutas. Importa y compone de `widgets` y `features`. No se usa `src/pages` para evitar conflictos con el Pages Router.
- **Capa Estructural (`src/widgets`):** Orquestadores globales de layout (Navbar, Footer).
- **Capa de Negocio (`src/features`):** Código agrupado por dominio (`home`, `services`, `projects`). Toda la data estática (`/data`) pertenece a su feature correspondiente.
- **Imports:** Prohibido el acoplamiento directo entre *features*. Utilice siempre los path aliases definiger en tsconfig: `@screens/*`, `@widgets/*`, `@features/*`, `@shared/*`.


## 🤖 Perfiles de Agentes (Roles)
- **Frontend Master:** Líder de la estética Aura y rendimiento 120Hz.
- **Backend Expert:** Guardián de la seguridad, secretos y flujos legales.
- **SEO Strategist:** Encargado de dominar el Google Search y mantener la autoridad de marca.

---
*Mandatos establecidos por Gemini Architect - Abril 2026*
