# AGENTS.md — MyAppGlass (Glass & Aluminum Company S.A.C.)

> Contexto obligatorio para agentes. Recoge lo que no se deduce leyendo un archivo suelto: orden
> real de los gates, fronteras FSD, trampas del export estático y reglas de negocio del dueño.

---

## 1. Comandos (siempre desde la raíz, siempre `pnpm`)

Monorepo pnpm (`apps/*`, `packages/*`). No usar npm/yarn en la raíz.

| Comando                     | Acción                                                                        |
| --------------------------- | ----------------------------------------------------------------------------- |
| `pnpm run dev`              | Next.js en `0.0.0.0:3000` (`@gya/web`)                                        |
| `pnpm run build`            | Export estático → `apps/web/out/` (`next build --webpack`)                     |
| `pnpm run typecheck`        | `pnpm -r --if-present` (web: `tsc --noEmit -p tsconfig.build.json`)            |
| `pnpm run lint`             | ESLint **solo de `apps/web/src/`**                                            |
| `pnpm run test` / `test:run`| Vitest watch / una pasada (jsdom, specs en `apps/web/tests`)                   |
| `pnpm run test:functions`   | `node --test` de `apps/functions/test`                                         |
| `pnpm run contract:generate`| Regenera `docs/api/openapi.json` desde los schemas Zod de functions            |
| `pnpm run deploy:hosting`   | `build` + `firebase deploy --only hosting`                                     |
| `pnpm run deploy:functions` | `firebase deploy --only functions`                                             |

**Gotchas que cuestan tiempo:**

- **En un clon limpio, `build` va antes de `typecheck`.** `next-env.d.ts` está en `.gitignore` pero
  figura en el `include` de `tsconfig.json`; sin él `tsc` falla con los tipos de `*.svg`. CI hace
  exactamente `build` → `typecheck` por esto.
- **`pnpm run lint` no cubre `apps/functions`.** Ahí el lint es ESLint 8 con `eslint-config-google`
  y `ESLINT_USE_FLAT_CONFIG=false`; no hay script raíz que lo ejecute.
- **No correr `test:run` salvo que el usuario lo pida.** La validación habitual es
  `typecheck && lint && build` (ahorra tokens; CI ya corre los tests).
- **E2E:** requiere `pnpm run build` previo; Playwright sirve `apps/web/out` en el puerto **3100**.
  Tres specs (`cotizador-simulacion`, `generate-4sashes-pdf`, `generate-carolina-pdf`) escriben PDFs
  y capturas en `docs/presupuestos_generados/`.
- **Contrato:** `apps/functions/test/openapi.test.js` falla si `docs/api/openapi.json` no coincide con
  los schemas. Si tocas un schema, corre `pnpm run contract:generate` y actualiza
  `packages/shared/src/schemas/`.
- **Reglas Firestore:** `node tests/rules/firestore.rules.test.mjs` necesita el emulador en `:8081`.
- **Emuladores:** `firebase emulators:start --only auth,firestore,storage --project gya-app-4c8a9`
  y, en otra terminal, `NEXT_PUBLIC_USE_EMULATORS=true pnpm run dev`.

**Orden antes de commit / deploy:**

```bash
pnpm run typecheck && pnpm run lint && pnpm run build
git commit -m "feat(modulo): descripción clara"
pnpm run deploy:hosting   # solo si el usuario lo pide
```

**Prueba individual** (no correr toda la suite):

```bash
pnpm --filter @gya/web exec vitest run tests/unit/window-rules.test.ts
pnpm --filter @gya/web exec vitest run -t "nombre del caso"
pnpm --filter @gya/web exec playwright test tests/e2e/navegacion.spec.ts
cd apps/functions && node --test test/<archivo>.test.js
```

---

## 2. Arquitectura

```
apps/web/          @gya/web — Next.js 16, export estático
  src/   app > screens > widgets > features > entities > shared
apps/functions/    @gya/functions — Firebase Functions v2, Node.js 22 (CommonJS)
packages/shared/   @gya/shared — companyData, SITE_URL, schemas del contrato
packages/eslint-config/  @gya/eslint-config — base del lint
```

- **`src/app` es solo enrutado:** cada `page.tsx` renderiza una pantalla de `src/screens`. La lógica
  nunca va en `app`.
- **`entities/` existe** (la capa que más se olvida): `client`, `order`, `product`, `project`, `quote`,
  `service`, `store`, `supplier`, `system`, `window`. Ahí va el dominio compartido entre features.
