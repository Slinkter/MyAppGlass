# Glass & Aluminum Company S.A.C. - Portal Corporativo (Next.js 16)

Plataforma corporativa premium de alta gama optimizada para el rendimiento y SEO de autoridad. Diseñada para **Glass & Aluminum Company S.A.C.**, líderes en soluciones arquitectónicas de cristalería, ventanas antirruido, mamparas y estructuras de aluminio en Lima, Perú.

---

## 🚀 Innovación Técnica & Arquitectura

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) con exportación estática total (`output: 'export'`).
- **UI Engine:** [Chakra UI v3](https://chakra-ui.com/) - Sistema de diseño Aura con tokens nativos (`space.1` a `space.16`).
- **Simulador visual (`/simulador-ai`):** simulador 100% local que superpone la imagen de un producto sobre la foto subida por el usuario (queda en el navegador) y un chat con respuestas predefinidas; no usa IA generativa ni APIs externas.
- **Módulos de gestión (cliente + Firestore):** panel de administración en `/admin` con CRUD de servicios y proyectos (`/admin/servicios`, `/admin/proyectos`), protegido con `AdminRouteGuard`; páginas públicas de servicios y proyectos leídas desde Firestore con fallback local; cotizador de presupuesto en `/presupuesto`. No existe tienda pública ni carrito.
- **Rendimiento 120Hz:** Optimización por GPU (`translateZ(0)`, `will-change`) y prevención de CLS mediante sincronización de esqueletos de carga.
- **Catálogo Oficial:** 4 Sistemas oficiales independientes (`Sistema Nova`, `Serie 25`, `Serie 35`, `Serie 62`) como regla de negocio (ver `AGENTS.md`).
- **Backend Serverless:** Firebase Functions v2 (Node.js 22, `apps/functions/`), Firestore y Resend para gestión legal de Libro de Reclamaciones.

---

## 🔍 SEO de Autoridad & Descubrimiento

- **SEO Local:** Posicionamiento estructurado para términos de alta conversión (_"Vidriería en La Molina"_, _"Ventanas Antirruido Lima"_).
- **Rich Snippets & Sitelinks:** Marcado Schema.org JSON-LD para indexación jerárquica en Google.
- **SSG:** 60 páginas pre-renderizadas estáticamente en build time.

---

## 📂 Estructura del Proyecto (Monorepo pnpm)

```
MyAppGlass/
├── AGENTS.md                      # Guía maestra de contexto para LLMs e IA
├── firebase.json                  # Hosting (public: apps/web/out) y Functions (source: apps/functions)
├── firestore.rules / storage.rules
├── pnpm-workspace.yaml            # apps/* y packages/*
├── apps/
│   ├── web/                       # @gya/web: Next.js 16 con export estático (salida en apps/web/out)
│   │   ├── src/app/               # Rutas Next.js (App Router), wrappers ligeros
│   │   ├── src/features/          # Módulos de negocio (FSD): admin, ai-simulator, auth, blog, contacto,
│   │   │                          #   home, presupuesto, products, projects, reclamation-book, services
│   │   ├── src/screens/           # Composiciones visuales de página
│   │   ├── src/widgets/           # Bloques estructurales (Navbar, Footer, FloatingActions, AdminNav)
│   │   ├── src/shared/            # Utilidades, API Firebase, hooks, constantes y UI base
│   │   └── tests/rules/           # Prueba de reglas con emuladores (rules-smoke.sh)
│   └── functions/                 # @gya/functions: Firebase Functions v2 (Node.js 22)
└── packages/
    └── shared/                    # @gya/shared: companyData, SITE_URL, CompanyInfo
```

---

## 🛠️ Comandos de Desarrollo

Todos los comandos se ejecutan desde la **raíz** del repositorio:

```bash
# Instalar dependencias (workspace completo)
pnpm install

# Servidor de desarrollo (puerto 3000)
pnpm run dev

# Verificación de tipos, lint y compilación
pnpm run typecheck
pnpm run lint
pnpm run build            # Export estático a apps/web/out

# Pruebas (solo bajo petición; ver AGENTS.md)
pnpm run test:run         # Vitest (apps/web)
pnpm run test:functions   # node:test (apps/functions)

# Despliegue
pnpm run deploy:hosting   # build + Firebase Hosting
pnpm run deploy:functions # Firebase Functions
```

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

- Públicas: `/`, `/servicios`, `/servicios/ver?slug=…` (detalle de cliente), `/proyectos`, `/proyectos/ver?id=…` (detalle de cliente), `/presupuesto`, `/simulador-ai`, `/contacto`, `/blog`, `/libro-de-reclamacion`, `/cuentas-bancarias`, `/politicas-empresa`, `/auth`.
- Admin (requiere sesión de administrador, `AdminRouteGuard`): `/admin`, `/admin/servicios`, `/admin/proyectos`, `/admin/inventario`, `/admin/ventas`, `/admin/clientes`, `/admin/reportes`.

> Las rutas de detalle `/servicios/ver` y `/proyectos/ver` son de cliente (query string), por lo que no tienen SEO propio por página. Las rutas `/servicios/[serviceSlug]` y `/proyectos/[projectId]` existen como rutas prerenderizadas.

---

## 📝 Documentación del Proyecto

Para consultar los manuales técnicos, guías de desarrollo y auditorías:

- 📚 **[Centro de Documentación (docs/README.md)](docs/README.md)**
- 🗺️ **[Plan de Migración (PLAN_MIGRACION.md)](PLAN_MIGRACION.md)**
- 🤖 **[Guía para Agentes LLM (AGENTS.md)](AGENTS.md)**
- 🏛️ **[Manual de Arquitectura (docs/01_ARCHITECTURE.md)](docs/01_ARCHITECTURE.md)**
- 📋 **[Historial de Versiones (docs/05_CHANGELOG.md)](docs/05_CHANGELOG.md)**
