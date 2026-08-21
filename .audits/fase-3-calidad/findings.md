# Fase 3 — Calidad, Testing y Accesibilidad · Findings

> **Agente:** C — QA Engineer  
> **Skills activas:** `react-doctor`, `webapp-testing`, `web-design-guidelines` (a11y)  
> **Estado:** ✅ Completa  
> **Rama:** `audit/gya-q3-2026`  
> **Inicio:** 2026-08-20 · **Cierre:** 2026-08-20  
> **Proyecto:** Glass & Aluminum Company S.A.C. — Portal GYA (Next.js 16 + Vitest + Zod)

---

## 📌 Alcance de la Auditoría

Evaluación profunda de la calidad estática y dinámica del código, integridad de contratos cliente/servidor, arquitectura de resiliencia ante errores, cobertura de pruebas unitarias/integración y cumplimiento de estándares de accesibilidad WCAG 2.1 AA.

**Herramientas y comandos ejecutados:**
```bash
pnpm lint        # ESLint flat config (eslint src/) -> 0 errores / 0 warnings en src/
pnpm typecheck   # TypeScript strict (tsc --noEmit -p tsconfig.build.json) -> 0 errores
pnpm test:run    # Vitest runner -> 18 suites pasadas / 154 tests pasados (100% pass rate)
```

---

## 📊 Contadores Globales

| Verificación | Errores | Warnings | Notas de Inspección |
|---|:---:|:---:|---|
| **ESLint (`pnpm lint`)** | `0` | `0` | En `src/`. El script excluye `tests/`, `functions/` y `scripts/`. Análisis global revela 314 avisos por reglas de entorno no configuradas fuera de `src/`. |
| **TypeScript (`pnpm typecheck`)** | `0` | `0` | Compilador estricto (`tsconfig.build.json`). Nota: `tests/**` está excluido de `include`. |
| **Vitest Tests (`pnpm test:run`)** | `0 failing` | `154 passing` | 18 archivos de test ejecutados en ~13.6s. Cobertura focalizada en servicios, sanitizadores y schemas. |
| **Zod Contracts Sync** | `2 divergencias` | `1 omisión` | Desconexión en formulario de Contacto (`fullName` vs `name`) y duplicación imperativa en hooks. |
| **Accesibilidad (a11y WCAG AA)** | `0 bloqueantes` | `7 observaciones` | Faltan `aria-label`/`DrawerTitle` en Drawer, labels en MathCaptcha y alt descriptivo en Footer. |

---

## 📊 Resumen Ejecutivo

- 🔴 **Hallazgos críticos:** 3 (Divergencia de contrato Zod en Contacto, Falta de Error Boundaries/404 nativos en App Router, Script reCAPTCHA con acceso crudo a `process.env`).
- 🟡 **Hallazgos medios:** 7 (Lint restringido a `src/`, Exclusión de `tests/**` en tsconfig, Validación imperativa duplicada en Reclamaciones, Falta de `@vitest/coverage-v8`, Bypasses de Pino Logger, A11y en `MathCaptchaField`, A11y en `MobileNav` Drawer).
- 🟢 **Hallazgos menores:** 5 (Textos en inglés en `ComponentErrorBoundary`, Inyección inline en `SkipLink`, `alt="Icono"` redundante en Footer, `aria-label` en Desktop Nav, Casts `as any` residuales en tests).

