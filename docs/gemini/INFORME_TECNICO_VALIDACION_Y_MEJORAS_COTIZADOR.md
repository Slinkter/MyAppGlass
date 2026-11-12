# INFORME TÉCNICO DE VALIDACIÓN, HALLAZGOS Y PROPUESTAS DE MEJORA DEL COTIZADOR

> **Documento de Coordinación Técnica Inter-Agentes (Antigravity/Gemini ➡️ Claude Code)**  
> **Proyecto:** Glass & Aluminum Company S.A.C. (`MyAppGlass`)  
> **Fecha:** 12 de Noviembre de 2026  
> **Autor:** Antigravity AI Engineering Assistant  
> **Estado:** Fases 0 a 7 completadas · Build Estático Verificado · Catálogo de Proveedores Mapeado

---

## 1. Propósito del Informe

Este documento ha sido redactado para que **Claude Code** (y el equipo de arquitectura de software) pueda auditar, validar y extender las soluciones implementadas en el **Cotizador de Presupuestos de Vidrio y Aluminio** de `MyAppGlass`. 

Contiene:
1. El detalle exhaustivo de las implementaciones realizadas y su estado actual.
2. Los hallazgos y análisis técnicos obtenidos de la base de conocimiento y API REST de proveedores (`http://localhost:8000`).
3. El mapeo oficial de insumos y series para los **13 servicios de instalación** de la empresa.
4. Observaciones de rendimiento, costos de API y arquitectura FSD.
5. Ideas innovadoras y hoja de ruta para las siguientes iteraciones del cotizador.

---

## 2. Resumen Ejecutivo de Implementaciones Culminadas

### 2.1. Arquitectura del Cotizador (`apps/web/src/features/presupuesto` y `entities/quote`)
- **Motor de Reglas y Cálculo Paramétrico:** Implementado en `entities/quote/lib/windowRules.ts` y `pricing.ts`. Desacopla la lógica matemática del renderizado visual. Aplica precio base por m² (S/ 240 crudo, recargo +30% templado, acabado arenado/laminado +S/ 80/m²), cálculo de hojas (2 a 4 hojas según ancho de 0.60 a 0.80 m por hoja) y división de cuerpos para alturas superiores a 1.80 m.
- **Formularios Accesibles y UI Responsive:**
  - Componentes nativos con tokens Chakra v3 sin valores hexadecimales sueltos (reglas de `DESIGN.md`).
  - Identificación ágil: Campos de **Nombre y Apellidos** y **Celular/WhatsApp** solicitados en el primer bloque del cotizador, evitando formularios tardíos o fricción de registro.
  - Checkbox accesible de ubicación: Reemplaza botones binarios por un `Checkbox` nativo de Chakra con texto explicativo: *"¿La instalación es dentro de La Molina? (Flete bonificado por cercanía al taller de Av. Los Fresnos)"*.
  - Carrito reactivo con botón claro: **"PREVISUALIZAR PRESUPUESTO"**.

### 2.2. Esquemas Técnicos 2D Vectoriales en SVG
- **Componente:** `apps/web/src/entities/quote/ui/Window2DPreview.tsx` (reexportado hacia `features/presupuesto`).
- **Renderizado Dinámico:**
  - Dibuja el marco perimetral exterior con el grosor proporcional de perfilería de aluminio.
  - Genera automáticamente 2, 3 o 4 hojas corredizas con sus respectivos jaladores en paños móviles.
  - Para alturas superiores a 1.80 m (`bodiesCount > 1`), renderiza travesaños horizontales y paños fijos de seguridad superior e inferior.
  - Adopta el color real del perfil (`#171717` negro, mate, blanco, madera, champagne) y el matiz del vidrio (incoloro, bronce, gris).
  - Modo dual: Tarjeta interactiva para la web y modo `compact` para la tabla del presupuesto membretado.

### 2.3. Hoja Formal Membretada y Descarga en PDF A4
- **Componente:** `apps/web/src/entities/quote/ui/NovaQuoteSheet.tsx`.
- **Diseño Documental:** Cumple estrictamente con el concepto de documento impreso oficial:
  - Cabecera con Razón Social inmutable *"Glass & Aluminum Company S.A.C."*, RUC 20606432870, Taller en Av. Los Fresnos 1250 - La Molina.
  - Número correlativo provisional (`WEB-XXXX`) o transacción atómica Firestore (`GYA-2026-XXXX`).
  - Tabla de partidas con columna dedicada al **Esquema 2D SVG**, descripción técnica, medidas, número de hojas, precio unitario y total.
  - **Medios de Pago Autorizados Integrados:** Incorpora los logotipos vectoriales oficiales en formato SVG de **Yape** (`B1-Yape.svg`), **Plin** (`B2-plin.svg`) y **BBVA** (`bbva.svg`) con el número oficial `974 278 303` y la cuenta corriente soles `0011-0106-0100041622`.
  - Estilos `@media print` calibrados en `global.css` para ajuste milimétrico a formato A4 sin cortes de pie de página ni solapamiento de elementos flotantes.

