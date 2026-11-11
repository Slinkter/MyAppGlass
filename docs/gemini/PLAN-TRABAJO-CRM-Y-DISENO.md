# Plan de trabajo para Gemini: CRM y diseño aprobado

> Destino propuesto: `docs/gemini/PLAN-TRABAJO-CRM-Y-DISENO.md`. Quien lo ejecuta: Gemini. Revisión y commits: el dueño o Claude.
> Lectura previa obligatoria, en este orden: `CLAUDE.md`, `AGENTS.md`, `docs/marca/MANUAL-DE-MARCA.md`, `apps/web/PRODUCT.md`, `apps/web/DESIGN.md`, `docs/PENDIENTES.md`.

## Contexto

El dueño respondió la Parte 2 de `docs/PENDIENTES.md`. Prioridad: **CRM** (editar servicios y proyectos en línea, solo admins). Después, en lotes, el diseño aprobado: MD3 con los colores y la tipografía de la empresa, movimiento coherente en todas las páginas, barra de escritorio de 4 enlaces y chip de `/contacto` con contraste suficiente.

**Decisiones del dueño que no se discuten**

- Admins: `luis.j.cueva@gmail.com`, `acueva@gyacompany.com` (con "v"; `PENDIENTES.md` dice `acuea` y debe corregirse) y `admin@gyacompany.com` (pruebas de UX/UI).
- Admin = campo `users/{uid}.role = 'admin'` en Firestore. Ningún otro `@gyacompany.com` es admin. El dueño asigna el rol desde la consola.
- Los clientes no ven el dashboard: solo crean una cotización desde el celular o la web.
- Menú móvil: se queda como está. Barra inferior móvil: no.
- Todo se prueba en el emulador de Firebase. **Nada se despliega** (hosting, functions ni reglas).

**Ya hecho (sin commitear):** `firestore.rules` ya no da admin por dominio `@gyacompany.com`; solo por claim `role=admin` o por `users/{uid}.role`. El frontend ya trabajaba así (`AuthContext.tsx`, `isEmailAdmin = false`). Commit anterior: `0f6cafc7` (chevron, revelado y anclas).

## Reglas de trabajo (de `CLAUDE.md`, resumidas)

- Precedencia de datos: proveedores > datos locales > suposiciones. **No inventar** precios, plazos, garantías ni capacidades: poner un marcador visible y preguntar al dueño.
- Datos de empresa solo desde `companyData` (`@/shared/config/company-data`).
- Sin hex, `rgba`, `colorPalette`, degradados, emojis ni `100vh` en componentes; usar tokens del tema. **`apps/web/src/shared/providers/theme/index.ts` lo edita una sola persona por tarea.**
- El cliente nunca ve a los proveedores ni sus fotos o planos.
- No crear planes nuevos en `.md`; lo abierto va en `docs/PENDIENTES.md` y lo terminado en `docs/05_CHANGELOG.md`.
- Zonas congeladas o con aprobación: `firebase.json`, `apps/functions/`, `firestore.rules` (solo lo indicado aquí).
- Cada fase termina con: `pnpm typecheck`, `pnpm lint` y `pnpm build` en verde, y un commit con mensaje en español.

## Cómo paralelizar

Las actividades de una misma fase son independientes y tocan archivos distintos (columna "Archivos exclusivos"). Pueden hacerse en ramas o worktrees separados y fusionarse al terminar la fase. No pasar a la fase siguiente sin los gates en verde.

## Fase 0. Cierre del estado actual

| Actividad | Detalle |
|---|---|
| 0.1 | Corregir `acuea` a `acueva` en `docs/PENDIENTES.md` y registrar D1 a D4 como cerradas. |
| 0.2 | Decidir sobre el cambio de `firestore.rules` (recomendado: mantenerlo) y commitearlo junto con los docs. |
| 0.3 | No incluir en el commit `apps/web/package.json` ni `pnpm-lock.yaml`: son cambios ajenos pendientes de revisión. |

## Fase 1. Diagnóstico (solo lectura, 5 actividades en paralelo)

| Actividad | Qué hacer | Entrega |
|---|---|---|
| 1.1 Brechas del CRUD | Revisar `/admin/servicios` y `/admin/proyectos` (`ServiceAdminTable`, `ServiceFormModal`, `ProjectAdminTable`, `ProjectFormModal`, `AlbumGalleryUploader`, `ImageUploadZone`, `entities/service`, `entities/project`): qué falta para crear, editar, borrar, renombrar y gestionar imágenes y álbum | Tabla de brechas |
| 1.2 Línea base | Correr `pnpm typecheck`, `pnpm lint`, `pnpm build` y anotar resultados | Exit codes |
| 1.3 Medidas | En 360 px medir contraste del chip de `/contacto`; en 1280 px la altura de los enlaces del navbar (`AuraDesktopNav.tsx:89`, `h="11"`) | Medidas |
| 1.4 Blog (D4) | Revisar `features/blog/data` y listar artículos completos e incompletos. **No publicar nada nuevo.** | Tabla |
| 1.5 Brechas MD3 | Comparar tokens y componentes con Material Design 3 (botones, cards, espaciados, anchos) respetando colores y tipografía de la empresa | Lista priorizada |