### Conclusiones Principales:
1. **Higiene estática sólida pero con alcance restringido:** El código en `src/` pasa limpiamente con 0 errores de ESLint y 0 errores de TypeScript (`strict: true`). Sin embargo, el script `pnpm lint` solo apunta a `src/`, dejando sin verificación los scripts de automatización y las pruebas unitarias.
2. **154 pruebas unitarias confiables pero con brechas en UI/Screens:** Se validan con éxito 18 suites que cubren la lógica de negocio matemática (HMAC tokens, captcha), sanitizadores XSS, servicios de catálogo y contratos base. No obstante, las pantallas públicas (`/blog`, `/servicios`, `/proyectos`, `/contacto`), los widgets globales (`Navbar`, `Footer`) y los flujos interactivos de formularios carecen de pruebas de integración con Testing Library o Playwright.
3. **Divergencia de contratos Zod (Frontend vs Backend):** Se detectó que `contactFormSchema` (`src/shared/schemas/contact-schema.ts`) define `fullName` y `serviceSlug`, mientras que la Cloud Function (`functions/emailSender.js`) espera `name` y no valida `serviceSlug`. Además, `useContactForm` y `useReclamationForm` implementan validación imperativa manual (`switch/case`), sin consumir directamente `schema.safeParse()`.
4. **Resiliencia ante errores incompleta en App Router:** Existe un componente de clase `ComponentErrorBoundary` envolviendo las páginas, pero el proyecto carece de los archivos nativos de Next.js App Router: `src/app/error.tsx`, `src/app/global-error.tsx` y `src/app/not-found.tsx`. Cuando una ruta invoca `notFound()`, Next.js cae en la página de error genérica sin estilos en vez de renderizar `src/screens/error/ui/ErrorView.tsx`.
5. **Accesibilidad con bases fuertes y oportunidades puntuales:** Se implementó `SkipLink` para saltar al contenido principal, selector de tema con `next-themes` y navegación por teclado en menús. Se identifican mejoras necesarias en el etiquetado ARIA de `MathCaptchaField`, título accesible en `MobileNav` Drawer, y atributos `alt` decorativos en el Footer.

---

## ♿ Accesibilidad (WCAG 2.1 AA / ARIA / axe-core)

| Ruta / Componente | Criterio WCAG | Estado | Hallazgo / Diagnóstico |
|---|---|:---:|---|
| **`/` (Inicio)** | 2.4.1 Bypass Blocks | 🟡 | `SkipLink` operativo conectando a `#main-content`, pero inyecta tag `<style>` en el render del componente en vez de CSS global. |
| **`AuraDesktopNav`** | 1.3.1 Info & Relationships | 🟢 | El elemento `<Box as="nav">` no posee `aria-label="Navegación principal"`, necesario al convivir con enlaces de navegación en el Footer. |
| **`MobileNav` (Drawer)** | 4.1.2 Name, Role, Value | 🟡 | `DrawerContent` no incluye `DrawerTitle` ni `aria-label`, lo que genera alertas de accesibilidad en lectores de pantalla sobre diálogos sin nombre accesible. |
| **`MathCaptchaField`** | 1.3.1 & 3.3.2 Labels | 🟡 | El `<input>` numérico no tiene un `<label>` vinculado ni `aria-label` que exponga la pregunta matemática al lector de pantalla. El mensaje de error carece de `role="alert"` / `aria-live`. |
| **`/contacto` (Formulario)** | 3.3.1 Error Identification | 🟢 | Campos de texto usan Chakra `Field` con `invalid` y `errorText`. Foco visual visible en modo claro y oscuro. |
| **`/libro-de-reclamacion`** | 1.3.1 Info & Relationships | 🟢 | Estructura en 4 secciones numeradas semánticamente (`Heading as="h3"`). Checkboxes accesibles. |
| **`Footer`** | 1.1.1 Non-text Content | 🟢 | Iconos SVG renderizan `<Image alt="Icono">` redundante en lugar de `alt=""` decorativo junto al texto del canal de contacto. |
| **`FloatingWhatsApp`** | 4.1.2 Name, Role, Value | 🟢 | Botón flotante accesible con `aria-label="Abrir chat de WhatsApp"`, diálogo con `DialogTitle` explícito y botón de cierre accesible. |

---

## 🧪 Cobertura por Feature e Inventario de Tests

### Resumen de Suites Ejecutadas (18 suites / 154 tests)

```
✓ tests/unit/math-captcha.test.ts (14 tests)
✓ tests/unit/useGallery.test.ts (9 tests)
✓ tests/unit/contact-schema.test.ts (10 tests)
✓ tests/unit/reclamoService.test.ts (6 tests)
✓ tests/unit/reclamation-form.test.ts (35 tests)
✓ tests/unit/serviceService.test.ts (9 tests)
✓ tests/unit/services-integrity.test.ts (10 tests)
✓ tests/unit/backend-math-validator.test.ts (6 tests)
✓ tests/unit/seo-utils.test.ts (4 tests)
✓ tests/unit/sanitizer.test.ts (7 tests)
✓ tests/unit/projectService.test.ts (7 tests)
✓ tests/unit/company-data.test.ts (7 tests)
✓ tests/unit/tracking-schema.test.ts (7 tests)
✓ tests/unit/reclamation-schema.test.ts (4 tests)
✓ tests/unit/useIsMobile.test.ts (2 tests)
✓ tests/unit/useFilterableList.test.ts (7 tests)
✓ tests/unit/copy-button.test.tsx (4 tests)
✓ tests/unit/MathCaptchaField.test.tsx (6 tests)
```

