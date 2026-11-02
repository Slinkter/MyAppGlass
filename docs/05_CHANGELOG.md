# Changelog

All notable changes to this project will be documented in this file.

## [2026-11-02] - Rediseño UX/UI, contrato API y correos (rama `feat/ux-ui-2026-11-02`)

Desplegado el 2026-11-02: `functions` (`submitReclamo`, `submitContacto`, `checkStatus`) y `hosting` (https://gya-app-4c8a9.web.app).

### Added
- **Contrato frontend ↔ backend** (`80b9dad`): `docs/api/openapi.json` (OpenAPI 3.1) se genera desde los schemas Zod del backend con `pnpm run contract:generate` (`scripts/generate-openapi.cjs`). Guía en `docs/api/README.md`. Dos tests lo protegen: `apps/functions/test/openapi.test.js` (el archivo no puede quedar desactualizado) y `apps/web/tests/unit/api-contract.test.ts` (el schema del frontend debe cumplir los límites del backend).
- **Backend guarda** `nombrePadreMadre` (obligatorio para menores), `aceptaTerminos` y `autorizaEmail`; los dos consentimientos son obligatorios (`true`). Antes se pedían en el formulario pero se perdían.
- **`MediaCard`** (`apps/web/src/shared/components/Card/MediaCard.tsx`, `79feb15`): base compartida de `ServiceCard` y `ProjectCardContent`. Borde limpio (sin fondo negro en las esquinas), un solo gesto de hover y `GLASS_FALLBACK_CSS` (`shared/constants/layout.ts`) para `prefers-reduced-transparency`.
- **`FormCard`** (`features/reclamation-book/components/FormCard.tsx`, `1c81a9e`): tarjeta que envuelve cada sección del libro de reclamaciones.
- **Correos rediseñados** (`bf73c7b`, `e39f977`): layout compartido `apps/functions/src/templates/emailLayout.js` con logo por URL pública (`https://gyacompany.com/logovcr.png`, PNG porque Gmail/Outlook no muestran SVG), caja de código, pie con datos de la empresa. Los 4 correos (reclamo y contacto, empresa y cliente) lo usan. La hoja de reclamación muestra tutor y consentimientos; el monto sale como `S/. 1,250.50`.
- Indicador de scroll (chevron flotante) en el hero en lugar de los botones "Explorar Servicios" y "Ver Portafolio de Obras" (`3752f84`).

### Changed
- **Límites del frontend alineados con el backend** (`packages/shared/src/schemas/reclamation-schema.ts`): `pedido` mínimo 10, `numeroDocumento` 6-15 alfanumérico, `domicilio` hasta 300, `descripcionBien` hasta 500, teléfono con regex, `< > { }` prohibidos, consentimientos `z.literal(true)`.
- Formulario del libro de reclamaciones: campos `variant="outline"` como en `/design-system`, botón de enviar responsive, zona de evidencias a ancho completo, aviso legal con borde de marca.
- `pnpm run dev` usa **Turbopack** (se quitó `--webpack`): `Ready` de ~1.0 s a ~0.5 s y primera compilación de `/` de ~20 s a ~6 s en frío (`965b026`). `build` sigue con `--webpack`.
- `publicRest.ts`: en desarrollo el caché de lecturas de Firestore dura 5 min con stale-while-revalidate; producción y build no cambian.
- Raíz del repo ordenada: los `.md` y planes pasan a `docs/` (`28379a2`). `.gitignore` consolidado (`b7bc43f`).
- Colección Postman: el payload "válido sin captcha" incluye los consentimientos.

### Fixed
- Marco negro del navegador al hacer clic en el mapa de Google y solapamiento del botón de recentrar con el panel de la sede en móvil (`9da0f97`).
- Sombra de hover de las tarjetas (`var(--chakra-shadows-card-lift)` no existía; ahora `cardLift`).
- Correo a la empresa desbordaba la pantalla en móvil por valores sin espacios; dirección del pie corregida a **Av. Los Fresnos 1250 - La Molina** (`e39f977`).
- Script `clean` de la raíz (`pnpm -r --if-present run clean`).

### Removed
- Logs `logger.debug` que serializaban todos los proyectos en cada render (`ec199e9`) y el reexport sin uso `shared/utils/constants.ts` (`7d992ed`).

### Notas operativas
- **Despliegue de functions:** `apps/functions/.env` (local, ignorado por git) define `RESEND_API_KEY`, `ADMIN_EMAIL` y `RECAPTCHA_SECRET_KEY`, que las funciones ya leen como secretos de Secret Manager. Cloud Run rechaza el despliegue con "Secret environment variable overlaps non secret environment variable". Apartar el archivo durante `firebase deploy` y restaurarlo después (o renombrarlo a `.env.local`, que solo cargan los emuladores).
- **Datos vigentes de la empresa:** dirección Av. Los Fresnos 1250 - La Molina, WhatsApp 974 278 303, correo acueva@gyacompany.com. La Ficha RUC de SUNAT (2022) está desactualizada; no usarla como fuente.
- **Colección `libro_de_reclamaciones`:** filtrar por fecha con `createdAt`. El último registro previo era del 2026-08-17; el 2026-11-02 se registró y verificó en producción la queja `GYA-REC-2026-LK3SG3` (ambos correos `SENT` vía Resend y consulta `200 OK` en `checkStatus`). Los documentos anteriores al 2026-10-29 tienen como ID el código de Resend y pueden traer campos extra (p. ej. `recaptchaToken`).
- **Reglas `firestore.rules` optimizadas y desplegadas:** `isAdmin()` evalúa claims y correo `@gyacompany.com` en el JWT antes de leer `/users/{uid}` (ahorro de lecturas por cortocircuito), y permite al admin leer y actualizar el estado (`status`, `updatedAt`, `adminNotes`) en `libro_de_reclamaciones` y `contact_submissions` manteniendo `create, delete: if false` desde cliente.
- **Colecciones Postman (`apps/web/tests/postman/`):** actualizadas al contrato vigente (casos de `Queja`, validación de consentimientos obligatorios `400 Zod`, `checkStatus` `200 OK` con `GYA-REC-2026-LK3SG3`, y auditoría de reCAPTCHA v3 + cabeceras HTTP). Guía replicable para otros formularios en `docs/api/README.md`.
- Pruebas: 147 del backend (`pnpm run test:functions`) y 61 del frontend relacionadas con reclamaciones y contrato.

### Pendiente
- Replicar el protocolo de actualización y prueba E2E (`docs/api/README.md`) en los demás formularios (`/contacto`, `/presupuesto`).
- Rotar `RESEND_API_KEY` y `RECAPTCHA_SECRET_KEY` (quedaron expuestas en una conversación).
- Purga de archivos: `scripts/`, `docs/diplomado/`, `.gemini/`, `.agents/` y planes antiguos de `docs/` (decisión del responsable). Hay un PDF de la Ficha RUC sin rastrear en `docs/api/`.
- Revisar en navegador el modo oscuro del formulario, los selects, y los botones flotantes que se superponen con el mapa en móvil.

## [2026-11-02] - Pulido del Aura Design System

### Design system aplicado a toda la página
- Aplicado por fases a widgets, home, servicios, proyectos, blog, contacto, legal, presupuesto, auth, simulador AI y admin (seis commits `refactor(...)`).
- `transition="all"`: 28 → 0. `colorPalette`: 83 → 39 (los botones ya usan `variant` del tema; quedan Badges y marcas de identidad como YAPE/PLIN). Íconos Lucide sin `flexShrink`: 111 → 48. Paddings fijos de card: 189 → 148 (los pequeños se dejaron). Texto de 10-11px: 4 → 0.
- Nuevo `AdminRowActions` compartido por `ServiceAdminTable` y `ProjectAdminTable`.
- `BlogCard` y `BlogPostView` con revelado sincronizado de imagen; `BlogList` precarga portadas.
- `/servicios/[slug]`: preload de la primera foto de la galería y miniaturas con prioridad baja (primera foto pedida a los 84 ms en lugar de 924 ms).
- Pendiente: colores `rgba`/hex sin token equivalente (97), `IconButton` de chips en admin menores de 44px y avisos de fast-refresh en `ImageReveal.tsx` y `Gallery.tsx`.

### Responsive (móvil, tablet, desktop)
- Componentes base del showcase (`ShowcaseCard`, `ShowcasePanel`, `ShowcaseStack`, `SubsectionLabel`) y constantes `RESPONSIVE_GRIDS` / `TOUCH_MIN`.
- Secciones de `/design-system` con padding, gaps y tamaños responsive; Overlays fusionados en una card "Feedback y Overlays".
- `ServiceCard`, `ProjectCardContent` y `ClientCard`: badges `xs`, tracking responsive y `lineClamp` en títulos.
- `AdminNav` en una fila con scroll horizontal; `AuraDesktopNav` con `h` 44px en móvil.
- Galería (`GalleryViewer`, `GalleryThumbnails`, botón cerrar de `Gallery`): botones de 44px y miniaturas con scroll horizontal.

### Performance
- `useImageReveal` / `ImageRevealSkeleton` (`shared/components/Image/ImageReveal`): skeleton de la misma medida y revelado sincronizado (foto, degradado y textos) con timeout de 7 s.
- `useImagePrefetch`: precarga de portadas en caché.
- Revelado sincronizado aplicado en servicios, proyectos y clientes.
- Nuevo showcase "Revelado sincronizado de imagen" en `/design-system` con demo interactiva y reglas del patrón.

### Added
- Variantes de botón `whatsapp` y `brand` en el tema.
- `_focusVisible` y `_disabled` en el botón base.
- `<Toaster />` montado en `app/Providers.tsx`.
- En `/design-system`: estados loading/disabled, `Textarea`, `Tooltip`, `Drawer`, `Toast`, catálogo de `Badge`, `Tabs` y swatches de `text.heading`, `text.body`, `text.muted` y `ring.primary`.

### Changed
- Showcase `/design-system` sin `colorPalette="blue"`; botones con variantes del tema.
- Etiquetas tipográficas corregidas y contenido alineado al catálogo oficial (sin DVH, grosores ni "Acero Inox").
- Wrapper `components/ui/button.tsx` acepta las variantes `whatsapp` y `brand`.
- Alias `border.glass`, `bg.glass`, `text.primary`, `bg.canvas`, `surface.muted` y `border.slate` marcados `@deprecated`.

### Removed
- Tokens sin uso `border.slateStrong`, `text.slate` y `text.slateStrong`.

## [2026-10-30] - Mantenimiento posterior

### Removed
- Rutas de listado `/servicios` y `/proyectos` (commit `752a5fe`). Quedan las rutas de detalle `/servicios/[serviceSlug]`, `/servicios/ver` y `/proyectos/ver`.

### Changed
- `ThemeToggle` homologado con `FloatingWhatsApp` (commit `752a5fe`).
- Carga de Google Maps con `loading=async` (commit `448d8ea`).
- Actualización a TypeScript 6.0.3 y React 19 (commit `833547d`).

## [2026-10-30] - Sincronización documental con el código

### Changed
- Conteos corregidos en README, `docs/README.md`, `docs/02_AI_HANDOFF.md`, `docs/03_AGENTS.md` y `docs/04_PLAN_DE_TRABAJO.md`: **60 páginas** prerenderizadas (verificado con `pnpm run build`) y **18 archivos / ~129 casos** de test unitarios en `apps/web/tests/unit/`.

## [2026-10-30] - Unificación de Estilos en Chakra UI v3, Despliegue de Reglas y Showcase Canónico

### Added
- **Aura Design System Showcase (`/design-system`)**: Pantalla modular completa con componentes y tokens reales de producción (`AuraDesktopNav`, `AdminNav`, `ServiceCard`, `ProjectCardContent`, `ClientCard`, `Field`, `NativeSelect`, `Gallery`, `Dialog`, `Table`, `DataList`). Soporta alternancia interactiva de modo claro/oscuro en tiempo real con `ColorModeButton`.
- **Tokens Semánticos Oficiales**: Registrados formalmente en `theme/index.ts`: `brand.primary`, `bg.surface`, `border.subtle` y `status.dangerBorder`.

### Changed
- **Unificación de CSS en Chakra UI v3**: Se removió la dependencia externa `framer-motion` del cliente (`@gya/web`), reduciendo el bundle en ~35 KB. Animaciones migradas a transiciones nativas y keyframes de hardware en `StoreSection.tsx` y `VisualViewer.tsx`.
- **Limpieza de `Providers.tsx`**: Removido el bloque manual `<Global styles={...} />` de `@emotion/react` y `<LazyMotion>`; keyframes globales movidos a `global.css`.
- **Despliegue de Seguridad**: `firestore.rules` y `storage.rules` desplegadas exitosamente a producción (`firebase deploy --only firestore:rules,storage`).

## [2026-10-30] - Firebase como única fuente de servicios y proyectos

### Added
- `scripts/migrate-to-firebase.mjs`: migración ejecutada en producción (10 servicios, 14 proyectos, 137 imágenes en Storage, con FAQ, SEO y álbum por sistema).
- `apps/web/src/shared/api/firebase/publicRest.ts`: lectura de Firestore en build para `generateStaticParams`, metadata, JSON-LD, sitemap y `initialData`.

### Changed
- Las páginas públicas usan los datos de build como `initialData` y se refrescan desde Firestore en el cliente; las lecturas usan `*FromServer`.

### Removed
- Datos locales de servicios y proyectos, el seed del admin y 640 imágenes (`public/images` 74 MB → 7,8 MB; `src/assets` 139 MB → 19 MB).

### Pendiente
- Desplegar reglas de Firestore y Storage, asignar el claim `role=admin` al admin y desplegar Hosting.

## [2026-10-30] - Migración a Monorepo pnpm, Firestore en el Frontend Público y Reglas Admin

### Added
- **Monorepo pnpm**: `apps/web` (`@gya/web`, Next.js con export estático a `apps/web/out`), `apps/functions` (`@gya/functions`, Firebase Functions v2) y `packages/shared` (`@gya/shared`: `companyData`, `SITE_URL`, `CompanyInfo`). Commit `522b52a`.
- **Páginas públicas desde Firestore**: `/servicios` y `/proyectos` leen de Firestore en cliente con skeletons y fallback local (hooks `useServices`/`useService`/`useProjects`/`useProject` y `shared/hooks/data/useAsyncResource.ts`). Rutas de detalle en cliente: `/servicios/ver?slug=` y `/proyectos/ver?id=`.
- **Prueba de reglas con emuladores**: `apps/web/tests/rules/rules-smoke.sh`.
- **Componentes comunes de modales admin** en `features/admin/components/form`.

### Changed
- **Reglas de seguridad**: `firestore.rules` y `storage.rules` con escritura solo para administradores (más estricta que el plan original).
- **CSP de Firebase Hosting**: ampliado para permitir Firestore, Auth y Storage (`firebase.json`).
- **Unificación de datos**: `SITE_URL` único; dirección única "Av. Los Fresnos 1250 - La Molina"; RUC único `20606432870`; contacto (`salesEmail`, `whatsappDisplay`) centralizado en `companyData`.
- **Tema**: tokens de color de estado en el tema.
- **Pantallas divididas**: admin, simulador y presupuesto separadas en componentes más pequeños; constantes en `shared/constants`.
- **Arquitectura FSD**: `AdminRouteGuard` en `features/auth`, `seedData` en `features/admin/seed`, `clientsRepository`/`usersRepository` en `shared/api/firebase`.
- **Nombres PascalCase** para componentes y pantallas (`Providers.tsx`, `ContactPageClient`, `FloatingWhatsApp`, `screens/Blog|Error|Home|Legal|Services|Projects`).

### Fixed
- **Purga de imágenes basura y duplicados**, y eliminación de three.js obsoleto (commit `a7c3e1a`).
- **Dirección y SEO**: centralización de `SITE_URL` y unificación de la dirección (commit `f9e3781`).

### Pendiente
- Probar admin y páginas públicas en navegador con emuladores y con Firestore apagado.
- Reglas, hosting y datos **no desplegados** aún.
- Esquemas Zod y configuración de ESLint aún no extraídos a `packages/shared`.
- Alinear la versión de pnpm de CI (workflows con pnpm 11; lockfile generado con pnpm 12).

## [2026-10-29] - Puesta Operativa de Backend, Resend API Key y Blindaje Serverless

### Added
- **Pruebas de Integración y Errores HTTP**: Agregados `functions/test/captcha.test.js` y `functions/test/httpErrors.test.js` ampliando la suite a **141 tests unitarios**, todos pasando al 100% con `node:test`.
- **Soporte y Blindaje IPv6**: Agrupamiento por subred `/64` (`rateLimitKey`) en `functions/src/guards/rateLimit.js` evitando dispersión de buckets en Firestore.
- **Validación Automatizada con Newman**: Ejecución exitosa de la colección `tests/postman/GYA_Company_API.postman_collection.json` contra producción (9 requests, 23 aserciones, 0 fallos).

### Changed
- **API Key de Resend en Firebase Secret Manager**: Actualizada a la **Versión 3** (`RESEND_API_KEY`) y verificada contra el dominio verificado `gyacompany.com`.
- **Despliegue Completo de Cloud Functions (Node.js 22)**:
  - `submitReclamo`: Actualizada y desplegada con vinculación a la versión activa del secreto.
  - `submitContacto`: Actualizada y desplegada con vinculación a la versión activa del secreto.
  - `checkStatus`: Actualizada y desplegada.
- **reCAPTCHA v3 Hardening**: Envío seguro de credenciales mediante el cuerpo del POST (`application/x-www-form-urlencoded`) y timeout preventivo con `AbortSignal.timeout(5000)`.
- **Protección de Privacidad (PII en Logs)**: Eliminación de correos personales en `logger.warn` dentro de `reclamoService.js` y `contactoService.js`.

### Fixed
- **Subsanación de Test Roto**: Corregido payload de `crearReclamoPayload` en `functions/test/httpErrors.test.js` completando los campos obligatorios de Zod (`tipoDocumento`, `domicilio`, `tipoBien: "producto"`).
- **ESLint en `functions/`**: Subsanados 3 errores (`new-cap`, `quote-props`) y advertencia `max-len` (0 errores, 0 warnings).
- **Conflicto de Secretos en Cloud Run**: Documentado y solventado el solapamiento de variables locales de entorno con Secret Manager durante el despliegue.

## [2026-10-29] - Sincronización de documentación con el estado real del código

### Added
- **`functions/README.md`**: guía de arquitectura del backend (capas, flujo de un reclamo, tabla de funciones, modelo de datos, despliegue y cómo agregar una función nueva).
- **Pruebas automatizadas** con `node:test`: 120 pruebas en `functions/test/` (`cd functions && npm test`), con dobles de Resend, Firestore y reCAPTCHA.
- **Colecciones de Postman** actualizadas al contrato actual del backend en `tests/postman/` (commit `61af7db`).

### Changed
- **Documentación técnica sincronizada**: `docs/01_ARCHITECTURE.md` (estructura real de directorios, FSD parcial sin `entities/`, tema en `src/shared/providers/theme/index.ts`), `docs/06_DOCS_DEVELOPMENT.md` (variables de entorno según `.env.example` y `src/shared/config/env.ts`, scripts reales), `docs/07_BACKEND_IMPLEMENTATION.md` y `docs/08_DOCS_SECURITY_BACKEND.md` (las 3 funciones `submitReclamo`, `submitContacto` y `checkStatus`, rate limit, CORS, validación Zod, captchas y sanitización).
- **Documentos SEO sincronizados**: `docs/09_PLAN_SEO_CONTENIDOS.md`, `docs/10_SEO_JERARQUIA.md` (nuevo bloque de estado y tabla ruta → title real) y `docs/11_MANUAL_SEO_LOCAL.md` contrastados con `sitemap.ts`, `robots.ts`, `seo-utils.ts` y los 10 posts del blog.
- **READMEs de módulos y skill `gya-cms`**: rutas y componentes corregidos según los archivos existentes.
- **Rutas absolutas de Windows** de este changelog convertidas a texto de código.
- **Runtime de Cloud Functions**: migración de `nodejs20` a `nodejs22` en `firebase.json` y `functions/package.json` por el retiro de Node.js 20 (2026-10-30). Desplegado el 2026-10-29: `submitReclamo`, `submitContacto` y `checkStatus` corren en `nodejs22` (ver `docs/08_DOCS_SECURITY_BACKEND.md` sobre el conflicto de `RECAPTCHA_SECRET_KEY` en el despliegue).
- **Backend reorganizado en capas** (`functions/src/`: `http/`, `guards/`, `schemas/`, `services/`, `adapters/`, `templates/`, `config/`). `functions/index.js` solo inicializa `firebase-admin` y exporta; `emailSender.js` y `mathCaptchaValidator.js` quedan como shims de compatibilidad (commit `db5ab7e`). **Desplegado el 2026-10-29.**
- **Reclamos y consultas: se guardan primero** en Firestore con código propio `GYA-REC-AAAA-XXXXXX` / `GYA-CON-AAAA-XXXXXX`, y después se envían los dos correos en paralelo. Antes el código era el ID de Resend y el correo al administrador llevaba el marcador `TEMP_ID` (commit `f565e53`). **Desplegado el 2026-10-29.**
- **Rate limit por función** en transacción de Firestore: `submitReclamo` 8, `submitContacto` 8 y `checkStatus` 30 por IP cada 15 minutos, con campo `expireAt` para TTL (la política debe activarse en la consola) (commit `de58565`). **Desplegado el 2026-10-29.**
- **Reglas de Firestore y Storage endurecidas** (commit `b398036`), ya publicadas en producción: `libro_de_reclamaciones`, `contact_submissions` y `rate_limits` sin acceso desde el cliente, con cierre por defecto.
- **Dependencias de `functions/`**: aplicado `npm audit fix` (commit `a1ace1f`). Quedan 11 vulnerabilidades de producción (1 alta y 10 moderadas), pendientes de una actualización mayor.

### Fixed
- **IP del cliente**: ya no se toma el primer valor de `X-Forwarded-For`, que controla el cliente, sino la entrada que añade la infraestructura (`TRUSTED_PROXY_HOPS = 1`). **Desplegado el 2026-10-29.** Confirmado que un `X-Forwarded-For` forjado no evade el límite; falta confirmar en el log que la IP resuelta es la pública real.
- **Rate limit fail-open**: `submitReclamo` y `submitContacto` responden 503 si Firestore falla, en lugar de dejar pasar la petición. `checkStatus` conserva el modo abierto a propósito. **Desplegado el 2026-10-29.**
- **Marcador `TEMP_ID`** eliminado del correo al administrador: el correo lleva el código real. **Desplegado el 2026-10-29.**
- **Errores internos**: los fallos de persistencia responden un mensaje genérico y el detalle queda en el log. Los handlers aún devuelven `error.message` para otras excepciones (pendiente, ver `functions/README.md`).

### Removed
- **Configurador 3D de ventanas** (commit `2ca4f3e`, 2026-08-26): eliminados `VentanaConfigurador3DCard.tsx`, `components/configurador3d/`, `src/features/services/data/ventanas-catalogo.json` y `scripts/optimize-images.mjs`; la dependencia `three` fue retirada de `package.json`. Las entradas históricas que describen el simulador 3D reflejan el estado de su fecha.

### Notes
- Los sistemas oficiales de ventanas son 4: Nova, Serie 25, Serie 35 y Serie 62.
- `PLAN_OPTIMIZACION.md` fue eliminado en el commit `a743595` (2026-07-24); `ARCHITECTURE.md` y `AI_HANDOFF.md` son hoy `docs/01_ARCHITECTURE.md` y `docs/02_AI_HANDOFF.md`.
- Último build verificado: 55 páginas prerenderizadas.

## [2026-08-25] - Unificación Oficial de Ventanas 3D, Layout 65/35 & Optimización de Documentación

### Added
- **Simulador 3D Puro**: Transformación del card `VentanaConfigurador3DCard` en un simulador visual técnico interactivo Three.js de vanos, perfiles y cristales.
- **Independencia de los 4 Sistemas**: Habilitación permanente de los 4 sistemas oficiales (`Sistema Nova`, `Serie 25`, `Serie 35`, `Serie 62`) para todos los tipos de ventana (`Corrediza`, `Proyectante`, `Batiente`, `Luz Fija`).
- **Sección Adicional**: Incorporación de acabados especiales (`Arenado` translúcido y `Diseño según cliente`) reflejados en tiempo real en los shaders PBR de Three.js.
- **Base de Conocimiento para LLMs**: Creación y optimización de `AGENTS.md` para asistentes de IA y modelos locales (Gemma 3/4, Qwen 2.5, DeepSeek).

### Changed
- **Proporción y Altura Compacta**: Configuración del visor 3D al 65% de ancho y panel de controles al 35% de ancho, con una altura estándar sincronizada de `460px` alineada con la galería y la ficha técnica.
- **Integración de Cabecera en Visor 3D**: Reubicación del título `"Ventana 3d"` y el badge dinámico de tipología como un overlay glassmorphism en el visor Three.js.
- **Ocultamiento de Navbar en Servicios**: Ocultamiento automático del navbar flotante de escritorio en rutas `/servicios/*` para una experiencia inmersiva.
- **Limpieza de Tipos de Vidrio**: Normalización estricta a 3 tipos (`Crudo`, `Laminado`, `Templado`) sin etiquetas de grosor redundantes.

### Added
- **Extracción de Catálogos Técnicos**: Incorporación de geometrías de perfiles extruidos precisos para carpintería de aluminio. Catálogo alineado a 4 sistemas oficiales: Nova, Serie 25, Serie 35 y Serie 62.
- **Dimensiones Paramétricas (W x H) y Selector de Sistemas**: Sliders interactivos para ancho y alto con recálculo en tiempo real, presets de vanos arquitectónicos y selector de 6 sistemas de ventanas. [Nota 2026-10-29: los sistemas oficiales son 4 — Nova, Serie 25, Serie 35 y Serie 62].
- **Ficha Técnica en Vivo & Cotizador WhatsApp**: Desglose dinámico de materiales en tiempo real y enlace directo a WhatsApp con plantilla pre-llenada.
- **Composición 2.5D y Shaders PBR**: Shader `MeshPhysicalMaterial` con IOR 1.52 para cristal, mapeo de tonos ACES Filmic para aluminio y ambientes con imágenes reales de showroom.



## [2026-07-22] - Google Maps API Key Deployment Fix

### Fixed
- **Google Maps API Key Embebida**: Se solucionó el problema donde el entorno de producción en Firebase Hosting no reconocía la API Key de Google Maps (mostrando el mensaje "For development purposes only"). Se realizó un despliegue forzado (`deploy:hosting`) asegurando que el archivo `.env.local` fuera leído por Next.js durante la construcción estática (`next build`), inyectando correctamente la variable `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` en el bundle final.

## [2026-06-20] - Environment Recovery & Mobile Layout Fixes

### Added
- **Configuración de Entorno Real**: Recuperación y configuración del archivo `.env` (ruta local, no versionada) con API Keys de Firebase, Auth Domain, Storage Bucket, Messaging ID, App ID y Google Maps API Key reales de producción usando la sesión activa de Firebase CLI.
- **Endpoints de Producción para API**: Vinculación directa con las URLs reales de producción de las Firebase Functions (`submitContacto`, `submitReclamo`, `checkStatus`) en el entorno local.

### Changed
- **Optimización de Interfaz Móvil**: Ocultamiento del botón flotante de WhatsApp en dispositivos móviles (`display={{ base: "none", md: "flex" }}`) en `src/widgets/FloatingActions/FloatingWhatsApp.tsx` para resolver colisión y superposición con el botón del menú flotante móvil en `src/widgets/Navbar/MobileNav.tsx`. En pantallas desktop se mantiene en la esquina inferior derecha.

## [2026-04-25] - Production Routing & Reclamation Book Fixes

### Fixed
- **Firebase Static Routing**: Resolved the issue where `/libro-de-reclamacion` was falling back to the home page by enabling `cleanUrls: true` in `firebase.json`. This ensures Next.js static HTML exports map correctly to clean URLs.
- **SSR Build Integrity**: Added `"use client";` to `AuraContainer.tsx` to fix the `prerender-error` caused by importing `framer-motion` in pre-rendered pages.
- **Reclamation Page Rendering**: Fully refactored `/libro-de-reclamacion` to use `AuraContainer`, ensuring the premium dark-mode aesthetic, smooth animations, and zero CLS.
- **SEO & Search Visibility**: Integrated the "Libro de Reclamaciones" into the `seo-utils.ts` JSON-LD Knowledge Graph, improving indexing and brand authority.
- **Layout Cleanup**: Removed redundant `<br />` tags and consolidated Box containers in `ReclamationForm.tsx` for a cleaner, maintainable codebase.

## [2026-04-25] - Performance & UX Optimizations

### Added
- **Performance Plan**: Generated `PLAN_OPTIMIZACION.md` detailing the 4-phase performance execution. [Nota 2026-10-29: `PLAN_OPTIMIZACION.md` fue eliminado en el commit a743595.]
- **Git Hooks**: Implemented a `.git/hooks/pre-commit` script to enforce FSD compliance, 100% type safety, and zero linting errors prior to any commit.

### Changed
- **Algorithm Optimization (O(1))**: Refactored array search algorithms (`Array.find()`) in `projectService.ts`, `serviceService.ts`, and `blogService.ts` to utilize HashMaps (`Map`) for instant `O(1)` data retrieval.
- **React Memoization**: Applied `React.memo` and `displayName` to heavily reused components like `GlassCard.tsx` and `AuraHeader.tsx` to eliminate unnecessary DOM re-renders.
- **Lazy Loading (Code Splitting)**: Integrated `next/dynamic` into `Gallery.tsx` to defer the loading of heavy Framer Motion components until they enter the viewport, radically shrinking the initial JS bundle.
- **LCP Asset Optimization**: Replaced `priority` with `loading="lazy"` on below-the-fold assets (e.g., Footer logo) to prioritize bandwidth for critical above-the-fold content.
- **UX Layout Sync (Zero CLS)**: Synchronized the skeleton loading state of `/proyectos/[id]` with its final rendered state, eliminating Cumulative Layout Shift during data hydration.
- **UX Breathing Room**: Increased the vertical gap dynamically (`gap={{ base: 3, md: 6 }}`) inside `ItemGridLayout.tsx` and `AuraHeader.tsx` to provide better visual separation between main headings and descriptions.

## [2026-04-25] - FSD Architectural Alignment & Documentation

### Changed
- **FSD Architecture Implementation**: Refactored the entire project structure to strictly follow Feature-Sliced Design (FSD). Moved `layout/` to `widgets/`, and legacy `views/` to `screens/` to prevent Next.js App Router conflicts.
- **Data Decentralization**: Migrated global static data files from `src/data/` into their respective domains within `src/features/` (e.g., `features/services/data`).
- **Path Aliases Updated**: Updated `tsconfig.json` to reflect the new architecture (`@screens`, `@widgets`, `@features`, `@shared`) and globally replaced outdated imports.

### Removed
- **Dead Code & Junk**: Conducted a deep clean of the repository, removing unused files (such as `App.css`, `pdf/virtual_archivo.pdf`), empty folders, and debug `console.log` statements.

### Added
- **AI Handoff Documentation (`AI_HANDOFF.md`)**: Created a dedicated handover document (hoy `docs/02_AI_HANDOFF.md`) outlining the new architecture, path alias rules, and quality standards for future AI agents.
- **Technical Architecture Guide (`ARCHITECTURE.md`)**: Drafted (hoy `docs/01_ARCHITECTURE.md`) a comprehensive Full-Stack guide detailing the Next.js/FSD frontend approach and the Firebase (Functions, Firestore, Storage) backend and security stance.

### Security
- **Firebase Hardening**: Ensured that `storage.rules` and `firestore.rules` maintain strict zero-trust write access, relying on verified Cloud Functions for data mutations.

## [2026-04-14] - Chakra UI v3 Final Migration & Stabilization

### Fixed
- **Critical Crash (DOMTokenList)**: Fixed the `"DOMTokenList.remove: The token can not contain whitespace"` error triggered by `next-themes` and `ChakraProvider`. Updated the `ColorModeProvider` to use `attribute="data-theme"` instead of `class` to properly isolate Chakra UI's theme variables. 
- **Missing Icon Components**: Restored the `Icon` import from `@chakra-ui/react` in `StoreSection.jsx` which caused a crash when attempting to render Lucide-React icons (`MapPin` & `Clock`).
- **CSS-in-JS Syntax Adherence**: Fixed internal Chakra DOM warnings by replacing all instances of standard CSS kebab-case properties `"-ms-overflow-style": "none"` with their valid camelCase representations `msOverflowStyle: "none"` in `GalleryThumbnails.jsx` and `ServicePageLayout.jsx`.
- **DOM Prop Standardization**: Prevented React reconciliation warnings by swapping `fetchPriority` (camelCase) to `fetchpriority` (lowercase standard HTML attribute) on underlying `img` tags across `GalleryViewer.jsx` and `LandingPageSection.jsx`.

### Added
- **Global Component Error Boundary (`ComponentErrorBoundary.jsx`)**: Added a global boundary wrapper across `Layout.jsx`. It locally isolates and catches sub-component React tree crashes allowing the application header/footer framework to stay alive instead of throwing a blank white screen, and exposes the specific `componentStack` trace back to the developer in Dev Mode.
- **Developer Error Overlay (`DevErrorOverlay.jsx`)**: Engineered a fixed bottom overlay panel that actively registers global DOM events like `window.onerror`, unhandled promise rejections (`unhandledrejection`), and custom `console.error` logs.

### Changed
- **Mass Codebase Linting Cleanup**: Deployed a target cleanup script eliminating un-used `useColorMode`, `Box` and `Link` imports over 23 files generated during the preceding V2 -> V3 migration. This enforced a zero-warning successful build output.
- **Deprecated Motion hooks**: Removed direct usage of Chakra's `usePrefersReducedMotion` per v3 migration protocols.

### Performance
- **Successful Production Build**: Ensured a successful Vite `pnpm run build` with `exit code 0`, optimizing heavy gallery / module assets yielding a total bundle size reduction and valid HTML generation for hoisting.