### 2.4. Limpieza de Navegación (Navbar vs. Footer)
- Siguiendo la regla de diseño y arquitectura de información:
  - El enlace a "Presupuesto" fue **removido de todas las barras de navegación superiores** (`NAV_ITEMS` para escritorio y `MOBILE_NAV_ITEMS` para dispositivos móviles en `nav-items.ts`).
  - Se ubicó estratégicamente en el **Footer**, en la columna **"Servicios y Sitelinks"**, indexable mediante Schema.org `SiteNavigationElement` `#sitelinks` para Googlebot y bots de IA sin saturar el menú principal de navegación.

---

## 3. Hallazgos Técnicos de la Integración con el Backend de Proveedores

Se realizó una inspección y consumo de la API de proveedores corriendo en `http://localhost:8000` (FastAPI / SQLite / RAG) y de los repositorios en WSL (`/home/user/github/proveedor_info`):

### 3.1. Estado de los Datos de Proveedores
Se descargaron e integraron en `docs/proveedores/` y `apps/web/src/shared/data/proveedores/` los siguientes activos:
1. **435 Productos estructurados** (`productos-proveedores.json`): Códigos SKU, descripciones, categorías e imágenes reales de insumos.
2. **5 Documentos consolidados de base de conocimiento (1.8 MB de texto técnico):**
   - `corporacion_corrales_base_conocimiento.md` (1.2 MB): Accesorios para templado, frenos de piso, bridas, rodamientos, catálogos de Series 20, 25, 28, 29, 35, 36, 3825, 3831, 42, 45, 62, 7038 y 80.
   - `eduhg_base_conocimiento.md` (38 KB): Perfiles de aluminio para series 20, 25, 35, 3831, 42, policarbonatos Polylite Plus y paneles PAC Duplopac.
   - `hpd_glass_base_conocimiento.md` (544 KB): Vidrios primarios, templados, laminados acústicos, vidrios insulados (DVH), cristales Low-E y muros cortina.
   - `favitem_base_conocimiento.md` (4.1 KB): Accesorios en acero inoxidable AISI 304, herrajes para barandas, arañas (spiders) y kits para puertas de ducha.
   - `GUIA_PREGUNTAS_RESPUESTAS_VIDRIO_ALUMINIO.md` (70 KB): 300 preguntas y respuestas técnicas sobre normas, diferencias entre vidrio crudo, templado, laminado e insulado.

### 3.2. Observación Crítica sobre el Uso del RAG y la API Key Gratuita
> [!IMPORTANT]
> **Recomendación de Costos y Latencia:**  
> La API Key configurada para el asistente RAG en `http://localhost:8000/asistente/consultar` opera bajo la modalidad gratuita de Google AI Studio (Gemini 3.5 Flash Lite).  
> **Hallazgo:** Ejecutar una consulta RAG para tareas rutinarias (como poblar listas de productos, cargar series o calcular cotizaciones) genera latencias innecesarias de 1.2 a 2.5 segundos y agota rápidamente la cuota diaria gratuita por llamadas repetitivas.  
> **Solución Implementada:** Se adoptó la arquitectura híbrida de 2 fases:
> 1. **Fase 1 (Lectura Directa y Caché Local):** La información estructurada de productos y series se consume directamente de endpoints REST o del archivo JSON estático local (`productos-proveedores.json`) con tiempos de respuesta menores a 5 ms y cero consumo de tokens.
> 2. **Fase 2 (RAG a Demanda):** El endpoint RAG queda reservado exclusivamente para resolver consultas técnicas complejas de clientes o técnicos (por ejemplo: *"¿Qué compatibilidad existe entre un burlete EPDM de Serie 42 y un vidrio de 8.38mm?"*).

---

## 4. Mapeo Oficial de los 13 Servicios de Instalación de MyAppGlass

A partir de los catálogos técnicos de proveedores analizados, se consolidó en `catalogo-proveedores-servicios.ts` la matriz técnica que vincula cada categoría de servicio de la web con sus componentes reales de taller:

