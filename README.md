hola liam asus ubuntu
agy --conversation=15c3c133-4ab8-496f-a031-547abdc71bfe

# Glass & Aluminum Company S.A.C. - Portal GYA (Next.js 16)

Plataforma corporativa de alta gama optimizada para el rendimiento y SEO de autoridad. Diseñada para **Glass & Aluminum Company S.A.C.**, líderes en soluciones premium de cristalería, ventanas antiruido y mamparas en La Molina, Lima.

## 🚀 Innovación Técnica & Performance

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) con soporte nativo para **Static Export**.
- **UI Engine:** [Chakra UI v3](https://chakra-ui.com/) - Sistema de diseño Aura.
- **Rendimiento 120Hz:** Optimización agresiva mediante aceleración por GPU (`translateZ`, `will-change`) y aislamiento de pintura (`contain: layout style`) para garantizar una fluidez total en dispositivos modernos.
- **Chakra UI v3 Spacing Scale:** Sistema de espaciado nativo basado en 4px (`space.1` = 4px, `space.4` = 16px, `space.8` = 32px, etc.), garantizando consistencia y zero-config.
- **Zero Layout Shift:** Skeletons de carga sincronizados al 100% con los componentes finales para una experiencia de usuario sin saltos.

## 🔍 SEO de Autoridad (Search Domination)

- **Local SEO Mastery:** Optimizado para términos de alta conversión como _"Vidriería en La Molina"_ y _"Ventanas Antiruido Lima"_.
- **Estructura Sitelinks:** Esquema JSON-LD avanzado para generar pestañas de navegación (Portal, Ventanas, Mamparas, Proyectos) directamente en los resultados de Google.
- **Blog de Autoridad:** Módulo dinámico de artículos estratégicos para capturar tráfico informativo y posicionar a GYA como el referente técnico del sector.
- **Sitemap 2.0:** Indexación dinámica con prioridades jerárquicas y metadatos de imágenes WebP.

## ⚙️ Infraestructura Backend (Cloud Reliability)

- **Firebase Functions v2:** Lógica serverless de alto rendimiento para procesos legales (Libro de Reclamaciones).
- **Resend Integration:** Motor de correo electrónico transaccional con notificaciones HTML enriquecidas.
- **Firestore Security:** Persistencia legal de reclamos con marcas de tiempo de servidor y estados de auditoría.
- **Secret Manager:** Blindaje total de claves API y correos administrativos.

## 📂 Arquitectura del Proyecto (FSD)

El proyecto utiliza **Feature-Sliced Design (FSD)** para máxima escalabilidad y separación de responsabilidades:

- `src/app/`: Rutas, Metadatos y Layouts de Next.js. Capa exclusiva de enrutamiento.
- `src/screens/`: Implementación de las páginas visuales (ensamblaje de widgets y features).
- `src/widgets/`: Bloques estructurales complejos (Navbar, Footer).
- `src/features/`: Módulos autónomos de negocio con su propia data (`blog`, `projects`, `services`).
- `src/shared/`: Componentes genéricos (Aura), utilidades, configuración y API.
- `functions/`: Microservicios serverless en Node.js 20+.

## 🛠️ Desarrollo Local

1. **Dependencias:** `pnpm install`
2. **Variables de Entorno:** Configurar las claves en `.env` o `.env.local` (Firebase, Google Maps, reCAPTCHA y endpoints de Cloud Functions).
3. **Backend (Requerido para Reclamaciones en local):**
    - Tener Java OpenJDK instalado.
    - `cd functions && pnpm run dev` (Inicia emuladores locales de Firebase).
4. **Frontend:** `pnpm run dev`

### Scripts Principales

- `pnpm run py`: Ejecuta el pipeline completo (Optimización de imágenes -> Build -> Typecheck -> Preview).
- `pnpm run deploy:hosting`: Despliega la versión optimizada a Firebase Hosting.
- `pnpm run deploy:functions`: Despliega las Cloud Functions a Google Cloud.

## 📝 Documentación del Proyecto

Para consultar la arquitectura, guías de desarrollo, seguridad backend y manuales de SEO, acceda al portal central:

- 📚 **[Centro de Documentación Técnica (docs/README.md)](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/docs/README.md)**

### Accesos Rápidos

- **01. Arquitectura:** [`docs/01_ARCHITECTURE.md`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/docs/01_ARCHITECTURE.md)
- **02. Protocolo de IA & FSD:** [`docs/02_AI_HANDOFF.md`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/docs/02_AI_HANDOFF.md)
- **06. Guía de Desarrollo Local:** [`docs/06_DOCS_DEVELOPMENT.md`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/docs/06_DOCS_DEVELOPMENT.md)
- **08. Seguridad Backend:** [`docs/08_DOCS_SECURITY_BACKEND.md`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/docs/08_DOCS_SECURITY_BACKEND.md)
- **11. Manual SEO Local:** [`docs/11_MANUAL_SEO_LOCAL.md`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/docs/11_MANUAL_SEO_LOCAL.md)
- **12. E-Commerce, Inventario & AR:** [`docs/12_PLAN_ECOMMERCE_INVENTARIO_AR.md`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/docs/12_PLAN_ECOMMERCE_INVENTARIO_AR.md)
- **13. Plan Ágil Scrum & Sprints:** [`docs/13_PLAN_TRABAJO_SCRUM_FASES.md`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/docs/13_PLAN_TRABAJO_SCRUM_FASES.md)
