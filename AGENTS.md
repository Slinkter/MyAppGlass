# AGENTS.md - MyAppGlass (Glass & Aluminum Company S.A.C.)

> Guía de contexto obligatoria para Agentes de IA. Contiene reglas de negocio, flujos de trabajo y comandos que un agente probablemente omitiría sin esta referencia.

---

## 1. Comandos Esenciales y Flujo de Trabajo

**Package Manager:** Usar exclusivamente `pnpm`. Monorepo pnpm workspace: ejecutar **siempre desde la raíz** del repo (`apps/*` y `packages/*`).

| Comando | Acción |
|---|---|
| `pnpm run dev` | Inicia servidor Next.js (`@gya/web`, Port: 3000) |
| `pnpm run typecheck` | Typecheck de todos los paquetes (`pnpm -r --if-present typecheck`; web: `tsc --noEmit -p tsconfig.build.json`) **(SIEMPRE ejecutar para validar tipos)** |
| `pnpm run lint` | ESLint de `apps/web/src/` |
| `pnpm run build` | Compila `@gya/web` para **exportación estática** (`next build` → `apps/web/out/`) |
| `pnpm run deploy:hosting` | Ejecuta `build` + despliega `apps/web/out/` a Firebase Hosting |
| `pnpm run deploy:functions` | Despliega Firebase Functions v2 (`apps/functions`) |
| `pnpm run test` | Vitest (watch mode, `@gya/web`) |
| `pnpm run test:run` | Vitest (single run, `@gya/web`) |
| `pnpm run test:functions` | Pruebas de `@gya/functions` |

**⚠️ Token-saving rule:** NO ejecutar `pnpm run test:run` a menos que el usuario lo pida. Siempre validar con `pnpm run typecheck` y `pnpm run build`.

**Required commit order:**
```bash
pnpm run typecheck && pnpm run build
git commit -m "feat(modulo): descripción clara"
pnpm run deploy:hosting
```

---

## 2. Arquitectura (Feature-Sliced Design)

```
apps/
├── web/                      # @gya/web (Next.js export estático → apps/web/out/)
│   └── src/
│       ├── app/              # Next.js App Router - wrappers ligeros (page.tsx, layout.tsx)
│       ├── features/         # Dominios de negocio: services/, home/, projects/, blog/, admin/, ...
│       ├── widgets/          # Componentes globales: AuraNavbar, AuraFooter, FloatingActions
│       └── shared/           # Utils transversales: logger.ts, api/firebase, hooks, constants
├── functions/                # @gya/functions: Firebase Functions v2 (Node.js 22 - CONGELADO; migrado desde Node.js 20 el 2026-10-29 por retiro del runtime)
packages/
└── shared/                   # @gya/shared: companyData, SITE_URL, CompanyInfo (importar desde @gya/shared; en web, `@/shared/config/company-data` reexporta)
```

**Archivos clave:**
- `apps/web/src/features/services/components/ServicePageLayout.tsx` — Layout maestro página de servicio
> Nota: `VentanaConfigurador3DCard.tsx`, `ventanas-catalogo.json` y `three` eliminados en `2ca4f3e`; el simulador vigente es `/simulador-ai`. Reglas de negocio vigentes: 4 sistemas, tipos y colores (sección 3).

---

## 3. Reglas de Negocio Inmutables

**Identidad:**
- Razón Social: `"GLASS & ALUMINUM COMPANY S.A.C."` → usar `companyData` de `@/shared/config/company-data`
- Datos vigentes: dirección **Av. Los Fresnos 1250 - La Molina**, WhatsApp **974 278 303**, correo **acueva@gyacompany.com**. La Ficha RUC de SUNAT (2022) está desactualizada: no usarla como fuente de dirección, teléfonos ni correo.

**Ortografía (siempre en español):**
- `"antirruido"` (doble 'r', NO 'antiruido')
- `"vidrio y aluminio"` (en singular)

**Catálogo Oficial de Ventanas:**
- Solo existen 4 sistemas: `Sistema Nova`, `Serie 25`, `Serie 35`, `Serie 62`
- NO inventar series inexistentes (Serie 31, Serie 20, etc.)
- Tipos de ventana: `Corrediza`, `Proyectante`, `Batiente`, `Luz Fija`
- Tipos de vidrio (3): `Crudo`, `Laminado`, `Templado` (sin sufijo de grosor)
- Colores de vidrio: `Incoloro`, `Bronce`, `Gris`
- Colores de aluminio: `Negro`, `Mate`, `Blanco`, `Madera`, `Champagne`
- Adicionales: `Arenado`, `Diseño según cliente`

