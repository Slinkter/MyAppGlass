# 🚀 Plan de Optimización UI/UX - Página Principal (Homepage)

Este plan de trabajo detalla las optimizaciones de diseño visual, accesibilidad y animaciones en la página principal. La ejecución es orquestada por los **10 Agentes Senior** definidos en `doc/AGENTS.md`.

---

## 📋 Estado General

| Fase | Estado |
|------|--------|
| Auditoría inicial y diagnóstico | ✅ Completado |
| Correcciones críticas de componentes | ✅ Completado |
| Stagger en cuadrículas | ✅ Ya implementado |
| Corrección jerárquica h1/h2 | ✅ Ya correcto |
| Transiciones explícitas (no `all`) | ✅ Ya implementado |
| ARIA en FeatureCard | ✅ Ya implementado |
| ARIA en DefaultInfoCard (Store) | ✅ Ya implementado |
| Simplificación hover en ClientCard | ⏳ Pendiente |
| Consistencia de botones LandingPageSection | ⏳ Pendiente |
| Animación slideUp keyframes global | ✅ Ya definido en providers.tsx |

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

#### Tarea 1: Stagger en Cuadrículas
- [x] **Conectar delay en ItemGridItem** (`ItemGridLayout.tsx:25`)
  - ✅ `FeaturesSection.tsx:37` ya pasa `delay={index * 0.1}`
  - ✅ `ClientsSection.tsx:33` ya pasa `delay={index * 0.1}`
  - ✅ `ItemGridLayout.tsx:25` ya aplica la animación con delay
  - ✅ `@keyframes slideUp` definido globalmente en `providers.tsx:14`

#### Tarea 2: Simplificación Hover en Clientes
- [ ] **Reducir animaciones hover en `ClientCard.tsx` a solo 2 efectos**
  - [ ] Efecto 1: Elevación de la card (`translateY` + `boxShadow`)
  - [ ] Efecto 2: Zoom suave de imagen (`scale`)
  - [ ] Eliminar `rotate(1deg)` de la imagen — innecesario, causa reflow
  - [ ] Eliminar `color` change en el texto — mantener estático
  - [ ] Asegurar `prefers-reduced-motion` lo desactiva todo
  - **Archivo:** `src/features/home/components/clients/ClientCard.tsx`

#### Tarea 3: Consistencia de Botones y Elementos en Hero
- [ ] **Revisar márgenes y rellenos en `LandingPageSection.tsx`**
  - [ ] Verificar que `px={2}` en Flex no corte contenido en mobile pequeño (360px)
  - [ ] Confirmar que los gaps en VStack/HStack usen tokens de Chakra (`gap="6"`, `gap="14"`)
  - [ ] Asegurar que los botones tengan padding interno suficiente (`size="lg"`)
  - [ ] Verificar que el logo no se deforme con `objectFit: "contain"`
  - **Archivo:** `src/features/home/components/hero/LandingPageSection.tsx`

### [REVISOR UI/UX] - Semántica, Rendimiento y Accesibilidad

#### Tarea 4: Corrección Jerárquica
- [x] **Intercambiar orden de encabezados en `LandingPageSection.tsx`**
  - ✅ `"GLASS & ALUMINUM COMPANY S.A.C."` ya es `<h1>` (línea 78)
  - ✅ `"Vidriería La Molina"` ya es `<h2>` (línea 91)
  - ✅ Jerarquía semántica correcta desde la auditoría inicial

#### Tarea 5: Propiedades de Transición Explícitas
- [x] **Sustituir `transition="all"` por propiedades explícitas**
  - ✅ `LandingPageSection.tsx:51`: `transition="transform 0.3s ease"` — explícita
  - ✅ `FeatureCard.tsx:33`: `transition="box-shadow 0.3s, transform 0.3s"` — explícita
  - ✅ `FeatureCard.tsx:73`: 5 propiedades explícitas (background, color, border-color, transform, box-shadow)
  - ✅ `ClientCard.tsx:33`: `transition="box-shadow 0.3s, transform 0.3s"` — explícita
  - ✅ `ClientCard.tsx:53`: `transition="transform 0.8s cubic-bezier(...)"` — explícita

#### Tarea 6: Etiquetado ARIA
- [x] **Añadir `aria-hidden="true"` a iconos decorativos**
  - ✅ `FeatureCard.tsx:89`: `aria-hidden="true"` en iconos clonados
  - ✅ `DefaultInfoCard.tsx:35`: `aria-hidden="true"` en icono Clock
  - ✅ `DefaultInfoCard.tsx:59`: `aria-hidden="true"` en icono MapPin
  - ✅ `ClientCard.tsx`: imágenes decorativas con `alt` descriptivo
  - ⬜ LandingPageSection: el logo tiene `alt="Glass & Aluminum Company Logo"` — correcto

---

## 🧪 Criterios de Aceptación

1. **Compilación Limpia:** `pnpm run build` debe compilar al 100% las rutas estáticas.
2. **Fluidez 120Hz:** Animaciones libres de caídas de frames o saltos estructurales (Cumulative Layout Shift).
3. **Cero Warnings de Linter:** El código debe ajustarse a las reglas de TypeScript estrictas de la aplicación.
4. **prefers-reduced-motion:** Todas las animaciones deben respetar la preferencia del usuario.

---

## 🔄 Post-Ejecución

Una vez completado este plan:
1. Commitea los cambios con mensaje descriptivo
2. Verifica `pnpm run build` (36/36 rutas)
3. Procede con el siguiente plan (PLAN_OPTIMIZACION.md ya está completado)
