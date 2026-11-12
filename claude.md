# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Glass & Aluminum Company S.A.C. – Web

Vidriería de La Molina (Lima). Compra vidrio, aluminio y accesorios a proveedores, ensambla en su taller e instala. La web capta hogares; las constructoras llegan por recomendación y la web respalda esa recomendación.

Los comandos base, las reglas de negocio y las convenciones viven en `AGENTS.md`, que se importa aquí para no duplicarlo:

@AGENTS.md

## Dónde mirar

- `docs/marca/MANUAL-DE-MARCA.md`: manual de marca, origen del diseño.
- `apps/web/PRODUCT.md` y `apps/web/DESIGN.md`: usuarios, restricciones y sistema de diseño (se valida en `/design-system`).
- `docs/01_ARCHITECTURE.md`: detalle de capas y módulos.
- `docs/gya/catalogo/` y `docs/gya/data/`: catálogo, proveedores y presupuestos reales.
- `docs/PENDIENTES.md` (trabajo abierto) y `docs/05_CHANGELOG.md` (lo terminado).
- `docs/claude/`: especificaciones, planes y notas de trabajo con Claude.
- `docs/api/`: contrato OpenAPI entre la web y las functions.

## Comandos que AGENTS.md no cubre

Todo se ejecuta desde la raíz con `pnpm`. Las pruebas solo se corren cuando el dueño las pide (ver AGENTS.md §1); la validación habitual es `pnpm run typecheck && pnpm run lint && pnpm run build`.

```bash
# Una sola prueba unitaria (Vitest, jsdom). Las pruebas están en apps/web/tests/unit/
pnpm --filter @gya/web exec vitest run tests/unit/window-rules.test.ts
pnpm --filter @gya/web exec vitest run -t "nombre del caso"

# E2E (Playwright) contra el export estático: requiere `pnpm run build` antes
pnpm --filter @gya/web test:e2e

# Una sola prueba de functions (node:test)
cd apps/functions && node --test test/<archivo>.test.js

# Emuladores de Firebase para desarrollo local (dos terminales)
firebase emulators:start --only auth,firestore,storage --project gya-app-4c8a9
NEXT_PUBLIC_USE_EMULATORS=true pnpm run dev

# Regenerar docs/api/openapi.json desde los schemas Zod de las functions
pnpm run contract:generate
```

- CI (`.github/workflows/ci.yml`) corre lint, `test:run`, `test:functions` y build en cada push o PR a `main`. El deploy a producción es manual (`workflow_dispatch` o `pnpm run deploy:hosting`).
- Las reglas de Firestore tienen sus pruebas en `tests/rules/`.

## Arquitectura: lo que no se ve en un solo archivo

- **Capas reales:** `app > screens > widgets > features > entities > shared`. La capa `entities` (`client`, `order`, `product`, `project`, `quote`, `service`, `store`, `window`) existe aunque AGENTS.md §2 no la dibuje: ahí va la lógica de dominio que comparten varias features.
- **Una feature no puede importar otra feature**, y una pantalla no puede importar otra pantalla. Lo compartido baja a `entities` o `shared`. ESLint solo detecta imports por alias (`@/features/...`), así que no uses rutas relativas para cruzar capas.
- **`src/app` es solo enrutado:** cada `page.tsx` renderiza una pantalla de `src/screens`. La lógica nunca va en `app`.
- **Export estático (`output: 'export'`, build con `--webpack`):** no hay servidor. Sin route handlers, server actions ni SSR; las imágenes pasan por un loader propio (`shared/utils/imageLoader.ts`). Las rutas dinámicas (`/servicios/[serviceSlug]`, `/proyectos/[projectId]`, `/vidrieria/[distrito]`, `/blog/[slug]`) salen de `generateStaticParams`; `/servicios/ver?slug=` y `/proyectos/ver?id=` cubren lo publicado después del build.
- **Datos:** servicios, proyectos, tienda y pedidos se leen y escriben en Firestore desde el cliente (`shared/api`); `/admin` es un CRUD protegido con `AdminRouteGuard`. Las functions (`apps/functions`) solo atienden reclamos, contacto y consulta de estado, con correo por Resend.
- **Cotizador (`/presupuesto`):** el motor está en `entities/quote` (`lib/windowRules.ts`, `lib/quoteCalculator.ts`, precios en `config/pricing.ts`); la feature `presupuesto` solo aporta formulario y servicio. Las reglas se cubren en `tests/unit/window-rules.test.ts` y `quote-calculator.test.ts`.
- **Paquetes:** `@gya/shared` (datos de empresa y schemas del contrato) lo consumen web y functions; `@gya/eslint-config` es la base de lint.

## Cómo trabajar

- Para tareas grandes, propón un plan corto antes de tocar código. Specs, planes y tareas en `.md` están bien cuando el dueño los pide o ayudan; usa `docs/claude/`.
- Diseño: manual de marca → componentes en `/design-system` → páginas. Antes de cambiar el diseño de páginas públicas, merge a `main` o deploy, confirma con el dueño.
- Un componente nuevo debe respetar el design system y ser mobile-first.
- Los textos deben sonar naturales y propios del rubro (vidrio y aluminio), no robóticos.

## Reglas de negocio y código

- Si falta un dato (precio, plazo, garantía, medida, serie), deja un marcador visible y pregunta; no lo inventes.
- Prioridad de datos: proveedores > datos locales > suposiciones.
- Datos de la empresa solo desde `companyData` (`@/shared/config/company-data`).
- El cliente no ve a los proveedores ni sus fotos o planos; de ellos solo se usan textos y datos técnicos.
- La empresa no fabrica perfiles ni vidrio: ensambla e instala.
- En componentes usa los tokens del tema (`apps/web/src/shared/providers/theme/index.ts`) en vez de hex, `rgba`, degradados, emojis o `100vh`.
