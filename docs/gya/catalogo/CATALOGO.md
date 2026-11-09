# Catálogo canónico: propuesta para aprobar

> **Estado: propuesta del 2026-11-08, sin aprobar.** No cambia código, Firestore ni `AGENTS.md` hasta la puerta de catálogo. Detalle y fuentes por proveedor en [`proveedores.md`](./proveedores.md).

## 1. Cómo se ordena lo que vende la empresa

| Familia | Qué incluye | Cómo se cotiza |
|---|---|---|
| A. Suministro e instalación | los 10 servicios del sitio | por medida: serie + vidrio + acabado + instalación |
| B. Servicios técnicos | mantenimiento; instalación de freno hidráulico | tarifa por servicio o unidad, con visita técnica |
| C. Productos de venta | espejos; repuestos | por unidad, m² o metro |

La empresa compra materiales, ensambla en su taller e instala. El **servicio** es lo que ve el cliente, la **serie** es la línea de perfiles del proveedor y el **producto** resulta de ensamblarla.

## 2. Cómo se compone un producto

```
Producto = perfiles de la serie (fórmula de corte)
         + vidrio (fórmula de medida)
         + herrajes y accesorios (cantidad por unidad)
         + mano de obra de taller + instalación + margen
```

Ejemplo real: **Serie 20, ventana corrediza** (Eduhg, `CATALOGO-ALUMINIO`, p.11, contrastado).

| Tipo | Código | Pieza | Cant. | Fórmula o unidad |
|---|---|---|---|---|
| Perfil | 2001 | Riel superior | 1 | B-12 |
| Perfil | 2002 | Riel inferior | 1 | B-12 |
| Perfil | 2009 | Jamba | 2 | A |
| Perfil | 2004 | Zócalo sup. hoja | 2 | B/2-1 |
| Perfil | 2005 | Zócalo inf. hoja | 2 | B/2-2 |
| Perfil | 2010 | Parante hoja | 2 | A-28 |
| Perfil | 2011 | Traslapo | 2 | A-28 |
| Vidrio | — | Vidrio 4 mm | 2 | B/2-53 x A-102 |
| Herraje | 03GA00321 | Garrucha armada (Serie 20) | 4 | pieza |
| Herraje | 03TA00034 | Guía superior 03 (Serie 20) | 4 | pieza |
| Herraje | 03CD00230/231/232 | Cierre automático MR625 | 2 | pieza |
| Herraje | 03CF0010N/P | Felpa F-10 | 6A + 4B | metro lineal |
| Herraje | TOR8x1"CPPH / CBPH | Tornillo flat / pan 8x1" | 8 / 8 | pieza |

El catálogo no define A y B; por las fórmulas parecen alto y ancho. **Por confirmar.** Eduhg trae este despiece también para otras series, así que el presupuesto podría calcular costo real con precios de proveedor en lugar de los precios de ejemplo actuales.

## 3. Series propuestas (agrupadas por producto)

Eduhg y Corrales usan la misma numeración básica: **21 de los 34 códigos de accesorios del catálogo de aluminio de Eduhg también aparecen en Corrales**, lo que respalda lo que observa el dueño. HPD usa otra nomenclatura y **ningún proveedor publica equivalencias**; las columnas de HPD y de las series europeas son candidatas por número o función.

| Producto | Serie estándar | Corrales | Eduhg | HPD (candidato) | Nota |
|---|---|---|---|---|---|
| Ventana corrediza | Serie 20 | Serie 20 | Básica 20 | ? | |
| Ventana corrediza económica | Serie 29 | 29 (3131/8131) | — | VCO 031 ? | |
| Ventana corrediza económica | Serie 3825 | 3825 | — | ? | |
| Ventana y mampara corrediza | Serie 25 | Serie 25 | Básica 25 | ? | |
| Ventana y mampara corrediza | Serie 28 | 28 (3142/3642) | — | ? | |
| Mampara corrediza | Serie 7038 | 7038 | — | ? | |
| Ventana corrediza europea | Serie 62 | Serie 62 | VT-62 / Hermeti-K ? | ? | |
| Corrediza europea | Serie 80 | Serie 80 | MP-80 ? | ? | Eduhg la presenta como mampara |
| Puerta batiente | Serie 35 | Serie 35 | Básica 35 | MBT 035 ? | HPD la llama mampara |
| Puerta y mampara batiente | Serie 36 | Serie 36 (3736) | — | MBT 036 ? | |
| Ventana proyectante económica | Serie 3831 | 3831 | Básica 3831 | ? | Vidrio: Corrales 4 mm, Eduhg 6 mm |
| Ventana proyectante | Serie 42 | Serie 42 | Básica 42 | VPR 042 ? | Vidrio: Corrales 4 mm, Eduhg 6 mm |
| Muro cortina | Serie 45 | Serie 45 | Básica 45 | MCS 034 / MCF 034 ? | |
| Por definir | Sistema Nova | Sistema Nova | — | — | Existe en Corrales; falta su composición |

## 4. De la terminología actual a la del proveedor

