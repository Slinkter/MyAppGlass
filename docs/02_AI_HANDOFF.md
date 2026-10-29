# 🤖 AI Agent Handoff Document - MyAppGlass

Bienvenido, próximo Agente de IA. Este documento contiene el estado canónico del proyecto tras la estabilización de los 4 sistemas oficiales de ventanas y la optimización para LLMs locales. El simulador 3D interactivo y su catálogo JSON fueron eliminados (commit `2ca4f3e`, 2026-08-26); ver la regla 6. Léelo antes de sugerir o realizar cambios.

---

## 🏗️ Estado de la Arquitectura (FSD - Feature-Sliced Design)

El proyecto sigue estrictamente los principios de **Feature-Sliced Design** sobre Next.js 16 (App Router con `output: 'export'`):

### Estructura de Directorios:
* **`src/app/`**: **Capa de Enrutamiento**. Rutas Next.js (`layout.tsx`, `page.tsx`). Wrappers delgados.
* **`src/screens/`**: **Capa de Páginas**. Ensamblaje visual de páginas completas.
* **`src/widgets/`**: **Capa de Bloques Estructurales**. Componentes globales (`Navbar` con `AuraNavbar`, `Footer`, `FloatingActions`, `AdminNav`).
* **`src/features/`**: **Capa de Negocio**. Módulos reales: `ai-simulator`, `auth`, `blog`, `contacto`, `home`, `presupuesto`, `products`, `projects`, `reclamation-book`, `services`. Cada feature encapsula sus componentes, hooks y datos en su subcarpeta `/data`.
* **`src/shared/`**: **Capa de Fundamentos**. Utilidades (`logger.ts`), configuración (`company-data.ts`), contratos API y componentes UI Aura.
* **`functions/`**: Microservicios serverless en Firebase Functions v2 (Node.js 22 - **CONGELADO**).

---

## 🏢 Reglas de Negocio Inmutables

1. **Razón Social:** `"GLASS & ALUMINUM COMPANY S.A.C."` (usar `companyData` de `@/shared/config/company-data`).
2. **Ortografía en Español:**
   - `"antirruido"` (con doble 'r', no 'antiruido').
   - `"vidrio y aluminio"` (en singular).
3. **Catálogo Oficial de Ventanas:**
   - **4 Sistemas Oficiales Únicos:** `Sistema Nova`, `Sistema Serie 25`, `Sistema Serie 35`, `Sistema Serie 62`.
   - Todos los sistemas son **independientes** del tipo de ventana y siempre están disponibles.
4. **Tipos de Ventana:** `Corrediza`, `Proyectante`, `Batiente`, `Luz Fija`.
5. **Tipos de Vidrio (3 únicos):** `Crudo`, `Laminado`, `Templado`.
6. **Simulador 3D (`VentanaConfigurador3DCard`)** — *especificación histórica / pendiente de re-implementación:*
   > Nota (2026-10-29): el componente, `components/configurador3d/*`, `ventanas-catalogo.json` y la dependencia `three` fueron eliminados en el commit `2ca4f3e` (2026-08-26). Hoy el único simulador es `/simulador-ai` (`src/screens/SimuladorAI/SimuladorAIScreen.tsx`): superposición visual local de un producto sobre la foto subida y chat con respuestas predefinidas, sin IA generativa ni APIs externas.
   - Es un simulador visual de características técnicas (no un cotizador de precios unitarios).
   - Proporción estándar: **65% Visor 3D (Izquierda)** / **35% Panel de Configuración (Derecha)**.
   - Altura estándar desktop: **`460px`**.

---

## ⚡ Reglas de Ahorro de Tokens para LLMs

* **NO ejecutar suites de tests (`pnpm run test:run`)** salvo petición explícita del usuario para evitar consumo de tokens (regla de `AGENTS.md`). Los tests existen (21 archivos en `tests/unit/`, Vitest) y se ejecutan en la CI (`.github/workflows/ci.yml`) o bajo petición.
* Validar siempre cambios con `pnpm run typecheck` y `pnpm run build`.

---

## 🚀 Estado Técnico y Despliegue

* **Build:** 55 páginas SSG pre-renderizadas estáticamente (último build: 55/55).
* **Hosting Live:** [https://gya-app-4c8a9.web.app](https://gya-app-4c8a9.web.app)
* **Despliegue Hosting:** `pnpm run deploy:hosting`

¡Éxito en el trabajo, colega! 🧠✨
