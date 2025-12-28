# Changelog

Todas las modificaciones notables en este proyecto serán documentadas en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto se adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2025-12-28

### Optimización de UX/UI

Implementación de Infinite Scroll y animaciones de entrada para mejorar la experiencia de usuario y el rendimiento.

#### `Added`

-   **Infinite Scroll:** Implementado en `ProjectsList`, `ServiceList`, `FeaturesSection` y `ClientsSection` para carga progresiva de contenido.
-   **ScrollReveal:** Nuevo componente reutilizable en `src/components/common/ScrollReveal.jsx` para animaciones "fade-up" al hacer scroll.
-   **Documentación:** Nuevo reporte `src/docs/OPTIMIZACION_SCROLL_ANIMACIONES.md` detallando estas mejoras.

#### `Changed`

-   **List Components:** Refactorizados para soportar paginación local y animaciones sin re-renders innecesarios.

---

## [0.2.0] - 2025-12-27

### Refactorización Arquitectónica y Estandarización

Se realizó una importante refactorización para mejorar la mantenibilidad, legibilidad y robustez de los componentes visuales clave, siguiendo principios de Clean Code y Component-Based Architecture.

#### `Changed` hiding

-   **Modularización de `ProjectDetailModal`:** Se dividió el componente monolítico (>300 líneas) en tres subcomponentes especializados bajo `src/components/projects/modal/`:
    -   `MapViewer.jsx`: Manejo aislado del iframe de Google Maps y spinners.
    -   `ProjectInfo.jsx`: Componente UI puro para mostrar detalles del proyecto.
    -   `VisualViewer.jsx`: Orquestador visual que maneja el layout responsivo entre Mapa y Galería.
-   **Refactorización de `Gallery`:** Se desacopló la lógica de visualización en:
    -   `GalleryViewer.jsx`: Visor principal con controles de navegación.
    -   `GalleryThumbnails.jsx`: Carrusel de miniaturas separado.
    -   `Gallery.jsx`: Ahora actúa como un _Container_ limpio.
-   **Corrección de Altura en Modal:** Se solucionó el bug visual donde la galería estiraba el modal excesivamente. Ahora respeta la altura de la tarjeta de información en escritorio y se adapta en móviles (`380px`/`450px`).
-   **Nomenclatura de Hooks:** Se renombraron archivos para cumplir con el estándar `camelCase` de React:
    -   `use-is-mobile.js` → `useIsMobile.js`
    -   `use-reclamo-form.js` → `useReclamoForm.js`

#### `Added`

-   **PropTypes:** Se instaló e implementó la librería `prop-types` para validación de tipos en tiempo de ejecución, aumentando la seguridad del código.
-   **Soporte Mobile First en Galería:** Se mejoró la visibilidad de los controles de navegación en dispositivos táctiles (siempre visibles vs hover en desktop).

#### `Fixed`

-   **Importación de Datos de Imágenes:** Se corrigió un error crítico donde `ProjectCard` recibía rutas de imágenes como strings en lugar de objetos, lo que rompía la galería. Se implementó un mapeo de datos correcto en `src/data/projects.js`.
-   **Prop Drilling:** Se corrigió la discrepancia de nombres de props (`imgs` vs `photosObra`) entre componentes padres e hijos.

---

## [0.1.0] - 2025-11-05

### Auditoría y Establecimiento de Línea Base

Se ha añadido el archivo `CHANGELOG.md` para documentar la evolución del proyecto.

#### `Added`

-   **Informe de Auditoría de Reutilización:** Se realizó una auditoría completa del código fuente en `src/` para identificar componentes, patrones y servicios reutilizables. Este análisis servirá como base para el desarrollo futuro, con el objetivo de maximizar la eficiencia y minimizar la duplicación de código.

#### `Highlights`

-   **Patrón de Página Dinámica Identificado:** Se destacó el patrón `ServicePageContainer` + `ServicePageLayout` + `servicePageDataMap.js` como un activo arquitectónico clave. Se recomienda su adopción para futuras funcionalidades con estructuras de página similares.
-   **Catálogo de Componentes Comunes:** Se documentó un conjunto robusto de componentes de UI genéricos en `src/components/common`, listos para su uso en toda la aplicación.
-   **Hooks Reutilizables:** Se identificaron hooks como `useIsMobile` y `useReclamoForm` que encapsulan lógica de negocio y de UI, promoviendo un código más limpio y mantenible.
-   **Estructura de Datos Centralizada:** Se reconoció la gestión de datos estáticos en `src/data` como una práctica sólida que facilita el mantenimiento.

#### `Recommendations`

