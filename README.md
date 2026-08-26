# Glass & Aluminum Company S.A.C. - Portal Corporativo (Next.js 16)

opencode -s ses_fbfd21e85ffeywTv1EHoxmp2t4

Plataforma corporativa premium de alta gama optimizada para el rendimiento y SEO de autoridad. Diseñada para **Glass & Aluminum Company S.A.C.**, líderes en soluciones arquitectónicas de cristalería, ventanas antirruido, mamparas y estructuras de aluminio en Lima, Perú.

---

## 🚀 Innovación Técnica & Arquitectura

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) con exportación estática total (`output: 'export'`).
- **UI Engine:** [Chakra UI v3](https://chakra-ui.com/) - Sistema de diseño Aura con tokens nativos (`space.1` a `space.16`).
- **Simulador 3D Interactivo:** Motor [Three.js](https://threejs.org/) (`VentanaConfigurador3DCard`) con shaders PBR físicos, proporción 65%/35%, presets dinámicos y simulación visual de perfiles y cristales.
- **Rendimiento 120Hz:** Optimización por GPU (`translateZ(0)`, `will-change`) y prevención de CLS mediante sincronización de esqueletos de carga.
- **Catálogo Oficial:** 4 Sistemas oficiales independientes (`Sistema Nova`, `Serie 25`, `Serie 35`, `Serie 62`).
- **Backend Serverless:** Firebase Functions v2 (Node.js 20), Firestore y Resend para gestión legal de Libro de Reclamaciones.

---

## 🔍 SEO de Autoridad & Descubrimiento

- **SEO Local:** Posicionamiento estructurado para términos de alta conversión (_"Vidriería en La Molina"_, _"Ventanas Antirruido Lima"_).
- **Rich Snippets & Sitelinks:** Marcado Schema.org JSON-LD para indexación jerárquica en Google.
- **SSG:** 56 rutas pre-renderizadas estáticamente en build time.

---

## 📂 Estructura del Proyecto (Feature-Sliced Design)

```
MyAppGlass/
├── AGENTS.md                                # Guía maestra de contexto para LLMs e IA
├── src/
│   ├── app/                                 # Rutas Next.js 16 (App Router)
│   ├── features/                            # Módulos de negocio (services, projects, blog, home)
│   ├── screens/                             # Composiciones visuales de página
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

- 📚 **[Centro de Documentación (docs/README.md)](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/docs/README.md)**
- 🤖 **[Guía para Agentes LLM (AGENTS.md)](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/AGENTS.md)**
- 🏛️ **[Manual de Arquitectura (docs/01_ARCHITECTURE.md)](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/docs/01_ARCHITECTURE.md)**
- 📋 **[Historial de Versiones (docs/05_CHANGELOG.md)](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/docs/05_CHANGELOG.md)**
