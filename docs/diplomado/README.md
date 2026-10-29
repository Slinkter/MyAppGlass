# Diplomado ISIA aplicado a MyAppGlass

Guía de estudio para cursar el **Diploma Ingeniería de Software con IA** (DMC INSTITUTE) usando este repositorio como base de práctica.

## 1. Objetivo y alcance

- El diploma enseña a usar IA (Claude Code) en frontend, backend, soluciones con LLM embebido y sistemas multiagente. Contenido completo: [`./brochure-isia.md`](./brochure-isia.md) (PDF original: `docs/diplomado/brochure dip ISIA.pdf`).
- MyAppGlass (Next.js 16 + Firebase, Feature-Sliced Design) es un proyecto real de vidrio y aluminio. Cada módulo se practica sobre una parte concreta del repo, sin inventar casos artificiales.
- Alcance: aprendizaje y portafolio. No sustituye el plan de producto (`docs/04_PLAN_DE_TRABAJO.md`).

## 2. Resumen del diploma

| Dato | Valor |
|---|---|
| Horas académicas | 88 |
| Talleres prácticos | 19 |
| Proyecto de portafolio | 1 |
| Sesiones | 23 |
| Herramienta | Claude Code |
| Bloques | I Frontend, II Backend, III Soluciones con IA embebida, IV Multi-Agent |
| Metodología | Learning Agile: Explora 40 %, Descubre 20 %, Aplica 40 % |

## 3. Cómo trabajar

- **Contexto obligatorio:** leer `AGENTS.md` (reglas de negocio, comandos y convenciones) antes de cada taller.
- **Una rama por taller**, partiendo de `main`: `diplomado/mod-04-refactor-frontend`, `diplomado/mod-09-orquestacion`, etc.
- **No tocar** `functions/`, `firestore.rules` ni `firebase.json` salvo petición explícita del dueño del proyecto.
- **Validar siempre** con `pnpm run typecheck && pnpm run build` (solo `pnpm`). No ejecutar `pnpm run test:run` salvo que se pida.
- **Commits semánticos**: `feat(modulo): descripción clara`, `refactor(admin): ...`, `docs(diplomado): ...`.
- Ortografía: «antirruido» y «vidrio y aluminio» (singular). Logger de `src/shared/utils/logger.ts`, nunca `console.log`.

## 4. Plan de estudio por módulo

### Bloque I. Frontend

**Módulo 1. Introducción al desarrollo potenciado con IA**
- Objetivo: elegir y configurar herramientas de IA para el flujo diario.
- [ ] Evaluación y selección estratégica de IAs
- [ ] Integración de IAs al entorno de desarrollo
- Entregable: nota comparativa de herramientas y `.mcp.json`/skills revisados.
- Repo: `AGENTS.md`, `.mcp.json`, `.agents/skills/`.

**Módulo 2. Diseño de interfaces con IA**
- Objetivo: pasar de requerimientos a user flows, wireframes y design system.
- [ ] User flows asistidos por IA
- [ ] Wireframes (Figma AI)
- [ ] Exploración visual (Claude Design)
- [ ] Design System (Figma AI)
- Entregable: wireframes y tokens documentados que coincidan con el tema Chakra.
- Repo: `src/shared/providers/theme/index.ts`, `src/components/ui/` (18 wrappers), flujo `/presupuesto`.

**Módulo 3. Implementación de interfaces**
- Objetivo: comparar arquitecturas frontend, con foco en Feature-Sliced Design.
- [ ] Scaffold asistido de un feature nuevo
- [ ] Componentes para distintas arquitecturas
- Entregable: un feature nuevo bajo `src/features/` con README propio (solo 4 de 10 features lo tienen: home, projects, reclamation-book, services).
- Repo: `src/features/`, `src/widgets/`, `src/shared/` (FSD parcial: no existe `entities/`).

**Módulo 4. Refactorización y migración frontend**
- Objetivo: reducir deuda técnica en pantallas grandes con IA.
- [ ] Evolución hacia arquitectura modular
- [ ] Mitigación de deuda técnica
- Entregable: pantalla dividida en componentes, con `typecheck` y `build` en verde.
- Repo (líneas actuales): `src/screens/Admin/InventoryDashboardScreen.tsx` (894), `SalesOrderScreen.tsx` (607), `ClientManagementScreen.tsx` (512), `ReportsScreen.tsx` (500), `src/screens/SimuladorAI/SimuladorAIScreen.tsx` (470), `src/screens/Presupuesto/PresupuestoWizardScreen.tsx` (445). Ya existe `inventory/{MetricsSummary,ProductTable,SearchFilters}.tsx` como patrón a seguir.

### Bloque II. Backend

**Módulo 5. Diseño funcional y arquitectura backend**
- Objetivo: entender el enfoque serverless actual y compararlo con otros.
- [ ] Scaffold backend asistido (en `/tmp` o repo aparte)
- [ ] Componentes para distintas arquitecturas
- Entregable: documento de arquitectura de `functions/index.js` (3 funciones HTTP v2: `submitReclamo`, `submitContacto`, `checkStatus`).
- Repo: solo lectura de `functions/`; `docs/07_BACKEND_IMPLEMENTATION.md` está desactualizado (omite submitContacto, checkStatus, rate limit, Zod y captchas).

