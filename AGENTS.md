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
- **Transiciones:** Máximo 2 propiedades CSS (`transition="all 0.2s ease"`, `transform="translateZ(0)"`).
- **Logger:** Usar `@/shared/utils/logger.ts`. NO usar `console.log` en producción.

---

## 5. Backend (Firebase Functions)

**⚠️ CÓDIGO CONGELADO:** NO modificar `apps/functions/`, `firestore.rules` ni `firebase.json` a menos que sea explícitamente solicitado.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
