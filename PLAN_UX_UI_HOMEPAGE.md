# 🚀 Plan de Optimización UI/UX - Página Principal (Homepage)

Este plan de trabajo detalla las optimizaciones de diseño visual, accesibilidad y animaciones en la página principal. La ejecución será co-liderada por dos perfiles de agentes especialistas senior para garantizar la máxima calidad técnica y estética.

---

## 👥 Roles y Responsabilidades de los Agentes Especialistas

### 🎨 1. Agente Diseñador Web Senior (Web Designer Specialist)
* **Objetivo principal:** Optimizar la estética visual, la consistencia de estilos y la calidad de las transiciones en los componentes de la página principal.
* **Responsabilidades específicas:**
  - Rediseñar y suavizar las micro-interacciones hover de las tarjetas (`FeatureCard` y `ClientCard`) para que luzcan premium y fluidas.
  - Asegurar la alineación exacta y la armonía visual de las cuadrículas con los tokens globales de Chakra UI v3.
  - Refactorizar las animaciones de entrada (stagger/cascada) para dar una sensación orgánica al cargar las secciones.
  - Pulir la presentación estética del Hero (`LandingPageSection`) y el mapa interactivo (`StoreSection`).

### 🧠 2. Agente Revisor UI/UX Senior (UI/UX & Performance Reviewer)
* **Objetivo principal:** Garantizar la accesibilidad (A11y), semántica (SEO), rendimiento del motor de renderizado (rendimiento a 120Hz/60fps) y cumplimiento de las mejores prácticas.
* **Responsabilidades específicas:**
  - Auditar e implementar la jerarquía semántica correcta (inversión de `h2` a `h1` en el Hero).
  - Eliminar los selectores generales de transición (`transition: all`) y reemplazarlos por propiedades explícitas para evitar recálculos en el navegador (Layout Thrashing).
  - Limitar el número de elementos animados en paralelo en hover (máximo 2 por componente) para evitar fatiga cognitiva y mejorar la usabilidad.
  - Garantizar la compatibilidad con el soporte de accesibilidad, agregando `aria-hidden="true"` a los iconos decorativos y asegurando el soporte para `prefers-reduced-motion`.

---

## 📋 Lista de Tareas a Realizar

### [DISEÑADOR WEB] - Optimización Estética y Estilo
- [ ] **Stagger en Cuadrículas:** Conectar la propiedad `delay` en `ItemGridItem` (`ItemGridLayout.tsx`) para animar las tarjetas de características (`FeaturesSection`) y clientes (`ClientsSection`) de forma secuencial al aparecer.
- [ ] **Simplificación Hover en Clientes:** Modificar `ClientCard.tsx` para reducir las animaciones de hover a solo 2 efectos limpios (ej. elevación tridimensional + zoom suave de imagen). Mantener la descripción estática.
- [ ] **Consistencia de Botones y Elementos:** Revisar márgenes y rellenos en `LandingPageSection.tsx` para ajustarse estrictamente a las proporciones de Chakra UI v3.

### [REVISOR UI/UX] - Semántica, Rendimiento y Accesibilidad
- [ ] **Corrección Jerárquica:** Intercambiar el orden de encabezados en `LandingPageSection.tsx` para que el título principal de la página sea un `h1` semántico.
- [ ] **Propiedades de Transición Explícitas:** Sustituir `transition="all"` por propiedades explícitas en `FeatureCard.tsx`, `ClientCard.tsx` y el logo en `LandingPageSection.tsx` (optimizando para el compositor del navegador).
- [ ] **Etiquetado ARIA:** Añadir `aria-hidden="true"` a los iconos vectoriales decorativos de Lucide en la sección de tiendas (`StoreSection.tsx`) y en las tarjetas.

---

## 🧪 Criterios de Aceptación
1. **Compilación Limpia:** `pnpm run build` debe compilar al 100% las rutas estáticas.
2. **Fluidez 120Hz:** Animaciones libres de caídas de frames o saltos estructurales (Cumulative Layout Shift).
3. **Cero Warnings de Linter:** El código debe ajustarse a las reglas de TypeScript estrictas de la aplicación.
