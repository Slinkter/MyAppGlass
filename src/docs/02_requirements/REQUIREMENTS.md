# 📋 Requerimientos del Sistema (Requirements)

## 1. Requerimientos Funcionales (RF)

Capacidades y comportamientos que el sistema debe proveer.

### Módulo Público (Frontend)
- **RF-01 Visualización de Servicios:** El sistema mostrará un catálogo detallado de servicios (Ventanas, Mamparas, Duchas, etc.) con galerías de imágenes.
- **RF-02 Portafolio de Proyectos:** El usuario podrá filtrar y visualizar proyectos realizados, accediendo a un detalle con ubicación (mapa) y fotos.
- **RF-03 Contacto Rápido:** Inclusión de botones flotantes y enlaces directos a WhatsApp para comunicación inmediata.
- **RF-04 Libro de Reclamaciones:** Formulario legal obligatorio que permite registrar quejas/reclamos y genera un código de seguimiento (ID).
- **RF-05 Navegación Móvil:** Menú inferior fijo (Bottom Navigation) en dispositivos móviles para acceso ergonómico.

### Módulo Backend (Serverless)
- **RF-06 Procesamiento de Correos:** Envío automático de notificaciones por email (vía Resend) ante eventos de contacto o reclamo.
- **RF-07 Persistencia de Reclamos:** Almacenamiento seguro e inmutable de los datos de reclamaciones en Firestore.

## 2. Requerimientos No Funcionales (RNF)

Atributos de calidad y restricciones.

### Rendimiento
- **RNF-01 Lazy Loading:** Las imágenes y componentes pesados deben cargarse bajo demanda.
- **RNF-02 Core Web Vitals:** Mantener LCP (Largest Contentful Paint) bajo 2.5s en conexiones 4G.
- **RNF-03 Optimización de Imágenes:** Uso de formatos modernos (WebP) y dimensionamiento correcto.

### Usabilidad y Diseño
- **RNF-04 Diseño Responsivo:** Interfaz fluida adaptada a Desktop, Tablet y Mobile.
- **RNF-05 Glassmorphism:** Implementación consistente del estilo visual "vidrio" usando Chakra UI.
- **RNF-06 Accesibilidad:** Contraste de colores adecuado y soporte básico para lectores de pantalla (etiquetas ARIA).

### Implementación
- **RNF-07 Arquitectura Limpia:** Separación estricta entre capa de presentación y lógica de negocio.
- **RNF-08 Código Limpio:** Adherencia a principios DRY, SOLID y Clean Code.
