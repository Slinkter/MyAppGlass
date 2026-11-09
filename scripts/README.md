# Scripts

Herramientas de mantenimiento del monorepo. Se ejecutan desde la raíz con `node scripts/<archivo>` salvo que se indique otro comando.

| Script | Estado | Para qué sirve | Comando |
|---|---|---|---|
| `generate-openapi.cjs` | **Vivo** | Genera `docs/api/openapi.json` desde los schemas Zod de `apps/functions`. Lo usa el contrato frontend ↔ backend. | `pnpm run contract:generate` |
| `audit-design-system.mjs` | **Vivo** | Auditoría Playwright del design system (contraste, targets, desbordes, foco). Escribe en `docs/auditorias/`. | `pnpm run build && node scripts/audit-design-system.mjs` |
| `audit-landing.mjs` | **Vivo** | Métricas de composición de la landing (altura, CTAs, tipografía, desborde). | `pnpm run build && node scripts/audit-landing.mjs` |
| `inventory-components.mjs` | **Vivo** | Genera `docs/auditorias/INVENTARIO-COMPONENTES.md` (solo lectura). | `node scripts/inventory-components.mjs` |
| `optimize-storage-images.mjs` | Mantenimiento | Optimiza portadas/imágenes en Firebase Storage. Requiere sesión de Firebase CLI. | `node scripts/optimize-storage-images.mjs` |
| `migrate-to-firebase.mjs` | Histórico | Migración única de servicios/proyectos a Firestore + Storage (ejecutada en 2026-10-30). Solo para repetir una migración desde un `seed.json`. | `node scripts/migrate-to-firebase.mjs --seed <seed.json> --target emulator` |
| `firebase-token.cjs` | Helper | Obtiene un access token de la sesión de Firebase CLI. Lo usan los scripts de Storage. | Importado por otros scripts |

## Reglas

- No eliminar `generate-openapi.cjs`: `pnpm run contract:generate` depende de él.
- Los scripts históricos no se ejecutan en CI.
- Cualquier script nuevo debe documentarse en esta tabla.