- **`src/app` incluye rutas de laboratorio** (`/design-system`, `/design-system-2`, `/navbarmobil-1…4`);
  `/design-system` es donde se valida el design system. No borres ese directorio sin pedido.

**Archivos que explican el sistema:**

- `apps/web/src/features/services/components/ServicePageLayout.tsx` — layout maestro de página de servicio.
- `apps/web/src/shared/utils/seo-utils.ts` — Metadata (`buildPageMetadata`) y JSON-LD (`getCompanyJsonLd`,
  `Service`, `BreadcrumbList`, `FAQPage`, `serializeJsonLd`).
- `apps/web/src/app/sitemap.ts` y `robots.ts` — sitemap con image sitemap (escapa entidades XML de
  Firebase Storage) y reglas para Googlebot + bots de IA.
- `apps/web/src/shared/providers/theme/index.ts` — tokens del tema.
- `apps/web/src/entities/quote/` — motor del cotizador (ver §4).

---

## 3. Reglas de negocio (decididas por el dueño)

**Identidad y contacto** — fuente única: `companyData` de `@/shared/config/company-data` (reexporta
`@gya/shared`). Razón social literal: `"GLASS & ALUMINUM COMPANY S.A.C."`. Dirección
**Av. Los Fresnos 1250 - La Molina**; WhatsApp **974 278 303**; correo **acueva@gyacompany.com**.
La Ficha RUC de SUNAT (2022) está desactualizada: no la uses como fuente.

- Nombre completo siempre; sin nombre corto.
- Trato de **usted** al cliente. Fundada en 2021; 4 personas. Emite boleta o factura.
- Zona con proyectos: **La Molina, Surco, San Borja, San Isidro y Miraflores**. Fuera de ahí solo casos
  cercanos; no se aceptan proyectos en otros distritos.
- La empresa **no fabrica** perfiles ni vidrio: compra a proveedores y ensambla/instala. El cliente no
  ve proveedores, sus fotos ni sus planos.

**Marca (v1.0 cerrada)** — `docs/marca/MANUAL-DE-MARCA.md`, `apps/web/DESIGN.md`:

- Un solo acento: coral `#FF5A5F` (`brand.coral`), solo en texto grande por contraste.
- Retirados: `#D62828`, `#FF5A5A`, `brand.quoteRed`, `brand.logoCoral`, `brand.red`.
- Manual → componentes de `/design-system` → páginas. Antes de cambiar el diseño de páginas públicas,
  confirma con el dueño.

**Ortografía:** `"antirruido"` (doble r) y `"vidrio y aluminio"` (singular).

**Catálogo del cotizador** (la implementación manda):

- `SystemType` en `entities/window/model` tiene **9 valores**: `ventana_nova`, `ventana_serie20`,
  `mampara_serie25`, `ventana_serie35`, `mampara_serie62`, `ducha_cristal`, `techo_policarbonato`,
  `ventana_acustica`, `ventana_pvc_abatible`.
- `ventana_acustica` y `ventana_pvc_abatible` llevan `pricePending: true` → la UI muestra
  "Precio a definir". No inventes su precio ni su % antirruido.
- Agregar un sistema exige tocar **a la vez** `SystemType` y `QUOTE_PRICING.systems`
  (`entities/quote/config/pricing.ts`); el `satisfies Record<SystemType, …>` rompe el typecheck si falta uno.
- Solo se agrega un sistema si aparece en un catálogo de proveedor y queda **borrador** hasta que el
  dueño lo publique en `/admin/sistemas` (`estado = 'publicado'`). Fuente:
  `docs/claude/specs/dashboard-proveedores/sistemas-*.md`.
- Tipos de ventana: `Corrediza`, `Proyectante`, `Batiente`, `Luz Fija`.
- Vidrio: `Crudo`, `Laminado`, `Templado` (sin grosor en el nombre). Colores de vidrio: `Incoloro`,
  `Bronce`, `Gris`. Aluminio: `Negro`, `Mate`, `Blanco`, `Madera`, `Champagne`. Adicionales: `Arenado`,
  `Diseño según cliente`.
- **Si falta un dato (precio, plazo, garantía, medida, serie), deja un marcador visible y pregunta.**
  Prioridad de datos: proveedores > datos locales > suposiciones.

**Simulador:** el vigente es `/simulador-ai` (100% local, sin IA ni APIs externas). El visor 3D anterior
se eliminó en `2ca4f3e`; no lo reactives sin pedido explícito. No es cotizador individual de precios.

---

## 4. Convenciones de código

