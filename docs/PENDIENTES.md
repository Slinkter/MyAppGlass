# Pendientes del proyecto

> **Única lista de trabajo abierto.** No hay planes aparte: cuando se abre un trabajo, se anota aquí; cuando se termina, se borra de aquí y se registra en `05_CHANGELOG.md`.

## 1. Marca (lo primero)

Orden acordado con el dueño: **manual de marca → sistema de diseño y componentes en `/design-system` → páginas, por lotes y con aprobación en cada lote.** Manual v1.0 cerrado, brand kit y UI kit documentados, sistema alineado; las páginas siguen congeladas hasta que el dueño apruebe cada lote.

| Paso | Estado |
|---|---|
| Aprobación del dueño a misión, visión, valores y logo horizontal | **Pendiente** (propuestas en el manual) |
| Componentes mejorados en `/design-system` (variantes `pill`, `chip*`, `field` y `flat`; patrón B; barra de 4 enlaces; footer con sitelinks; marca, landings, formulario) | **Hecho, para revisar.** Solo vive en `/design-system`: el sitio no usa las variantes nuevas |
| Pasar las variantes aprobadas a las recetas reales y a las páginas | **Siguiente**, con aprobación del dueño. Cambiar `primary`, `outline` o `ghost` toca unos 83 archivos |
| Barra de escritorio del sitio con 4 enlaces (Inicio, Servicios, Proyectos, Ubicación) y Contacto, Mi cuenta y legal en los sitelinks del footer | **Pendiente** en el widget real (`widgets/Navbar/AuraDesktopNav`); decidido, solo está en `/design-system` |

El estado completo del paquete de marca y lo que falta está en `docs/marca/ENTREGABLES-MARCA.md`. La propuesta priorizada (0–30, 31–90 y 91–180 días, SEO y lotes) está en `docs/marca/PROPUESTA-MEJORAS.md`; el seguimiento se hace en esta lista.

## 2. Catálogo de servicios y sistemas

Propuesta lista en `docs/gya/catalogo/CATALOGO.md` (13 servicios, series por proveedor). **Falta la aprobación del dueño** (preguntas en su §6). Bloquea los precios reales del presupuesto. `AGENTS.md` (6 sistemas provisionales) se actualiza solo tras aprobar el catálogo.

Después de aprobar: crear los 3 servicios nuevos (espejos, frenos hidráulicos, mantenimiento) desde el panel de administración, y renombrar sistemas en Firestore y en `pricing.ts` con compatibilidad para los presupuestos ya guardados.

## 3. Presupuesto (`/presupuesto`)

Hecho: varias partidas, validación, resumen en vivo, envío separado de la impresión, pantalla de éxito con WhatsApp, correlativo `GYA-AAAA-XXXX`.

| Pendiente | Detalle |
|---|---|
| "Mis presupuestos" en `/mi-cuenta` | Debe leer los dos formatos guardados: `params` plano (antiguo) y `{ version: 2, items: [...] }` |
| Hoja A4 con la marca | Membrete, pie con datos bancarios, plazo y validez como campos. Parte del concepto C1 de `docs/gya/conceptos-presupuesto.md`. **Espera el lote de páginas aprobado por el dueño** |
| Precios reales | Dependen del catálogo. La partida debe admitir cobro por medida, por unidad y por servicio |
| IGV | El dueño decidió que el precio mostrado incluye IGV. Falta confirmar si los precios base de `features/presupuesto/config/pricing.ts` ya lo incluyen (hoy el calculador suma 18 %) |
| Pruebas | Tests de `quote-summary` y `quote-form-schema` escritos sin ejecutar; faltan e2e y fixtures de los 4 casos de `docs/gya/data/presupuestos-reales.json` |

## 4. Seguridad (decisiones o acciones del dueño)

| Pendiente | Detalle |
|---|---|
| Rotar `RESEND_API_KEY` y `RECAPTCHA_SECRET_KEY` | Quedaron en `apps/functions/.env` y en una conversación |
| Decidir `isAdmin()` en `firestore.rules` | Da admin a cualquier correo `@gyacompany.com` verificado; el frontend ya no lo hace |
| Confirmar admin en Firestore | La cuenta del responsable debe tener `users/{uid}.role = 'admin'` |
| Restringir por dominio la API key web de Firebase | `apps/web/src/shared/config/env.ts` (pública por diseño) |
| Revisar el commit `f28b102` (`firebase.json`, congelado) | No fue reconocido |
| Desplegar las reglas validadas en el emulador | `presupuestos_solicitados`, `contadores`, `users`, `clientes` (16/16 en emulador, **no desplegadas**) |
| Endurecer `contadores` y `presupuestos_solicitados` | Escritura pública sin App Check; el contador admite huecos. Toca `firestore.rules` y `apps/functions/` |

## 5. Calidad y deuda técnica

