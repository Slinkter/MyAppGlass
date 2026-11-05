# Brief de pantallas · Cotizador de ventana nueva · Glass & Aluminum Company S.A.C.

> Aplica el método del Taller 1 (Sesión 02): brief → prompt maestro → revisión HITL → iteración.
> Lo marcado **(a confirmar)** es ilustrativo y debe validarlo el dueño. Versión optimizada: 5 pantallas móviles + 1 tablet.

## Producto
- **Qué es:** página web donde un cliente cotiza cuánto costaría instalar una **ventana nueva**, ve qué se le instalará y el total, y si le conviene solicita una **visita técnica** y confirma por WhatsApp.
- **Empresa:** GLASS & ALUMINUM COMPANY S.A.C. · Av. Los Fresnos 1250 - La Molina · WhatsApp 974 278 303.
- **Problema:** el cliente pregunta el precio por mensajes y llamadas; el equipo repite el cálculo a mano y coordina las visitas por chat.
- **Fuera de alcance por ahora:** vidrio cortado, mampara, cambio de vidrio, mantenimiento, y los sistemas distintos de Nova (se muestran como "En proceso de implementación").

## Usuarios
| Usuario | Contexto de uso | Necesita |
|---|---|---|
| Cliente (hogar o negocio, normalmente en La Molina) | Celular, una mano, sin crear cuenta | Saber cuánto cuesta su ventana y qué incluye, en menos de 2 minutos, y agendar la visita |
| Personal comercial | Tablet en la oficina | Ver las visitas de la semana y bloquear horarios |

## Decisiones de optimización (respecto a la versión anterior)
| Cambio | Por qué |
|---|---|
| "Características" y "Tipo de ventana" se fusionan en **una sola pantalla** con diagrama de hojas en vivo | El cliente ve cómo queda su ventana mientras escribe el ancho; un paso menos |
| Barra fija inferior **"Desde S/ …"** desde la pantalla 02 | El precio aparece antes, reduce el abandono; usa vidrio Crudo y tarjeta como referencia |
| "Qué vamos a instalar" como **lista plegable** con resumen de una línea | Evita un scroll largo en 360 px; el detalle se abre si el cliente quiere |
| Selector de hojas solo si el ancho da 2 hojas | Con 3 o 4 hojas la configuración es única; menos decisiones |
| Prompt maestro más corto y 7 iteraciones | Ahorra créditos de Figma Make (tope de 150 por día) |

## Flujo y pantallas
| # | Pantalla | Dispositivo | Objetivo del usuario | Contenido real | Estados además del "feliz" |
|---|---|---|---|---|---|
| 01 | Elige el servicio y el sistema | móvil 360 | Escoger el servicio y su sistema | **Acordeón vertical de 10 categorías** (ver catálogo abajo); se abre una a la vez y muestra sus sistemas debajo. Solo **Ventana → Sistema Nova** es seleccionable; el resto lleva candado y "En proceso de implementación". Indicador "Paso 1 de 4" | carga (skeleton); toque en sistema no disponible → aviso "Pronto. Escríbenos por WhatsApp" |
| 02 | Diseña tu ventana | móvil 360 | Definir vidrio, aluminio, medidas y hojas en una pantalla | Color de vidrio: Incoloro / Bronce · Color de aluminio: Natural / Negro / Madera · Espesor **6 mm fijo, bloqueado** ("No se puede cambiar") · Alto y Ancho en cm · **Diagrama en vivo** de hojas (cajas "Fija" / "Corrediza") · Si da 2 hojas: elegir "Doble corrediza" o "Corrediza + fija" · Barra fija: "Desde S/ 324.00" + botón "Ver cotización" | error de medida; ancho menor a 120 cm o mayor a 320 cm → "Escríbenos por WhatsApp"; alto fuera de 100 a 160 cm → aviso, se revisa en la visita |
| 03 | Tu cotización | móvil 360 | Elegir tipo de vidrio y forma de pago, ver el total y qué se instalará | **Paso 1** Tipo de vidrio: Crudo (económico) / Laminado (negocios) / Templado → cambia el precio. **Paso 2** Forma de pago: Efectivo / Transferencia (−5%) / Tarjeta. Desglose y total. Lista plegable **"Qué vamos a instalar"**. Nota: "Recargos por piso o distancia: se confirman en la visita técnica". Botones fijos "Solicitar visita técnica" y "Modificar medidas" | calculando; falta elegir vidrio o pago |
| 04 | Visita técnica | móvil 360 | Elegir día y hora libres y dejar datos | Días en fila con scroll horizontal: Lun 9 a Sáb 14 de noviembre · horas 9:00 a 17:00 (inicio cada 60 min) en grilla de 3 columnas · ocupados 10:00 y 15:00 · bloqueado 13:00 · Campos: Tu nombre, Celular (9 dígitos), Dirección, Piso | sin disponibilidad + próximo día libre; error de celular; enviando |
| 05 | Solicitud enviada | móvil 360 | Saber que quedó registrada y confirmar | Código GA-4821, resumen (sistema, medidas, hojas, vidrio, pago, total, día y hora), botón **"Confirmar por WhatsApp"**, reprogramar / cancelar | — (es el estado de éxito) |
| 06 | Agenda de visitas | tablet 1024 | Ver la semana y bloquear horarios | Columnas Lun a Sáb, filas 9:00 a 17:00, visitas con cliente y distrito, botón "+ Bloquear horario", panel "Visitas de hoy" | sin conexión |