### Matriz de Cobertura por Capa FSD y Feature

| Feature / Módulo | Tests Unitarios | Tests Integración | Cobertura Est. | Hueco Crítico / Oportunidad |
|---|:---:|:---:|:---:|---|
| **`shared/utils & math`** | 34 tests | — | `95%` | Cobertura completa de HMAC SHA-256, rotación de retos y saneamiento. |
| **`shared/services & data`** | 33 tests | — | `90%` | Integridad de catálogo de productos, rutas de imágenes y SEO utils validados. |
| **`features/reclamation-book`** | 45 tests | — | `75%` | Gran cobertura de schema y sanitizadores. Falta test de integración de `ReclamationForm.tsx`. |
| **`features/contacto`** | 10 tests | — | `35%` | Solo se prueba el schema estático. Falta testear `useContactForm` y envío real/mock de API. |
| **`features/projects`** | 7 tests | — | `40%` | Solo se prueba `projectService`. Faltan tests para `VisualViewer` y modal de mapas. |
| **`features/services`** | 19 tests | — | `60%` | Servicios e integridad probados. Falta test de renderizado de detalle y filtros de catálogo. |
| **`features/blog`** | 0 tests | — | `0%` | **Sin pruebas.** No se prueba la carga de artículos, slugs ni paginación. |
| **`features/home`** | 0 tests | — | `0%` | **Sin pruebas.** Hero, estadísticas, mapas interactivos sin tests. |
| **`widgets/**` (Nav/Footer)** | 0 tests | — | `0%` | **Sin pruebas.** Comportamiento del Drawer móvil y tema no testeados. |
| **`screens/**` & `app/**`** | 0 tests | — | `0%` | **Sin pruebas.** No existen smoke tests de rutas ni de Error Boundaries. |

---

## 🛡️ Validación Zod (Contratos Frontend vs Backend)

| Schema | Ubicación Cliente | Ubicación Servidor | Sincronización | Mensajes de Error | Sanitización XSS |
|---|---|---|:---:|:---:|:---:|
| **Contacto** | `src/shared/schemas/contact-schema.ts` | `functions/emailSender.js:25` | 🔴 **Divergente** (`fullName` vs `name`, `serviceSlug` omitido en backend) | En español, amigables | Regex estricta + stripHtml |
| **Reclamaciones** | `src/shared/schemas/reclamation-schema.ts` | `functions/emailSender.js:9` | 🟡 **Parcial** (Backend usa regex adicional `[^<>{}()]+`) | En español, amigables | Sanitizer específico + Zod |
| **Seguimiento** | `src/shared/schemas/tracking-schema.ts` | `functions/index.js:164` | ✅ **Sincronizado** (Valida `id` string min 5 chars) | En español | Validación de tipo y existencia |
| **Variables Entorno** | `src/shared/config/env.ts` | `functions/index.js` (Secrets) | ✅ **Validado** (Zod valida URLs y keys requeridas) | Mensajes descriptivos en startup | — |

---

## 🔴 Hallazgos Críticos

### 🔴 C-CRIT-01: Divergencia y desconexión entre `contactFormSchema` Zod y el hook `useContactForm` / Cloud Function
- **Ubicación:**
  - `src/shared/schemas/contact-schema.ts:6-32`
  - `src/features/contacto/hooks/useContactForm.ts:57-76`
  - `functions/emailSender.js:25-30`
- **Descripción:** El contrato Zod `contactFormSchema` declara los campos `{ fullName, email, phone, serviceSlug, message }`. Sin embargo:
  1. `useContactForm.ts` valida el formulario con un `switch` manual con nombres diferentes (`name` en vez de `fullName`) e ignora `serviceSlug`.
  2. `functions/emailSender.js` define `contactSchema` esperando `{ name, email, phone, message }`.
  3. `contactFormSchema` queda como código huérfano sin uso en la UI real, rompiendo el principio de _Single Source of Truth_.
- **Impacto:** Si un desarrollador actualiza las reglas en `contact-schema.ts`, la interfaz de usuario no aplica los cambios y el backend podría rechazar solicitudes válidas o permitir datos inválidos.
- **Esfuerzo:** `Bajo` (~2 horas).

