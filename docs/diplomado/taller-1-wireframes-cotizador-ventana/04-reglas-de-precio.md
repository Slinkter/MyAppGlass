# Reglas de precio y materiales · Ventana nueva Sistema Nova

> Fuente: indicaciones del dueño del proyecto (2026-11-04). Lo marcado **(a confirmar)** es ilustrativo.
> No se hizo búsqueda web: las cantidades de materiales salen de la práctica habitual de ventanas corredizas de aluminio y deben validarse con el taller.

## Fórmula
```
Subtotal = Alto (m) × Ancho (m) × Tarifa del tipo de vidrio
Total    = Subtotal ajustado por forma de pago
```
Supuesto (a confirmar): medidas en **metros** y tarifa en **S/ por m²**. Incluye instalación, vidrio de **6 mm (fijo, no editable)** y accesorios.

> Ojo: el cotizador real del sitio (`apps/web/src/features/presupuesto/config/pricing.ts`) calcula distinto (vidrio por m² + aluminio por metro + kit + instalación). Este taller usa la fórmula simple del dueño; si pasa a producción hay que unificar.

## Tarifa por tipo de vidrio
| Tipo | Uso sugerido | Tarifa |
|---|---|---|
| Crudo | Opción económica | 180 |
| Laminado | Negocios | 240 |
| Templado | Mayor seguridad | 260 |

## Ajuste por forma de pago (decidido)
| Forma de pago | Ajuste | Motivo |
|---|---|---|
| Efectivo | −5% | Evita la comisión del POS |
| Transferencia | −5% | Evita la comisión del POS |
| Tarjeta | Precio lista (sin descuento) | — |

## Ejemplos calculados (vidrio Crudo)
| Medidas | Área | Hojas | Tarjeta | Efectivo o transferencia (−5%) |
|---|---|---|---|---|
| 1.50 × 1.20 m | 1.80 m² | 2 | S/ 324.00 | S/ 307.80 |
| 1.80 × 1.20 m | 2.16 m² | 3 | S/ 388.80 | S/ 369.36 |
| 2.40 × 1.20 m | 2.88 m² | 4 | S/ 518.40 | S/ 492.48 |

Mismo 1.80 m² con otros vidrios: Laminado S/ 432.00 (S/ 410.40 con −5%) · Templado S/ 468.00 (S/ 444.60 con −5%).

## Hojas según el ancho
| Ancho | Hojas | Configuración |
|---|---|---|
| < 120 cm (a confirmar) | — | Fuera de rango: aviso + WhatsApp |
| 120 a 160 cm | 2 | Doble corrediza, o corrediza + fija (a elección) |
| 161 a 200 cm | 3 | Fija + corrediza + corrediza |
| 201 a 320 cm (a confirmar) | 4 | Fija + corrediza + corrediza + fija |
| > 320 cm (a confirmar) | — | Fuera de rango: aviso + WhatsApp |

Cada hoja mide 60 a 80 cm de ancho. Altura habitual 1.00 a 1.60 m.

## Lista "Qué vamos a instalar" (pantalla 03, plegable) · cantidades de ejemplo (a confirmar)
`H` = número de hojas · `C` = hojas corredizas · `P` = perímetro de la ventana
| Material | Cantidad de ejemplo |
|---|---|
| Vidrio de 6 mm (del tipo elegido) | H unidades (una por hoja) |
| Perfiles de marco (jambas, cabezal, base) | 4 perfiles |
| Riel de aluminio | 1 por el ancho de la ventana (doble riel si es corrediza) |
| Perfiles de hoja con zócalo (2 zócalos + 2 laterales) | 4 por hoja → 4 × H |
| Ruedas (rodajes) | 2 por hoja corrediza → 2 × C |
| Guías plásticas | por hoja corrediza (a confirmar si Nova las usa; figuran como accesorio de series corredizas) |
| Felpa | según el perímetro de las hojas corredizas (en metros) |
| Seguro de ventana, instalado en el zócalo de la hoja corrediza | 1 por hoja corrediza |
| Contrapestillo (encaja con el seguro) | 1 por seguro |
| Sellado de silicona | perímetro exterior del marco (en metros) |

Tabla de qué lleva cada configuración:
| Configuración | Hojas H | Corredizas C | Vidrios | Ruedas | Seguros y contrapestillos |
|---|---|---|---|---|---|
| Doble corrediza | 2 | 2 | 2 | 4 | 2 |
| Corrediza + fija | 2 | 1 | 2 | 2 | 1 |
| Fija + corrediza + corrediza | 3 | 2 | 3 | 4 | 2 |
| Fija + 2 corredizas + fija | 4 | 2 | 4 | 4 | 2 |

## Fuentes consultadas (2026-11-05)
| Proveedor | Qué confirma | Qué NO confirma |
|---|---|---|
| [corporacioncorrales.com](https://corporacioncorrales.com/perfiles-de-aluminio/) | "Sistema Nova" existe como línea de perfiles. Colores de aluminio listados: madera, negro, blanco, champagne; anodizado de 10/15 micras. Accesorios en [/accesorios/](https://corporacioncorrales.com/accesorios/): rodamientos y garruchas, seguros para ventana, felpas, guías plásticas, silicona. Series 20, 25, 35, 42, 62 aptas para ventanas y mamparas corredizas | Contrapestillo; color "natural"; medidas por hoja; regla de 2/3/4 hojas; cantidades; precios. Ofrece ficha técnica por WhatsApp |
| [eduhg.pe](https://eduhg.pe/) | Vende rodajes, silicona (SILIFLEX) y escuadras para sistemas de aluminio | Nada sobre Nova. Su `CATALOGO-ALUMINIO.pdf` (11.8 MB) es una imagen sin texto: no se pudo leer sin OCR |
| favitemperu.com | — | No aplica (acero inoxidable y herrajes de vidrio) |

**Consecuencia:** la regla de hojas (2/3/4 por ancho), las medidas, las cantidades de la tabla de materiales y las tarifas **vienen del dueño del proyecto**, no de proveedores. Siguen "a confirmar" hasta tener la ficha técnica del Sistema Nova. Para obtenerla: pedirla a Corporación Corrales o abrir a mano las páginas de Nova del catálogo de eduhg.

## Pendiente: resultados del proyecto de web scraping
**En espera.** Se está creando un proyecto aparte de web scraping con agentes especializados para obtener datos técnicos de proveedores (composición del Sistema Nova, medidas por hoja, regla de 2/3/4 hojas, cantidades de accesorios, precios de referencia).
Hasta recibir sus resultados, todo lo marcado "a confirmar" en este documento y en `01-brief-pantallas.md` se mantiene como propuesta. Al llegar los resultados: actualizar la tabla de materiales, la tabla de hojas y la sección "Fuentes consultadas".

## Recargos aún sin definir (a confirmar con el dueño)
- Piso, fachada a la calle y distancia/flete: no se calculan en esta fase. La pantalla 03 muestra "Recargos por piso o distancia: se confirman en la visita técnica".
- La Molina es la zona base de operación.

## Reglas de la visita técnica
- Atención **lunes a sábado, 9:00 a 17:00**. Domingo cerrado.
- Cada visita ocupa un bloque de 60 min; la última empieza a las 16:00.
- El personal puede **bloquear horarios**. Un horario bloqueado u ocupado se muestra tachado y deshabilitado, con texto ("Ocupado", "No disponible").
- La confirmación final se hace por **WhatsApp 974 278 303**.
