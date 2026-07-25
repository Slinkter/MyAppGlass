# 🤖 AI Agent Handoff Document - MyAppGlass

Bienvenido, próximo Agente de IA. Este documento contiene el estado actual del proyecto tras una cirugía mayor de refactorización arquitectónica. Léelo detenidamente antes de sugerir o realizar cambios.

## 🏗️ Estado de la Arquitectura (FSD - Feature-Sliced Design)

El proyecto acaba de ser refactorizado para seguir estrictamente los principios de **Feature-Sliced Design**. Para evitar conflictos con el *App Router* de Next.js, se han adaptado algunas convenciones de nombres.

### Estructura de Directorios Actual:
*   **`src/app/`**: **Capa de Enrutamiento**. Solo debe contener la configuración de rutas de Next.js (`layout.tsx`, `page.tsx`). **No incluir lógica de UI compleja aquí.** Los archivos `page.tsx` deben ser envolturas delgadas que importan desde `src/screens`.
*   **`src/screens/`**: **Capa de Páginas**. (Renombrada desde `views` y no llamada `pages` para evitar que Next.js asuma que es el *Pages Router* heredado). Aquí reside la composición visual de cada ruta.
*   **`src/widgets/`**: **Capa de Bloques Estructurales**. Componentes de alto nivel que orquestan el layout global (ej. `Navbar`, `Footer`, `FloatingActions`).
*   **`src/features/`**: **Capa de Negocio**. Funcionalidades específicas del dominio (`home`, `projects`, `services`, `blog`, `contacto`). **Importante:** La data estática relacionada a una feature ahora reside dentro de su propia subcarpeta `/data` (ej. `src/features/services/data`).
*   **`src/shared/`**: **Capa de Fundamentos**. Utilidades transversales, componentes genéricos puros (UI Kit, Aura Components), configuración global (`config`), providers (`providers/theme`) y servicios de red (`api`).

### 🔗 Path Aliases (`tsconfig.json`):
Utiliza siempre estos alias para las importaciones:
*   `@/screens/*`
*   `@/widgets/*`
*   `@/features/*`
*   `@/shared/*`

## 🧹 Reglas de Limpieza y Calidad

*   **Sin Código Basura:** Se han eliminado los `console.log` de depuración, archivos muertos (`App.css`, `pdf/`) y carpetas vacías. **Mantén esta higiene.** Usa `logger.ts` (`@shared/utils/logger`) si necesitas registrar eventos.
*   **Identidad Asegurada:** El nombre oficial en todo el sitio es **"Glass & Aluminum Company S.A.C."**.
*   **Ortografía Validada:** Términos técnicos como *"antirruido"* (con doble r) y *"vidrio y aluminio"* (singular) están normalizados.
*   **Seguridad y Backend:** El backend (carpeta `functions/` y archivos de configuración de Firebase) está congelado y NO se debe modificar bajo ninguna circunstancia a menos que el usuario lo solicite de manera directa. Firebase Storage tiene reglas restrictivas (`storage.rules`). No hay credenciales quemadas en el código. El formulario de contacto exige aceptación de privacidad.

## 🚀 Estado Técnico
*   **Build:** El proyecto compila al 100% (Generación Estática de 36/36 páginas).
*   **Lint:** Pasa sin errores (solo warnings menores de tipado `any` en algunos componentes legacy).
*   **Variables de Entorno:** Archivo [.env](file:///C:/Users/LJCR/Documents/GitHub/MyAppGlass/.env) totalmente recuperado y configurado con credenciales de Firebase/Google Maps reales y endpoints de Cloud Run validados.

## ⏭️ Próximos Pasos (Next Steps)

Dependiendo de la petición del usuario, puedes proceder con:
1.  **Despliegue a Producción:** Ejecutar `pnpm run deploy:hosting` para subir el proyecto optimizado a Firebase Hosting.
2.  **Nueva Funcionalidad:** Si el usuario pide algo nuevo, créalo respetando las capas FSD mencionadas.
3.  **Desarrollo del Blog:** La rama actual es `feat/seo-authority-blog`. Si se va a continuar el trabajo de SEO y el Blog, enfócate en `src/features/blog`.

¡Buena suerte, colega! 🧠✨