### Sistemas y servicios
| Hoy | Dónde | Lo que dicen los proveedores | Propuesta |
|---|---|---|---|
| "Serie 35" en Ventanas | Firestore `ventana` | Serie 35 es puerta batiente | Quitar de ventanas, salvo que el dueño la use así |
| "Serie 62" en Puertas | SEO de `pserie` | Serie 62 es ventana corrediza | Corregir |
| "Serie 25" en Puertas | SEO de `pserie` | Serie 25 es mampara/ventana | Corregir |
| "Sistema Puerta Serie" | Firestore `pserie` | Serie 35 y 36 | Reemplazar |
| "Sistema Corredizo", "Sistema Batiente" | Firestore `ducha` | Tipo de apertura, no serie | Pasar a tipo de apertura |
| "Sistema Panorámico", "Parapeto Panorámico", "Baranda Minimalista", "Celosía Fija y Móvil", "Cobertura Aluminio", "Pivotante con Freno de Piso" | Firestore | Sin equivalente con ese nombre | Nombre comercial del dueño o línea real; **decidir uno por uno** |
| "Nova Hermética" | `pricing.ts` | Sistema Nova | Quitar "Hermética" si no hay respaldo |
| "Ventana Acústica" | `pricing.ts` | No hay serie con ese nombre. Existen laminado acústico (Eduhg) y VT-62 termoacústica | Tratarla como combinación de serie + vidrio |
| "Ventana PVC Abatible" | `pricing.ts` | **Ninguno de los 4 ofrece ventanas de PVC en lo extraído**; solo guías de PVC | Necesita otro proveedor o se retira |
| "Antirruido 50/70/80 %" | `pricing.ts`, `company.json` | **Sin cifras de ruido en lo revisado** (HPD: solo frases cualitativas, sin dB) | Decidir si se mantiene sin respaldo |

### Vidrio y acabados
| Hoy | Proveedor | Propuesta |
|---|---|---|
| Crudo | Liso (Eduhg); primario o flotado (HPD) | Vidrio liso, por confirmar que es lo mismo |
| Laminado 8 mm | 8.38 (Eduhg) | Usar espesor real: 6.38, 8.38, 10.38 |
| Templado | Templado 4 a 12 mm (HPD) | Se mantiene, con espesor |
| Gris | Gris humo (Eduhg), Gris (HPD) | Gris |
| Arenado | Vinil arenado (Eduhg); arenado como servicio (Corrales) | Definir cuál se ofrece |
| Empavonado (presupuestos reales) | Ácido (Eduhg) | Por confirmar |
| Mate, Negro, Blanco, Champagne, Madera | Corrales usa los mismos | Se mantienen; quitar "Anodizado", "Esmaltado" y "Titanio" de las etiquetas donde no correspondan |
| Titanio | Solo HPD | Por confirmar si se trabaja |

### Piezas (glosario)
| Estándar propuesto | También se dice |
|---|---|
| Riel superior / inferior | Marco superior / inferior (HPD) |
| Jamba | Marco lateral (HPD) |
| Zócalo de hoja | Marco de hoja superior / inferior (HPD) |
| Parante de hoja | Marco de hoja lateral (HPD), montante |
| Traslapo | Traslape (HPD) |
| Hoja | Nave (Corrales) |
| Garrucha | Rodamiento (Corrales) |
| Felpa / Burlete | Felpa de polipropileno / Burlete de EPDM |
| Diseños CC, CF, FC, CFC, FCCF | Parecen corrediza y fijo; el catálogo no lo define. **Por confirmar** |

## 5. Familias B y C

| Oferta | Propuesta | Fuente |
|---|---|---|
| Freno hidráulico | Sevax TSA (03FR00005) y Sevax Minos (03FR0006M) con accesorio 03AM00012, por servicio de instalación | Corrales |
| Mantenimiento | Limpieza, lubricación de garruchas, cambio de felpas y burletes, ajuste de seguros | Manual HPD |
| Espejos | Belga 4 y 6 mm (Corrales); 2 y 3 mm Doble Capa o Micorrex (Corrales). **El espejo brasileño no aparece en ningún proveedor** | Corrales, Eduhg, HPD |
| Repuestos | Garruchas, felpas, burletes, seguros, cierres, guías, autorroscantes, siempre indicando la serie compatible | Corrales ACC |

## 6. Decisiones del dueño (puerta de catálogo)

1. ¿Qué series de la §3 vende de verdad? ¿Con cuáles trabaja también HPD?
2. Serie 35 en Ventanas, y Serie 25 y 62 en Puertas: ¿error o lo trabaja así?
3. ¿Cuáles son los modelos de freno Sevax que instala: TSA, Minos o ambos?
4. PVC abatible: ¿qué proveedor? ¿Se mantiene?
5. Acústica: ¿qué serie y vidrio lleva?
6. ¿Se mantienen los % antirruido sin respaldo del proveedor?
7. Espejo de 4 mm no belga: ¿quién lo vende?
8. ¿Qué nombre comercial reciben los sistemas de la fila "Sistema Panorámico" y siguientes?
9. Otros servicios de vidriería o repuestos sin listar.
10. Favitem: ¿tiene lista de precios o catálogo que se pueda aportar?

## 7. Después de aprobar (fuera de esta propuesta)
Renombrar implica cambiar a la vez `systems` y `gallery[].system` en Firestore, porque las fotos se enlazan por texto exacto. También `pricing.ts`, `quoteLines.ts`, `aiProducts.ts`, `serviceMappers.ts`, los tests y la documentación. Los presupuestos ya guardados conservan los ids antiguos, así que hará falta compatibilidad. Luego sigue la puerta 1 del design system.
