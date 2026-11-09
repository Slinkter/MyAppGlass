# Handoff para agentes de IA

> Estado vigente del proyecto. No es un historial: los cambios cerrados están en `05_CHANGELOG.md` y el trabajo abierto en `PENDIENTES.md`.

## 1. Orden de lectura

1. `AGENTS.md`: comandos, arquitectura, reglas de negocio y código congelado.
2. `docs/marca/MANUAL-DE-MARCA.md`: fuente de verdad de la marca (v1.0).
3. `apps/web/PRODUCT.md` y `apps/web/DESIGN.md`: producto y sistema de diseño.
4. `docs/gya/catalogo/`: catálogo, proveedores y fichas de servicio.
5. `docs/PENDIENTES.md`: única lista de trabajo abierto.

## 2. Dónde está cada cosa

| Tema | Fuente |
|---|---|
| Reglas de negocio y comandos | `AGENTS.md` |
| Arquitectura y acceso a datos | `docs/01_ARCHITECTURE.md` |
| Historial | `docs/05_CHANGELOG.md` |
| Marca: estrategia, voz e identidad | `docs/marca/MANUAL-DE-MARCA.md` |
| Identidad visual y aplicaciones | `docs/marca/BRAND-KIT.html` + manual §7 |
| Plantillas y componentes web | `docs/marca/UI-KIT.html` |
| Sistema de diseño digital | `apps/web/DESIGN.md` + `/design-system` |
| Entregables y estado del paquete de marca | `docs/marca/ENTREGABLES-MARCA.md` |
| Contrato frontend ↔ backend | `docs/api/openapi.json` + `docs/api/README.md` |
| SEO técnico | `docs/14_PLAN_ESTRATEGICO_SEO_Y_METRICAS.md` |
| Jerarquía de rutas y títulos | `docs/10_SEO_JERARQUIA.md` |
| Configuración externa de Google | `docs/11_MANUAL_SEO_LOCAL.md` |

## 3. Estado actual

- **Marca:** manual v1.0 cerrado, brand kit y UI kit documentados, sistema de diseño alineado con `brand.coral #FF5A5F`. Las **páginas públicas siguen congeladas** hasta que el dueño apruebe cada lote.
- **Diseño:** `/design-system` es el showcase de validación; los tokens reales viven en `apps/web/src/shared/providers/theme/index.ts`.
- **Backend:** Firebase Functions v2 (Node.js 22, `us-central1`) con `submitReclamo`, `submitContacto` y `checkStatus`. Código congelado; desplegar solo si el usuario lo pide.
- **Datos de empresa:** dirección Av. Los Fresnos 1250 - La Molina; WhatsApp 974 278 303; correo acueva@gyacompany.com; RUC 20606432870. La ficha RUC de SUNAT (2022) está desactualizada y no se usa.
- **Build:** export estático en `apps/web/out/`. El número de rutas depende de los servicios y proyectos publicados en Firestore.
- **Deploy:** manual con `pnpm run deploy:hosting`; el despliegue automático sigue desactivado.

## 4. Trampas conocidas

- **No ejecutar `pnpm run build` ni `deploy:hosting` con `pnpm run dev` activo.** Comparten `apps/web/.next` y provocan errores de hidratación de Chakra. Solución: detener dev, borrar `apps/web/.next` y reiniciar.
- **Despliegue de functions:** `apps/functions/.env` repite los secretos de Secret Manager y hace fallar `firebase deploy`. Apartarlo durante el despliegue y restaurarlo después. Detalle en `apps/functions/README.md` §9.
- **Contrato de API:** si cambia un schema Zod, ejecutar `pnpm run contract:generate`, actualizar `packages/shared/src/schemas/reclamation-schema.ts` y pasar los tests de contrato.
- **Reglas de Firestore:** los cambios del repo no están desplegados. `presupuestos_solicitados` y `contadores` existen solo en el repositorio hasta que se desplieguen.
- **Rutas eliminadas:** `/servicios` y `/proyectos` ya no existen. Quedan sus detalles y los shells CSR `/servicios/ver` y `/proyectos/ver` (con `noindex`).
- **Simulador:** el único vigente es `/simulador-ai`; el visor 3D anterior fue eliminado y no se reactiva sin pedido explícito.
- **`scripts/generate-openapi.cjs` no se elimina:** lo requiere `pnpm run contract:generate`.
