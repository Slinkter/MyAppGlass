# Changelog & AI Agent Engineering Logbook

Este documento registra cronologicamente las decisiones tecnicas, arquitectonicas y de diseno implementadas en MyAppGlass (GYA Company), con el proposito de que cualquier desarrollador o agente de Inteligencia Artificial pueda comprender el funcionamiento del sistema 3D/AR y continuar su desarrollo sin fricciones.

---

## 1. Resumen de Stack y Componentes Principales

- Framework Web: Next.js 16 (App Router + Turbopack) & React 19.
- Motor 3D & WebGL: Three.js con Shaders PBR (MeshPhysicalMaterial), ACES Filmic Tone Mapping e iluminacion reactiva por entorno.
- Libreria UI: Chakra UI v3 con temas personalizados en src/theme.
- Componentes Clave:
  - src/shared/components/3d/ThreeCanvas.tsx: Renderizador WebGL procedural parametrico.
  - src/shared/components/3d/AuraARViewer.tsx: Contenedor de experiencia 2.5D, controles de personalizacion, telemetria y Ficha Tecnica en Vivo.
  - src/features/services/components/ServicePageLayout.tsx: Layout maestro de paginas de servicios (/servicios/[serviceSlug]).
  - src/shared/components/3d/WebARLiveCameraModal.tsx: Proyector AR en tiempo real con la camara trasera movil.

---

## 2. Catalogos Tecnicos Oficiales de la Empresa

Toda la carpinteria de aluminio y herrajes implementados provienen directamente de los catalogos tecnicos de la empresa ubicados en el repositorio:
1. otros/CATALOGO-DE-ALUMINIOS_EDICION-4-31-07-2026-Marca-de-agua.pdf
2. otros/CATALOGO-CORRALES-ACCESORIOS-2022.pdf

### Series Peruanas Modeladas en 3D:
- Serie VL42 / Silenzo VL46 / Serie 20-25 (Corrediza):
  - Marco: Riel doble con solapa exterior de fijacion y camara de agua.
  - Hojas: Parante lateral de chapa, parante de traslape (interlock) con aleta corta-viento y felpa negra, zocalo portagarruchas de 65mm.
  - Accesorios: Cierre embutido Fermax (Catalogo Corrales 03VP00137).
- Serie Practitec VLP46 (Fijo, Proyectante, Pivotante):
  - Perfil marco VLP4601 con solapa coplanar exterior.
  - Junquillos a presion a 45 grados PLB4708 para retencion segura de cristal 6mm / 8mm / insulado.
  - Compases telescopicos de friccion articulados en acero inoxidable para proyectantes.
  - Pivotes superior/inferior de acero y tirador tubular vertical para pivotantes.
  - Travesano intermedio de alta inercia VLP4609 para el sistema Piso a Techo mixto.

---

## 3. Historial Cronologico de Cambios

### [2026-08-21] - Reingenieria 3D de Carpinteria de Aluminio Oficial
- Extraccion de Catalogos: Se auditaron los PDFs oficiales reemplazando geometrias genericas por perfiles extruidos precisos.
- Detalles Constructivos: Incorporados rieles dobles con pistas metalicas independientes, aletas de enganche interlock con felpa amortiguadora, junquillos a 45 grados y herrajes Fermax de embutir.

### [2026-08-21] - Dimensiones Parametricas (W x H) & Reordenamiento de Sistemas
- Control en Tiempo Real: Sliders interactivos de Ancho (0.80 m a 3.50 m) y Alto (0.60 m a 2.60 m) con recalcullo parametrico de las geometrias Three.js.
- Botones Rapidos de Vanos: 1.2x1.0m, 1.5x1.2m, 2.0x1.4m, 2.4x2.2m.
- Nuevo Orden de Sistemas:
  1. Corredizo (Por defecto al cargar).
  2. Fijo.
  3. Proyectante Vertical.
  4. Pivotante.
  5. Piso a Techo (Mixta).
  6. Celosia (Louver).
- Titulo Limpio: Encabezado establecido como Modelos de ventanas 3d en ServicePageLayout.tsx.

### [2026-08-21] - Ficha Tecnica en Vivo & Cotizador WhatsApp
- Reemplazo de Textos Planos: Transformacion de la columna lateral en una Ficha Tecnica Dinamica con badges de estado (Listo para Cotizar), dimensiones en m2 y desglose de materiales activos.
- Cotizacion Inteligente: Boton directo a WhatsApp con mensaje estructurado pre-llenado con todos los parametros elegidos por el usuario.

### [2026-08-21] - Composicion 2.5D & Direccion de Arte Kage (MengTo/kage)
- Capas Profundas: Fondo fotografico HD + WebGL 3D interactivo + Vano arquitectonico con gradiente vignette de profundidad.
- Materiales PBR Cinematograficos: Cristal con refraccion fisica ior: 1.52, clearcoat: 1.0, clearcoatRoughness: 0.05 y reflejos especulares; aluminio con mapeo de tonos ACES Filmic.
- Telemetria Editorial: Micro-etiquetas dinamicas de vano y rendimiento (VANO: 2.00m x 1.40m, PBR 60FPS).

### [2026-08-21] - Selector de Ambientes Fotograficos & Control de Giro 360
- Integrados 5 ambientes con imagenes reales del showroom y proyectos: Sala Residencial, Dormitorio, Oficina Corporativa, Terraza Panoramica y Estudio.
- Giro calibrado a velocidad suave (0.002 rad/frame) con boton flotante de Pausar / Activar Giro 360.

---

## 4. Guia de Continuidad para Futuros Agentes AI

1. Replicar en otros servicios:
   - La arquitectura de AuraARViewer.tsx y ThreeCanvas.tsx esta lista para ser adaptada a:
     - /servicios/mampara (Mamparas corredizas Serie 25 / Serie Silenzo ML46).
     - /servicios/ducha (Box de ducha con templado de 8mm/10mm y accesorios de acero inoxidable).
     - /servicios/techo (Techos corredizos y fijos con perfiles estructurales).
     - /servicios/balcones y /servicios/baranda (Sistemas de barandas con pasamanos y postes de acero).
2. Verificacion de Build:
   - Ejecutar siempre npm run build para asegurar compilacion estatica limpia (codigo 0) sin errores de tipado en TypeScript.