| N° | Servicio en la Web | Categoría de Negocio | Series / Sistemas Oficiales | Insumos Clave de Proveedor (SKU / Ficha) |
|---|---|---|---|---|
| **01** | **Ventanas Antirruido** | Carpintería de aluminio y vidrio | Sistema Nova, Serie 20, Serie 25, Serie 35, Serie 3831, Serie 42 | Garruchas nylon (`03GA00321`, `03GA00322`), burletes EPDM (`03BU00010`), vidrio laminado acústico PVB (`eduhg` / `hpd_glass`). |
| **02** | **Mamparas de Vidrio Templado** | Sistemas corredizos y batientes de alto vano | Serie 62, Sistema Nova, Batiente pivotante | Garruchas de nylon 50 kg (`03GI00283`), cierre Fermax con llave (`03VP00137`), felpa reforzada F-15 (`03CF0015P`). |
| **03** | **Boxes y Puertas de Ducha** | Soluciones sanitarias | Kit corredizo acero inox, batiente de baño | Kit de ducha Favitem en acero AISI 304, sellos magnéticos de estanqueidad, aletas de goteo (`favitem` / `corrales`). |
| **04** | **Parapetos y Fachadas** | Cerramientos exteriores | Sistema Spider, sujeción puntual | Arañas de acero inox, rotulas articuladas, vidrio templado laminado 10.76mm (`favitem` / `hpd_glass`). |
| **05** | **Barandas de Vidrio y Acero** | Seguridad para escaleras y balcones | Sistema de postes, pasamanos ranurado | Bridas y canoplas AISI 304 (`corrales`), tubos ranurados con junta de jebe y conectores articulados (`favitem`). |
| **06** | **Techos de Policarbonato** | Cubiertas ligeras y sol y sombra | Policarbonato alveolar, panel compuesto PAC | Policarbonato Polylite Plus 6/8mm con 50 micras UV (`eduhg`), paneles Duplopac, perfiles de unión H y U (`eduhg`). |
| **07** | **Cortavientos y Cerramientos** | Aislamiento de terrazas | Perfiles perimetrales reforzados | Postes tubulares esquineros en aluminio anodizado, cristal templado 8/10mm (`corrales` / `hpd_glass`). |
| **08** | **Muro Cortina** | Fachadas flotantes estructurales | Sistema Stick estructural | Perfiles montantes aleación 6063-T6, silicona estructural Dow Corning, cristales reflectivos Low-E (`hpd_glass`). |
| **09** | **Puertas de Aluminio** | Accesos comerciales y residenciales | Serie 35 batiente, Serie 45 pesada | Marcos de aluminio con zócalo, cerraduras de manija embutida y cilindros de seguridad (`corrales` / `eduhg`). |
| **10** | **Divisorias de Oficina** | Tabiquería modular | Sistema minimalista con zócalo | Perfiles U de aluminio anodizado mate/negro, vidrio templado 8mm con franjas arenadas o vinil pavonado. |
| **11** | **Espejos a Medida** | Vidrio procesado y acabados | Espejo biselado, retroiluminado LED | Cristales flotados de 3 a 6mm con nitrato de plata libre de cobre, silicona neutra no ácida (`eduhg` / `hpd_glass`). |
| **12** | **Frenos Hidráulicos** | Herrajes de piso y calibración | Cajas de freno de piso | Cajas Sevax y Dorma regulables, zócalos superior/inferior, cerrojos de piso PIC-615 (`03AN0615B`). |
| **13** | **Mantenimiento y Calibración** | Servicio técnico correctivo | Todas las series instaladas | Rodamientos de recambio para Serie 20/25/62, renovación de felpas perimetrales y brazos proyectantes (`03VP00404`). |

---

## 5. Actualización del Catálogo Oficial de Ventanas

En cumplimiento con los datos oficiales de los proveedores y alineado a la decisión del negocio:
Se actualizaron los sistemas comerciales soportados en `entities/window/model/index.ts` y `entities/quote/config/pricing.ts`:
1. `ventana_nova` (Ventana Corrediza Sistema Nova Hermética)
2. `ventana_serie20` (Ventana Corrediza Serie 20 - Económica liviana)
3. `mampara_serie25` (Mampara / Ventana Corrediza Serie 25)
4. `ventana_serie35` (Ventana Batiente Serie 35)
5. `mampara_serie62` (Mampara Corrediza Reforzada Serie 62 - Alto Tráfico)
6. `ducha_cristal` (Puerta / Box de Ducha en Cristal Templado)
7. `techo_policarbonato` (Techo de Policarbonato / Cobertura de Vidrio)
8. `ventana_acustica` (Ventana Acústica con burletes EPDM Series 3831 / 42)
9. `ventana_pvc_abatible` (Ventana PVC Abatible)

---

## 6. Propuestas de Mejora e Ideas para la Próxima Iteración

A continuación se presentan 5 propuestas concretas de alto impacto para que Claude Code o el equipo de frontend las incorporen:

