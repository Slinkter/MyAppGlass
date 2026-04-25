# Glass & Aluminum Company S.A.C. - Portal GYA (Next.js 16)

Plataforma corporativa de alta gama optimizada para el rendimiento y SEO de autoridad. Diseñada para **Glass & Aluminum Company S.A.C.**, líderes en soluciones premium de cristalería, ventanas antiruido y mamparas en La Molina, Lima.

## 🚀 Innovación Técnica & Performance
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) con soporte nativo para **Static Export**.
- **UI Engine:** [Chakra UI v3](https://chakra-ui.com/) - Sistema de diseño Aura.
- **Rendimiento 120Hz:** Optimización agresiva mediante aceleración por GPU (`translateZ`, `will-change`) y aislamiento de pintura (`contain: layout style`) para garantizar una fluidez total en dispositivos modernos.
- **Proporción Áurea (Phi):** Sistema de espaciado y jerarquía visual basado estrictamente en la escala Fibonacci (`phi_xs` a `phi_3xl`), garantizando armonía visual perfecta.
- **Zero Layout Shift:** Skeletons de carga sincronizados al 100% con los componentes finales para una experiencia de usuario sin saltos.

## 🔍 SEO de Autoridad (Search Domination)
- **Local SEO Mastery:** Optimizado para términos de alta conversión como *"Vidriería en La Molina"* y *"Ventanas Antiruido Lima"*.
- **Estructura Sitelinks:** Esquema JSON-LD avanzado para generar pestañas de navegación (Portal, Ventanas, Mamparas, Proyectos) directamente en los resultados de Google.
- **Blog de Autoridad:** Módulo dinámico de artículos estratégicos para capturar tráfico informativo y posicionar a GYA como el referente técnico del sector.
- **Sitemap 2.0:** Indexación dinámica con prioridades jerárquicas y metadatos de imágenes WebP.

## ⚙️ Infraestructura Backend (Cloud Reliability)
- **Firebase Functions v2:** Lógica serverless de alto rendimiento para procesos legales (Libro de Reclamaciones).
- **Resend Integration:** Motor de correo electrónico transaccional con notificaciones HTML enriquecidas.
- **Firestore Security:** Persistencia legal de reclamos con marcas de tiempo de servidor y estados de auditoría.
- **Secret Manager:** Blindaje total de claves API y correos administrativos.

## 📂 Arquitectura del Proyecto (FBA)
El proyecto utiliza una **Feature-Based Architecture (FBA)** escalable:
- `src/app/`: Rutas, Metadatos y Layouts de Next.js.
- `src/features/`: Módulos autónomos (`blog`, `projects`, `services`, `reclamation-book`).
- `src/shared/`: Componentes Aura, Hooks de utilidad y servicios de datos.
- `functions/`: Microservicios serverless en Node.js 20+.

## 🛠️ Desarrollo Local
1. **Dependencias:** `pnpm install`
2. **Backend (Requerido para Reclamaciones):** 
   - Tener Java OpenJDK 25 instalado.
   - `cd functions && pnpm run dev` (Inicia emuladores).
3. **Frontend:** `pnpm run dev`

### Scripts Principales
- `pnpm run py`: Ejecuta el pipeline completo (Optimización de imágenes -> Build -> Typecheck -> Preview).
- `pnpm run deploy:hosting`: Despliega la versión optimizada a la web.
- `pnpm run deploy:functions`: Despliega el backend a la nube de Google.

---
*Mantenido por el Equipo de Agentes Senior de GYA Company. Actualizado: Abril 2026.*