### 🔴 C-CRIT-02: Ausencia de Error Boundaries y Handlers de Ruta nativos en Next.js App Router
- **Ubicación:**
  - `src/app/error.tsx` (Faltante)
  - `src/app/global-error.tsx` (Faltante)
  - `src/app/not-found.tsx` (Faltante)
  - `src/screens/error/ui/ErrorView.tsx:8-39`
  - `src/app/blog/[slug]/page.tsx:57`
- **Descripción:** La aplicación cuenta con un componente `ErrorView` de excelente factura visual, pero no está conectado a los hooks de Next.js App Router (`not-found.tsx` ni `error.tsx`). Cuando una ruta dinámica llama a `notFound()`, Next.js presenta una pantalla 404 minimalista en blanco y negro sin el diseño de la marca GYA ni navegación de retorno.
- **Impacto:** Experiencia de usuario rota ante enlaces rotos o errores en Server Components en producción, con pérdida de branding y navegación.
- **Esfuerzo:** `Bajo` (~1 hora).

### 🔴 C-CRIT-03: Referencia directa no controlada a `process.env` de reCAPTCHA en el RootLayout
- **Ubicación:**
  - `src/app/layout.tsx:94-97`
  - `src/shared/config/env.ts:9`
- **Descripción:** En `layout.tsx`, el script de Google reCAPTCHA se inyecta directamente usando:
  `<script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} async defer />`
  No se utiliza el objeto validado `env` importado de `@/shared/config/env`. Si la variable no estuviera configurada en algún entorno de preview o staging, la URL generada termina en `?render=undefined`, generando un error 400 en la consola del navegador del cliente y bloqueando la carga de scripts.
- **Impacto:** Fallo silencioso de scripts en entornos no configurados y bypass de la capa central de validación de entorno.
- **Esfuerzo:** `Muy bajo` (~15 min).

---

## 🟡 Hallazgos Medios

### 🟡 C-MED-01: Script de `pnpm lint` restringido únicamente a `src/` y regla `jsx-no-target-blank: "off"`
- **Ubicación:**
  - `package.json:10`
  - `eslint.config.js:11, 45, 84`
- **Descripción:** 
  1. `"lint": "eslint src/"` no audita `tests/`, `functions/` ni `scripts/`. Cuando se ejecuta `eslint .`, saltan errores de `no-undef` (falta de globals de Node en scripts) y `any` en tests.
  2. En `eslint.config.js:45`, se desactivó `"react/jsx-no-target-blank": "off"`. Esto permite enlaces con `target="_blank"` sin `rel="noopener noreferrer"`, lo cual introduce riesgos de seguridad (`window.opener` hijacking) y problemas de rendimiento en navegadores antiguos.
  3. `eslint.config.js:84` referencia `vite.config.ts` (inexistente) en lugar de `vitest.config.ts`.
- **Impacto:** Deuda técnica silenciosa en carpetas periféricas y potencial vulnerabilidad en links externos de Footer/Nav.
- **Esfuerzo:** `Bajo` (~1 hora).

### 🟡 C-MED-02: Exclusión de la suite `tests/**` en la configuración principal de TypeScript
- **Ubicación:**
  - `tsconfig.json:45-53`
  - `tsconfig.build.json:1-24`
- **Descripción:** `tsconfig.json` incluye solo `src/**/*.ts`, `src/**/*.tsx` y `.next/types/**/*.ts`. La carpeta `tests/**` no forma parte de la compilación de `pnpm typecheck`, lo que permite que errores de tipos en pruebas pasen desapercibidos hasta la ejecución de Vitest.
- **Impacto:** Riesgo de divergencia de tipado en mocks y aserciones de prueba respecto al código fuente.
- **Esfuerzo:** `Muy bajo` (~30 min).

### 🟡 C-MED-03: Duplicación de lógica de validación en `useReclamationForm` en lugar de usar `reclamationFormSchema`
- **Ubicación:**
  - `src/features/reclamation-book/hooks/useReclamationForm.ts:45-97`
  - `src/shared/schemas/reclamation-schema.ts:13-71`
- **Descripción:** `useReclamationForm.ts` define una función `validateForm(formData)` con 50 líneas de validaciones manuales `if (!sanitizeSingleLine(...))` en lugar de ejecutar `reclamationFormSchema.safeParse(formData)`.
- **Impacto:** Duplicación de código, mensajes de error inconsistentes y desincronización si cambian las reglas normativas en el schema Zod.
- **Esfuerzo:** `Bajo` (~2 horas).

