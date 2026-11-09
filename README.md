# Glass & Aluminum Company S.A.C. - Portal Corporativo (Next.js 16)

Sitio corporativo de **Glass & Aluminum Company S.A.C.**, vidriería y carpintería de aluminio en La Molina, Lima. Compra vidrio, aluminio y accesorios, ensambla en su taller e instala con equipo propio en cinco distritos.

---

## 🚀 Innovación Técnica & Arquitectura

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) con exportación estática total (`output: 'export'`).
- **UI Engine:** [Chakra UI v3](https://chakra-ui.com/) con el sistema de diseño del proyecto y sus tokens nativos (`space.1` a `space.16`); reglas en `apps/web/DESIGN.md`.
- **Simulador visual (`/simulador-ai`):** simulador 100% local que superpone la imagen de un producto sobre la foto subida por el usuario (queda en el navegador) y un chat con respuestas predefinidas; no usa IA generativa ni APIs externas.
- **Módulos de gestión (cliente + Firestore):** panel de administración en `/admin` con CRUD de servicios y proyectos (`/admin/servicios`, `/admin/proyectos`), protegido con `AdminRouteGuard`; páginas públicas de servicios y proyectos leídas desde Firestore (única fuente de datos); cotizador de presupuesto en `/presupuesto`. Catálogo comercial y tienda online en `/tienda` con carrito en `/tienda/checkout` (`features/tienda`, checkout por WhatsApp con límite de stock e IGV).
- **Rendimiento 120Hz:** Optimización por GPU (`translateZ(0)`, `will-change`) y prevención de CLS mediante sincronización de esqueletos de carga.
- **Catálogo Oficial:** 6 Sistemas oficiales (`Sistema Nova`, `Serie 25`, `Serie 35`, `Serie 62`, `Acústica` y `PVC abatible`) como regla de negocio (ver `AGENTS.md`).
- **Backend Serverless:** Firebase Functions v2 (Node.js 22, `apps/functions/`), Firestore y Resend para gestión legal de Libro de Reclamaciones.

---

## 🔍 SEO de Autoridad & Descubrimiento

- **SEO Local:** Posicionamiento estructurado para términos de alta conversión (_"Vidriería en La Molina"_, _"Ventanas Antirruido Lima"_).
- **Rich Snippets & Sitelinks:** Marcado Schema.org JSON-LD para indexación jerárquica en Google.
- **SSG:** export estático en `apps/web/out/` con `sitemap.xml`, `robots.txt` y `manifest.webmanifest` generados en build. El número de rutas depende de los servicios y proyectos publicados en Firestore.

---

## 📂 Estructura del Proyecto

Monorepo pnpm con Feature-Sliced Design:

- `apps/web/` (`@gya/web`): Next.js 16 con export estático (salida en `apps/web/out`).
- `apps/functions/` (`@gya/functions`): Firebase Functions v2 (Node.js 22).
- `packages/shared/` (`@gya/shared`): `companyData`, `SITE_URL`, `CompanyInfo`.

Detalle de capas y módulos en [docs/01_ARCHITECTURE.md](docs/01_ARCHITECTURE.md).

---

## 🛠️ Comandos de Desarrollo

Todos los comandos se ejecutan desde la **raíz** del repositorio:

```bash
# Instalar dependencias (workspace completo)
pnpm install

# Servidor de desarrollo (puerto 3000)
pnpm run dev

# Verificación de tipos y compilación
pnpm run typecheck
pnpm run build            # Export estático a apps/web/out
```

Tabla completa de comandos, despliegue y reglas de pruebas: [AGENTS.md §1](AGENTS.md).

### Emuladores de Firebase (desarrollo local)

Terminal 1, desde la raíz:

```bash
firebase emulators:start --only auth,firestore,storage --project gya-app-4c8a9
```

Terminal 2, desde la raíz:

```bash
NEXT_PUBLIC_USE_EMULATORS=true pnpm run dev
```

### Rutas principales

- Públicas: `/`, `/servicios/[serviceSlug]`, `/servicios/ver?slug=…`, `/proyectos/[projectId]`, `/proyectos/ver?id=…`, `/vidrieria/[distrito]`, `/tienda`, `/tienda/checkout`, `/mi-cuenta`, `/presupuesto`, `/simulador-ai`, `/contacto`, `/blog`, `/blog/[slug]`, `/libro-de-reclamacion`, `/cuentas-bancarias`, `/politicas-empresa`, `/auth`, `/design-system` (showcase del sistema de diseño) y `/design-system-ubicacion` (prototipos).
- Admin (requiere sesión de administrador, `AdminRouteGuard`): `/admin`, `/admin/servicios`, `/admin/proyectos`, `/admin/inventario`, `/admin/ventas`, `/admin/clientes`, `/admin/reportes`.

---

## 📝 Documentación del Proyecto

Para consultar los manuales técnicos, guías de desarrollo y auditorías:

- 📚 **[Centro de Documentación (docs/README.md)](docs/README.md)**
- 🎨 **[Design System (apps/web/DESIGN.md)](apps/web/DESIGN.md)**
- 🤖 **[Guía para Agentes LLM (AGENTS.md)](AGENTS.md)**
- 🏛️ **[Manual de Arquitectura (docs/01_ARCHITECTURE.md)](docs/01_ARCHITECTURE.md)**
- 📋 **[Historial de Versiones (docs/05_CHANGELOG.md)](docs/05_CHANGELOG.md)**
