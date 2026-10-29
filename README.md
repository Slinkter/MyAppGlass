# Glass & Aluminum Company S.A.C. - Portal Corporativo (Next.js 16)

Plataforma corporativa premium de alta gama optimizada para el rendimiento y SEO de autoridad. Diseñada para **Glass & Aluminum Company S.A.C.**, líderes en soluciones arquitectónicas de cristalería, ventanas antirruido, mamparas y estructuras de aluminio en Lima, Perú.

---

## 🚀 Innovación Técnica & Arquitectura

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) con exportación estática total (`output: 'export'`).
- **UI Engine:** [Chakra UI v3](https://chakra-ui.com/) - Sistema de diseño Aura con tokens nativos (`space.1` a `space.16`).
- **Simulador visual (`/simulador-ai`):** simulador 100% local que superpone la imagen de un producto sobre la foto subida por el usuario (queda en el navegador) y un chat con respuestas predefinidas; no usa IA generativa ni APIs externas.
  > Nota histórica: el configurador 3D con Three.js (`VentanaConfigurador3DCard`) y su catálogo JSON fueron eliminados en el commit `2ca4f3e` (2026-08-26); `three` ya no es dependencia.
- **Módulos de gestión (cliente + Firestore):** acceso con roles en `/auth`; panel de administración en `/admin` con `/admin/inventario`, `/admin/ventas`, `/admin/clientes` y `/admin/reportes` (protegido con `AdminRouteGuard`); cotizador de presupuesto en `/presupuesto`. No existe tienda pública ni carrito.
- **Rendimiento 120Hz:** Optimización por GPU (`translateZ(0)`, `will-change`) y prevención de CLS mediante sincronización de esqueletos de carga.
- **Catálogo Oficial:** 4 Sistemas oficiales independientes (`Sistema Nova`, `Serie 25`, `Serie 35`, `Serie 62`) como regla de negocio (ver `AGENTS.md`).
  > Nota: el catálogo `ventanas-catalogo.json` y el configurador que lo consumía fueron eliminados (`2ca4f3e`); la regla de los 4 sistemas se conserva para contenidos y futura re-implementación.
- **Backend Serverless:** Firebase Functions v2 (Node.js 22), Firestore y Resend para gestión legal de Libro de Reclamaciones.

---

## 🔍 SEO de Autoridad & Descubrimiento

- **SEO Local:** Posicionamiento estructurado para términos de alta conversión (_"Vidriería en La Molina"_, _"Ventanas Antirruido Lima"_).
- **Rich Snippets & Sitelinks:** Marcado Schema.org JSON-LD para indexación jerárquica en Google.
- **SSG:** 55 páginas pre-renderizadas estáticamente en build time.

---

## 📂 Estructura del Proyecto (Feature-Sliced Design)

```
MyAppGlass/
├── AGENTS.md                                # Guía maestra de contexto para LLMs e IA
├── src/
│   ├── app/                                 # Rutas Next.js 16 (App Router)
│   ├── components/ui/                       # Wrappers de Chakra UI v3
│   ├── features/                            # Módulos de negocio: ai-simulator, auth, blog, contacto, home,
│   │                                        #   presupuesto, products, projects, reclamation-book, services
│   ├── screens/                             # Composiciones visuales de página (Admin, Auth, Presupuesto, SimuladorAI, ...)
│   ├── widgets/                             # Bloques estructurales (Navbar, Footer, FloatingActions)
│   └── shared/                              # Utilidades, configuración de empresa y UI base
└── functions/                               # Microservicios Firebase Functions v2
```

---

## 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo (puerto 3000)
pnpm run dev

# Verificación de tipos TypeScript
pnpm run typecheck

# Compilación de producción (Export estático a out/)
pnpm run build

# Despliegue a Firebase Hosting
pnpm run deploy:hosting
```

---

## 📝 Documentación del Proyecto

Para consultar los manuales técnicos, guías de desarrollo y auditorías:

- 📚 **[Centro de Documentación (docs/README.md)](docs/README.md)**
- 🤖 **[Guía para Agentes LLM (AGENTS.md)](AGENTS.md)**
- 🏛️ **[Manual de Arquitectura (docs/01_ARCHITECTURE.md)](docs/01_ARCHITECTURE.md)**
- 📋 **[Historial de Versiones (docs/05_CHANGELOG.md)](docs/05_CHANGELOG.md)**