### 🟡 C-MED-04: Ausencia del paquete `@vitest/coverage-v8` para auditoría automatizada de cobertura
- **Ubicación:**
  - `package.json:53`
  - `vitest.config.ts:7-12`
- **Descripción:** Al ejecutar `npx vitest run --coverage`, el comando falla con error `Cannot find dependency '@vitest/coverage-v8'`. No existe un reporte automatizado de líneas, ramas y funciones en el pipeline.
- **Impacto:** Imposibilidad de medir regresiones de cobertura de código de manera cuantitativa y automatizada en CI.
- **Esfuerzo:** `Muy bajo` (~15 min; requiere aprobación humana para instalar devDependency).

### 🟡 C-MED-05: Uso extendido de `console.error` y `console.warn` en lugar del logger centralizado Pino
- **Ubicación:**
  - `src/features/contacto/actions.ts:28, 34, 66, 94`
  - `src/features/reclamation-book/actions.ts:27, 51`
  - `src/features/contacto/hooks/useContactForm.ts:187`
  - `src/features/reclamation-book/hooks/useReclamationForm.ts:210, 242`
  - `src/shared/api/reclamoService.ts:80`
- **Descripción:** El proyecto implementó un módulo de alto rendimiento `src/shared/utils/logger.ts` basado en Pino con estructuración JSON y niveles por entorno. No obstante, múltiples acciones y hooks del cliente siguen utilizando `console.error()` y `console.warn()` directamente.
- **Impacto:** Pérdida de contexto estructurado (stack trace, timestamp, URL) en herramientas de observabilidad y alertas de consola visibles para usuarios en producción.
- **Esfuerzo:** `Bajo` (~1 hora).

### 🟡 C-MED-06: `MathCaptchaField` carece de etiqueta accesible e indicador de estado de error ARIA
- **Ubicación:**
  - `src/shared/components/MathCaptchaField.tsx:94-127`
- **Descripción:** El `<Input>` de respuesta no cuenta con un `<label>` formal ni `aria-label` que anuncie la operación matemática calculada al lector de pantalla. Además, el mensaje de error visual (`<AlertCircle />`) no tiene `role="alert"` ni vínculo `aria-describedby` con el input.
- **Impacto:** Los usuarios con discapacidad visual o lectores de pantalla escuchan únicamente "Tu respuesta, campo de edición" sin saber qué operación deben resolver ni por qué falló la validación.
- **Esfuerzo:** `Bajo` (~45 min).

### 🟡 C-MED-07: Diálogo móvil `MobileNav` Drawer no declara `DrawerTitle` ni etiqueta accesible
- **Ubicación:**
  - `src/widgets/Navbar/MobileNav.tsx:104-118`
- **Descripción:** En Chakra UI v3, los componentes `DrawerContent` / Dialog requieren un `DrawerTitle` o `aria-label` para proveer un título accesible al árbol de accesibilidad. En `MobileNav.tsx`, el drawer omite este elemento.
- **Impacto:** Advertencia en auditorías de accesibilidad axe-core / Lighthouse a11y (WCAG 4.1.2) por modal sin nombre accesible.
- **Esfuerzo:** `Muy bajo` (~20 min).

---

## 🟢 Hallazgos Menores

### 🟢 C-MIN-01: Textos en inglés y hard-reload en `ComponentErrorBoundary`
- **Ubicación:** `src/shared/components/ComponentErrorBoundary.tsx:53, 78-81`
- **Descripción:** El fallback de error muestra "Oops! Component Crash" y un botón "Reload Page" que invoca `window.location.reload()`. Para una aplicación orientada a clientes en Perú, los textos deben estar localizados en español formal ("Ha ocurrido un error inesperado", "Reintentar").
- **Esfuerzo:** `Muy bajo` (~15 min).

### 🟢 C-MIN-02: `SkipLink` inyecta etiqueta `<style>` en tiempo de render en lugar de CSS global
- **Ubicación:** `src/shared/components/navigation/SkipLink.tsx:1-36`
- **Descripción:** `SkipLink.tsx` crea un bloque `<style>{skipStyles}</style>` en el DOM de React. Aunque funcional, la práctica recomendada en Next.js es ubicar la clase `.skip-link` en `src/styles/global.css`.
- **Esfuerzo:** `Muy bajo` (~10 min).