| Pendiente | Detalle |
|---|---|
| Tests de reglas de Firestore en el CI | Requiere Java y firebase-tools en el runner |
| Test de `storage.rules` | No existe |
| Job de Playwright en el CI | Opcional (nightly o manual) |
| Redirect del slug antiguo "antiruido" del blog | Sin verificar si existe. Toca `firebase.json` (congelado): confirmar |
| Revisar `robots.ts` | Las páginas ya tienen `noindex`; falta revisar el archivo |
| Verificar `generateStaticParams` | Que el build prerenderice los slugs de Firestore en `/servicios/[serviceSlug]` y `/proyectos/[projectId]` |
| Exposición pública de `productos` (stock y costo) | Decisión de negocio |
| Galerías | Comprobar si `common/Gallery.tsx` y `common/gallery/GalleryViewer.tsx` aún se usan; si no, retirarlos |
| Modal base del admin | 4 modales repiten estructura (sin verificar) |
| Partir `FloatingPanel.tsx` | 457 líneas |
| Deriva de diseño en el código | Lista en `apps/web/DESIGN.md`, sección "Deriva conocida". Se corrige antes de aplicar los lotes de páginas |
| Capa `entities` y fronteras FSD | **Hecho** (fase 2 cerrada): `entities/{project,service,client,store,product,order,quote,window}`, `AdminLayout`/`StoreSection` en `widgets` y regla `features → features` activa en ESLint. Detalle y commits en `docs/opencode/PLAN-FSD-Y-AGENTES.md` |
| Catálogo `pricing.ts` vs 6 sistemas de `AGENTS.md` | **Decisión del dueño:** `entities/quote/config/pricing.ts` conserva 6 SKUs que no coinciden con el catálogo oficial (faltan Serie 35 y 62; sobran ducha y techo como sistemas). No se alteraron precios |
| Permisos del agente principal de OpenCode | No existe `opencode.json`; todo comando cae en `ask`. Propuesta lista en `docs/opencode/PLAN-FSD-Y-AGENTES.md` §6, **pendiente de aprobación** |
| Auditorías automáticas de diseño | Falta `npx playwright install` para correr `scripts/audit-design-system.mjs` y `scripts/audit-landing.mjs` |
| 404 de precarga en producción | 10 errores de consola (`/<ruta>/__next.<ruta>.__PAGE__.txt`). Inofensivos; falta saber si ya existían |
| Horario en `companyData` | El footer lo escribe a mano |
| Informe UI/UX (Gemini, `docs/gemini/`) sin commit | Revisado: typecheck y lint OK, build OK. Medido en 360 px: `/cuentas-bancarias` sin overflow (350/350). Encabezados 600 revisados: no hay h1–h3 Lora en 600 en esas 5 páginas (son textos Inter); sin cambios. Pendiente: cambio global de tokens `text.heading/body` y bordes sin aprobación de lote; umbral `pnpm audit` bajado a `critical` (decisión del dueño); enlaces del navbar de escritorio miden 43 px, no 44 |
| Movimiento cinematográfico en las demás páginas | Hecho solo en la home (opción `motion="cine"` de `ItemGridLayout` y hero propio). Falta llevarlo a servicios, proyectos, blog, tienda y contacto, y medir el efecto en rendimiento (LCP, TBT, fluidez) contra la línea base |

## 6. Producto

| Pendiente | Detalle |
|---|---|
| Realidad aumentada | **Bloqueada:** faltan los modelos `.glb` y `.usdz` |
| Checkout con Cloud Function | Hoy el pedido solo se envía por WhatsApp (decisión tomada) |
| Optimización algorítmica (5 componentes) | `FloatingPanel`, `ProjectCarousel`, `OrderDraftContext`, `PrototypeTimeline`, `ProjectDetail` |
| Fotos de obras | Solo 2 o 3 proyectos tienen álbum completo. Se cargan desde el panel de administración |

## 7. Observabilidad

| Pendiente | Detalle |
|---|---|
| Sentry cliente | **Bloqueado:** falta cuenta/DSN |
| Sentry servidor y auditoría inmutable de reclamos | **Bloqueado:** exige autorizar cambios en `apps/functions` |
| Confirmar en GCP alertas, uptime y BigQuery | Archivos listos en `gcp/`; no se sabe si están aplicados |

## 8. Acciones externas del dueño

- Google Maps y consistencia de nombre, dirección y teléfono (checklist en `11_MANUAL_SEO_LOCAL.md`).
- Reactivar el despliegue desde GitHub Actions: configurar `FIREBASE_SERVICE_ACCOUNT_GYA_APP_4C8A9` y los secretos `NEXT_PUBLIC_*` (lista en `.github/workflows/deploy-prod.yml`). Hasta entonces el despliegue es manual con `pnpm run deploy:hosting`.
- Deploy de hosting y de functions: solo cuando el dueño lo pida.