-   **Generalizar Componentes:** Se sugirió la refactorización de componentes similares (ej. `ProjectCard`, `ServiceCard`) en un componente `GenericCard` más abstracto.
-   **Expandir el uso de Hooks:** Se recomendó encapsular nueva lógica de negocio compleja en hooks personalizados.
-   **Mantener la Centralización:** Se aconsejó continuar con la centralización de la configuración de rutas, temas y servicios de API.

Informe de Auditoría de Reutilización de Código - Proyecto MyAppGlass

Fecha: 05 de Noviembre de 2025
Arquitecto: Gemini Senior Software Architect
Objetivo: Identificar y catalogar los recursos de software reutilizables dentro del directorio src/ para optimizar el desarrollo de nuevas funcionalidades, minimizar la
duplicación de código y estandarizar la arquitectura.

1. Resumen Ejecutivo

El proyecto demuestra una base sólida de componentes reutilizables y patrones de diseño eficientes. Se destaca el uso de un sistema de diseño coherente a través de
Chakra UI, la centralización de la lógica de negocio en Hooks personalizados y la gestión de datos desacoplada.

El patrón más importante identificado es la combinación de ServicePageContainer.jsx y ServicePageLayout.jsx, que permite renderizar páginas de servicio dinámicamente a
partir de una estructura de datos centralizada (servicePageDataMap.js). Este enfoque es altamente escalable y debe ser el modelo a seguir para futuras funcionalidades
que compartan una misma estructura.

2. Catálogo de Componentes Reutilizables

2.1. Componentes Genéricos (`src/components/common`)

Estos componentes son la base del sistema de diseño. Son agnósticos al contexto y están listos para ser utilizados en cualquier parte de la aplicación.

┌────────────────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬───────────────────┐
│ Componente │ Descripción │ Potencial de R... │
├────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────┤
│ DataLoader.jsx │ Gestiona los estados de carga (isLoading), error y éxito. Muestra un componente de esqueleto (loadingComponent) o un mensaje... │ Alto │
│ `ErrorDispl... │ Muestra un mensaje de error estandarizado y un botón opcional para reintentar una acción.                                       │ Alto              │
  │ `FadingImag... │ Renderiza una imagen con un efecto de "fade-in" y muestra un esqueleto de carga (Skeleton) mientras la imagen carga. Maneja ... │ Alto │
│ Franja.jsx │ Componente visual para crear una banda de color con un título y un texto. Ideal para separar secciones de la página. │ Alto │
│ Gallery.jsx │ Crea una galería de imágenes responsive en formato de cuadrícula. Incluye un modal para visualizar las imágenes en tamaño co... │ Alto │
│ `LoadingFal... │ Un spinner de carga centrado, diseñado para ser usado como fallback en componentes React.Suspense.                              │ Alto              │
  │ `SidebarIte... │ Elemento de menú para barras laterales. Incluye un icono, una etiqueta y gestiona el estado activo (isActive). │ Alto │
│ `ColorModeS... │ Botón para cambiar entre el modo claro y oscuro de la aplicación. │ Alto │
└────────────────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴───────────────────┘

2.2. Componentes de Página (`src/pages`) y Layout (`src/layout`)

Estos componentes definen la estructura y las vistas principales de la aplicación.

┌────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬─────────────────────┐
│ Componente │ Descripción │ Potencial de Reu... │
├────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────┤
│ Layout.jsx │ Estructura principal de la aplicación que envuelve todas las páginas. Incluye Navbar, Footer y FloatWhatsapp. │ Alto │
│ Navbar.jsx │ Barra de navegación principal, completamente responsive, que utiliza los datos de nav-items.js. │ Alto │
│ Footer.jsx │ Pie de página con información de contacto, horarios y enlaces, incluyendo el libro de reclamaciones. │ Alto │
│ HelmetWrapper.jsx │ Gestiona las etiquetas <head> para SEO (title, description, canonical, Open Graph) de manera centralizada, con valore... │ Alto │
│ `ServicePageCon... │ Patrón Clave. Contenedor dinámico que carga datos desde servicePageDataMap.js según el serviceSlug de la URL y los pa... │ Alto                │
│ `ServicePageLay... │ Patrón Clave. Layout reutilizable para páginas de servicio. Consta de una barra lateral para navegación/filtros y un ... │ Alto │
└────────────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴─────────────────────┘

2.3. Componentes Específicos (Home, Projects, Services)

Aunque están diseñados para secciones específicas, su estructura es reutilizable. Por ejemplo, ProjectCard podría adaptarse para mostrar otros tipos de tarjetas.

┌─────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬────────────────────────┐
│ Componente │ Descripción │ Potencial de Reutil... │
├─────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────┤
│ ClientCard.jsx │ Tarjeta para mostrar un tipo de cliente con imagen, nombre y descripción. │ Medio │
│ FeatureCard.jsx │ Tarjeta para destacar una característica con icono, título y descripción. │ Medio │
│ ProjectCard.jsx │ Tarjeta para mostrar un proyecto, con imagen, detalles y un botón que abre un modal (ProjectDetailModal). │ Medio │
│ ServiceCard.jsx │ Tarjeta para mostrar un servicio, con imagen, nombre y un botón de navegación al detalle del servicio. │ Medio │
│ `ProjectDetailMo... │ Modal que muestra detalles de un proyecto, incluyendo un mapa de Google Maps embebido. │ Medio │
│ \*ListSkeleton.jsx │ Varios componentes (ClientListSkeleton, FeatureListSkeleton, etc.) que muestran esqueletos de carga. Siguen un pa... │ Alto (el patrón) │
└─────────────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴────────────────────────┘