**Módulo 6. Refactorización y migración backend**
- Objetivo: detectar deuda en backend y proponer evolución.
- [ ] Evolución de la arquitectura
- [ ] Mitigación de deuda técnica
- Entregable: propuesta escrita (no aplicada) sobre `functions/`.
- Repo: rate limit en Firestore (`rate_limits`, 8 envíos por IP cada 15 min), validación Zod en `functions/emailSender.js`, `functions/mathCaptchaValidator.js`. Aplicar cambios requiere autorización explícita.

### Bloque III. IA embebida

**Módulo 7. Fundamentos de LLM**
- Objetivo: integrar un LLM vía API en un módulo backend.
- [ ] Módulo de comunicación con un LLM (preguntas y respuestas)
- Entregable: prototipo aislado que reemplace las respuestas fijas del asesor.
- Repo: `src/screens/SimuladorAI/SimuladorAIScreen.tsx`, `src/features/ai-simulator/data/aiProducts.ts`.

**Módulo 8. NL2SQL**
- Objetivo: lenguaje natural a consultas validadas, con function calling y MCP.
- [ ] NL2SQLService y módulos conexos (ChatController, SQLValidator, FunctionsCalling)
- Entregable: variante adaptada a Firestore (ver matriz).
- Repo: `src/features/products/services/productService.ts`, `orderService.ts`, `ReportsScreen.tsx`.

### Bloque IV. Multi-Agent

**Módulo 9. Sistemas multiagente**
- Objetivo: agentes frontend y backend coordinados.
- [ ] Agente Frontend
- [ ] Agente Backend
- [ ] Orquestación de ambos
- Entregable: proyecto de portafolio (sección 6).
- Repo: roles en `docs/03_AGENTS.md`, skills en `.agents/skills/`.

## 5. Matriz tema del diplomado → MyAppGlass

| Tema | Qué hay hoy en el repo | Oportunidad de práctica | Estado |
|---|---|---|---|
| Feature-Sliced Design | `src/features/` (10 features), `src/widgets/`, `src/shared/`; sin `entities/` | Completar capa `entities/` o documentar la desviación | Parcial |
| Design system | Tema Chakra v3 en `src/shared/providers/theme/index.ts`; 18 wrappers en `src/components/ui/` | Documentar tokens y alinear con Figma | Existe, sin documentar |
| Figma / diseño de interfaces | Sin archivos de diseño en el repo | Wireframes del flujo `/presupuesto` o del panel `/admin` | Por hacer |
| Backend serverless | `functions/index.js`: `submitReclamo`, `submitContacto`, `checkStatus` (Functions v2, `maxInstances: 10`) | Diagramar y comparar con modular monolith / API-first | Implementado, congelado |
| Seguridad y validación | Zod (`src/shared/schemas/`, `functions/emailSender.js`), rate limit, captcha matemático y reCAPTCHA v3, sanitización | Revisión de seguridad asistida por IA | Implementado; doc 07/08 incompletos |
| Refactor y deuda técnica | Pantallas admin de 445 a 894 líneas | Módulo 4 | Pendiente |
| LLM vía API | Ninguno. El «Simulador AI» (`/simulador-ai`) es una simulación local: `setTimeout` y respuestas fijas por palabra clave, sin LLM | Integrar un LLM real para el asesor (módulo 7) | No existe |
| NL2SQL | Ninguno. El proyecto usa Firestore (NoSQL), no SQL | Adaptar: lenguaje natural → consultas validadas de Firestore (lista blanca de colecciones/filtros), o capa SQL aparte | Requiere adaptar enfoque |
| MCP | `.mcp.json` con servidores `next-devtools` y `chakra-ui` | Crear un servidor MCP propio (skill `mcp-builder`) sobre datos de inventario | Parcial |
| Multiagente | Roles en `docs/03_AGENTS.md`; skills en `.agents/skills/` | Formalizar agentes frontend/backend y orquestarlos | Mejor encaje natural |

## 6. Proyecto de portafolio propuesto

**«Asesor de cotización multiagente para MyAppGlass»**

- **Agente Frontend:** rediseña/extiende `src/screens/SimuladorAI/` para consumir un asesor real, respetando FSD y Chakra v3.
- **Agente Backend:** especifica un endpoint de asesoría (LLM vía API + consultas validadas de Firestore).
- **Orquestador:** secuencial (requerimiento → diseño → backend → frontend → validación), con memoria compartida en un documento de contrato de API.
- **Criterios de aceptación:**
  - [ ] `pnpm run typecheck && pnpm run build` sin errores.
  - [ ] El asesor responde con datos reales del catálogo, sin inventar productos.
  - [ ] Entradas validadas con Zod; la clave del LLM nunca llega al cliente.
  - [ ] Los agentes siguen `AGENTS.md` y producen commits semánticos.
  - [ ] Documentación breve de arquitectura y decisiones.
- **Riesgos:**
  - `functions/`, `firestore.rules` y `firebase.json` están congelados: **tocarlos requiere autorización explícita del dueño del proyecto**. Hasta entonces, prototipar el backend fuera de esas rutas o como propuesta documentada.
  - Costo y secretos del proveedor LLM.
  - Alucinaciones en datos técnicos del catálogo.
  - Sitio con `output: 'export'`: la lógica de servidor debe vivir en Functions, no en rutas de Next.

## 7. Registro de progreso

| Módulo | Fecha | Rama | Commit | Notas |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |
| 9 | | | | |