- **Export estático:** `output: 'export'`. Nada de route handlers, server actions, SSR ni
  `force-dynamic`. Rutas dinámicas vía `generateStaticParams` (`/servicios/[serviceSlug]`,
  `/proyectos/[projectId]`, `/vidrieria/[distrito]`, `/blog/[slug]`); lo publicado después del build se
  cubre con `/servicios/ver?slug=` y `/proyectos/ver?id=`. Imágenes por loader propio
  (`shared/utils/imageLoader.ts`).
- **Fronteras FSD las aplica ESLint** (`apps/web/eslint.config.js`, `no-restricted-imports`): una capa
  solo importa hacia abajo; `shared` no importa capas superiores; una feature no importa otra feature;
  una pantalla no importa otra pantalla. **Solo detecta alias** (`@/features/...`): usa siempre el alias
  y nunca rutas relativas que crucen capas, porque el lint no las ve.
- **UI:** primitivas en `@/shared/ui` (no existe `src/components/`). Usa `variant` del tema; nada de
  `colorPalette` ni `bg`/`_hover` a mano; tokens de Chakra v3 (sin hex, `rgba` ni `px` sueltos); targets
  táctiles ≥ 44 px; `dvh` en vez de `100vh`; máximo 2 propiedades en `transition`. Detalle:
  `apps/web/DESIGN.md` §3.
- **Logger:** `@/shared/utils/logger.ts`; nunca `console.log` en producción.
- **Datos:** servicios, proyectos, tienda, pedidos y presupuestos se leen/escriben en Firestore desde el
  cliente (`shared/api`, repositorios en `entities/*/api`). `/admin` está protegido con `AdminRouteGuard`.
- **Cotizador, en tres capas:** motor y precios en `entities/quote` (`lib/windowRules.ts`,
  `lib/quoteCalculator.ts`, `config/pricing.ts`, `ui/QuoteSheet.tsx`); formulario y carrito en
  `features/presupuesto`; flujo en `screens/Presupuesto/PresupuestoWizardScreen.tsx`. El PDF sale de
  `window.print()`, no de una librería. El número se reserva en `contadores/{año}` y se guarda en
  `presupuestos_solicitados/{número}` dentro de una transacción.
- **Next.js 16:** no asumas APIs de tu entrenamiento. Antes de escribir código de framework, lee
  `apps/web/node_modules/next/dist/docs/`. `apps/web/AGENTS.md` lo escribe y reescribe `next dev`; no lo
  borres.

---

## 5. Backend (Firebase Functions) — tocar solo si se pide

- Solo tres endpoints HTTP: `submitReclamo`, `submitContacto` y `checkStatus`; cada uno pasa por
  `src/guards/withGuards.js` (método, IP, rate limit) más anti-bot y captcha. Correo con Resend.
- Las functions **mandan** en el contrato; la web se adapta. Detalle en `docs/api/README.md`.
- **Despliegue:** un archivo `apps/functions/.env` con `RESEND_API_KEY`, `ADMIN_EMAIL` o
  `RECAPTCHA_SECRET_KEY` choca con los secretos de Secret Manager y rompe `firebase deploy`
  ("Secret environment variable overlaps non secret environment variable"). El repo ya usa
  `.env.local` (solo emuladores), así que no crees un `.env` ahí. Desplegar solo cuando se pida:
  primero functions, luego hosting. Ver `apps/functions/README.md` §9.

---

## 6. Organización del repo

- **No saturar la raíz.** En la raíz solo `AGENTS.md`, `README.md`, `CHANGELOG.md` y `claude.md`.
  Planes y notas van en `docs/` (`docs/claude/` para specs y planes; el historial real está en
  `docs/05_CHANGELOG.md`, lo abierto en `docs/PENDIENTES.md`).
- No muevas sin confirmar: `firebase.json`, `firestore.rules`, `storage.rules`, `.firebaserc`,
  `.mcp.json`, `package.json`, `pnpm-workspace.yaml` y configs de Next/TS (las herramientas los leen
  desde la raíz).
- `scripts/*.mjs` son utilidades de mantenimiento (auditorías, migración a Firebase, optimización de
  fotos, sync de proveedores). No las ejecutes contra producción sin pedido.

## 7. Dónde mirar

`docs/01_ARCHITECTURE.md` (capas y módulos) · `apps/web/PRODUCT.md` y `apps/web/DESIGN.md` ·
`docs/marca/MANUAL-DE-MARCA.md` · `docs/PENDIENTES.md` y `docs/05_CHANGELOG.md` ·
`docs/claude/` (specs/planes) · `docs/api/` (contrato) · `apps/functions/README.md` (operación).