**Simulador 3D (histórico, pendiente de re-implementación):**
- NO es cotizador individual de precios — es simulador visual de características técnicas
- Proporción: **65%** Visor 3D (izq) / **35%** Panel de configuración (der)
- Altura estándar desktop: **`460px`**

---

## 4. Convenciones de Código

- **Static Export:** El proyecto usa `output: 'export'`. Rutas dinámicas requieren `generateStaticParams`.
- **Chakra UI v3:** Usar tokens nativos (`space.1` a `space.16`, `borderRadius="xl"`, `fontSize="xs"`).
- **Lucide icons en flexbox:** Usar `style={{ flexShrink: 0 }}` (la prop directa `flexShrink` da error de tipos TS en Lucide).
- **Botones:** usar `Button` de `@/components/ui/button` con `variant` del tema: `aura` (primario, por defecto), `outline`, `ghost`, `whatsapp`, `brand`. No usar `colorPalette` (blue/cyan/etc.) ni armar `bg`/`_hover` a mano. Referencia visual en `/design-system`.
- **Transiciones:** Máximo 2 propiedades CSS (`transition="all 0.2s ease"`, `transform="translateZ(0)"`).
- **Responsive (mobile-first):** Card `p={{ base: "4", md: "6" }}`; sub-paneles `p={{ base: "3", md: "5" }}`; targets táctiles ≥44px (`minH`/`minW="11"`); grids `{ base: 1, sm: 2, lg: 3 }`; tablas con `minW` y `overflowX="auto"`; listas de chips con scroll horizontal (`flexShrink={0}`, `whiteSpace="nowrap"`); sin texto de `10px` ni `100vh` (usar `dvh`).
- **Logger:** Usar `@/shared/utils/logger.ts`. NO usar `console.log` en producción.
- **Tarjetas con foto:** usar `useImageReveal` + `ImageRevealSkeleton` (`@/shared/components/Image/ImageReveal`) para skeleton y revelado sincronizado; precargar portadas con `useImagePrefetch`; sin `delay` de montaje en `ItemGridLayout.Item`. Referencia: `ServiceCard`/`/design-system`.

---

## 5. Backend (Firebase Functions)

**⚠️ CÓDIGO CONGELADO:** NO modificar `apps/functions/`, `firestore.rules` ni `firebase.json` a menos que sea explícitamente solicitado.

**⚠️ Despliegue de functions:** `apps/functions/.env` (local) repite los 3 secretos que las funciones leen de Secret Manager y hace fallar `firebase deploy` ("Secret environment variable overlaps non secret environment variable"). Apártalo durante el despliegue y restáuralo después (o renómbralo a `.env.local`). Detalle en `apps/functions/README.md` sección 9. Desplegar solo cuando el usuario lo pida: primero `functions`, luego `hosting`.

**Contrato frontend ↔ backend:** el backend manda. Los campos y límites de `submitReclamo`/`submitContacto`/`checkStatus` están en `docs/api/openapi.json`, generado con `pnpm run contract:generate` desde los schemas Zod de `apps/functions/src/schemas/`. Si cambias un campo, sigue `docs/api/README.md` (regenerar, actualizar `packages/shared/src/schemas/reclamation-schema.ts` y pasar los tests de contrato).

---

## 6. Organización de la raíz

- **No saturar la raíz del repo.** En la raíz solo van `AGENTS.md`, `README.md` y `CHANGELOG.md` (el historial real está en `docs/05_CHANGELOG.md`).
- Los demás `.md`, planes y documentos de trabajo van en `docs/` (o una subcarpeta).
- **Excepción:** archivos que las herramientas leen desde la raíz no se mueven sin confirmar: `firebase.json`, `firestore.rules`, `storage.rules` y `.firebaserc` (Firebase CLI; `firebase.json` referencia las reglas con rutas relativas a la raíz), `.mcp.json` (MCP), `package.json`, `pnpm-workspace.yaml` y configs de Next/TS. Si un movimiento puede romper un comando, avisar antes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
