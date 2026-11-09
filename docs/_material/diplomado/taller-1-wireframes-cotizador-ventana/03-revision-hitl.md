# Revisión Human-in-the-loop · Cotizador de ventana nueva

Marca ✅ cumple · ❌ no cumple · — no aplica todavía.

## Checklist
| # | Criterio | Regla | Rev. 1 | Rev. 2 |
|---|---|---|---|---|
| 1 | Flujo de 5 pantallas móviles en orden y navegable, con "Paso X de 4" | Brief | | |
| 2 | Contenido real (medidas, tarifas, horarios; nada de "Lorem") | H2 | | |
| 3 | Baja fidelidad: solo grises, sin banners promocionales | Fidelidad | | |
| 4 | Una sola acción primaria por pantalla, mismo estilo | H4, H8 | | |
| 5 | Acción principal en barra fija inferior (zona del pulgar) | Fitts | | |
| 6 | Áreas táctiles ≥ 44 px | WCAG 2.5.8 | | |
| 7 | Opción elegida, sistema no disponible y horario ocupado sin depender del color | WCAG 1.4.1 | | |
| 8 | Etiqueta visible en cada campo | WCAG 3.3.2 | | |
| 9 | Error junto al campo, sin borrar lo escrito | H9, WCAG 3.3.1 | | |
| 10 | Estados: calculando, error, sin disponibilidad, enviando, éxito | H1 | | |
| 11 | Se puede volver atrás desde cada paso | H3 | | |
| 12 | Solo Sistema Nova es seleccionable; los otros 6 muestran "En proceso de implementación" | H5 | | |
| 13 | Espesor de 6 mm visible y bloqueado | H5, H6 | | |
| 14 | Diagrama de hojas coincide con el ancho (2 / 3 / 4) y el selector de 2 hojas solo aparece con 2 hojas | H2, H6 | | |
| 15 | Barra "Desde S/ …" visible en pantalla 02 y coherente con el total de la pantalla 03 | H1, H4 | | |
| 16 | Total correcto y descuento 5% solo en efectivo/transferencia | H1, H6 | | |
| 17 | "Qué vamos a instalar": resumen de una línea y detalle completo (vidrios, perfiles, riel, zócalos, ruedas, guías plásticas, felpa, seguro, contrapestillo, silicona) | H1, H6 | | |
| 18 | Ninguna opción (color, vidrio, hojas, pago) viene pre-seleccionada | Patrón oscuro | | |
| 19 | Anchos fuera de rango (<120 o >320 cm) ofrecen WhatsApp, no un callejón sin salida | H9 | | |
| 20 | Agenda tablet legible y "Bloquear horario" visible | H6, H7 | | |
| 21 | El resumen muestra las mismas hojas elegidas (probar anchos 150, 180 y 250 cm → 2, 3 y 4) en cotización y solicitud enviada | H1, H5 | ❌ | |
| 22 | 10 categorías visibles en acordeón vertical; solo Ventana > Sistema Nova avanza | H2, H5 | | |

**Verificación de cálculo (vidrio Crudo):** 1.50 × 1.20 m → S/ 324.00 tarjeta / S/ 307.80 efectivo · 1.80 × 1.20 m → S/ 388.80 / S/ 369.36 · 2.40 × 1.20 m → S/ 518.40 / S/ 492.48.

**Puntaje:** Rev. 1 ___ / 22 · Rev. 2 ___ / 22

## Bitácora de decisiones
| # | Pantalla | Qué viste (evidencia) | Regla | Decisión | Acción / prompt |
|---|---|---|---|---|---|
| 1 | Tu cotización / Solicitud enviada | Elegí 4 hojas y el resumen mostró 2 hojas | H1, H5 (consistencia) | ✏️ Corregir | Prompt I-8 |
| 2 | Elige el servicio y el sistema | El proyecto tiene 10 servicios y la pantalla solo mostraba sistemas de ventana | Brief, H2 | ✏️ Corregir | Prompt I-9 |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |
| 6 | | | | | |

## Cierre
- Enlace publicado del prototipo: (pega aquí el enlace de Publish)
- ¿Qué decidió la IA que tú no habías pedido?
- ¿Qué aceptaste sin revisar y luego tuviste que corregir?
- ¿Qué regla agregarías al prompt maestro la próxima vez?
