# Ficha de servicio: Duchas (`ducha`)

> Documentada con el rol de [`../rol-vendedor.md`](../rol-vendedor.md) a partir de los `.md` de `proveedor_info`. Origen: `[prov: archivo]`; lo que ningún proveedor dice va como `[no figura]`. Los precios del proveedor son costo, no precio de venta. Sin imágenes (D9). Fecha: 2026-11-08.

## 1. Qué es este servicio
Puerta o box de ducha en vidrio templado, que la empresa ensambla con kit del proveedor, vidrio cortado a medida y accesorios, e instala en obra. Hoy en Firestore figura con los sistemas "Sistema Corredizo" y "Sistema Batiente", que son tipos de apertura y no series de proveedor.

## 2. Dos formas de armarla
| Forma | Qué se compra | Quién la publica |
|---|---|---|
| **Kit box (vidrio templado)** | Kit con herrajes + vidrio templado de 6 u 8 mm cortado a medida | Corrales (6 kits con SKU) |
| **Ducha en perfil de aluminio** | Perfiles "Puerta de ducha" y "Ducha convencional" | Eduhg y Corrales las listan solo por título (sus dibujos están en imagen) `[prov: eduhg CATALOGO-ALUMINIO p.61-62; corrales COVIACO p.56-57]` |

Favitem tiene una categoría "KIT DE PUERTA DE DUCHA" sin nombres, medidas ni SKU `[prov: favitem/paginas/Productos]`. HPD no publica kits de ducha.

## 3. Kits de box de Corrales
Encabezados de la tabla de Coviaco: **MODELO | ESPESOR DEL CRISTAL (mm) | COLOR | ANCHO DEL KIT (m) | ALTO DEL KIT (m)** `[prov: CATALOGO-COVIACO-2022 p.10]`. Por eso, en "1.80/8MM" la primera cifra es el ancho del kit en metros y la segunda el espesor del cristal.

| SKU | Modelo | Nombre exacto | Cristal | Color | Ancho | Alto |
|---|---|---|---|---|---|---|
| 03KB00110 | F1 | KIT BOX F1 FRONTAL(1F/1C) 1.80/6mm CROMADO | 6 mm | Cromado (NB) | 1.80 m | 1.90 m |
| (sin SKU) | F1 | solo aparece en la tabla de Coviaco | 6 mm | Mate (NF) | 1.80 m | 1.90 m |
| 03KB00120 | F1 | KIT BOX F1 FRONTAL(1F/1C) 1.80/8mm CROMADO | 8 mm | Cromado (NB) | 1.80 m | 1.90 m |
| 03KB00130 | F3 | KIT BOX F3 FRONTAL(2F/2C) 2.00/6mm CROMADO | 6 mm | Cromado (NB) | **2.00 m** en catálogo de accesorios y ficha web; **1.90 m** en la tabla de Coviaco | 1.90 m |
| 03KB00140 | C1 | KIT BOX C1 ESQUINERO(2F/2C) 1.20/6mm CROMADO | 6 mm | Cromado (NB) | 1.20 m | 1.90 m |
| 03KB00141 | C1 | KIT BOX C1 ESQUINERO(2F/2C) 1.50/6mm CROMADO | 6 mm | Cromado (NB) | 1.50 m | 1.90 m |
| 03KB00050 | P2 | KIT BOX IMP. P2 FRONTAL (2C) 1.80/8mm CROMADO | 8 mm | Cromado (NB) | 1.80 m | 1.90 m |

Fuentes: `[prov: CATALOGO-CORRALES-ACCESORIOS-2022 p.11; corporacion_corrales/paginas/producto_kit-box-*]`. Las fichas web agregan "TV" al nombre de cinco kits, sin explicación.

**Cómo leer el nombre**
- `FRONTAL` y `ESQUINERO` son palabras del proveedor para el tipo de kit; frontal va en un frente y esquinero en una esquina.
- `(1F/1C)`, `(2F/2C)`, `(2C)`: el proveedor no define F ni C. **Lectura probable, no confirmada:** F = paño fijo y C = paño corredizo, igual que la convención del manual de la empresa.
- `NB` y `NF` aparecen entre paréntesis junto al color (Cromado, Mate) sin definición formal.
- Combinaciones que **no** existen en lo publicado: F3 en 8 mm, P2 en 6 mm, C1 en 8 mm.