## Fase 2. Cambios aprobados y acotados (5 actividades en paralelo)

| Actividad | Qué hacer | Archivos exclusivos |
|---|---|---|
| 2.1 Pruebas de reglas | Añadir casos a `tests/rules/firestore.rules.test.mjs`: admin por rol puede escribir; usuario `@gyacompany.com` sin rol no es admin; cliente no lee ni escribe lo de admin. Correr con el emulador (requiere Java) | `tests/rules/*` |
| 2.2 Chip de `/contacto` | Llevar el contraste a 4,5:1 con el color de texto más oscuro del tema (token existente; no editar `theme/index.ts`) | componente del chip |
| 2.3 Barra de escritorio | Barra de 4 enlaces (Inicio, Servicios, Proyectos, Ubicación). Contacto, Mi cuenta y legal en el footer. Enlaces de 44 px de alto | `widgets/Navbar/AuraDesktopNav.tsx`, `shared/config/nav-items.ts`, `widgets/Footer/*` |
| 2.4 Horario | Agregar el horario a `companyData` y usarlo en `Footer.tsx`, `useLocationData.ts`, `useIsStoreOpen.ts` y `NavSection.tsx`. Hoy dice lunes a sábado, 8:00 a 18:00; confirmar con el dueño antes de fijarlo | esos 4 + `shared/config/company-data.ts` |
| 2.5 Avisos de lint | Quitar los 2 avisos `react-refresh` moviendo constantes o hooks a otro archivo | `shared/components/Image/ImageReveal.tsx`, `shared/components/common/Gallery.tsx` |

## Fase 3. CRM (prioridad; usa los resultados de 1.1)

1. Completar el CRUD de servicios y proyectos según las brechas: crear, editar, borrar, nombre, imágenes y álbum. Reutilizar `AdminRouteGuard`, `FormModalShell`, `ImageUploadZone` y `AlbumGalleryUploader`.
2. Agregar desde el panel los 3 servicios nuevos (espejos, frenos hidráulicos, mantenimiento) con datos reales del catálogo. Marcador visible donde falte un dato.
3. Probar en el emulador con `admin@gyacompany.com` (rol admin) y con un usuario cliente: el cliente no accede a `/admin`; solo cotiza.
4. Acción del dueño: asignar `role = 'admin'` a las 3 cuentas desde la consola de Firestore.

## Fase 4. Movimiento coherente

Una actividad por página, en paralelo: servicios, proyectos, blog, tienda y contacto. Reutilizar `ItemGridLayout motion="cine"` y `useRevealState`. Respetar `prefers-reduced-motion`. Al terminar, medir LCP y TBT contra la línea base y anotarlo en `PENDIENTES.md`.

## Fase 5. Deuda mecánica (en serie, por el riesgo de imports)

1. **Lote 3:** renombrar 19 archivos kebab-case a camelCase y `DesignSystem/components/motion.tsx`. Una sola persona; nadie más edita mientras tanto; `pnpm typecheck` tras cada tanda.
2. **Lote 4:** `ClientCard` duplicado; partir `FloatingPanel` (457 líneas) y `MenuOverlay`; fusionar `field*`/`badge*` y partir `theme/index.ts` (un solo editor).

## Fase 6. MD3 por lotes (solo con aprobación de cada lote en `/design-system`)

Tokens del tema (roles, escala tipográfica, forma, capas de estado), luego propagar a ~83 archivos por familia: botones, campos, cards. La escala de h1 y el texto mínimo salen de MD3, no de un número fijo. Verificar en `/design-system` antes de tocar páginas.

## Fuera del plan (bloqueado o en pausa)

Precios y sistemas (el dueño arma los cálculos); IGV con subtotal, IGV, total y +5 % con tarjeta (cuando haya precios); hoja A4; Sentry; `apps/functions`; `opencode.json`; GitHub Actions; deploys; Google Maps; `contadores`; rotación de claves (al final del proyecto); AR (en pausa); bug del footer (lo revisa el dueño al final).

## Verificación

- Gates por fase: `pnpm typecheck`, `pnpm lint`, `pnpm build`.
- Reglas: `node tests/rules/firestore.rules.test.mjs` con el emulador de Firestore, sin desplegar.
- Navegador (360 y 1280 px): navbar, chip, anclas de la home, CRUD con admin y con cliente.
- Auditorías: `node scripts/audit-landing.mjs` y `node scripts/audit-design-system.mjs`. El segundo sobrescribe `docs/auditorias/audit-design-system-baseline.json`: restaurarlo con `git checkout` salvo que se quiera una línea base nueva.
- Al cerrar cada fase: actualizar `docs/PENDIENTES.md` y `docs/05_CHANGELOG.md`.