3. Lógica de Negocio y Servicios Reutilizables

3.1. Hooks Personalizados (`src/hooks`)

Encapsulan lógica compleja y con estado, permitiendo su reutilización en múltiples componentes.

┌──────────────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬─────────────────────┐
│ Hook │ Descripción │ Potencial de Reu... │
├──────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────┤
│ `useIsMob... │ Hook simple que devuelve true si el ancho de la pantalla corresponde a un dispositivo móvil.                                    │ Alto                │
  │ `useRecla... │ Gestiona toda la lógica del formulario de reclamaciones: estado, validación, envío a Firestore y control del modal de éxito.... │ Alto (el patrón) │
└──────────────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴─────────────────────┘

3.2. Servicios API (`src/api`)

Centralizan la comunicación con servicios externos (backend, bases de datos).

┌───────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬───────────────────────┐
│ Servicio │ Descripción │ Potencial de Reuti... │
├───────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────┤
│ `reclamoSe... │ Provee un método (submitReclamo) para enviar datos del formulario de reclamaciones a Firestore. Desacopla la lógica de la... │ Alto │
└───────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴───────────────────────┘

4. Gestión de Datos y Configuración

4.1. Datos Estáticos (`src/data`)

Centralizan la información que no cambia frecuentemente, facilitando su mantenimiento.

┌──────────────────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬──────────────┐
│ Archivo │ Descripción │ Potencial... │
├──────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────┤
│ servicePageDataMap.js │ Activo Arquitectónico Clave. Mapea slugs de URL a toda la data necesaria para una página de servicio (SEO, sist... │ Alto │
│ clients.js, features.js, `nav... │ Arrays de objetos que contienen los datos para las secciones correspondientes. Fáciles de mantener y expandir.     │ Alto         │
│ gallery/*-data.js                │ Archivos que exportan listas de imágenes para las galerías de cada servicio. Son consumidos por `servicePageDat... │ Alto │
└──────────────────────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴──────────────┘

4.2. Configuración (`src/config`)

┌────────────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬──────────────────────────┐
│ Archivo │ Descripción │ Potencial de Reutiliz... │
├────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────┤
│ `fireba... │ Inicializa y exporta las instancias de Firebase (Firestore, Auth). Utiliza variables de entorno para las credenciales. │ Alto │
│ theme.js │ Define y extiende el tema de Chakra UI (fuentes, colores, tamaños, etc.), asegurando una consistencia visual en toda la ... │ Alto │
└────────────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴──────────────────────────┘

5. Utilidades (`src/utils`)

Funciones de ayuda genéricas.

┌──────────────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────┬────────────────────────────┐
│ Utilidad │ Descripción │ Potencial de Reutilización │
├──────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────┤
│ scroll-to-top.js │ Un componente que provoca un scroll hacia la parte superior de la página cada vez que cambia la ruta. │ Alto │
└──────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────────────┴────────────────────────────┘

6. Recomendaciones Arquitectónicas

1. Adoptar el Patrón `Container/Layout`: Para nuevas funcionalidades que impliquen páginas con una estructura similar (ej. "Blog", "Catálogo de Productos"), se debe
   replicar el patrón ServicePageContainer -> ServicePageLayout -> servicePageDataMap. Esto evitará la creación de componentes de página monolíticos y duplicados.

1. Expandir los Hooks Personalizados: La lógica de negocio compleja, como la gestión de un carrito de compras, filtros de búsqueda o estados de autenticación, debe
   encapsularse en hooks personalizados (useShoppingCart, useFilters, etc.).

1. Generalizar Componentes de Tarjeta: Los componentes ProjectCard y ServiceCard son muy similares. Se podría crear un componente GenericCard más abstracto que reciba
   props para renderizar diferentes contenidos y acciones, reduciendo la duplicación.

1. Centralizar la Configuración de Rutas: El archivo src/routes/index.jsx junto con serviceRoutes.jsx muestra una buena práctica de centralización. Mantener esta
   estructura para futuras rutas.

---

Fin del Informe.