### 💡 Propuesta 1: Selector Multi-Gama en Tiempo Real (Comparador de Ahorro y Aislamiento)
- **Concepto:** Actualmente el usuario cotiza Sistema Nova de forma fija. Permitirle mediante una pestaña o interruptor comparar al instante:
  - **Gama Económica (Serie 20):** Vidrio crudo/templado 4-5mm (~30% más económica).
  - **Gama Estándar (Sistema Nova / Serie 25):** Vidrio templado 6mm (la opción balanceada actual).
  - **Gama Acústica Premium (Serie 3831 / 42 con Vidrio Laminado Acústico):** Atenuación acústica de hasta 35 dB.
- **Beneficio:** Aumenta la conversión al permitir que el cliente con menor presupuesto no abandone la web, mientras que el cliente que busca silencio absoluto en distritos como La Molina o San Isidro puede optar por la solución premium.

### 💡 Propuesta 2: Integración Directa con WhatsApp Business API con Resumen Estructurado
- **Concepto:** En la pantalla de previsualización del presupuesto, agregar el botón:  
  **"Solicitar Visita Técnica por WhatsApp"**.
- **Comportamiento:** Al pulsar, abre directamente la API de WhatsApp con el número `+51 974 278 303` con un mensaje autocompletado que incluye:
  - Código: `*Presupuesto WEB-6353*`
  - Cliente: `Carolina Rivas (987 654 321)`
  - Distrito: `La Molina`
  - Detalle: `1 Ventana Nova (1.80 x 1.40 m) - Templado Incoloro - Perfil Negro`
  - Total: `S/ 793,80 (Efectivo/QR)`
  - Enlace al PDF generado en Firebase Storage o visor web.
- **Beneficio:** Cierra la venta de inmediato en el canal preferido de los clientes en Perú sin esperas por correo.

### 💡 Propuesta 3: Simulador Acústico Interactivo de Decibelios (Audio Demo A/B)
- **Concepto:** Incorporar en la tarjeta del cotizador un reproductor de audio interactivo con 3 botones que reproduzcan muestras grabadas de ruido ambiental:
  - Botón A: *Sin ventana (Ruido exterior de avenida Javier Prado / Raúl Ferrero a 80 dB)*.
  - Botón B: *Ventana convencional antigua (Atenuación leve a 60 dB)*.
  - Botón C: *Ventana Antirruido Glass & Aluminum Company (Silencio acústico a 35 dB)*.
- **Beneficio:** Brinda una justificación sensorial inmediata del valor del vidrio templado y laminado acústico antes de pagar.

### 💡 Propuesta 4: Despiece Automático de Taller y Orden de Compra a Proveedor
- **Concepto:** En el panel `/admin/presupuestos`, para cada presupuesto aprobado por un cliente:
  - Crear una vista de "Despiece de Taller" que calcule las barras de aluminio necesarias (longitudes comerciales de 6.00 m) y los metros cuadrados de vidrio a cortar.
  - Conectar mediante el endpoint ya existente `POST http://localhost:8000/cotizar` para generar la orden de pedido agrupada por proveedor (Corrales, Eduhg, Favitem).
- **Beneficio:** Automatiza la logística interna del taller, ahorrando tiempo al contador y a los técnicos.

### 💡 Propuesta 5: Generación de Cotas Arquitectónicas Dinámicas en el SVG
- **Concepto:** Enriquecer el componente `Window2DPreview.tsx` para que dibuje líneas de cota acotadas con flechas arquitectónicas:
  - Cota superior con el ancho en metros (`← 1.80 m →`).
  - Cota lateral con la altura en metros (`↑ 1.40 m ↓`).
  - Ancho de cada hoja individual (`0.90 m` por paño).
- **Beneficio:** Proporciona un plano técnico formal que los arquitectos, decoradores y maestros de obra pueden validar inmediatamente en obra.

---

## 7. Estado de la Suite de Calidad y Pruebas

Toda la base de código se mantiene en estado óptimo y validado:
- **`pnpm run typecheck`:** ✅ Aprobado (0 errores TypeScript en `web`, `functions` y `packages/shared`).
- **`pnpm run lint`:** ✅ Aprobado (0 violaciones de reglas ESLint ni fronteras FSD).
- **`pnpm run build`:** ✅ Aprobado con exportación estática de las 71 páginas de la aplicación.
- **Pruebas Automatizadas Playwright:**
  - `generate-carolina-pdf.spec.ts`: Simulación completa de usuario desde el home hasta la emisión del PDF formal A4 con esquemas 2D y logos de pago.
  - `generate-4sashes-pdf.spec.ts`: Simulación de ventanas de gran formato (4 hojas con doble paño móvil).

---

## 8. Conclusión para Claude Code

El sistema se encuentra en un estado maduro, estable y probado. La integración del catálogo de proveedores se realizó respetando las restricciones de presupuesto de tokens y manteniendo desacopladas las capas de software. 

Se invita a **Claude Code** a revisar los archivos modificados, validar la concordancia de tipos y evaluar la adopción de las mejoras sugeridas en las próximas sesiones de trabajo.
