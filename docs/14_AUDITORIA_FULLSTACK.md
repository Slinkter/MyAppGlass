# 14. Auditoría Full-Stack y Oportunidades de Mejora

**Fecha:** 2026-10-29
**Alcance:** frontend (Next.js 16, `src/`), backend (Firebase Functions v2, `functions/`), reglas Firestore, CI/CD (`.github/workflows/`), documentación (`docs/`).
**Método:** revisión de código y configuración, comandos de calidad ejecutados localmente y escaneo de secretos en archivos versionados.

---

## 1. Veredicto

El proyecto cumple la mayoría de los estándares full-stack básicos: TypeScript en modo estricto, lint y typecheck en CI, build estático reproducible, validación de entradas en backend, protección anti-bot y rate limiting, secretos fuera del repositorio y reglas de seguridad en Firestore.

Quedan brechas en **cobertura de pruebas del backend en CI**, **tamaño de algunos módulos de pantalla**, **dependencia entre la protección de rutas admin y las reglas de Firestore** y **dispersión de la documentación**.

Calificación general: **sólida, con deuda técnica acotada**.

---

## 2. Lo que cumple

| Área | Evidencia |
|---|---|
| TypeScript estricto | `tsconfig.json`: `"strict": true`. Solo 1 uso de `any` en `src/`. |
| Calidad en CI | `ci.yml` ejecuta `lint`, `typecheck`, `test:run` y `build` con `--frozen-lockfile`. |
| Lint local | `pnpm run lint` (ESLint sobre `src/`) pasa sin errores. |
| Secretos | Ningún `AIza…`, `re_…` ni clave privada versionada. `.env*` ignorados; solo `.env.example` está en git. Secretos del backend en Secret Manager (`RESEND_API_KEY`, `ADMIN_EMAIL`, `RECAPTCHA_SECRET_KEY`). |
| Validación de entrada | `functions/src/schemas/` (`contacto.js`, `reclamo.js`) con Zod. |
| Protección de endpoints | `functions/src/guards/`: `captcha.js` (reCAPTCHA v3), `antiBot.js`, `rateLimit.js` (agrupado por subred /64 para IPv6), `withGuards.js`. |
| Reglas de datos | `firestore.rules`: lectura de `users/{uid}` solo para dueño o admin; criterio de admin sin autoescalada por nombre de correo. |
| Logs | `pino` en frontend; eliminación de correos personales en `logger.warn` del backend (PII). |
| Pruebas | Suite Vitest en `tests/unit/` y `node:test` en `functions/test/`; colección Postman en `tests/postman/`. |
| Documentación | `AGENTS.md`, `docs/` numerada, `CHANGELOG`. |

---

## 3. Oportunidades de mejora

Ordenadas por prioridad (impacto × esfuerzo).

### Alta

1. **Las pruebas del backend no corren en CI.**
   `ci.yml` solo ejecuta `pnpm run test:run` (Vitest, raíz). La suite de `functions/` (`node --test test/*.test.js`, 141 tests según el CHANGELOG) y su lint (`functions/` tiene ESLint propio) no están en el pipeline.
   *Acción:* añadir un job `functions` con `pnpm install` dentro de `functions/` (o `npm ci`, porque hay `package-lock.json`), `npm test` y `npm run lint`.

2. **Las rutas admin dependen de un guard del cliente.**
   `AdminRouteGuard` solo protege la UI. La seguridad real debe estar en `firestore.rules` para `inventario`, `ventas`, `clientes` y `reportes`.
   *Acción:* revisar que cada colección que usan `/admin/*` tenga regla explícita con `isAdmin()`. Esta revisión no está hecha en esta auditoría; hay que verificarla.

### Media

3. **Módulos de pantalla muy grandes.**
   `src/screens/Admin/InventoryDashboardScreen.tsx` tiene 894 líneas; `SalesOrderScreen.tsx` 607; `ClientManagementScreen.tsx` 512; `ReportsScreen.tsx` 500; `SimuladorAIScreen.tsx` 470.
   *Acción:* extraer tablas, formularios y hooks de datos a `features/*` según la arquitectura FSD que ya documenta `AGENTS.md`.

4. **Frontera de contratos frontend ↔ backend sin tipos compartidos.**
   El frontend es TypeScript y `functions/` es JavaScript. Los esquemas Zod viven solo en el backend.
   *Acción:* exponer los esquemas de entrada en un paquete compartido o, como mínimo, generar tipos TS para los payloads de `submitContacto`, `submitReclamo` y `checkStatus`.

5. **Artefactos de build versionados de forma inconsistente.**
   `next-env.d.ts` aparece modificado tras cada `pnpm run build`.
   *Acción:* decidir si se versiona (y fijar la versión que genera Next) o se ignora.

6. **Documentación dispersa.**
   Hay `AGENTS.md`, `REFACTOR-PLAN.md`, `README.md`, 13 archivos en `docs/` (algunos con planes ya completados) y carpetas `.agents/`, `.gemini/`, `.claude/` con instrucciones.
   *Acción:* consolidar un índice único y marcar como históricos los planes cerrados.

### Baja

7. **Versiones inconsistentes de acciones en CI.** `deploy-preview.yml` usa `pnpm/action-setup@v3` y `ci.yml` usa `@v4`.
8. **Dependencias de `functions/` no instaladas en el entorno local.** Las pruebas fallan con `Cannot find module 'firebase-admin'` si no se ejecuta `npm ci` dentro de `functions/`. Es un problema de entorno, no de código, pero conviene documentarlo en `README.md`.
9. **Observabilidad pendiente.** El Plan de Trabajo (Fase 5) marca "Ingeniería de Datos, Resiliencia & Observabilidad" como pendiente.

---

## 4. Verificación realizada

| Comando | Resultado |
|---|---|
| `pnpm run lint` | Sin errores. |
| `pnpm run typecheck` | Sin errores. |
| `pnpm run build` | Exitoso (export estático). |
| `functions: node --test test/*.test.js` | Fallan por dependencias no instaladas en el entorno local (no por código). |
| Escaneo de secretos en archivos versionados | Sin hallazgos. |

---

## 5. Próximos pasos sugeridos

1. Job de CI para `functions/` (mejora 1).
2. Auditoría de `firestore.rules` contra las rutas `/admin/*` (mejora 2).
3. Plan de refactor de las pantallas de más de 400 líneas (mejora 3).