### 🟢 C-MIN-03: `FooterRow` utiliza texto alternativo genérico `alt="Icono"` en iconos decorativos
- **Ubicación:** `src/widgets/Footer/Footer.tsx:80`
- **Descripción:** Al renderizar imágenes estáticas como iconos, se usa `alt="Icono"`. Como el texto descriptivo está inmediatamente al lado ("974 278 303"), el `alt` debe ser `alt=""` con `aria-hidden="true"` para evitar redundancia en lectores de pantalla.
- **Esfuerzo:** `Muy bajo` (~10 min).

### 🟢 C-MIN-04: `AuraDesktopNav` carece de `aria-label` descriptivo en la etiqueta `<nav>`
- **Ubicación:** `src/widgets/Navbar/AuraDesktopNav.tsx:67`
- **Descripción:** El elemento `<Box as="nav">` no incluye `aria-label="Navegación principal"`.
- **Esfuerzo:** `Muy bajo` (~5 min).

### 🟢 C-MIN-05: Casts `as any` residuales en tests y wrapper de botón
- **Ubicación:**
  - `src/components/ui/button.tsx:25`
  - `tests/unit/useFilterableList.test.ts:17, 110`
  - `tests/unit/useGallery.test.ts:147`
- **Descripción:** Se encontraron 4 usos residuales de `any` en código de prueba y un cast en `button.tsx` para compatibilidad de props con Chakra Button.
- **Esfuerzo:** `Bajo` (~30 min).

---

## 🚀 Quick Wins (≤ 1 día)

1. **Crear `src/app/not-found.tsx` y `src/app/error.tsx`:** Conectar el componente existente `ErrorView.tsx` a las rutas de error nativas de Next.js App Router (Corrige `C-CRIT-02`).
2. **Sincronizar `contactFormSchema` con `useContactForm`:** Unificar los nombres de campos a `fullName`, `email`, `phone`, `serviceSlug`, `message` y hacer que el hook valide vía `contactFormSchema.safeParse()` (Corrige `C-CRIT-01`).
3. **Corregir reCAPTCHA script en `src/app/layout.tsx`:** Importar `env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY` validado en lugar de acceder a `process.env` crudo (Corrige `C-CRIT-03`).
4. **Mejorar A11y en `MathCaptchaField` y `MobileNav`:** Añadir `aria-label={challenge?.question}` al input, `role="alert"` en errores y `aria-label="Menú principal"` en el drawer (Corrige `C-MED-06` y `C-MED-07`).
5. **Traducir `ComponentErrorBoundary` al español:** Modificar los textos a español neutro y ofrecer reintento de render (Corrige `C-MIN-01`).

---

## 🏗️ Mejoras de Largo Plazo (> 1 sprint)

1. **Instalar `@vitest/coverage-v8` e integrar umbrales de cobertura en CI/CD:** Configurar umbrales mínimos (`lines: 80%`, `branches: 75%`) en GitHub Actions para prevenir regresiones.
2. **Suite de pruebas de integración con Playwright / Testing Library:** Implementar pruebas E2E que simulen el flujo completo de envío de formularios (llenado de campos, resolución de captcha matemático, feedback de éxito y confirmación en modal).
3. **Generación automática de tipos compartidos (Monorepo o paquete compartido `@gya/contracts`):** Extraer los schemas Zod a un paquete compartido para que tanto el frontend Next.js como las Cloud Functions de Firebase consuman exactamente el mismo paquete TypeScript/Zod sin duplicación manual.

---

## 📋 Propuestas de Corrección (PATCH Blocks)

### PATCH 1: Creación de `src/app/not-found.tsx` y `src/app/error.tsx` (Solución C-CRIT-02)

```tsx
// src/app/not-found.tsx
import { ErrorView } from "@/screens/error";

export default function NotFound() {
  return <ErrorView />;
}
```