## 4. Accesorios y repuestos de ducha (Corrales)
| SKU | Nombre exacto | Observación |
|---|---|---|
| 03GI0003A | GARRUCHA PARA PUERTA DE DUCHA TEMPLADO | sin medida ni carga |
| 03RI00003 | RUEDA IMP. P/DUCHA RODATTECH | Rodattech es marca de rueda |
| 03RI00002 | RUEDA IMP. P/DUCHA TRIANGULAR | diferencia con la anterior: solo el nombre |
| 03GS00005 | GUÍA PLÁSTICA DE DUCHA P/6MM | para vidrio de 6 mm |
| 03GS00006 | GUÍAS PLÁSTICA DE DUCHA P/8MM | para vidrio de 8 mm |
| 03GS00003 | JUEGO DE GUIA P/DUCHA INT. Y EXT. NEGRO | interior y exterior |
| 03GS00004 | JUEGO DE GUIA P/DUCHA INT. Y EXT. TRANSPARENTE | interior y exterior |
| 03KB00220 | PERILLA DE ACERO SIMPLE PARA DUCHA | |
| 03KB00221 | PERILLA DOBLE DE ACERO PARA DUCHA | |
| 03CF00036 | VINIL P/PUERTA DE DUCHA | sin medida |

`[prov: corporacion_corrales/paginas/producto_*ducha*; CATALOGO-CORRALES-ACCESORIOS-2022 p.5 y p.11]`. La rueda de mampara 03RI00261 (Rodattech) es otra pieza: no confundirla.

## 5. Vidrio
Templado de HPD `[prov: hpd_glass/paginas/productos_vidrios-templados-2]`:

| Espesor | Incoloro | Gris | Bronce |
|---|---|---|---|
| 4 y 5 mm | Sí | Sí | no figura |
| 6, 8 y 10 mm | Sí | Sí | Sí |
| 12 mm | Sí | no figura | no figura |

Los kits piden 6 u 8 mm. Corrales procesa templado (Glasstempcorr) sin publicar espesores ni colores. Ficha de seguridad de HPD: norma E.040 e impacto ANSI Z97.1 y UNE-EN 12600 `[prov: hpd_glass CC-E015]`.

## 6. Lo que el vendedor pregunta antes de cotizar
*(Preguntas del rol, no salen de un proveedor.)*
1. ¿Frente o esquina? ¿Cuántas hojas fijas y corredizas?
2. ¿Ancho del vano en metros? (el kit se elige por ancho: 1.20, 1.50, 1.80 o 2.00)
3. ¿Vidrio de 6 u 8 mm? Define el kit y la guía.
4. ¿Acabado cromado o mate? Mate solo aparece en la tabla de F1 de 6 mm.
5. ¿Altura del vano? Los kits declaran 1.90 m.
6. ¿Incoloro, gris o bronce?

## 7. Errores comunes
- Elegir F1 solo por el ancho: existe en 6 mm (03KB00110) y en 8 mm (03KB00120).
- Pedir guía de 6 mm para vidrio de 8 mm, o al revés (03GS00005 y 03GS00006 se venden separadas).
- Cotizar un kit de 2.00 m de ancho para un vano de 1.90 m, o al revés: F3 dice 2.00 y 1.90 según la fuente.
- Prometer bronce en 4 o 5 mm, o gris en 12 mm.
- Confundir rueda de ducha (03RI00002, 03RI00003) con rueda de mampara (03RI00261).

## 8. Vacíos (preguntar al dueño o buscar fuera)
| Vacío | Estado |
|---|---|
| Qué piezas trae cada kit y si incluye el vidrio | `[no figura]` |
| Qué significan F, C, NB, NF y TV | F y C probables, el resto `[no figura]` |
| Ancho real del F3 (1.90 m o 2.00 m) | contradicción |
| SKU del F1 de 6 mm en color Mate | `[no figura]` |
| Medida, carga y compatibilidad de garruchas, ruedas, perillas y vinil | `[no figura]` |
| La categoría KIT BOX dice 13 productos y solo hay 6 kits con ficha | por aclarar |
| Qué sistemas de ducha en aluminio vende la empresa | por confirmar con el dueño |
| Unidad de venta y costo de cada pieza | `[no figura]` |
| Bisagras y herrajes de puertas de ducha batientes (no hay kit para ellas) | ver ficha `pvidrio` y bisagras |
| Investigación externa | pendiente (R4) |