## Catálogo de categorías (pantalla 01)
Los 10 servicios salen de `SERVICE_SEO_FALLBACKS` en `apps/web/src/features/services/hooks/serviceMappers.ts`. Los sistemas marcados *(ejemplo)* están inventados para el wireframe.
| Categoría (slug) | Sistemas al desplegar | Disponible |
|---|---|---|
| Ventana (`ventana`) | Nova · Serie 20 · Serie 25 · Serie 32 · Serie 42 · Serie 62 · PVC | **Solo Nova** |
| Mampara (`mampara`) | Nova · Serie 25 · Serie 42 *(ejemplo)* | No |
| Ducha / puerta de ducha (`ducha`) | Kit Europeo · Kit Español · Kit Económico · Kit Plástico *(ejemplo)* | No |
| Techo de policarbonato (`techo`) | Sistema único: techo sol y sombra con estructura de aluminio | No |
| Baranda (`baranda`) | Sistema único (vidrio y acero inoxidable) | No |
| Parapeto y muro cortina (`parapeto`) | Sistema único *(ejemplo)* | No |
| Cerramiento de balcón (`balcones`) | Sistema único *(ejemplo)* | No |
| Puerta de vidrio templado (`pvidrio`) | Batiente · Corrediza *(ejemplo)* | No |
| Puerta de aluminio (`pserie`) | Serie 25 · Serie 35 · Serie 62 | No |
| Celosía (`celosias`) | Sistema único *(ejemplo)* | No |

## Datos que viajan entre pantallas (una sola fuente de verdad)
Sistema · servicio · color de vidrio · color de aluminio · alto · ancho · **hojas** · configuración · tipo de vidrio · forma de pago · día y hora.
Regla: **el ancho determina las hojas** y ese mismo valor se usa en el diagrama, en el resumen de "Tu cotización", en "Qué vamos a instalar" y en "Solicitud enviada". Si el cliente vuelve y cambia el ancho, todo se recalcula.
| Ancho de ejemplo | Hojas | Vidrios | Ruedas | Seguros |
|---|---|---|---|---|
| 150 cm (doble corrediza) | 2 | 2 | 4 | 2 |
| 150 cm (corrediza + fija) | 2 | 2 | 2 | 1 |
| 180 cm | 3 | 3 | 4 | 2 |
| 250 cm | 4 | 4 | 4 | 2 |

## Configuración de hojas según el ancho (diagrama de la pantalla 02)
| Ancho | Hojas | Configuración | Qué elige el cliente |
|---|---|---|---|
| Menos de 120 cm | — | Fuera de rango (a confirmar) | Aviso y WhatsApp |
| 120 a 160 cm (60 a 80 cm por hoja) | 2 | **Doble corrediza** (corrediza + corrediza) o **Corrediza + fija** | Una de las dos |
| 161 a 200 cm | 3 | Fija + corrediza + corrediza | Nada, se asigna sola |
| 201 a 320 cm | 4 | Fija + corrediza + corrediza + fija | Nada, se asigna sola |
| Más de 320 cm | — | Fuera de rango (a confirmar) | Aviso y WhatsApp |

Fuente: regla indicada por el dueño del proyecto; ningún proveedor consultado la publica (ver `04-reglas-de-precio.md`, "Fuentes consultadas").
Altura típica 1.00 a 1.60 m (a confirmar).

## Reglas que la IA debe respetar (Sesión 1)
- [x] Baja fidelidad: escala de grises, cajas con X en vez de imágenes, sin colores de marca
- [x] Áreas táctiles de al menos 44 px
- [x] Opción elegida, sistema no disponible y horario ocupado/bloqueado **no dependen solo del color** (WCAG 1.4.1): texto, tachado, check, candado
- [x] Errores junto al campo y sin borrar lo escrito (H9)
- [x] Acción principal en la zona del pulgar (barra fija inferior)
- [x] Etiquetas visibles en todos los campos; el placeholder es solo un ejemplo (WCAG 3.3.2)
- [x] **Sin casillas ni opciones pre-marcadas, sin banners promocionales**
- [x] Textos en español: "antirruido", "vidrio y aluminio" (singular)

## Estado: en espera de datos de proveedores
Las cantidades de "Qué vamos a instalar", la regla de hojas y las medidas están a la espera de los resultados del proyecto de web scraping con agentes especializados (ver `04-reglas-de-precio.md`). Los wireframes pueden avanzar con los valores de ejemplo.

## Conflicto a resolver con el catálogo del repo
AGENTS.md §3 dice que solo existen 4 sistemas (Nova, Serie 25, 35, 62). Este brief lista Serie 20, 32, 42 y PVC por pedido explícito del dueño, y omite Serie 35. Los wireframes los muestran como "no disponible"; antes de publicarlos en la web real hay que actualizar esa regla.