```tsx
// src/app/error.tsx
"use client";

import React, { useEffect } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Home } from "lucide-react";
import RouterLink from "next/link";
import { logger } from "@/shared/utils/logger";

export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Unhandled Route Error in App Router", error, { digest: error.digest });
  }, [error]);

  return (
    <Box minH="70vh" display="flex" alignItems="center" justifyContent="center" bg="bg.page" px={6}>
      <VStack gap={6} textAlign="center" maxW="lg">
        <Heading size="3xl" color="red.500">Error Inesperado</Heading>
        <Text color="text.muted" fontSize="md">
          Ha ocurrido un inconveniente al cargar esta sección. Puedes reintentar la operación o volver al inicio.
        </Text>
        <VStack gap={3} w="full" sm={{ flexDirection: "row", justifyContent: "center" }}>
          <Button variant="aura" size="md" onClick={() => reset()} gap={2}>
            <RotateCcw size={16} /> Reintentar
          </Button>
          <Button as={RouterLink} href="/" variant="outline" size="md" gap={2}>
            <Home size={16} /> Volver al Inicio
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
```

---

### PATCH 2: Corrección de reCAPTCHA en `src/app/layout.tsx` (Solución C-CRIT-03)

```diff
--- a/src/app/layout.tsx
+++ b/src/app/layout.tsx
@@ -10,6 +10,7 @@ import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary"
 import { FloatingWhatsAppWrapper as FloatingWhatsApp } from "@/widgets/FloatingActions";
 import SkipLink from "@/shared/components/navigation/SkipLink";
 import { getCompanyJsonLd } from "@/shared/utils/seo-utils";
+import { env } from "@/shared/config/env";
 
 const lora = Lora({
@@ -91,10 +92,12 @@ export default function RootLayout({
                     type="application/ld+json"
                     dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                 />
-                <script
-                    src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
-                    async
-                    defer
-                />
+                {env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
+                    <script
+                        src={`https://www.google.com/recaptcha/api.js?render=${env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
+                        async
+                        defer
+                    />
+                )}
             </head>
```

---

### PATCH 3: Accesibilidad mejorada en `MathCaptchaField.tsx` (Solución C-MED-06)

```diff
--- a/src/shared/components/MathCaptchaField.tsx
+++ b/src/shared/components/MathCaptchaField.tsx
@@ -95,6 +95,8 @@ export const MathCaptchaField: React.FC<MathCaptchaFieldProps> = ({
             id={id}
             name="mathCaptchaAnswer"
             type="text"
             inputMode="numeric"
+            aria-label={challenge ? `Pregunta de seguridad: ${challenge.question}` : "Respuesta al reto matemático"}
+            aria-invalid={!!error}
+            aria-describedby={error ? `${id}-error` : undefined}
             placeholder="Tu respuesta"
@@ -123,7 +125,7 @@ export const MathCaptchaField: React.FC<MathCaptchaFieldProps> = ({
         {error && (
-          <HStack gap="1.5" color="red.500" fontSize="xs" fontWeight="600" pt="0.5">
+          <HStack id={`${id}-error`} role="alert" aria-live="polite" gap="1.5" color="red.500" fontSize="xs" fontWeight="600" pt="0.5">
             <AlertCircle size={14} />
             <Text>{error}</Text>
           </HStack>
```

---

## 🔄 Log de Actividad del Agente C

| Timestamp | Acción | Detalle |
|---|---|---|
| `2026-08-20 21:50` | Inicio de Fase 3 | Configuración de entorno y lectura de especificaciones FSD y reglas QA. |
| `2026-08-20 21:51` | Auditoría de scripts | Ejecución de `pnpm lint` (0 err), `pnpm typecheck` (0 err), y `pnpm test:run` (154 tests passing en 18 suites). |
| `2026-08-20 21:52` | Análisis ESLint & TS | Detección de alcance restringido en `pnpm lint` (`src/` únicamente) y exclusión de `tests/**` en `tsconfig.json`. |
| `2026-08-20 21:53` | Análisis de Contratos Zod | Comparación exhaustiva de schemas frontend (`contact-schema`, `reclamation-schema`, `tracking-schema`) vs funciones backend (`emailSender.js`, `index.js`). Detección de divergencia en formulario de Contacto. |
| `2026-08-20 21:54` | Auditoría A11y & WCAG | Inspección de atributos ARIA, navegación por teclado, focus states y jerarquía en `Navbar`, `Footer`, `MathCaptchaField` y formularios. |
| `2026-08-20 21:55` | Auditoría de Resiliencia | Verificación de Error Boundaries (`ComponentErrorBoundary`, falta de `error.tsx` / `not-found.tsx` en `src/app`). |
| `2026-08-20 21:56` | Consolidación y Entrega | Redacción del reporte exhaustivo `.audits/fase-3-calidad/findings.md` con matriz de cobertura y patches. |